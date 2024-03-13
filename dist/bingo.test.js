"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bingo_1 = require("./bingo");
describe('isLoser', () => {
    it('should return true for a losing board', () => {
        const board = [
            [22, 13, 17, 11, 0],
            [8, 2, 23, 4, 24],
            [21, 9, 14, 16, 7],
            [6, 10, 3, 18, 5],
            [1, 12, 20, 15, 19]
        ];
        const calledNumbers = [22, 13, 6, 7, 4, 9, 5, 11];
        expect((0, bingo_1.isWinner)(board, calledNumbers)).toBe(false);
    });
});
describe('isWinner', () => {
    it('should return true for a winning board', () => {
        const board = [
            [22, 13, 17, 11, 0],
            [8, 2, 23, 4, 24],
            [21, 9, 14, 16, 7],
            [6, 10, 3, 18, 5],
            [1, 12, 20, 15, 19]
        ];
        const calledNumbers = [17, 13, 6, 7, 4, 9, 5, 11, 23, 14, 3, 20];
        expect((0, bingo_1.isWinner)(board, calledNumbers)).toBe(true);
    });
});
describe('isWinnerAgain', () => {
    it('should return true for a winning board', () => {
        const board = [
            [3, 15, 0, 2, 22],
            [9, 18, 13, 17, 5],
            [19, 8, 7, 25, 23],
            [20, 11, 10, 24, 4],
            [14, 21, 16, 12, 6],
        ];
        const calledNumbers = [17, 13, 6, 7, 18, 4, 9, 5, 11, 23, 3, 20];
        expect((0, bingo_1.isWinner)(board, calledNumbers)).toBe(true);
    });
});
