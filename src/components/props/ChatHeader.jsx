import './ChatHeader.css'
import LogoFuria from '../../assets/logo-furia.svg'

function ChatHeader() {
    return(
        <div className='head-body'>     
            <img src={LogoFuria} alt='Logo da furia
            ' className='img-logo'></img>
            <h2><i>BlackClaw</i></h2>
        </div>
    )
}

export default ChatHeader