from .models import Produtos, Historicos, Movimentacoes, User
from .serializers import LoginUsuarioSerializer, CadastroUsuarioSerializer, ProdutosSerializer, HistoricoSerializer, MovimentacoesSerializer
from rest_framework.generics import CreateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView

# Create your views here.

# View para autenticação de usuário
class LoginUsuarioCreateAPIView(CreateAPIView):
    serializer_class = LoginUsuarioSerializer

# View para criar um cadastro para o usuário
class CadastroUsuarioCreateAPIView(CreateAPIView):
    serializer_class = CadastroUsuarioSerializer