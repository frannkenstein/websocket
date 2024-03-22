const http = require("http");
const socketIo = require("socket.io");

// Creating a new HTTP server
const server = http.createServer((req, res) => {
  res.end("Server is running");
});

// Initialize socket.io to work with our server
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Allow only connections from the domain of the React app
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true, // Allowable methods
  },
});

let connectionCount = 0;

io.on("connection", (socket) => {
  console.log("New client connected");

  connectionCount++;

  console.log(connectionCount);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  setTimeout(() => {
    socket.emit("FromAPI", "Hello with some delay");
  }, 5000);

  socket.emit("FromAPI", "Hello from the server!");

  // Handling a message received from the client
  socket.on("FromClient", (data) => {
    console.log(`Message from client: ${data}`);
  });
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
