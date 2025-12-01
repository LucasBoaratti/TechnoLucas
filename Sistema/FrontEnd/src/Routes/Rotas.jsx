import { Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login";
import { Cadastro } from "../Pages/Cadastro";
import { Index } from "../Pages/Index";
import { Home } from "../Pages/Home";
import { Produtos } from "../Pages/Produtos";
import { CriarProdutos } from "../Pages/CriarProdutos";
import { EditarProdutos } from "../Pages/EditarProdutos";
import { GestaoEstoque } from "../Pages/GestaoEstoque";

export function Rotas() {
    // Rotas do site
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/cadastro" element={<Cadastro/>}/>
            <Route path="/home" element={<Index/>}>
                <Route index element={<Home/>}/>
            </Route>
            <Route path="/produtos" element={<Index/>}>
                <Route index element={<Produtos/>}/>
            </Route>
            <Route path="/criarProdutos" element={<Index/>}>
                <Route index element={<CriarProdutos/>}/>
            </Route>
            <Route path="/editarProdutos" element={<Index/>}>
                <Route index element={<EditarProdutos/>}/>
            </Route>
            <Route path="/gestaoEstoque" element={<Index/>}>
                <Route index element={<GestaoEstoque/>}/>
            </Route>
        </Routes>
    );
}