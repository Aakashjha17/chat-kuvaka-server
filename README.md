<h1>How Concurrency is handled</h1>

Socket.IO, which is built on top of Node.js, concurrency is handled efficiently through event-driven architecture. When a client connects to the server, Socket.IO creates a new socket object to handle communication with that client. Each socket operates asynchronously, allowing multiple clients to connect and interact with the server concurrently. </br>

Socket.IO relies on non-blocking I/O operations provided by Node.js. This means that when a socket is waiting for incoming data or performing I/O operations (such as saving data to the database), it doesn't block the execution of other code. Instead, Node.js continues to handle other incoming connections and events.</br>

When a client sends a message (chatMessage event), the server handles it asynchronously. The event listener for chatMessage processes the message, possibly performing tasks like saving it to the database. During this time, the server can continue to receive and handle messages from other clients concurrently.

-----------------------------------------------
<h1>How to run this code on your machine</h1>

Step 1: - Clone the repository to your local machine </br>
Step 2: - run "npm install" in the terminal </br>
step 3: - configure .env file by adding PORT and MONGODB_URI</br>
step 4: - run "npm run dev" in your terminal
