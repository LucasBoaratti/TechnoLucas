from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import LoginUsuario, CadastroUsuarioCreateAPIView, ProdutosLCAPIView, ProdutosRUDAPIView, HistoricosLCAPIView, HistoricosRUDAPIView, MovimentacoesLCAPIView, MovimentacoesRUDAPIView

# URLs do site
urlpatterns = [
    path("token", view=TokenObtainPairView.as_view(), name="Token de acesso"),
    path("login", view=LoginUsuario.as_view(), name="Login"),
    path("cadastro", view=CadastroUsuarioCreateAPIView.as_view(), name="Cadastro"),
    path("produtos", view=ProdutosLCAPIView.as_view(), name="Listar e criar produtos"),
    path("produtos/<int:pk>", view=ProdutosRUDAPIView.as_view(), name="Atualizar e deletar produtos"),
    path("historicos", view=HistoricosLCAPIView.as_view(), name="Listar e criar históricos"),
    path("historicos/<int:pk>", view=HistoricosRUDAPIView.as_view(), name="Atualizar e deletar históricos"),
    path("movimentacoes", view=MovimentacoesLCAPIView.as_view(), name="Listar e criar movimentações"),
    path("movimentacoes/<int:pk>", view=MovimentacoesRUDAPIView.as_view(), name="Atualizar e criar movimentações"),
]