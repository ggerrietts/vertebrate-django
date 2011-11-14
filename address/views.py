# Create your views here.

import common.views
import address.models

class AsyncContactView(common.views.BackboneView):
	model = address.models.ContactModel
	url_root = "async/contact"