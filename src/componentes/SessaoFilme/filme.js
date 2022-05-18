import "../SessaoFilme/estilos.css"

export default function Filme(){
    return(
        <div className="conteudo-horarios">
            <div className="titulo-selecionar-horario">
                <span>Selecione o horário</span>
            </div>
            <div className="horarios-sessoes">
                <span>Quinta-feira - 24/06/2021</span>
                <div className="botoes-sessoes">
                    <div className="botoes">
                        <span>15:00</span>
                    </div>
                    <div className="botoes">
                        <span>19:00</span>
                    </div>
                </div>
            </div>
            <div className="horarios-sessoes">
                <span>Sexta-feira - 25/06/2021</span>
                <div className="botoes-sessoes">
                    <div className="botoes">
                        <span>15:00</span>
                    </div>
                    <div className="botoes">
                        <span>19:00</span>
                    </div>
                </div>
            </div>
        </div>
    )
}