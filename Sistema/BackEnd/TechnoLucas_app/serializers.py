from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Produtos, Historicos, Movimentacoes, Usuarios

# Serializer de login do usuário
class LoginUsuarioSerializer(TokenObtainPairSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True) # write_only nesse campo: Evita com a que a senha criptografada seja exibida no JSON

    def validate(self, attrs):
        data = super().validate(attrs)

        data["username"] = self.user.username
        data["email"] = self.user.email

        return data

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
    # Pegando o nome do responsável pelo ID do mesmo (campo de leitura)
    responsavel_nome = serializers.CharField(source="responsavel.username", read_only=True)
    # Campo de saída
    responsavel_username = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Produtos

        fields = [
            "id",
            "nome",
            "tipo",
            "quantidade_estoque",
            "preco",
            "descricao",
            "responsavel",
            "responsavel_nome",
            "responsavel_username",
        ]
        extra_kwargs = {
            "responsavel": {
                "read_only": True,
            },
        }

    # Função que transforma o valor da chave primária (número) em string para o nome do usuário
    def create(self, validated_data):
        username = validated_data.pop("responsavel_username", None)
        if username:
            usuario = Usuarios.objects.get(username=username)
            validated_data["responsavel"] = usuario
        
        return super().create(validated_data)
    
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
        read_only_fields = ("responsavel", "produto")