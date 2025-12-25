from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (PatientViewSet, MedicalHistoryViewSet, AppointmentViewSet, 
                    BillingViewSet, AdministratorViewSet, FacilityViewSet, DoctorViewSet)

router = DefaultRouter()
router.register(r'patients', PatientViewSet)
router.register(r'medical-history', MedicalHistoryViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'billing', BillingViewSet)
router.register(r'administrators', AdministratorViewSet)
router.register(r'facilities', FacilityViewSet)
router.register(r'doctors', DoctorViewSet)

urlpatterns = [
    path('', include(router.urls)),
]