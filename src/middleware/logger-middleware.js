export const loggingRequest = (logger) => (req, res, next) => {
    logger.log('info', {
        method: req.method,
        url: req.url,
        body: req.body,
        ip: req.ip
    });

    next();
}
