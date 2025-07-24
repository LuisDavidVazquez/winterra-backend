"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/avatars', (_, res) => {
    console.log('Avatar Service is running');
    res.json({ message: 'Avatar Service is running' });
});
app.listen(port, () => {
    console.log(`Avatar Service listening at http://localhost:${port}`);
});
