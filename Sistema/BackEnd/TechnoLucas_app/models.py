from django.db import models
from django.contrib.auth.models import User # User: uma tabela de usuários que já vem com campos como: username, password etc.

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

# Tabela de produtos
class Produtos(models.Model):
    nome = models.CharField(max_length=50, null=False)
    tipo = models.CharField(max_length=15, choices=tipoProduto, default="Selecione...", null=False)
    quantidade_estoque = models.BigIntegerField(null=False)
    preco = models.FloatField(null=False)
    descricao = models.TextField()
    responsavel = models.ForeignKey(User, on_delete=models.CASCADE)

    # Função que define o nome da tabela no django admin
    def __str__(self):
        return "Produtos"
    
    # Classe que define o nome da tabela no plural no django admin
    class Meta:
        verbose_name_plural = "Produtos"

# Tabela de históricos
class Historicos(models.Model):
    data_historico = models.DateField(auto_now_add=True)
    responsavel = models.ForeignKey(User, on_delete=models.CASCADE)
    produto = models.ForeignKey(Produtos, on_delete=models.CASCADE)

    # Função que define o nome da tabela no django admin
    def __str__(self):
        return "Históricos"
    
    # Classe que define o nome da tabela no plural no django admin
    class Meta:
        verbose_name_plural = "Históricos"

# Tabela de movimentações
class Movimentacoes(models.Model):
    quantidade_produtos = models.BigIntegerField()
    tipo_movimentacao = models.CharField(max_length=15, choices=tipoMovimentacao, default="Selecione...")
    responsavel = models.ForeignKey(User, on_delete=models.CASCADE)
    produto = models.ForeignKey(Produtos, on_delete=models.CASCADE)

    # Função que define o nome da tabela no django admin
    def __str__(self):
        return "Movimentações Entrada/Saída"
    
    # Classe que define o nome da tabela no plural no django admin
    class Meta:
        verbose_name_plural = "Movimentações"