import {ExpressApp} from './express-app';
import { logger } from './utils';

const PORT = process.env.APP_PORT;
export const StartServer = async() => {
    const expressApp = await ExpressApp();
    expressApp.listen(PORT, () => {
        logger.info(`Order Service running on port: ${PORT}`);
    });

    process.on("uncaughtException", async(err) => {
        logger.error(err);
        process.exit(1);
    })
};

StartServer().then(() => {
    logger.info('Server order on!');
});