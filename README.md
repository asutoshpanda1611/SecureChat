SecureChat 🔒
A real-time encrypted chat application built with MERN + Socket.IO. It ensures secure communication using AES encryption and a custom substitution cipher for double-layered security.

🚀 Features
✅ End-to-End Encryption using AES + Custom Cipher Algorithm
✅ Real-time Communication via Socket.IO
✅ Secure Authentication for Sender & Receiver
✅ Decryption of Messages

🛠 Tech Stack
Frontend: React (Vite), TailwindCSS
Backend: Node.js, Express, Socket.IO
Security: AES Encryption, Custom Cipher Algorithm
Deployment: Render (Backend), Vercel (Frontend)


⚙️ How It Works (Simple Workflow)
1️⃣ User Authentication
Sender & Receiver log in with predefined credentials

2️⃣ Encryption & Message Transmission
The sender types a message → It gets encrypted using a custom cipher
The encrypted message is further AES encrypted
Sent via Socket.IO to the receiver

3️⃣ Receiving & Decryption
The receiver first sees the encrypted message
Upon clicking "Decrypt", AES decryption occurs first
Then, the custom cipher decrypts it back to the original message

4️⃣ Real-time Communication
Both sender & receiver can send and receive encrypted messages simultaneously
