import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

// Schema de validação do login
const schemaLogin = z.object({
    username: z.string()
        .min(3, "O campo nome tem que possuir no mínimo 3 caracteres.")
        .max(30, "O campo nome não pode ultrapassar 30 caracteres.")
        .regex(
            /^[A-Za-zÀ-ÿ\s]+$/, {
                message: "O campo nome tem que possuir apenas letras.",
            },
        ),
    password: z.string()
        .min(8, "O campo senha tem que possuir no mínimo 8 caracteres.")
        .max(30, "O campo senha não pode ultrapassar 30 caracteres."),
});

export function Login() {
    // Configurando a navegação
    const navigate = useNavigate();

    // Configurações do hook-form com o zod
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schemaLogin),
    });

    // Função de login
    async function login(data) {
        const dadosLogin = {
            ...data,
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/technolucas/login", dadosLogin);

            // Salvando o nome do usuário no localStorage
            const { nome } = response.data;
            localStorage.setItem("nomeUsuario", nome);

            alert("Login realizado com sucesso. Seja bem-vindo(a)!");

            navigate("/home");
        }
        catch(error) {
            console.error("Erro ao realizar o login: ", error.response?.data);

            alert("Houve um erro no cadastro. Verifique seus dados.");
        }
    }

    // Função que navega para a página de cadastro
    function paginaCadastro() {
        navigate("/cadastro");
    }

    return (
        // Página de login
        <main className="paginaLogin">
            <section className="login">
                <h1 className="tituloBoasVindas">Seja bem-vindo(a) à TechnoLucas!</h1>
                <form onSubmit={handleSubmit(login)}>
                    <div className="inputNome">
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" name="nome" id="nome" placeholder="Digite seu nome..." {...register("username")} />
                        {errors.username && <p style={{ color: "white" }}>{errors.username.message}</p>}
                    </div>
                    <div className="inputSenha">
                        <label htmlFor="senha">Senha:</label>
                        <input type="password" name="senha" id="senha" placeholder="Digite sua senha..." {...register("password")} />
                        {errors.password && <p style={{ color: "white", marginBottom: "1.875rem" }}>{errors.password.message}</p>}
                    </div>
                    <div className="botaoEntrar">
                        <button type="submit" className="botao">Entrar</button>
                    </div>
                    <div className="cadastrar">
                        <p>Ainda não tem conta? Cadastre-se <u onClick={paginaCadastro}>aqui!</u></p>
                    </div>
                </form>
            </section>
        </main>
    );
}