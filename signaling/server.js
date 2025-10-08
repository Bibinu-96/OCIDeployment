import { Server } from "socket.io";
import http from "http";

const server = http.createServer();
const io = new Server(server, {
  cors: { origin: "*" },
  path: "/",
});

io.on("connection", (socket) => {
  console.log("Peer connected:", socket.id);

  socket.on("signal", (data) => {
    socket.to(data.to).emit("signal", { from: socket.id, signal: data.signal });
  });

  socket.on("disconnect", () => console.log("Peer disconnected:", socket.id));
});

server.listen(8081, () => console.log("Signaling server running on port 8081"));
