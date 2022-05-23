import styled from "styled-components"
import { useNavigate } from "react-router-dom";

export default function Sucesso({dados,dadosFilme,nameAcento}){
    let numberArray = nameAcento.map(Number);
    numberArray.sort((a,b) => a - b) // funcao para ordernar de forma crescente os acentos

    let navigate = useNavigate();

    function voltarHome(){
        navigate("/");
    }
    
    return(
        <>
            <ConteudoSucesso>
                <TituloSucesso>
                    <h1>Pedido feito com sucesso!</h1>
                </TituloSucesso>
                <FilmeSessao>
                    <h2>Filme e sessão</h2>
                    <span>{dadosFilme.movie.title}</span>
                    <span>{dadosFilme.day.date} {dadosFilme.name}</span>
                </FilmeSessao>
                <Ingressos>
                    <h2>Ingressos</h2>
                    {
                        numberArray.map(value => <span>Assento {value}</span>)
                    }
                </Ingressos>
                <Comprador>
                    <h2>Comprador</h2>
                    <span>Nome: {dados.name}</span>
                    <span>CPF: {dados.cpf}</span>
                </Comprador>
                <Botao>
                    <button onClick={voltarHome}>Voltar pra Home</button>
                </Botao>
            </ConteudoSucesso>
        </>
    )
}


const ConteudoSucesso = styled.div`
    box-sizing: border-box;
    padding: 120px 25px;
    font-family: 'Roboto', sans-serif;
    h2{
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 15px;
    }
    span{
    font-weight: 400;
    font-size: 22px;
    }
`;
const TituloSucesso = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    color: #247A6B;
    align-items: center;
    font-weight: 700;
    font-size: 24px;  
   
`;
const FilmeSessao = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 35px;
    margin-top: 50px;
`;
const Ingressos = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 35px;
`;
const Comprador = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 35px;
`;

const Botao = styled.div`
    width: 100%;
    display: flex;
    margin-top: 100px;
    justify-content: center;
    align-items: center;
    button{
        width: 225px;
        height: 42px;
        background: #E8833A;
        border-radius: 3px;
        border: none;
        font-weight: 400;
        font-size: 18px;
        color: white;
        cursor: pointer;
    }
`;