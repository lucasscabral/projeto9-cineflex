import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topo from "./cabecalho/topo";
import ListaFilmes from "./ListarFilmes/listaFilmes";
import Filme from "./SessaoFilme/filme";
import Acentos from "./acentosFilme/acentos";
import "../resetEstilos/estilos.css"
import "../resetEstilos/reset.css";




export default function App(){
    return(
        <BrowserRouter>
            <Topo />
            <Routes>
                <Route path="/" element={<ListaFilmes />}/>
                <Route path="/filme/:idFilme" element={<Filme />}/>
                <Route path="/assentos/:idSessao" element={<Acentos />}/>
            </Routes>
        </BrowserRouter>
    )
}