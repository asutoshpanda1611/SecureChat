# 🔒 SecureChat  
A **real-time encrypted chat application** built with **MERN + Socket.IO** to ensure **secure communication** using **AES encryption** and a **custom substitution cipher** for double-layered security.  

---

## 🚀 Features  
✅ **End-to-End Encryption** using **AES + Custom Cipher Algorithm** 🔐  
✅ **Real-time Communication** via **Socket.IO** ⚡  
✅ **Secure Authentication** for **Sender & Receiver** 🔑  
✅ **Decryption of Messages** for secure readability 🛡️  

---

## 🛠 Tech Stack  
📌 **Frontend**: React (Vite), TailwindCSS  
📌 **Backend**: Node.js, Express, Socket.IO  
📌 **Security**: AES Encryption, Custom Cipher Algorithm  
📌 **Deployment**: Render (Backend), Vercel (Frontend)  

---

## ⚙️ How It Works (Simple Workflow)  

### 1️⃣ **User Authentication**  
- **Sender & Receiver** log in with predefined credentials.  

### 2️⃣ **Encryption & Message Transmission**  
- The sender types a message → **Encrypted using a custom cipher**.  
- The **encrypted message** is further **AES encrypted**.  
- Sent via **Socket.IO** to the receiver.  

### 3️⃣ **Receiving & Decryption**  
- The receiver **sees the encrypted message** first.  
- Clicking **"Decrypt"** performs **AES decryption first**.  
- Then, the **custom cipher decrypts it back** to the original message.  

### 4️⃣ **Real-time Communication**  
- Both **sender & receiver** can **send and receive encrypted messages simultaneously**.  


[securechat project workflow](https://github.com/user-attachments/assets/549f5b72-2d2c-4a9f-8df5-41eb3a284dfa)
72c)

