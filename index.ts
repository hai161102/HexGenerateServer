import { SimplexNoise } from "ts-perlin-simplex";
import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 1313 });
const simplex = new SimplexNoise()
wss.on('connection', (socket: WebSocket) => {
    socket.on('message', (message: string) => {
        const data: { id: string, x: number, y: number }[] = JSON.parse(message);
        if (data) {
            const result: { id: string, noise: number }[] = [];
            data.forEach((value) => {
                const noise = simplex.noise(value.x, value.y);
                result.push({id: value.id, noise: noise})
            })

            socket.send(JSON.stringify(result));
        }
    });
})
