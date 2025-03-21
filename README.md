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

### 1️⃣ **Key Generation**  
- The **server generates an encryption key** for **Custom Cipher encryption**.  
- This key is structured as:  
  - **Chars Array** → Example: `ABCD`  
  - **Key Array** → Example: `PORS`  
- Before sending, the key is **AES encrypted** also and then shared with both users.  

### 2️⃣ **User 1 (Sender) - Sending a Message**  
- The sender types a message → **Encrypted using the custom cipher**.  
- Example: `"HELLO"` converts into a scrambled form like `</t:0`.  
- This result is then **AES encrypted**, turning into something like `"U2F2n+Jv03ay"`.  
- The AES-encrypted message is sent to the **Socket.IO server**.  

### 3️⃣ **Role of Server**  
- The server **decrypts only the AES encryption** but does not revert the cipher changes.  
- At this point, the message appears as suppose `</t:0` (which is not yet the original message).  
- The server **re-encrypts the message using AES** and broadcasts it to **User 2 (Receiver)**.  

### 4️⃣ **User 2 (Receiver) - Receiving & Decryption**  
- The receiver gets the **AES-encrypted and ciphered message**.  
- First, **AES decryption** is applied to get `</t:0` from `"U2F2n+Jv03ay"`.  
- Then, **custom cipher decryption** restores the original message → `"HELLO"`.  


