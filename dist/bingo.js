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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWinner = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Define file paths for the called numbers and bingo boards data.
const calledNumbersPath = path.join(__dirname, '..', 'data', 'calledNumbers.txt');
const boardsPath = path.join(__dirname, '..', 'data', 'boards.txt');
/**
 * Converts the content of the boards text file into a structured list of bingo boards.
 * Each board is represented as a 2D array of numbers.
 */
function makeBoardsList(boardsText) {
    return boardsText.trim().split(/\r?\n\r?\n/)
        .map(board => board.split('\n')
        .map(row => row.trim().split(/\s+/).map(Number)));
}
/**
 * Checks if a given bingo board is a winner based on the list of called numbers.
 * A board wins if any row or column is completely matched with the called numbers.
 */
function isWinner(board, calledNumbers) {
    // Check each row for a win
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        if (board[rowIndex].every(number => calledNumbers.includes(number))) {
            return true;
        }
    }
    // Check each column for a win
    for (let col = 0; col < board[0].length; col++) {
        let columnIsWinning = true;
        for (let row = 0; row < board.length; row++) {
            if (!calledNumbers.includes(board[row][col])) {
                columnIsWinning = false;
                break;
            }
        }
        if (columnIsWinning) {
            return true;
        }
    }
    return false;
}
exports.isWinner = isWinner;
// Identifies the last winning bingo board based on the called numbers.
function announceLastWinner() {
    const calledNumbers = fs.readFileSync(calledNumbersPath, 'utf8').split(',').map(Number);
    const boardsText = fs.readFileSync(boardsPath, 'utf8');
    const boards = makeBoardsList(boardsText);
    let lastWinningBoardIndex = -1;
    let lastWinningCallIndex = -1;
    // Iterate over each board to find the last winner
    boards.forEach((board, boardIndex) => {
        for (let callIndex = 0; callIndex < calledNumbers.length; callIndex++) {
            const currentCalledNumbers = calledNumbers.slice(0, callIndex + 1);
            if (isWinner(board, currentCalledNumbers)) {
                if (callIndex > lastWinningCallIndex) {
                    lastWinningCallIndex = callIndex;
                    lastWinningBoardIndex = boardIndex;
                }
                break; // This board has won, move to the next one
            }
        }
    });
    // Display the winning board
    if (lastWinningBoardIndex !== -1) {
        console.log(`Board to pick against the giant squid: ${lastWinningBoardIndex + 1}. ` +
            `It wins first with the number ${calledNumbers[lastWinningCallIndex]}. ` +
            `Let the squid pick any board other than ${lastWinningBoardIndex + 1} to guarantee a winner.`);
    }
    else {
        console.log('No board won.');
    }
}
announceLastWinner();
