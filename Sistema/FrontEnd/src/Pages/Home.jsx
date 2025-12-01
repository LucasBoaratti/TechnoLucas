import Notebook from "../assets/Images/Notebook.png";
import Celular from "../assets/Images/Celular.png";
import TV from "../assets/Images/TV.png";

export function Home() {
    return (
        <main>
            <section className="home">
                <h1 className="boasVindas">Olá, seja bem-vindo(a) à TechnoLucas!</h1>
                <p className="explicacao">Aqui nós trabalhamos com diversos produtos eletrônicos, com cada um deles tendo seu histórico e movimentações de entrada e saída. Aproveite o site e venha ver nossos produtos!</p>
                <h2 className="produtos">Veja aqui quais são os tipos de produtos que nossa loja trabalha :D</h2>
                <div className="tipoProdutos">
                    <div className="produtosImagem">
                        <div className="notebook">
                            <img src={Notebook} alt="Notebook" />
                            <p>Notebooks</p>
                        </div>
                        <div className="smartphones">
                            <img src={Celular} alt="Celular" />
                            <p>Celulares</p>
                        </div>
                        <div className="smartTVs">
                            <img src={TV} alt="Televisão" />
                            <p>SmartTVs</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}