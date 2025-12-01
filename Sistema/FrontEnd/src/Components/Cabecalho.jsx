import "bootstrap-icons/font/bootstrap-icons.css";  

export function Cabecalho() {
    // Cabeçalho geral do site
    return (
        <header className="cabecalho">
            <h1 className="tituloLogo">TechnoLucas</h1>
            <div className="links">
                <nav>
                    <ul className="linksPaginas">
                        <li className="home">
                            <i class="bi bi-house-door-fill"></i>
                            <p>Home</p>
                        </li>
                        <li className="produtos">
                            <i class="bi bi-box-seam-fill"></i>
                            <p>Produtos</p>
                        </li>
                        <li className="historico">
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
                <p className="nomeUsuario">Lucas</p>
                <i class="bi bi-box-arrow-right"></i>
            </div>
        </header>
    );
}