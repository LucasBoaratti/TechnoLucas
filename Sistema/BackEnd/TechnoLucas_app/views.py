from .models import Produtos, Historicos, Movimentacoes
from .serializers import LoginUsuarioSerializer, CadastroUsuarioSerializer, ProdutosSerializer, HistoricoSerializer, MovimentacoesSerializer
from .filters import ProdutosFilters, HistoricosFilters
from rest_framework.generics import CreateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.

# View para autenticação de usuário
class LoginUsuario(TokenObtainPairView):
    serializer_class = LoginUsuarioSerializer

# View para criar um cadastro para o usuário
class CadastroUsuarioCreateAPIView(CreateAPIView):
    serializer_class = CadastroUsuarioSerializer

# View para listar e criar os produtos
class ProdutosLCAPIView(ListCreateAPIView):
    queryset = Produtos.objects.all().order_by("nome")

    serializer_class = ProdutosSerializer

    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend]

    filterset_class = ProdutosFilters

# View para atualizar e deletar produtos
class ProdutosRUDAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Produtos.objects.all()

    serializer_class = ProdutosSerializer

    permission_classes = [IsAuthenticated]

    lookup_field = "pk"

# View para listar e criar os históricos
class HistoricosLCAPIView(ListCreateAPIView):
    queryset = Historicos.objects.all().order_by("data_historico")

    serializer_class = HistoricoSerializer

    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend]

    filterset_class = HistoricosFilters

# View para atualizar e deletar os históricos
class HistoricosRUDAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Historicos.objects.all()

    serializer_class = HistoricoSerializer

    permission_classes = [IsAuthenticated]

    lookup_field = "pk"

# View para listar e criar as movimentações
class MovimentacoesLCAPIView(ListCreateAPIView):
    queryset = Movimentacoes.objects.all().order_by("quantidade_produtos")

    serializer_class = MovimentacoesSerializer

    permission_classes = [IsAuthenticated]

    # Função que atualiza a quantidade de produtos
    def perform_create(self, serializer):
        produto_id = self.request.data.get("produto") 
        produto = Produtos.objects.get(id=produto_id)

        serializer.save(
            responsavel=self.request.user,  
            produto=produto                 
        )

        movimentacao = serializer.instance

        # Cálculo de produtos para a entrada e saída
        if movimentacao.tipo_movimentacao == "Entrada":
            produto.quantidade_estoque += movimentacao.quantidade_produtos
        elif movimentacao.tipo_movimentacao == "Saida":
            # Verificando se a quantidade de estoque for menor que zero
            if produto.quantidade_estoque - movimentacao.quantidade_produtos < 0:
                raise ValueError("O estoque de produtos não pode ser menor que zero!")
            produto.quantidade_estoque -= movimentacao.quantidade_produtos

        produto.save()

# View para atualizar e deletar movimentações
class MovimentacoesRUDAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Movimentacoes.objects.all()

    serializer_class = MovimentacoesSerializer

    permission_classes = [IsAuthenticated]

    lookup_field = "pk"