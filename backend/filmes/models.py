from django.db import models

class Filme(models.Model):
    titulo = models.CharField(max_length=200)
    genero = models.CharField(max_length=100)
    ano = models.IntegerField() 
    assistido = models.BooleanField(default=False)

    def __str__(self):
        return self.titulo 
