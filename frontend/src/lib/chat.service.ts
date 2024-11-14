// lib/chat.service.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

interface ChatResponse {
  response: string;
}

export const ChatService = {
  sendMessage: async (message: string): Promise<string> => {
    try {
      const response = await axios.post<ChatResponse>(
        `${API_URL}/chat`,
        { message },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.response;
    } catch (error) {
      console.error('Chat API Error:', error);
      throw new Error('Failed to get response from chatbot');
    }
  }
};