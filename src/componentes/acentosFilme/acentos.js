import styled from "styled-components"
import  {useState,useEffect}  from "react";
import axios from "axios";
import { useParams,useNavigate} from "react-router-dom";
import "../acentosFilme/estilos.css"


function AcentosListados({setIdAcento,idAcento,acentoId,acentoName,acentoIsAvailable,setNameAcento,nameAcento}){
    const[escolhido,setEscolhido] = useState(true);
    
    function selecAcento (escolhido){
        setEscolhido(!escolhido)
        setIdAcento([...idAcento,acentoId])
        setNameAcento([...nameAcento,acentoName])
    }

    function escolherAcento(escolhido){
        setEscolhido(!escolhido)
        setIdAcento(idAcento.filter((value,id) => id !== acentoId))
    }


    function acentoIndisponivel(){
        alert("Esse assento não está disponível");
    }


    return(
                   
                    acentoIsAvailable? escolhido === true ?<UnidAcentos onClick={()=> selecAcento(escolhido)}>
                                            <span>{acentoName}</span>
                                        </UnidAcentos>: <AcentoSelecionado onClick={() => escolherAcento(escolhido)}>
                                                        <span>{acentoName}</span>
                                                    </AcentoSelecionado>: <Reservado onClick={acentoIndisponivel}>
                                                                    <span>{acentoName}</span>
                                                                    </Reservado>
                   
    )
}



export default function Acentos({setDados,setDadosFilme,setNameAcento,nameAcento}){
    const[listaAcentos,setListaAcentos] = useState({});
    const[nome,setNome]= useState("");
    const[cpf,setCpf]= useState();
    const {idSessao} = useParams();
    const[idAcento,setIdAcento]= useState([]);

    let navigate = useNavigate();
  

    useEffect(() =>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`)
        promise
        .then(response =>{
            setListaAcentos({...response.data})
        }).catch(err =>{

        })
    },[])

    function reservaSessao(event){
        event.preventDefault();
        const body ={
            ids: idAcento,    
            name:nome,
            cpf
        }
        
        const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many",body);

        promise.then(response =>{
            setDados(body)
            setDadosFilme(listaAcentos)
            navigate("/sucesso")
        })

    }

    function validarAcentos(){
        if(idAcento[0] === undefined){
            alert("É necessario selecionar pelo menos um acento para validar sua reserva de acento")
            setNome("");
            setCpf("");
        }
    }

    return(
        <>
            <ConteudoAcentos>
                <TituloAcentos>
                    <span>Selecione o(s) assento(s)</span>
                </TituloAcentos>
                <TodosAcentos>
                    {
                        listaAcentos.seats?.map(value => <AcentosListados setIdAcento={setIdAcento} idAcento={idAcento} acentoId={value.id} acentoName={value.name} acentoIsAvailable={value.isAvailable} setNameAcento={setNameAcento} nameAcento={nameAcento}/>)
                    }                    
                    <IformacoesAcentos>
                        <Selecionado>
                            <div></div>
                            <span>Selecionado</span>
                        </Selecionado>
                        <Disponivel>
                            <div></div>
                            <span>Disponível</span>
                        </Disponivel>
                        <Indisponivel>
                            <div></div>
                            <span>Indisponível</span>
                        </Indisponivel>
                    </IformacoesAcentos>
                </TodosAcentos>
                <Formulario onSubmit={reservaSessao}>
                    <label htmlFor="campoNome">Nome do comprador:</label>
                    <input type="text" id="campoNome" placeholder="Digite seu nome..." value={nome} onChange={(e)=> setNome(e.target.value)} required/>
                    <label>CPF do comprador:</label>
                    <input type="number" placeholder="Digite seu CPF..." value={cpf} onChange={(e)=> setCpf(e.target.value)} required/>
                    <button type="submit" onClick={validarAcentos}>Reservar assento(s)</button> 
                </Formulario>
            </ConteudoAcentos>       
            {listaAcentos.movie === undefined? "":<RodaPe id={listaAcentos.movie.id}>
                                                    <ImageFilme>
                                                        <img src={listaAcentos.movie.posterURL} alt='image-filme'/>
                                                    </ImageFilme>
                                                    <NomeFilme>
                                                        <h1>{listaAcentos.movie.title}</h1>
                                                        <span>{listaAcentos.day.weekday} - {listaAcentos.name}</span>
                                                    </NomeFilme>
                                                 </RodaPe>}
         </>
    )
}

const ConteudoAcentos = styled.div`
    box-sizing: border-box;
    padding: 120px 25px;
`;
const TituloAcentos = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-family: 'Roboto', sans-serif;
`;
const TodosAcentos = styled.div`
    width: 100%;
    display: flex;
    margin-top: 20px;
    flex-wrap: wrap;
    padding: 10px 6px;
`;

const PaginaAnterior = styled.div`
    ion-icon{
        font-size: 35px;
        color:  lightblue;
        position: fixed;
        top: 95px;
        left: 20px;
    }
`;

const UnidAcentos = styled.div`
    width: 26px;
    height: 26px;
    margin-right: 7px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #C3CFD9;
    border: 1px solid #808F9D;
    border-radius: 50px;
    cursor: pointer;
`;

const IformacoesAcentos = styled.div`
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-family: 'Roboto', sans-serif;
`;

const Selecionado = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div{
    width: 25px;
    height: 25px;
    background: #8DD7CF;
    border: 1px solid #1AAE9E;
    margin-bottom: 10px;
    border-radius: 17px;
    }
`;
const AcentoSelecionado = styled.div`
    width: 26px;
    height: 26px;
    margin-right: 7px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center; 
    background: #8DD7CF;
    border: 1px solid #1AAE9E;
    border-radius: 50px;
    cursor: pointer;
`;

const Disponivel = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div{
    width: 25px;
    height: 25px;
    background: #C3CFD9;
    border: 1px solid #7B8B99;
    margin-bottom: 10px;
    border-radius: 17px;
    }
`;
const Indisponivel = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div{
    width: 25px;
    height: 25px;
    background: #FBE192;
    border: 1px solid #F7C52B;
    margin-bottom: 10px;
    border-radius: 17px;
    }
`;

const Reservado = styled.div`
  width: 26px;
    height: 26px;
    margin-right: 7px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FBE192;
    border: 1px solid #F7C52B;
    border-radius: 50px;
    cursor: pointer;
`;

const Formulario = styled.form`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    label{
        margin-bottom: 10px;
        margin-right: 175px;
    }

    input{
    width: 327px;
    height: 51px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 3px;
    margin-bottom: 10px;
    }
    button{
    width: 225px;
    height: 42px;
    margin-top: 30px;
    background: #E8833A;
    border-radius: 3px;
    border: none;
    font-weight: 400;
    font-size: 18px;
    color: white;
    cursor: pointer;
    }
    
`;


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