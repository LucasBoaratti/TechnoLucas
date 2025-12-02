import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

// Schema de validação dos campos de movimentação
const schemaMovimentacao = z.object({
    quantidade_produtos: z.number(),
    tipo_movimentacao: z.enum(["Entrada", "Saida"]),
});

export function MovimentacaoModal({ openModal, closeModal, getProdutos, produtoSelecionado }) {
    // Configurações do hook-form com o zod
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schemaMovimentacao),
    });

    // Evitando o aparecimento instantâneo do modal
    if (!openModal) {
        return null;
    }

    // Função de operação entrada/saída
    async function postMovimentacoes(data) {
        const dadosEntrada = {
            quantidade_produtos: data.quantidade_produtos,
            tipo_movimentacao: data.tipo_movimentacao,
            produto: produtoSelecionado.id,
        }

        const token = localStorage.getItem("tokenUsuario");

        try {
            await axios.post("http://127.0.0.1:8000/technolucas/movimentacoes", dadosEntrada, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            alert("Movimentação realizada com sucesso!");

            closeModal();

            getProdutos();
        }
        catch(error) {
            alert("Não foi possível realizar a movimentação. Tente novamente.");

            console.error("Erro ao realizar a operação: ", error.response?.data);
        }
    }

    return (
        // Modal de entrada de produtos
        <section className="modalContainer">
            <div className="modalEntrada">
                <h1 className="tituloEntrada">Entrada de produtos</h1>
                <form onSubmit={handleSubmit(postMovimentacoes)}>
                    <div className="inputQuantidade">
                        <label htmlFor="quantidade">Quantidade:</label>
                        <input type="text" name="quantidade" id="quantidade" placeholder="Digite a quantidade de produtos..." {...register("quantidade_produtos", {valueAsNumber: true})} />
                        {errors.quantidade_produtos && <p>{errors.quantidade_produtos.message}</p>}
                    </div>
                    <div className="inputMovimentacao">
                        <label htmlFor="movimentacao">Data da entrada:</label>
                        <select name="movimentacao" id="movimentacao" {...register("tipo_movimentacao")}>
                            <option value="Entrada">Entrada</option>
                            <option value="Saida">Saida</option>
                        </select>
                        {errors.tipo_movimentacao && <p>{errors.tipo_movimentacao.message}</p>}
                    </div>
                    <div className="botoesEscolha">
                        <button type="submit" className="botoes">Confirmar</button>
                        <button type="button" className="botoes" onClick={closeModal}>Sair</button>
                    </div>
                </form>
            </div>
        </section>
    );
}