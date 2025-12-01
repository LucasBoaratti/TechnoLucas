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
            </div>
        </>
    );
}