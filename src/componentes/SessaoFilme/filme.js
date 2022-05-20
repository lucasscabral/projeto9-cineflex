import styled from 'styled-components';
import "../SessaoFilme/estilos.css"
import {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Horarios ({filmeId,dia,data,sessoes}){
    return(
            
                                        <HorariosSessoes id= {filmeId}>
                                            <span>{dia} - {data}</span>
                                            <BotoesSessoes >
                                                {
                                                    sessoes.map(value =>   <Link to={`/assentos/${value.id}`}>
                                                                                <Botoes >
                                                                                        <span>{value.name}</span>
                                                                                </Botoes>
                                                                            </Link>)
                                                }
                                            </BotoesSessoes>
                                        </HorariosSessoes>
        
    )
}


export default function Filme(){
    const[filmeSelec,setFilmeSelec] = useState({});
    const {idFilme} = useParams();

    useEffect(()=>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);
        promise.then(response =>{
            
            setFilmeSelec({...response.data});
            
        })
    },[])
         console.log(filmeSelec)

    return(
        <>
        <ConteudoHorarios>
            <TituloSelecionarHorario>
                <span>Selecione o horário</span>
            </TituloSelecionarHorario>
            {
               filmeSelec.days?.map((value,index) => <Horarios key={index} filmeId={value.id} dia={value.weekday} data={value.date} sessoes={value.showtimes}/>)
            }
        </ConteudoHorarios>
        <RodaPe id={filmeSelec.id}>
            <ImageFilme>
                <img src={filmeSelec.posterURL} alt='image-filme'/>
            </ImageFilme>
            <NomeFilme>
                <h1>{filmeSelec.title}</h1>
            </NomeFilme>
        </RodaPe>
        </>
    )
}


const ConteudoHorarios = styled.div`
    height: 100%;
    box-sizing: border-box;
    padding: 0 25px;
    padding-top: 70px;
    padding-bottom: 140px;
`;

const TituloSelecionarHorario = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-family: 'Roboto', sans-serif;
`;

const HorariosSessoes = styled.div`
    margin-top: 25px;
    font-family: 'Roboto', sans-serif;
`;

const BotoesSessoes = styled.div`
    display: flex;
`;

const Botoes = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 83px;
    height: 43px;
    background-color: #E8833A;
    border-radius: 3px;
    color: #FFFFFF;
    margin-right: 10px;
    margin-top: 20px;
    cursor: pointer;
    &:hover{
    background-color: #eb9e67;
    }
`;

// RODA PE

const RodaPe = styled.div`
    width:100%;
    padding: 10px;
    box-sizing: border-box;
    background: #DFE6ED;
    border: 1px solid #9EADBA;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    font-family: 'Roboto', sans-serif;
    display: flex;
    align-items: center;
`;

const ImageFilme = styled.div`
    width: 64px;
    height: 89px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
    width: 50px;
    height: 75px;
    }
`;

const NomeFilme = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-left: 15px;
    font-weight: 400;
    font-size: 20px;
    h1{
    width: 100%;
    font-weight: 400;
    font-size: 20px;
    margin-bottom: 15px;
    }
    span{
        width: 100%;
    }
`;
