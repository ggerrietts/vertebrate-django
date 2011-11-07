from django.conf.urls.defaults import patterns, include, url

from address.views import AsyncContactView

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(AsyncContactView.make_url(), AsyncContactView.as_view(), name='async_contact_view'),

    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
