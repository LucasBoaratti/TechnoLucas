import { useEffect, useState } from "react";
import axios from "axios";

export function GestaoEstoque() {
    // Estados de controle
    const [produtos, setProdutos] = useState([]);

    // Função de produtos
    async function getProdutos() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/technolucas/produtos", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setProdutos(response.data);
        }
        catch(error) {
            console.error("Erro ao buscar os produtos: ", error.response?.data);
        }
    }

    useEffect(() => {
        getProdutos();
    }, []);
    // Página de gestão de estoque
    return (
        <main>
            <section className="paginaGestaoEstoque">
                <h1 className="tituloGestaoEstoque">Bem vindo(a) à gestão de estoque!</h1>
                <p className="explicacaoGestaoEstoque">Aqui, você vai poder escolher um pedido e escolher o tipo de movimentação entre entrada e saída, além de colocar a data dessa movimentação! :D</p>
                <p className="explicacaoTabela">Veja a tabela de produtos abaixo e escolha a movimentação.</p>
                <table className="tabelaProdutos">
                    <thead className="cabecalhoTabela">
                        <tr>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Quantidade em estoque</th>
                            <th>Preço</th>
                            <th>Descrição</th>
                            <th>Responsável</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody className="corpoTabela">
                    {produtos.map((produto, index) => (
                        <tr key={index}>
                            <td>{produto.nome}</td>
                            <td>{produto.tipo}</td>
                            <td>{produto.quantidade_estoque}</td>
                            <td>{produto.preco}</td>
                            <td>{produto.descricao}</td>
                            <td>{produto.responsavel_nome}</td>
                            <td className="acoes">
                                <i className="bi bi-box-arrow-down" style={{ marginRight: "15px" }} onClick={() => {
                                    // Passando as informações dos produtos para a página de edição de produtos
                                    localStorage.setItem("idProduto", produto.id);
                                    localStorage.setItem("nomeProduto", produto.nome);
                                    localStorage.setItem("tipoProduto", produto.tipo);
                                    localStorage.setItem("quantidadeProduto", produto.quantidade_estoque);
                                    localStorage.setItem("precoProduto", produto.preco);
                                    localStorage.setItem("descricaoProduto", produto.descricao);
                                    localStorage.setItem("responsavelProduto", produto.responsavel);
                                    navigate("/editarProdutos");
                                }}></i>
                                <i className="bi bi-box-arrow-in-down" onClick={() => {
                                    localStorage.setItem("idProduto", produto.id);
                                    setDeletarProdutoModal(true);
                                }}></i>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}