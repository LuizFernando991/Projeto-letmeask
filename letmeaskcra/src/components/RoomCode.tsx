import copyImg from '../assests/images/copy.svg'
import '../styles/room-code.css'
import toast, { Toaster } from 'react-hot-toast'


type RoomCodeProps = {
    code: string;
}


export function RoomCode(props: RoomCodeProps){

    const notify = () => toast.success('Código copiado!')

    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code)
        notify()
    }

    return(
        <div>
            <button className='room-code' onClick={copyRoomCodeToClipboard}>
                <div className='room-code-div'>
                    <img src={copyImg} alt='Copy room code'></img>
                </div>
                <span>Sala #{props.code}</span>
            </button>
            <Toaster/>
        </div>
    )
}