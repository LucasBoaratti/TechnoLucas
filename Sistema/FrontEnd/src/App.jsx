import './Styles/Main.scss'; // Importando o arquivo principal dos SCSS para usar no site
import { Rotas } from "./Routes/Rotas";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <div className="opacidade"/>
      <BrowserRouter>
        <Rotas/>
      </BrowserRouter>
    </>
  );
}

export default App;