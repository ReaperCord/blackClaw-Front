import { ChatService } from './chatService';

// Interceptor para tratamento global de erros
export const setupInterceptors = () => {
    const originalFazerPergunta = ChatService.fazerPergunta;
    
    ChatService.fazerPergunta = async (...args) => {
        try {
            return await originalFazerPergunta.apply(ChatService, args);
        } catch (error) {
            console.error('Interceptor caught error:', error);
            return {
                status: 500,
                data: 'Serviço indisponível no momento. Tente novamente mais tarde.'
            };
        }
    };
};

// Chame esta função no início do seu app (ex: index.js)