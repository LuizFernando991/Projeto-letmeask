
import illustrationImg from '../assests/images/illustration.svg'
import logoImg from '../assests/images/logo.svg'
import googleIconImg from '../assests/images/google-icon.svg'
import '../styles/auth.css'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FormEvent } from 'react'
import { useState } from 'react'
import { database } from '../services/firebase'



export function Home(){
    const history = useHistory()
     
    const {user, signInWithGoogle} = useAuth()

    const [roomCode, setRoomCode] = useState('')

    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle()
        }
        history.push('/rooms/new')
    }

    async function hadleJoinRoom(event: FormEvent){
        event.preventDefault()

        if(roomCode.trim() ===''){
            return
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if(!roomRef.exists()){
            alert('A sala não existe')
            return
        }

        if(roomRef.val().endedAt){
            alert('A sala foi encerrada')
            return
        }

        history.push(`/rooms/${roomCode}`)
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
                    <button onClick={handleCreateRoom} className='create-room'>
                        <img src={googleIconImg} alt="Logo da Google" />
                        Crie sua sala com o google
                    </button>
                    <div className='separator' id='sp'>ou entre em uma sala</div>
                    <form className='form-home' onSubmit={hadleJoinRoom}>
                        <input
                        className='form_input'
                        type="text"
                        placeholder='Digite o código da sala'
                        onChange={event=>setRoomCode(event.target.value)}
                        value={roomCode}
                        />

                        <Button type = 'submit'>Entrar na sala</Button>



                    </form>
                </div>
            </main>



        </div>


    )
}