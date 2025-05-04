import './ChatFrame.css';
import './ChatBubbleAi.css';
import './ChatBubbleUser.css';
import { useState, useRef, useEffect } from 'react';
import ChatBubbleUser from './ChatBubbleUser';
import ChatBubbleAi from './ChatBubbleAi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from '../../chatService';

function ChatFrame() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Rolagem automática para a última mensagem
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!inputValue.trim() || isLoading) return;
        
        // Adiciona mensagem do usuário ao chat
        const userMessage = { text: inputValue, isUser: true };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        
        try {
            // Envia a pergunta para o backend via ChatService
            const response = await ChatService.fazerPergunta(inputValue);
            
            // Verifica se a resposta foi bem-sucedida
            if (response.status === 200) {
                // Adiciona a resposta da AI ao chat
                const aiMessage = { 
                    text: response.data, 
                    isUser: false 
                };
                setMessages(prev => [...prev, aiMessage]);
            } else {
                throw new Error(response.data || 'Erro ao processar a pergunta');
            }
        } catch (error) {
            // Adiciona mensagem de erro ao chat
            const errorMessage = { 
                text: `Desculpe, ocorreu um erro: ${error.message}`, 
                isUser: false 
            };
            setMessages(prev => [...prev, errorMessage]);
            console.error('Erro na comunicação com o backend:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div className='frame-body'>
            <div className='conversation'>
                {messages.map((message, index) => (
                    message.isUser ? (
                        <ChatBubbleUser key={`msg-${index}`} message={message.text} />
                    ) : (
                        <ChatBubbleAi key={`msg-${index}`} message={message.text} />
                    )
                ))}
                {isLoading && (
                    <ChatBubbleAi isLoading={true} message="." />
                )}
                <div ref={messagesEndRef} />
            </div>
            
            <form className='ask-bar' onSubmit={handleSubmit}>
                <input 
                    className='text-area' 
                    placeholder='Olá! Como posso te ajudar hoje?'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isLoading}
                />
                <button 
                    type='submit' 
                    className='button-send'
                    disabled={!inputValue.trim() || isLoading}
                    aria-label="Enviar mensagem"
                >
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            </form>
        </div>
    )
}

export default ChatFrame;