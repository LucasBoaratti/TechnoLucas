import django_filters
from .models import Produtos, Historicos, Movimentacoes

# Filtros da tabela de produtos
class ProdutosFilters(django_filters.FilterSet):
    nome = django_filters.CharFilter(lookup_expr='icontains')
    tipo = django_filters.CharFilter(lookup_expr='icontains')
    quantidade_estoque = django_filters.NumberFilter()

    class Meta:
        model = Produtos

        fields = [
            "nome",
            "tipo",
            "quantidade_estoque",
        ]

# Filtros da tabela de históricos
class HistoricosFilters(django_filters.FilterSet):
    produto = django_filters.CharFilter(field_name="produto__nome", lookup_expr='icontains')

    class Meta:
        model = Historicos

        fields = [
            "produto",
        ]

# Filtros da tabela de movimentações
class MovimentacoesFilters(django_filters.FilterSet):
    produto = django_filters.CharFilter(field_name="produto__nome", lookup_expr='icontains')

    class Meta:
        model = Movimentacoes

        fields = [
            "produto",
        ]