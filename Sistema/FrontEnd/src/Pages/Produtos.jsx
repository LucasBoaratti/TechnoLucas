import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Produtos() {
    // Estados de controle
    const [produtos, setProdutos] = useState([]);

    // Configuração de navegação
    const navigate = useNavigate();

    // Função de produtos
    async function getProdutos() {
        // Pegando o token do usuário com localStorage
        const token = localStorage.getItem("tokenUsuario");
        
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

    // Exibindo os produtos após a renderização
    useEffect(() => {
        getProdutos();
    }, []);

    // Página de produtos
    return (
        <main>
            <section className="produtos">
                <h1 className="tituloProdutos">Veja os produtos do site aqui nessa tabela :D</h1>
                <table className="tabelaProdutos">
                    <thead className="cabecalhoTabela">
                        <tr>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Quantidade em estoque</th>
                            <th>Preço</th>
                            <th>Descrição</th>
                            <th>Responsável</th>
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
                            <td>{produto.responsavel}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}