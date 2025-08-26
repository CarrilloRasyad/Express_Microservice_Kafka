import expressApp from './expressApp'
import { logger } from './utils';

const PORT = process.env.PORT || 3000;
export const StartServer = async() => {
    expressApp.listen(PORT, () => {
        logger.info(`Catalog Service running on port: ${PORT}`);
    });

    process.on("uncaughtException", async(err) => {
        logger.error(err);
        process.exit(1);
    })
};

StartServer().then(() => {
    logger.info('Server catalog on!');
})