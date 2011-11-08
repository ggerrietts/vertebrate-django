from django.conf.urls.defaults import patterns, include, url
from django.contrib import admin

from django.views.generic import TemplateView

from address.views import AsyncContactView

admin.autodiscover()

urlpatterns = patterns('',
    url(AsyncContactView.make_url(), AsyncContactView.as_view(), name='async_contact_view'),
    url(r'contacts', TemplateView.as_view(template_name="address/contact.html"), name="contact_view"),

    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
