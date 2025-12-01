import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

export function Cabecalho() {
    // Configuração de navegação
    const navigate = useNavigate();

    // Função de sair da conta
    function logout() {
        alert("Saindo da conta... Volte sempre!");
        localStorage.clear();
        navigate("/");
    }

    // Buscando o nome do usuário pelo localStorage
    const nomeUsuario = localStorage.getItem("nomeUsuario");

    // Cabeçalho geral do site
    return (
        <header className="cabecalho">
            <h1 className="tituloLogo">TechnoLucas</h1>
            <div className="links">
                <nav>
                    <ul className="linksPaginas">
                        <li className="linkHome" onClick={() => navigate("/home")}>
                            <i class="bi bi-house-door-fill"></i>
                            <p className="homeLink">Home</p>
                        </li>
                        <li className="linkProdutos" onClick={() => navigate("/produtos")}>
                            <i class="bi bi-box-seam-fill"></i>
                            <p>Produtos</p>
                        </li>
                        <li className="historicos">
                            <i class="bi bi-journal-text"></i>
                            <p>Históricos</p>
                        </li>
                        <li className="movimentacoes">
                            <i class="bi bi-shuffle"></i>
                            <p>Movimentações</p>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="usuarioAtual">
                <p className="nomeUsuario">{nomeUsuario}</p>
                <i class="bi bi-box-arrow-right" onClick={logout}></i>
            </div>
        </header>
    );
}