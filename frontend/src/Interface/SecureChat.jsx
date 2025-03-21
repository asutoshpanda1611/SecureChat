import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { encrypt, decrypt } from "./Logic";
import CryptoJS from 'crypto-js'; 
import { useNavigate } from "react-router-dom";

const AES_SECRET_KEY = import.meta.env.VITE_AES_SECRET_KEY;

const aesEncrypt = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), AES_SECRET_KEY).toString();
};

const aesDecrypt = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, AES_SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const socket = io(import.meta.env.VITE_BACKEND_URL, { transports: ["websocket"] });

const SecureChat = ({ username }) => {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [receivedMessage, setReceivedMessage] = useState("");
    const [decryptedMessage, setDecryptedMessage] = useState("");
    const [charsArray, setCharsArray] = useState([]);
    const [keyArray, setKeyArray] = useState([]);
    const chatHistoryRef = useRef(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("auth"); 
        socket.disconnect(); 
        navigate("/"); 
    };

    
    useEffect(() => {
        //server sends an encrypted encryption key to clients
        socket.on("secure_key", (encryptedKeyData) => {
            try {
                //frontend decrypts and stores them
                const keyData = aesDecrypt(encryptedKeyData);
                setCharsArray(keyData.charsArray);
                setKeyArray(keyData.keyArray);
                console.log("Encryption keys received and decrypted");
            } catch (error) {
                console.error("Error decrypting key:", error);
            }
        });

        // Listen for secure chat messages
        socket.on("secure_chat", (encryptedPayload) => {
            try {
                // Decrypt the msg using AES
                // encryptedPayload contains sender's aes encrypted msg("4h12jkl324h==")
                const payload = aesDecrypt(encryptedPayload);
                
                const messageExists = chat.some(msg => 
                    msg.id === payload.id
                );
                
                if (!messageExists) {
                    const newMessage = {
                        id: payload.id,
                        encryptedMessage: payload.message,
                        decryptedMessage: payload.sender === username ? payload.originalText : null,
                        sender: payload.sender || "Unknown",
                        timestamp: new Date().toLocaleTimeString(),
                        fromMe: payload.sender === username
                    };
                    
                    setChat(prevChat => [...prevChat, newMessage]);
                }
                
                if (payload.sender !== username) {
                    setReceivedMessage(payload.message);
                }
            } catch (error) {
                console.error("Error processing received message:", error);
            }
        });

        return () => {
            socket.off("secure_chat");
            socket.off("secure_key");
        };
    }, [chat, username]);

    //Scroll to bottom when chat updates
    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [chat]);

    const sendChat = (e) => {
        //e.preventDefault();
        if (message.trim() === "") return;
        
        if (charsArray.length === 0 || keyArray.length === 0) {
            alert("Waiting for encryption key...");
            return;
        }
        
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const encryptedMsg = encrypt(message, charsArray, keyArray);

        const payload = { 
            id: messageId,
            message: encryptedMsg, 
            sender: username, 
            originalText: message 
        };
        
        //Encrypt with AES before sending to Socket.IO
        const securePayload = aesEncrypt(payload);
        socket.emit("secure_chat", securePayload);
        
        setMessage("");
    };

    const handleDecrypt = () => {
        if (!receivedMessage) return;
        
        const decrypted = decrypt(receivedMessage, charsArray, keyArray);
        setDecryptedMessage(decrypted);
        
        //find the message in chat history and update its decrypted content
        setChat(prevChat => 
            prevChat.map(msg => {
                if (msg.encryptedMessage === receivedMessage && !msg.fromMe) {
                    return { ...msg, decryptedMessage: decrypted };
                }
                return msg;
            })
        );
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-4">Note : Reload Webpage once !! </h1>
            <h1 className="text-2xl font-bold mb-4 text-cyan-800">Hello {username}</h1>

            <button 
                onClick={handleLogout}
                className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
                Logout
            </button>

            {/* Chat Box */}
            <div className="w-100 p-6 bg-white shadow-lg rounded-xl flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="text"
                    placeholder="Received Encrypted Message"
                    value={receivedMessage}
                    readOnly
                    className="w-full p-3 border rounded-md bg-gray-200"
                />

                <input
                    type="text"
                    placeholder="Decrypted Message"
                    value={decryptedMessage}
                    readOnly
                    className="w-full p-3 border rounded-md bg-gray-200"
                />

                <button
                    className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                    onClick={sendChat}
                >
                    Encrypt & Send
                </button>

                <button
                    className="w-full p-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
                    onClick={handleDecrypt}
                >
                    Decrypt
                </button>
                
                {/* Chat History */}
                <div className="mt-1">
                    <h2 className="text-lg font-semibold mb-2">Chat History</h2>
                    <div 
                        ref={chatHistoryRef}
                        className="h-64 overflow-y-auto p-3 border rounded-md bg-gray-50 custom-scrollbar"
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#CBD5E0 #F7FAFC'
                        }}
                    >
                        {chat.length === 0 ? (
                            <p className="text-gray-400 text-center">No messages yet</p>
                        ) : (
                            chat.map((msg, index) => (
                                <div 
                                    key={index}
                                    className={`mb-2 p-3 rounded-lg ${
                                        msg.fromMe 
                                            ? "bg-blue-100 ml-8" 
                                            : "bg-gray-200 mr-8"
                                    }`}
                                >
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>{msg.sender}</span>
                                        <span>{msg.timestamp}</span>
                                    </div>
                                    {msg.decryptedMessage ? (
                                        <p className="text-sm">{msg.decryptedMessage}</p>
                                    ) : (
                                        <p className="text-sm text-gray-500 italic">
                                            {msg.fromMe ? "Message sent" : "Encrypted message (click decrypt to view)"}
                                        </p>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecureChat;