"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/product", async (req, res, next) => {
    return res.status(201).json({});
});
// router.patch("/product", (req,res) => {
// return res.json({});
// })
// router.delete("/", (req,res) => {
// return res.json({});
// })
// router.get("/", (req,res) => {
// return res.json({});
// })
exports.default = router;
