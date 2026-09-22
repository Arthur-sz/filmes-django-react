from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Filme
from .serializers import FilmeSerializer

@api_view(['GET', 'POST'])
def lista_filmes(request):
    if request.method == 'GET':
        filmes = Filme.objects.all()
        nome = request.GET.get('nome')
        if nome:
            filmes = filmes.filter(titulo__icontains=nome)
        serializer = FilmeSerializer(filmes, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = FilmeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def deletar_filme(request, pk):
    try:
        filme = Filme.objects.get(pk=pk)
    except Filme.DoesNotExist:
        return Response(status=404)
    filme.delete()
    return Response(status=204)