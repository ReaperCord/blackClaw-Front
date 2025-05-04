const API_BASE_URL = 'http://localhost:8080'; // URL explícita para desenvolvimento

export const ChatService = {
    fazerPergunta: async (pergunta) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/chat/pergunta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain', // Mesmo tipo do cURL que funcionou
                },
                body: pergunta // Envia como texto puro
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            return {
                status: response.status,
                data: await response.text()
            };
        } catch (error) {
            console.error("Erro na requisição:", error);
            return {
                status: 500,
                data: "Erro ao conectar com o servidor"
            };
        }
    }
};