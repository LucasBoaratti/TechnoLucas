from django.contrib import admin
from .models import Produtos, Historicos, Movimentacoes

# Register your models here.

# Registrando as tabelas na página de admin do django
admin.site.register(Produtos)
admin.site.register(Historicos)
admin.site.register(Movimentacoes)