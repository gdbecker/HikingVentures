from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

app_name = 'hvapp'

urlpatterns = [
    path('difficulties/', views.getDifficulties, name='difficulties'),
    path('difficulties/<str:pk>/', views.getDifficulty, name='difficulty'),
    path('routetypes/', views.getRouteTypes, name='routetypes'),
    path('routetypes/<str:pk>/', views.getRouteType, name='routetype'),
    path('states/', views.getStates, name='states'),
    path('states/<str:pk>/', views.getState, name='state'),
    path('parks/', views.getParks, name='parks'),
    path('parks/<str:pk>/', views.getPark, name='park'),
    path('parks/create/', views.createPark, name='create-park'),
    path('trails/', views.getTrails, name='trails'),
    path('trails/<str:pk>/', views.getTrail, name='trail'),
    path('trails/create/', views.createTrail, name='create-trail'),
    path('images/', views.getImages, name='images'),
]
