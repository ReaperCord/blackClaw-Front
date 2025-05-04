import React from 'react'
import './ChatBubbleAi.css';

function ChatBubbleAi({ message, isLoading = false }) {
    return (
        <div className="bubble-text-ai">
            {isLoading ? (
                <div className="loading-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </div>
            ) : (
                message
            )}
        </div>
    );
}

export default ChatBubbleAi;