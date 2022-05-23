import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topo from "./cabecalho/topo";
import ListaFilmes from "./ListarFilmes/listaFilmes";
import Filme from "./SessaoFilme/filme";
import Acentos from "./acentosFilme/acentos";
import Sucesso from "./SucessoSessao/sucesso";
import "../resetEstilos/estilos.css"
import "../resetEstilos/reset.css";
import React from "react";


export default function App(){
    const[dados,setDados] = React.useState();
    const[dadosFilme,setDadosFilme] = React.useState();
    const[nameAcento,setNameAcento] = React.useState([]);

    return(
        <BrowserRouter>
            <Topo />
            <Routes>
                <Route path="/" element={<ListaFilmes />}/>
                <Route path="/filme/:idFilme" element={<Filme />}/>
                <Route path="/assentos/:idSessao" element={<Acentos setDados={setDados} setDadosFilme={setDadosFilme} setNameAcento={setNameAcento} nameAcento={nameAcento}/>}/>
                <Route path="/sucesso" element={<Sucesso dados={dados} dadosFilme={dadosFilme} nameAcento={nameAcento}/>}/>
            </Routes>
        </BrowserRouter>
    )
}