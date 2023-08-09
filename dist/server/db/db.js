"use strict";
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
exports.updateMeme = exports.deleteMeme = exports.addMeme = exports.getMemeById = exports.getAllMemes = void 0;
const connection_1 = __importDefault(require("./connection"));
function getAllMemes() {
    return __awaiter(this, void 0, void 0, function* () {
        const meme = yield (0, connection_1.default)('memes').select('memes.id', 'meme_name as memeName', 'meme_url as memeUrl');
        return meme;
    });
}
exports.getAllMemes = getAllMemes;
function getMemeById(memeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const meme = yield (0, connection_1.default)('memes')
            .where('memes.id', memeId)
            .select('memes.id', 'meme_name as memeName', 'meme_url as memeUrl')
            .first();
        return meme;
    });
}
exports.getMemeById = getMemeById;
function addMeme(newMeme) {
    return __awaiter(this, void 0, void 0, function* () {
        const [meme] = yield (0, connection_1.default)('memes')
            .insert({
            meme_name: newMeme.memeName,
            meme_url: newMeme.memeUrl,
        })
            .returning('*');
        return meme;
    });
}
exports.addMeme = addMeme;
function deleteMeme(memeId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.default)('memes').where('memes.id', memeId).del();
    });
}
exports.deleteMeme = deleteMeme;
function updateMeme(id, memeName, memeUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const [updatedMeme] = yield (0, connection_1.default)('memes')
            .where({
            id,
        })
            .update({
            Meme_name: memeName,
            meme_url: memeUrl,
        })
            .returning(['meme_name', 'meme_url']);
        return updatedMeme;
    });
}
exports.updateMeme = updateMeme;
