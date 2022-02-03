import winston, { Logger } from "winston";
import expressWinston from "express-winston";
import { singleton } from "tsyringe";
import { ErrorRequestHandler, Handler } from "express";
import { Format } from "logform";

@singleton()
export class LoggerService {
    private readonly logger: Logger;
    private readonly requestLogger: Handler;
    private readonly errorLogger: ErrorRequestHandler;

    constructor() {
        const format: Format = winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.timestamp({
                format: "MM/D/YYYY HH:MM:SS"
            }),
            winston.format.printf(
                (info) => `${info.timestamp} [${info.level}] : ${info.message}`
            )
        );

        this.logger = winston.createLogger({
            transports: [new winston.transports.Console()],
            format: format
        });

        this.requestLogger = expressWinston.logger({
            transports: [new winston.transports.Console()],
            format: format,
            colorize: process.env.NODE_ENV != "production",
            msg: `{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}`
        });

        this.errorLogger = expressWinston.errorLogger({
            transports: [new winston.transports.Console()],
            format: format
        });
    }

    public getLogger() {
        return this.logger;
    }

    public getRequestLogger(): Handler {
        return this.requestLogger;
    }

    public getErrorLogger(): ErrorRequestHandler {
        return this.errorLogger;
    }
}
