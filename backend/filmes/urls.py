from django.urls import path
from . import views

urlpatterns = [
    path('filmes/', views.lista_filmes),
    path('filmes/<int:pk>/', views.deletar_filme),
]