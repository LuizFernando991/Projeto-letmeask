
import illustrationImg from '../assests/images/illustration.svg'
import logoImg from '../assests/images/logo.svg'
import '../styles/auth.css'
import Button from '../components/Button'
import {Link, useHistory} from 'react-router-dom'
import { FormEvent } from 'react'
import { useState } from 'react'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'




export function NewRoom(){
    
    const {user} = useAuth()

    const history = useHistory()

    const [newRoom, setNewRoom] = useState('')
    
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()

        if(newRoom.trim() === ''){
            return
        }

        const roomRef = database.ref('rooms')  //criando uma referência para a informação

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        }
        )

        history.push(`/rooms/${firebaseRoom.key}`)
    }
    
    return(

        <div id='page-auth'>

            <aside>
                <img src={illustrationImg} alt='Ilustração simbolizando perguntas e respostas'></img>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>



            </aside>

            <main>
                <div className='main-content'>
                    <img className='img_logo' src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form className='form-home' onSubmit={handleCreateRoom}>
                        <input
                        className='form_input'
                        type="text"
                        placeholder='Nome da sala'
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}
                        />

                        <Button type = 'submit'>Criar sala</Button>

                    </form>
                    <p className='p-entrar'>Quer entrar em uma sala que já existe? <Link to='/'>Clique aqui</Link></p>
                </div>
            </main>



        </div>
    )}
