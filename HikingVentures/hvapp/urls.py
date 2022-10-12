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
    path('parks/create/', views.createPark, name='create-park'),
    path('parks/<str:pk>/', views.getPark, name='park'),
    path('trails/', views.getTrails, name='trails'),
    path('trails/create/', views.createTrail, name='create-trail'),
    path('trails/<str:pk>/', views.getTrail, name='trail'),
    path('images/', views.getImages, name='images'),
    path('images/create/', views.createImage, name='create-image'),
    path('reviews/', views.getReviews, name='reviews'),
    path('reviews/create/', views.createReview, name='create-review'),
    path('userfavorites/', views.getUserFavorites, name='userfavorites'),
    path('userfavorites/create/', views.createUserFavorite, name='create-userfavorite'),
    path('userfavorites/delete/<str:pk>/', views.deleteUserFavorite, name="delete-userfavorite"),
    path('history/', views.getHistory, name='history'),
    path('history/create/', views.createHistory, name='create-history'),
]
