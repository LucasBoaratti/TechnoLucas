import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios"

// Validação de edição de produtos
const schemaEdicaoProdutos = z.object({
    nome: z.string()
        .min(1, "O campo nome não pode ser vazio.")
        .max(50, "O campo nome não pode ultrapassar 50 caracteres."),
    tipo: z.enum(["Notebook", "Smartfone", "SmartTV"])
        .refine((value) => value !== "Selecione...", {
            message: "Escolha ao menos um tipo, por favor.",
        }),
    quantidade_estoque: z.number(),
    preco: z.number(),
    descricao: z.string()
        .min(1, "O campo descrição não pode ser vazio."),
    responsavel_username: z.string()
        .min(1, "O campo responsável não pode ser vazio.")
        .max(30, "O campo responsável não pode ultrapassar 30 caracteres."),
});

export function EditarProdutos() {
    // Configurando a navegação
    const navigate = useNavigate();

    // Configurações do hook-form com o zod
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schemaEdicaoProdutos),
    });

    // Função de edição de produto
    async function editarProdutos(data) {
        const dadosProdutos = {
            ...data,
        }

        const token = localStorage.getItem("tokenUsuario");
        // Buscando o ID do produto
        const idProduto = localStorage.getItem("idProduto");

        try {
            await axios.post(`http://127.0.0.1:8000/technolucas/produtos/${idProduto}`, dadosProdutos, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            alert("Produto criado com sucesso!");

            navigate("/produtos");
        }
        catch(error) {
            alert("Houve um erro ao criar o produto... Tente novamente.");

            console.error("Erro ao criar produto: ", error.response?.data);
        }
    }

    // Usando o useEffect para renderizar as informações
    useEffect(() => {
        setValue("nome", localStorage.getItem("nomeProduto") || "");
        setValue("tipo", localStorage.getItem("tipoProduto") || "");
        setValue("quantidade_estoque", Number(localStorage.getItem("quantidadeProduto")) || 0);
        setValue("preco", Number(localStorage.getItem("precoProduto")) || 0);
        setValue("descricao", localStorage.getItem("descricaoProduto") || "");
        setValue("responsavel_username", localStorage.getItem("responsavelProduto") || "");
    }, []);

    return (
        // Página de editar produtos
        <main>
            <section className="paginaEditarProdutos">
                <form className="formularioProdutos" onSubmit={handleSubmit(editarProdutos)}>
                    <h1 className="tituloEditarProdutos">Edite seu produto aqui</h1>
                    <div className="inputNome">
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" name="nome" id="nome" placeholder="Digite o nome do produto..." {...register("nome")} />
                        {errors.nome && <p>{errors.nome.message}</p>}
                    </div>
                    <div className="selectTipo">
                        <label htmlFor="tipo">Tipo:</label>
                        <select name="tipo" id="tipo" {...register("tipo")}>
                            <option value="Selecione...">Selecione...</option>
                            <option value="Notebook">Notebook</option>
                            <option value="Smartfone">Smartfone</option>
                            <option value="SmartTV">SmartTV</option>
                        </select>
                        {errors.tipo && <p>{errors.tipo.message}</p>}
                    </div>
                    <div className="inputQuantidade">
                        <label htmlFor="quantidade">Quantidade:</label>
                        <input type="number" name="quantidade" id="quantidade" placeholder="Digite a quantidade..." {...register("quantidade_estoque", {valueAsNumber: true})} />
                        {errors.quantidade_estoque && <p>{errors.quantidade_estoque.message}</p>}
                    </div>
                    <div className="inputPreco">
                        <label htmlFor="preco">Preço:</label>
                        <input type="text" name="preco" id="preco" placeholder="Digite o preço..." {...register("preco", {valueAsNumber: true})} />
                        {errors.preco && <p>{errors.preco.message}</p>}
                    </div>
                    <div className="inputDescricao">
                        <label htmlFor="descricao">Descrição</label>
                        <textarea name="descricao" id="descricao" placeholder="Descreva o produto..." {...register("descricao")}></textarea>
                        {errors.descricao && <p>{errors.descricao.message}</p>}
                    </div>
                    <div className="inputResponsavel">
                        <label htmlFor="responsavel">Responsável:</label>
                        <input type="text" name="responsavel" id="responsavel" placeholder="Digite o nome do responsável..." {...register("responsavel_username")} />
                        {errors.responsavel_username && <p>{errors.responsavel_username.message}</p>}
                    </div>
                    <div className="botaoEditar">
                        <button type="submit" className="botao">Editar</button>
                    </div>
                </form>
            </section>
        </main>
    );
}