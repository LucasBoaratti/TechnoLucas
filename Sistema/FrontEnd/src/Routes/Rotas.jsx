import { Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login";
import { Cadastro } from "../Pages/Cadastro";
import { Index } from "../Pages/Index";
import { Home } from "../Pages/Home";
import { Produtos } from "../Pages/Produtos";

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
        </Routes>
    );
}