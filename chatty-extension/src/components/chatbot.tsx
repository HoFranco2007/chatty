import { useState, useEffect } from 'react';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

const ChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [positionBottom, setPositionBottom] = useState(0);
    const [positionLeft, setPositionLeft] = useState(0);

    useEffect(() => {
        // Generate a unique session ID on component mount
        const sessionId = Date.now().toString();
        sessionStorage.setItem('chatBotSessionId', sessionId);

        // Retrieve position values from storage on component mount
        chrome.storage.local.get(['positionBottom', 'positionLeft', 'storedSessionId'], (result) => {
            if (result.storedSessionId !== sessionId) {
                // If the stored session ID doesn't match, reset positions
                setPositionBottom(0);
                setPositionLeft(0);
                chrome.storage.local.set({ positionBottom: 0, positionLeft: 0, storedSessionId: sessionId });
            } else {
                // If session IDs match, use stored positions
                setPositionBottom(result.positionBottom || 0);
                setPositionLeft(result.positionLeft || 0);
            }
        });

        // Clean up function to remove session ID when component unmounts
        return () => {
            sessionStorage.removeItem('chatBotSessionId');
        };
    }, []);

    useEffect(() => {
        // Save position values and session ID to storage whenever they change
        const sessionId = sessionStorage.getItem('chatBotSessionId');
        chrome.storage.local.set({ positionBottom, positionLeft, storedSessionId: sessionId });
    }, [positionBottom, positionLeft]);

    const handleChangePosition = () => {
        if (positionBottom === 0 && positionLeft === 0) {
            setPositionBottom(700);
            setPositionLeft(1100);
        } else {  
            setPositionBottom(0);
            setPositionLeft(0);
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSendMessage = () => {
        if (input.trim()) {
            const userMessage: Message = { sender: 'user', text: input };
            setMessages([...messages, userMessage]);
            setInput('');

            setTimeout(() => {
                const botMessage: Message = { sender: 'bot', text: generateBotResponse(input) };
                setMessages(prevMessages => [...prevMessages, botMessage]);
            }, 500);
        }
    };

    const generateBotResponse = (userMessage: string): string => {
        if (userMessage.toLowerCase().includes('sign up')) {
            handleChangePosition();
            return "Obvio, para ello debes clickear en el botón rojo de 'Sign Up' en la esquina superior derecha.";
        } else if (userMessage.toLowerCase().includes('sirve')) {
            return "Github es una plataforma de desarrollo colaborativo para alojar proyectos utilizando el sistema de control de versiones Git.";
        } else if (userMessage.toLowerCase().includes('gracias')){
            return "De nada, estoy para ayudarte.";
        } else {
            return "Lo siento, no sé cómo responder a eso. ¿Podrías intentar preguntar de otra forma?";
        }
    };

    return (
        <div className="w-96 font-sans px-4 py-4 bg-black">
            <div className="rounded-lg h-64 overflow-y-auto flex flex-col gap-3">
                <div className="flex items-center">
                    <div className="">
                        <img src="/chatty.png" alt="" className='w-10 h-8'/>
                    </div>
                    <div className="ml-3 mb-1 bg-[#6c1a98]/70 pl-12 py-2 rounded-lg text-[#CCCCCC] flex-grow">
                        Ask me anything about the page
                    </div>
                </div>
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-[#CCCCCC]/40 text-white self-start' : 'bg-[#6c1a98]/70 self-end text-[#CCCCCC]'}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            <div className="flex mt-4">
                <input
                    name="text"
                    placeholder="Type your message..."
                    value={input}
                    className="px-4 py-[1.5vh] rounded text-sm text-[#CCCCCC] w-80 bg-transparent border border-[#CCCCCC]/70 focus:outline-none hover:border-white focus:border-white placeholder-[#CCCCCC]/50 focus:placeholder-transparent transition-colors duration-500"
                    onChange={handleInputChange}
                />
                <button 
                    onClick={handleSendMessage} 
                    className="ml-3 px-4 py-2 rounded-lg bg-[#c600d4bb]/90 text-[#CCCCCC] hover:bg-[#c600d4bb] transition-all duration-500"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBot;
