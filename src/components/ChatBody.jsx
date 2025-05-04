import './ChatBody.css'
import './props/ChatBubbleAi.css'
import './props/ChatBubbleuser.css'
import './props/ChatFrame.css'

import ChatFrame from './props/ChatFrame'
import ChatHeader from './props/ChatHeader'

function ChatBody() {
    return(
        <>
            <ChatHeader />
            <ChatFrame />
        </>
        
    )
}

export default ChatBody