import express, { NextFunction, Request, Response } from 'express';

const router = express.Router()

router.post("/product", async(req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({})
})

// router.patch("/product", (req,res) => {
// return res.json({});
// })

// router.delete("/", (req,res) => {
// return res.json({});
// })

// router.get("/", (req,res) => {
// return res.json({});
// })

export default router;