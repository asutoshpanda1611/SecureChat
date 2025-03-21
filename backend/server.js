const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const CryptoJS = require('crypto-js'); 
require('dotenv').config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const AES_SECRET_KEY = process.env.AES_SECRET_KEY;

const aesEncrypt = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), AES_SECRET_KEY).toString();
};

const aesDecrypt = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, AES_SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

(async () => {
    const { generateKey } = await import('../frontend/src/Interface/Logic.js');
    const { charsArray, keyArray } = generateKey(); 

    io.on('connection', (socket) => {
        console.log('A user connected with ID:', socket.id);

        //sending aes encrypted keys to clients(users)
        const encryptedKeyData = aesEncrypt({ charsArray, keyArray });
        socket.emit("secure_key", encryptedKeyData);

        socket.on('secure_chat', (encryptedPayload) => {
            try {
                //decrypting the aes standard, but still in changed form
                const payload = aesDecrypt(encryptedPayload);
                console.log("Decrypted Payload:", payload);
                
                //re-encrypts with aes & then sends to user2
                const reEncrypted = aesEncrypt(payload);
                io.emit("secure_chat", reEncrypted);
            } catch (error) {
                console.error("Error processing message:", error);
            }
        });

        socket.on('disconnect', () => {
            console.log(`User ${socket.id} disconnected`);
        });
    });

    server.listen(5000, () => {
        console.log('Server running at http://localhost:5000');
    });
})();