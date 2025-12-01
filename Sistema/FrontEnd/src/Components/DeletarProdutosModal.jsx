import axios from "axios";

export function DeletarProdutosModal({ openModal, closeModal, getProdutos }) {
    // Evitando o aparecimento instantâneo do modal
    if (!openModal) {
        return null;
    }

    // Função de deletar o produto
    async function deletarProduto() {
        const token = localStorage.getItem("tokenUsuario");
        const idProduto = localStorage.getItem("idProduto");
        
        try {
            await axios.delete(`http://127.0.0.1:8000/technolucas/produtos/${idProduto}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            alert("Produto deletado com sucesso!");

            closeModal();

            getProdutos();
        }
        catch(error) {
            alert("Não foi possível deletar o produto. Tente novamente.");

            console.error("Erro ao deletar o produto: ", error.response?.data);
        }
    }

    return (
        // Modal de deletar produtos
        <section className="containerModal">
            <div className="modalDeletarProduto">
                <h1 className="tituloEscolha">Tem certeza que deseja deletar esse produto?</h1>
                <div className="botoesEscolha">
                    <button type="button" onClick={deletarProduto} className="botaoEscolha">Sim</button>
                    <button type="button" onClick={closeModal} className="botaoEscolha">Não</button>
                </div>
            </div>
        </section>
    );
}