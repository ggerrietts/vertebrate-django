import logging
import json

from django.views.generic.base import View
from django.http import HttpResponse


logger = logging.getLogger(__name__)


class RestfulError(Exception):
    status = 400
    def __init__(self, msg):
        self.message = msg
    
    def to_response(self):
        return HttpResponse(
            self.message,
            status=self.status,
            mimetype='text/plain',
        )

class UnknownError(RestfulError):
    status = 500


class BackboneView(View):

    model = None

    url_root = 'none'

    @classmethod
    def make_url(kls):
        return r'^%s(?:/(?P<oid>\d+))?$' % (kls.url_root,)

    def dispatch(self, request, *args, **kwargs):
        self.request = request
        self.args = args
        self.kwargs = kwargs
        self.method = request.META.get('HTTP_X_HTTP_METHOD_OVERRIDE', request.method).lower()

        try:
            retval = getattr(self, self.method)()
            return HttpResponse(retval,
                                status=200,
                                mimetype='application/json')
        except AttributeError, e:
            print e
            return self.http_method_not_allowed(request, *args, **kwargs)

        except RestfulError, e:
            return e.to_response()

        except Exception, e:
            r = UnknownError(str(e))
            return r.to_response()

    def get(self):
        """ Retrieves an object, or a list of objects.
        """
        oid = self.kwargs.get('oid')
        if oid:
            out = self.model.objects.get(pk=oid).toJSON()
        else:
            out = [o.toJSON() for o in self.model.objects.all()]
        return json.dumps(out)

    def post(self):
        """ Inserts a new object.
        """
        data = json.loads(request.raw_post_data)
        object = self.modelobjects.create(**data)
        return json.dumps(object.toJSON())

    def put(self):
        """ Edits an existing object.
        """
        oid = self.kwargs.get('oid')
        data = json.loads(request.raw_post_data)
        object = self.model.objects.get(pk=oid)
        object.__dict__.update(data)
        object.save()
        return json.dumps(object.toJSON())

    def delete(self):
        """ Deletes an object.
        """
        oid = self.kwargs.get('oid')
        object = self.model.objects.get(pk=oid)
        object.delete()
        return json.dumps({})
