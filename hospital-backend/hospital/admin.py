from django.contrib import admin
from .models import Patient, MedicalHistory, Appointment, Billing, Administrator, Facility, Doctor

admin.site.register(Patient)
admin.site.register(MedicalHistory)
admin.site.register(Appointment)
admin.site.register(Billing)
admin.site.register(Administrator)
admin.site.register(Facility)
admin.site.register(Doctor)