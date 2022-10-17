import winston from "winston";
import * as dotenv from "dotenv";
dotenv.config();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'http-service' },
    transports: [
        new winston.transports.File({ filename: 'http-request.log', level: 'info' }),
        new winston.transports.Console(),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}


export default logger;
