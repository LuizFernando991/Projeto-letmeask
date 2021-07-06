import {useHistory, useParams} from 'react-router-dom'
import logoImg from '../assests/images/logo.svg'
import Button from '../components/Button'
import '../styles/room.css'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'
import deleteImg from '../assests/images/delete.svg'
import { database } from '../services/firebase'

type RoomParams={
    id: string;
}




export function AdminRoom(){
    
    //const {user} = useAuth()
    const params = useParams<RoomParams>()
    const roomId = params.id
    const {title, questions} = useRoom(roomId)
    const history = useHistory()

    async function handleDeleteQuestion(questionId: string){
       if (window.confirm('Tem certeza que deseja excluir essa pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
       }
    }

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/')
    }

    return(
        <div id='page-room'>
            <header>
                <div className='content'>
                    <img src={logoImg} alt='Letmeask'/>
                    <div className='codigo-button'>
                        <RoomCode code= {roomId}/>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <div className='content-main'>
                <div className='room-title'>
                    <h1>Sala: {title}</h1>
                    {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {questions.slice(0).reverse().map(question => {return(
                        <Question 
                        key={question.id} //Importante passar o que tem de unico do item, no caso o id, por que o react precisa localizar pra não renderizar toda a lista quando for excluido
                        content={question.content} 
                        author={question.author}>
                            <button type='button' onClick={()=> handleDeleteQuestion(question.id)}>
                                <img src={deleteImg} alt='Remover pergunta'/>
                            </button>
                        
                        </Question>
                    )})}
                </div>

            </div>
        </div>
    )
}