"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const meme_1 = __importDefault(require("./routes/meme"));
const server = (0, express_1.default)();
// Middleware (body parser)
server.use(express_1.default.json());
// Routes
server.use('/api/v1/meme', meme_1.default);
if (process.env.NODE_ENV === 'production') {
    server.use('/assets', express_1.default.static(path_1.default.resolve(__dirname, '../assets')));
    server.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, '../index.html'));
    });
}
exports.default = server;
