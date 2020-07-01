import { Express, Request, Response, NextFunction } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as SocketIO from 'socket.io';
import * as ip from 'public-ip';
import { Server } from 'http';
import { Error } from '../interfaces/Server';

class GameServer {
    private IP!: string;
    private port!: number;
    private server!: Server;
    private io!: SocketIO.Server;
    private application!: Express;

    public async initialize(): Promise<void> {
        this.IP = await ip.v4();
        this.application = express();
        this.middleware();
        this.routing();
    }

    private middleware(): void {
        this.application.use(bodyParser.json({ limit: '10mb' }));
        this.application.use(bodyParser.urlencoded({ extended: false, limit: '10mb', parameterLimit: 1000000 }));

        this.application.all('*', (req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
            res.header('Access-Control-Allow-Methods', 'POST,GET');
            next();
        });
    }

    private routing(): void {
        this.application.get('/rooms', (req, res, next) => {
            res.json({});
        });
    }

    public open(port: number): void {
        this.port = port;
        this.server = this.application.listen(this.port);

        this.server.once('error', (err: Error): void => {
            if (err.code === 'EADDRINUSE') {
                this.close();
                this.open(++this.port);
            }
        });

        this.server.once('listening', (): void => {
            console.log(`[${new Date()}] server is running http://${this.IP}:${this.port}`);
            this.createSocketServer();
        });
    }

    private createSocketServer(): void {
        try {
            this.io = SocketIO(this.server, { serveClient: false });
            this.io.on('connection', (socket: SocketIO.Socket): void => { this.connect(socket); });
        } catch (error) {
            console.log(error);
        }
    }

    private connect(socket: SocketIO.Socket): void {
        socket.on('_ping', (dt): void => { socket.emit('_pong', dt); });
        socket.on('disconnect', (): void => { this.disconnect(socket); });
    }

    private disconnect(socket: SocketIO.Socket): void {
        // Room에서 Disconnect 처리.
    }

    public close(): void {
        this.server.close();
    }
}



export default GameServer;