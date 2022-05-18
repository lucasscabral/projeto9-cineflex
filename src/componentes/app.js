import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topo from "./cabecalho/topo";
import ListaFilmes from "./ListarFilmes/listaFilmes";
import Filme from "./SessaoFilme/filme";
import "../resetEstilos/estilos.css"
import "../resetEstilos/reset.css";



export default function App(){
    return(
        <BrowserRouter>
            <Topo />
            <Routes>
                <Route path="/" element={<ListaFilmes />}/>
                <Route path="/filme" element={<Filme />}/>
            </Routes>
        </BrowserRouter>
    )
}