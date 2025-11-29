from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser, User # User: uma tabela de usuários que já vem com campos como: username, password etc.

# Create your models here.

# ------------- Opções de escolha -------------

# Escolha de tipo de produto
tipoProduto = [
    ("Selecione...", "Selecione..."),
    ("Smartfone", "Smartfone"),
    ("Notebook", "Notebook"),
    ("SmartTV", "SmartTV"),
]

# Escolha de tipo de movimentação
tipoMovimentacao = [
    ("Selecione...", "Selecione..."),
    ("Entrada", "Entrada"),
    ("Saída", "Saída"),
]

# ------------- Tabelas do banco -------------

# Tabela de usuários, mas com o campo de email adicionado
class Usuarios(AbstractUser):
    email = models.CharField(max_length=255, null=False)

    # Função que define o nome da tabela no django admin
    def __str__(self):
        return self.username

    # Definindo o nome da tabela tanto no banco de dados quanto no plural
    class Meta:
        verbose_name_plural = "Usuarios"

        db_table = "Usuarios"

# Tabela de produtos
class Produtos(models.Model):
    nome = models.CharField(max_length=50, null=False)
    tipo = models.CharField(max_length=15, choices=tipoProduto, default="Selecione...", null=False)
    quantidade_estoque = models.BigIntegerField(null=False)
    preco = models.FloatField(null=False)
    descricao = models.TextField()
    responsavel = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    # Função que define o nome da tabela no django admin
    def __str__(self):
        return "Produtos"
    
    # Definindo o nome da tabela tanto no banco de dados quanto no plural
    class Meta:
        verbose_name_plural = "Produtos"

        db_table = "Produtos"


# Tabela de históricos
class Historicos(models.Model):
    data_historico = models.DateField(auto_now_add=True)
    responsavel = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    produto = models.ForeignKey(Produtos, on_delete=models.CASCADE)

    # Função que define o nome da tabela no django admin
    def __str__(self):
        return "Históricos"
    
    # Definindo o nome da tabela tanto no banco de dados quanto no plural
    class Meta:
        verbose_name_plural = "Históricos"

        db_table = "Historicos"

# Tabela de movimentações
class Movimentacoes(models.Model):
    quantidade_produtos = models.BigIntegerField()
    tipo_movimentacao = models.CharField(max_length=15, choices=tipoMovimentacao, default="Selecione...")
    responsavel = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    produto = models.ForeignKey(Produtos, on_delete=models.CASCADE)

    # Função que define o nome da tabela no django admin
    def __str__(self):
        return "Movimentações Entrada/Saída"
    
    # Definindo o nome da tabela tanto no banco de dados quanto no plural
    class Meta:
        verbose_name_plural = "Movimentações"

        db_table = "Movimentacoes"