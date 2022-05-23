import axios from 'axios';
import {useState,useEffect} from 'react';
import "../ListarFilmes/estilos.css"
import styled from 'styled-components';
import { Link } from "react-router-dom";


function TodosFilmes ({idFilme, urlImage}){
    return( 
        <Link to={`/filme/${idFilme}`}>
            <Filmes>
                        <img src={urlImage} alt="filme"/>
            </Filmes>
        </Link>
    )
}



export default function ListaFilmes(){
    const[todosFilmes,setTodosFilmes]= useState([])

    useEffect(() =>{
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promise.then(response => {
            setTodosFilmes([...response.data])
            
        });
    },[]);
 

    return(
        <ConteudoFilme>
            <TituloSelecionarFilmes>
                <span>Selecione o filme</span>
            </TituloSelecionarFilmes>
            <ListaTodosFilmes>

              {
                  todosFilmes.map((filmes,index) => <TodosFilmes key={index} idFilme={filmes.id} urlImage={filmes.posterURL}/>)
              }  
            
            </ListaTodosFilmes>

        </ConteudoFilme>
    )


}

const ConteudoFilme = styled.div`
    box-sizing: border-box;
    padding: 90px 25px;
`;
const TituloSelecionarFilmes = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-family: 'Roboto', sans-serif;
`;
const ListaTodosFilmes = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
const Filmes = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 145px;
    height: 209px;
    margin-right: 30px;
    margin-top: 15px;
    box-sizing: border-box;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    cursor: pointer;
    &:hover{
    background-color: rgb(192, 203, 212);
    }
    img{
    width: 129px;
    height: 193px;
    }
`;