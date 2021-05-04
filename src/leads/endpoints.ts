import express from 'express';
import { dump, query, insert } from './service';

export const getAll = async (_req: express.Request, res: express.Response) => {
    return res.send(dump());
};

export const search = async (req: express.Request, res: express.Response) => {
    return res.send(query(req.query));
};

export const create = async (req: express.Request, res: express.Response) => {
    try {
        return res.send(insert(req.body));
    } catch (err) {
        return res.status(400).send({ message: err.message });
    }
};
