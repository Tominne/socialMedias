"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db = __importStar(require("../db/db"));
const superagent_1 = __importDefault(require("superagent"));
const router = express_1.default.Router();
router.get('/memes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield superagent_1.default.get('https://api.imgflip.com/get_memes');
        const meme = { meme: response.body.meme };
        res.json(meme);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
        else {
            res.status(500).send('where are my memes!!!');
        }
    }
}));
// GET /api/v1/meme
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meme = yield db.getAllMemes();
        res.json({ meme });
    }
    catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ error: 'There was an error trying to get the memes' });
    }
}));
// GET /api/v1/meme/:memeId
router.get('/:memeId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const memeId = Number(req.params.memeId);
        if (isNaN(memeId)) {
            res.sendStatus(400).json({ error: 'Invalid meme ID' });
            return;
        }
        const meme = yield db.getMemeById(memeId);
        res.json({ meme });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json({
            error: 'There was an error trying to get the meme',
        });
    }
}));
// POST /api/v1/meme
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newmeme = req.body.newmeme;
        if (!newmeme) {
            res.sendStatus(400);
            return;
        }
        const meme = yield db.addMeme(newmeme);
        res.json({ meme });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json({
            error: 'There was an error trying to add your shark to the database',
        });
    }
}));
// DELETE /api/v1/meme/
router.delete('/:memeId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const memeId = Number(req.params.memeId);
        if (isNaN(memeId)) {
            console.log('Invalid meme id');
            res.sendStatus(400).send('Bad request');
            return;
        }
        yield db.deleteMeme(memeId);
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
router.patch('/:memeId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memeId = parseInt(req.params.memeId);
    if (isNaN(memeId)) {
        console.log('Invalid meme id');
        res.sendStatus(400).send('Bad request');
        return;
    }
    const memeName = req.body.memeName;
    if (!memeName) {
        res.status(400).send('Bad request: meme Name is required');
        return;
    }
    const memeUrl = req.body.memeUrl;
    if (!memeUrl) {
        res.status(400).send('Bad request: meme Url is required');
        return;
    }
    try {
        yield db.updateMeme(memeId, memeName, memeUrl);
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).send('Could not update this meme');
    }
}));
exports.default = router;
