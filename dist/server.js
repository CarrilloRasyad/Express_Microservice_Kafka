"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartServer = void 0;
const expressApp_1 = __importDefault(require("./expressApp"));
const PORT = process.env.APP_PORT || 8000;
const StartServer = async () => {
    expressApp_1.default.listen(PORT, () => {
        console.log(`Aplikasi berjalan di port: ${PORT}`);
    });
    process.on("uncaughtException", async (err) => {
        console.log(err);
        process.exit(1);
    });
};
exports.StartServer = StartServer;
(0, exports.StartServer)().then(() => {
    console.log('Server nyala');
});
