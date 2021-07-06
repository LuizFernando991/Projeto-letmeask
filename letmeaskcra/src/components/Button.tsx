import {ButtonHTMLAttributes} from 'react'
import '../styles/Button.css'


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
}

export default function Button({ isOutlined = false, ...props }: ButtonProps){

    return(
        <button className={`button ${isOutlined? 'outlined':''}`} {...props}></button>
    )



}