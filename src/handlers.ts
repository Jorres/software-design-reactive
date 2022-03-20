import express from "express";
import { Request, Response } from "express";
import { Shop } from "./shop";

const router = express.Router();

const shop = new Shop();

const ping = async (req: Request, res: Response) => {
    return res.status(200).json({ pong: "pong" });
};

const fetchList = async (req: Request, res: Response) => {
    const id: number = Number.parseInt((req as any).params.id);
    let [status, prices] = await shop.fetchList(id);

    if (status == 404) {
        return res.status(404);
    }

    return res.status(200).json(prices);
};

const registerUser = async (req: Request, res: Response) => {
    return await shop.registerUser(req.body);
};

const newCommodity = async (req: Request, res: Response) => {
    return await shop.newCommodity(req.body);
};

router.get("/ping", ping);
router.get("/view/:id", fetchList);
router.post("/register", registerUser);
router.post("/new-commodity", newCommodity);

export = router;
