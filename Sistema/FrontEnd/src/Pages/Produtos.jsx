import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DeletarProdutosModal } from "../Components/DeletarProdutosModal";
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios";

export function Produtos() {
    // Estados de controle
    const [produtos, setProdutos] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [deletarProdutoModal, setDeletarProdutoModal] = useState(false);

    // Configuração de navegação
    const navigate = useNavigate();

    // Pegando o token do usuário com localStorage
    const token = localStorage.getItem("tokenUsuario");

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

    // Função para buscar os produtos pelo nome
    async function buscarProdutos() {
        try {
            let url = "http://127.0.0.1:8000/technolucas/produtos";

            if (pesquisa.trim() !== "") {
                const nomeProduto = encodeURIComponent(pesquisa.trim());
                url = `http://127.0.0.1:8000/technolucas/produtos?nome=${nomeProduto}`;
            }

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });

            setProdutos(response.data);
        }
        catch(error) {
            console.error("Erro ao buscar os produtos pelo nome: ", error.response?.data);
        }
    }

    // Exibindo os produtos após a renderização
    useEffect(() => {
        getProdutos();

        // Verificando se o campo de pesquisa de nome de produto está sendo apagado para exibir os dados
        if (pesquisa.trim() !== "") {
            getProdutos();
        }
        else {
            buscarProdutos();
        }
    }, [pesquisa]);

    // Página de produtos
    return (
        <main>
            <section className="produtos">
                <h1 className="tituloProdutos">Veja os produtos do site aqui nessa tabela :D</h1>
                <div className="barraTabela">
                    <div className="barraPesquisa">
                        <input type="text" name="pesquisa" id="pesquisa" placeholder="Busque um produto..." value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                buscarProdutos();
                            }
                        }} />
                        <button type="button" className="botaoProduto" onClick={buscarProdutos}>Buscar</button>
                        <button type="button" className="botaoCriarProduto" onClick={() => navigate("/criarProdutos")}>Criar Produto</button>
                    </div>
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
                                    <i className="bi bi-pencil-square" style={{ marginRight: "15px" }} onClick={() => {
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
                                    <i className="bi bi-trash-fill" onClick={() => {
                                        localStorage.setItem("idProduto", produto.id);
                                        setDeletarProdutoModal(true);
                                    }}></i>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <DeletarProdutosModal openModal={deletarProdutoModal} closeModal={() => setDeletarProdutoModal(false)} getProdutos={getProdutos}/>
            </section>
        </main>
    );
}