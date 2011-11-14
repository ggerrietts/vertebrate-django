class AjaxModelHelper(object):

	def toJSON(self):
		return dict((fld.name, getattr(self, fld.name)) for fld in self._meta.fields)
