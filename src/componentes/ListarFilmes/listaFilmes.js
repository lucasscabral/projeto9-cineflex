import axios from 'axios';
import {useState,useEffect, useDebugValue} from 'react';
import "../ListarFilmes/estilos.css"

function TodosFilmes ({idFilme, urlImage}){
    return( 
         <div className="filmes" id={idFilme}>
                    <img src={urlImage} alt="filme"/>
         </div>
           
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
        <div className='conteudo-filmes'>
            <div className='titulo-selecionar-filmes'>
                <span>Selecione o filme</span>
            </div>
            <div className="lista-todos-filmes">

              {
                  todosFilmes.map(filmes => <TodosFilmes  idFilme={filmes.id} urlImage={filmes.posterURL}/>)
              }  
            
            </div>

        </div>
    )


}