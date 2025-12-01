import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Schema de validação de cadastro
const schemaValidacaoCadastro = z.object({
    username: z.string()
        .min(3, "O campo nome deve possuir no mínimo 3 caracteres.")
        .max(30, "O campo nome não pode ultrapassar 30 caracteres.")
        .regex(
            /^[A-Za-zÀ-ÿ\s]+$/, {
                message: "O campo nome tem que possuir apenas letras.",
            },
        ),
    email: z.string()
        .min(6, "O Email deve possuir no mínimo 6 caracteres.")
        .max(255, "O email não pode ultrapassar 255 caracteres.")
        .regex(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
                message: "O email deve possuir . e @.",
        }),
    password: z.string()
        .min(8, "O campo senha tem que possuir no mínimo 8 caracteres.")
        .max(30, "O campo senha não pode ultrapassar 30 caracteres."),
    confirmPassword: z.string()
        .min(8, "O campo confirmar senha tem que possuir no mínimo 8 caracteres.")
        .max(30, "O campo confirmar senha não pode ultrapassar 30 caracteres."),
}).refine((data) => data.password === data.confirmPassword, {
    // Validando se as senhas estão iguais
    message: "As senhas não podem ser diferentes.",
    path: ["confirmPassword"],
});

export function Cadastro() {
    // Configurando a navegação
    const navigate = useNavigate();

    // Configurações do hook-form com zod
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schemaValidacaoCadastro),
    });

    // Função de cadastro do usuário
    async function cadastro(data) {
        const dadosCadastro = {
            ...data,
        }

        try {
            await axios.post("http://127.0.0.1:8000/technolucas/cadastro", dadosCadastro);
            
            alert("Cadastro realizado com sucesso!");

            paginaLogin();
        }
        catch(error) {
            alert("Houve um erro ao realizar cadastro. Verifique seus dados.");
            
            console.error("Erro ao realizar cadastro: ", error.response?.data);
        }
    }

    // Função de rota para a página de login
    function paginaLogin() {
        navigate("/");
    }

    return (
        // Página de cadastro
        <main className="paginaCadastro">
            <section className="cadastro">
                <h1 className="tituloCadastro">Faça seu cadastro aqui</h1>
                <form onSubmit={handleSubmit(cadastro)}>
                    <div className="inputNome">
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" name="nome" id="nome" placeholder="Digite seu nome..." {...register("username")} />
                        {errors.username && <p>{errors.username.message}</p>}
                    </div>
                    <div className="inputEmail">
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email" id="email" placeholder="Digite seu email..." {...register("email")} />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div className="inputSenha">
                        <label htmlFor="senha">Senha:</label>
                        <input type="password" name="senha" id="senha" placeholder="Digite sua senha..." {...register("password")} />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <div className="inputConfirmarSenha">
                        <label htmlFor="confirmarSenha">Confirmar senha:</label>
                        <input type="password" name="confirmarSenha" id="confirmarSenha" placeholder="Digite sua senha novamente..." {...register("confirmPassword")} />
                        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                    </div>
                    <div className="botaoCadastrar">
                        <button type="submit" className="botao">Cadastrar</button>
                    </div>
                    <p className="possuiLogin">Já possui uma conta? Faça seu login <u style={{ cursor: "pointer" }} onClick={() => paginaLogin}>aqui!</u></p>
                </form>
            </section>
        </main>
    );
}