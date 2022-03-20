import express from "express";
import { Request, Response } from "express";
import { of, Subject } from "rxjs";
import { filter, mergeAll } from "rxjs/operators";
const router = express.Router();

const ping = async (req: Request, res: Response) => {
    return res.status(200).json({ pong: "pong" });
};

type ElemType = {
    createdAt: number;
    event: string
};

const subj = new Subject<ElemType>();
 
const emit = async () => {
    const ticker = {
        event: "event",
        createdAt: Math.floor(Date.now() / 1000),
    };

    console.log("emitted");
    subj.next(ticker);
    return ticker;
};

const EventSerializer = (event: string) => {
    const jsonString = JSON.stringify(event);
    console.log("serialized");
    return jsonString; 
};

function stream(symbol: string) {
   return subj
      .pipe(
         filter((ticker) => ticker.event == "event"),
      )
}

const foo = async (req: Request, res: Response) => {
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Connection", "keep-alive");
    res.setHeader('transfer-encoding', 'chunked');
    res.flushHeaders();

    const symbol = "A";

    const stream$ = of(
        stream(symbol)
    )
        .pipe(mergeAll())
        .subscribe((event) => {
            console.log(EventSerializer(event.event));
            res.write(EventSerializer(event.event));
        });

    req.on("close", () => {
        stream$.unsubscribe();
    });
};

const doEmit = async (req: Request, res: Response) => {
    emit();
    return res.status(200).json({ok: "ok"});
};

router.get("/ping", ping);
router.get("/event", foo);
router.get("/emit", doEmit);

export = router;
