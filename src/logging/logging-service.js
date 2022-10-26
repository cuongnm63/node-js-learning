import winston from "winston";
import * as dotenv from "dotenv";
dotenv.config();

const infoLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'http-service' },
    transports: [
        new winston.transports.File({ filename: 'http-request.log', level: 'info' }),
        new winston.transports.Console(),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    infoLogger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}


export default infoLogger;




const errorLogger1 = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    defaultMeta: { service: 'uncaughtException' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console(),
    ],
});


if (process.env.NODE_ENV !== 'production') {
    errorLogger1.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}


export const errorLogger = errorLogger1;
