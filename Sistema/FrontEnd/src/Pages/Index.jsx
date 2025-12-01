import { Cabecalho } from "../Components/Cabecalho";
import { Outlet } from "react-router-dom";
import { Rodape } from "../Components/Rodape";

export function Index() {
    return (
        // Estrutura do site
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}>
                <Cabecalho/>
                <div style={{ flex: "1" }}>
                    <Outlet/>
                </div>
                <Rodape/>
            </div>
        </>
    );
}