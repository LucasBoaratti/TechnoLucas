from rest_framework import serializers
from .models import Produtos, Historicos, Movimentacoes, Usuarios

# Serializer de login do usuário
class LoginUsuarioSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True) # write_only nesse campo: Evita com a que a senha criptografada seja exibida no JSON

# Serializer de cadastro do usuário
class CadastroUsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    # Criando um novo campo de confirmar senha
    confirmPassword = serializers.CharField(write_only=True)

    # Definindo os campos nome e senha para serem transformados em JSON, para o cadastro do usuário
    class Meta:
        model = Usuarios

        fields = [
            "username",
            "password",
            "confirmPassword",
        ]
    
    # Função que valida se os campos de senha e confimar senha coincidem
    def validate(self, data):
        if data["password"] != data["confirmPassword"]:
            raise serializers.ValidationError('As senhas estão diferentes. Corrige-as, por favor.')
        return data

    # Função que cria os novos usuários
    def create(self, validated_data):
        validated_data.pop("confirmPassword") # Remove o campo de confirmar senha

        novoUsuario = Usuarios(
            username=validated_data["username"],
        )

        novoUsuario.set_password(validated_data["password"])
        novoUsuario.save()

        return novoUsuario

# Serializer da tabela de produtos
class ProdutosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produtos

        fields = "__all__"
    
# Serializer da tabela de históricos
class HistoricoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historicos

        fields = "__all__"

# Serializer da tabela de movimentações
class MovimentacoesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movimentacoes

        fields = "__all__"