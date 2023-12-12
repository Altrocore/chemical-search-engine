const app = require('./app');
const port = process.env.PORT || 3000;
const logger = require('./logs/logger');

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error}`);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    logger.error(`Unhandled Rejection: ${error}`);
    process.exit(1); 
});