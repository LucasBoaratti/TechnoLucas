from .models import Produtos, Historicos, Movimentacoes, User
from .serializers import LoginUsuarioSerializer, CadastroUsuarioSerializer, ProdutosSerializer, HistoricoSerializer, MovimentacoesSerializer
from .filters import ProdutosFilters, HistoricosFilters
from rest_framework.generics import CreateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.

# View para autenticação de usuário
class LoginUsuario(CreateAPIView):
    serializer_class = LoginUsuarioSerializer

# View para criar um cadastro para o usuário
class CadastroUsuarioCreateAPIView(CreateAPIView):
    serializer_class = CadastroUsuarioSerializer

# View para listar e criar os produtos
class ProdutosLCAPIView(ListCreateAPIView):
    queryset = Produtos.objects.all()

    serializer_class = ProdutosSerializer

    filter_backends = [DjangoFilterBackend]

    filterset_class = ProdutosFilters

# View para atualizar e deletar produtos
class ProdutosRUDAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Produtos.objects.all()

    serializer_class = ProdutosSerializer

    lookup_field = "pk"

# View para listar e criar os históricos
class HistoricosLCAPIView(ListCreateAPIView):
    queryset = Historicos.objects.all()

    serializer_class = HistoricoSerializer

    filter_backends = [DjangoFilterBackend]

    filterset_class = HistoricosFilters

# View para atualizar e deletar os históricos
class HistoricosRUDAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Historicos.objects.all()

    serializer_class = HistoricoSerializer

    lookup_field = "pk"

# View para listar e criar as movimentações
class MovimentacoesLCAPIView(ListCreateAPIView):
    queryset = Movimentacoes.objects.all()

    serializer_class = MovimentacoesSerializer

# View para atualizar e deletar movimentações
class MovimentacoesRUDAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Movimentacoes.objects.all()

    serializer_class = MovimentacoesSerializer

    lookup_field = "pk"