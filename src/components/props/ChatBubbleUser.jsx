import React from 'react'
import './ChatBubbleUser.css';

function ChatBubbleUser({ message }) {
    return (
        <div className="bubble-text-user">
            {message}
        </div>
    );
}

export default ChatBubbleUser;