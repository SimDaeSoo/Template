import SocketServer from './classes/SocketServer';

async function start(): Promise<void> {
    const server: SocketServer = new SocketServer();
    await server.initialize();
    server.open(3030);
}

start();