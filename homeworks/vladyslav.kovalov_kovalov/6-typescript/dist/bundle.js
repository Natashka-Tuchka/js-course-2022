/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

class Game {
    constructor(currentKeyElement, totalScoreElement, roundScoreElement, balloonElement, progressElement) {
        this.currentKeyElement = currentKeyElement;
        this.totalScoreElement = totalScoreElement;
        this.roundScoreElement = roundScoreElement;
        this.balloonElement = balloonElement;
        this.progressElement = progressElement;
        this.paused = true;
        this.LETTERS = "abcdefghijklmnopqrstuvwxyz";
        this.INTERVAL = 2000;
        this.FINAL_SCORE = 200;
        this.currentKey = '';
        this.score = 100;
        this.timer = '';
        this.gameSessionTotalScore = 0;
    }
    // private saveGameScore(data: []): string | void {
    // }
    // private getLocalStorage(): string | void {
    //     let data: any;
    //     if(localStorage.getItem('score') === null) localStorage.setItem('score', JSON.stringify([]));;
    //     if(localStorage.getItem('score')) data = JSON.parse(localStorage.getItem('score');
    //     return data;
    // }
    saveGameSessionTotalScore(currentScore) {
        this.gameSessionTotalScore += currentScore;
    }
    getRandomLetterPosition(letterString) {
        return Math.floor(Math.random() * letterString.length);
    }
    getRandomLetter(letterString) {
        return letterString[this.getRandomLetterPosition(letterString)];
    }
    getRandomScore(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    setRandomKey() {
        const randomLetter = this.getRandomLetter(this.LETTERS);
        this.currentKey = randomLetter.toUpperCase();
        this.currentKeyElement.textContent = this.currentKey;
    }
    setRoundScore(score, action) {
        this.roundScoreElement.textContent = `${action}${score}`;
    }
    updateTotalScore() {
        this.totalScoreElement.textContent = `${this.score.toString()}`;
    }
    increaseBalloon() {
        let width = this.balloonElement.offsetWidth;
        let height = this.balloonElement.offsetWidth;
        this.balloonElement.style.height = `${height + 5}px`;
        this.balloonElement.style.width = `${width + 5}px`;
    }
    decreaseBaloon() {
        let width = this.balloonElement.offsetWidth;
        let height = this.balloonElement.offsetWidth;
        this.balloonElement.style.height = `${height - 5}px`;
        this.balloonElement.style.width = `${width - 5}px`;
    }
    reset() {
        clearInterval(this.timer);
        this.timer = '';
        this.progressElement.style.width = '100%';
        this.paused = true;
    }
    checkScore() {
        if (this.score <= 0) {
            clearInterval(this.timer);
            this.reset();
            this.totalScoreElement.textContent = 'You lose!';
            this.roundScoreElement.innerHTML = '&nbsp;';
        }
        if (this.score >= 200) {
            clearInterval(this.timer);
            this.reset();
            this.totalScoreElement.textContent = 'You won!';
            this.roundScoreElement.innerHTML = '&nbsp;';
            this.saveGameSessionTotalScore(this.score);
            console.log(this.gameSessionTotalScore);
        }
    }
    addScore() {
        const min = 5;
        const max = 10;
        const currentScore = this.getRandomScore(min, max);
        this.score += currentScore;
        this.setRoundScore(currentScore, '+');
        this.updateTotalScore();
        this.increaseBalloon();
    }
    removeScore() {
        const min = 20;
        const max = 25;
        const currentScore = this.getRandomScore(min, max);
        this.score -= currentScore;
        this.setRoundScore(currentScore, '-');
        this.updateTotalScore();
        this.decreaseBaloon();
    }
    checkPressedKey(key) {
        if (key === this.currentKey) {
            clearInterval(this.timer);
            return this.addScore();
        }
        ;
        if (key !== this.currentKey) {
            clearInterval(this.timer);
            return this.removeScore();
        }
        ;
    }
    start() {
        this.setRandomKey();
    }
    setTimer() {
        let step = 10;
        let counter = 100;
        this.timer = setInterval(() => {
            if (counter >= 0) {
                this.progressElement.style.width = counter + '%';
                counter -= step;
                return;
            }
            clearInterval(this.timer);
            const min = 10;
            const max = 15;
            const currentScore = this.getRandomScore(min, max);
            this.score -= currentScore;
            this.setRoundScore(currentScore, '-');
            this.updateTotalScore();
            this.decreaseBaloon();
            if (this.score > 0) {
                game.setRandomKey();
                this.setTimer();
            }
            game.checkScore();
        }, this.INTERVAL / 10);
    }
    buttonStart() {
        console.log('Start');
        this.paused = false;
        this.start();
        this.setTimer();
    }
    buttonEnd() {
        console.log('End');
        this.paused = true;
        this.reset();
        this.gameSessionTotalScore = 0;
        this.currentKey = '';
        if (this.score !== 100) {
            this.totalScoreElement.textContent = 'You lose!';
            this.roundScoreElement.innerHTML = '&nbsp;';
        }
    }
    buttonRestart() {
        this.reset();
        this.roundScoreElement.innerHTML = '&nbsp;';
        this.currentKey = '';
        this.score = 100;
        this.gameSessionTotalScore = 0;
        this.totalScoreElement.textContent = `${this.score}`;
    }
}
const currentKeyElement = document.querySelector('[data-current-key]');
const totalScoreElement = document.querySelector('[data-total-score]');
const roundScoreElement = document.querySelector('[data-round-score]');
const balloonElement = document.querySelector('[data-balloon-item]');
const progressElement = document.querySelector('[data-progress]');
const buttonsContainerElement = document.querySelector('[data-buttons-container]');
const game = new Game(currentKeyElement, totalScoreElement, roundScoreElement, balloonElement, progressElement);
game.start();
document.addEventListener('keydown', e => {
    game.checkScore();
    const pressedKey = e.key.toUpperCase();
    if (!game.paused) {
        game.checkPressedKey(pressedKey);
        game.setRandomKey();
        game.setTimer();
    }
});
buttonsContainerElement.addEventListener('click', event => {
    if (event.target instanceof HTMLElement && event.target.dataset.action !== '') {
        if (event.target.dataset.action === 'start')
            game.buttonStart();
        if (event.target.dataset.action === 'end')
            game.buttonEnd();
        if (event.target.dataset.action === 'restart')
            game.buttonRestart();
    }
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUUsQ0FBQztRQUMzRCxJQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQ3RFO0FBQ0wsQ0FBQyxDQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly82LXR5cGVzY3JpcHQvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgR2FtZSB7XG4gICAgcHVibGljIHBhdXNlZDogYm9vbGVhbiA9IHRydWU7XG4gICAgcHJpdmF0ZSBMRVRURVJTOiBzdHJpbmcgPSBcImFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCI7XG4gICAgcHJpdmF0ZSBJTlRFUlZBTDogbnVtYmVyID0gMjAwMDtcbiAgICBwcml2YXRlIEZJTkFMX1NDT1JFOiBudW1iZXIgPSAyMDA7XG4gICAgcHJpdmF0ZSBjdXJyZW50S2V5OiBzdHJpbmcgPSAnJztcbiAgICBwcml2YXRlIHNjb3JlOiBudW1iZXIgPSAxMDA7XG4gICAgcHJpdmF0ZSB0aW1lcjogYW55ID0gJyc7XG4gICAgcHJpdmF0ZSBnYW1lU2Vzc2lvblRvdGFsU2NvcmU6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjdXJyZW50S2V5RWxlbWVudDogSFRNTFNwYW5FbGVtZW50LFxuICAgICAgICBwcml2YXRlIHRvdGFsU2NvcmVFbGVtZW50OiBIVE1MRGl2RWxlbWVudCxcbiAgICAgICAgcHJpdmF0ZSByb3VuZFNjb3JlRWxlbWVudDogSFRNTERpdkVsZW1lbnQsXG4gICAgICAgIHByaXZhdGUgYmFsbG9vbkVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50LFxuICAgICAgICBwcml2YXRlIHByb2dyZXNzRWxlbWVudDogSFRNTERpdkVsZW1lbnQsXG4gICAgKSB7IH1cblxuICAgIC8vIHByaXZhdGUgc2F2ZUdhbWVTY29yZShkYXRhOiBbXSk6IHN0cmluZyB8IHZvaWQge1xuXG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBnZXRMb2NhbFN0b3JhZ2UoKTogc3RyaW5nIHwgdm9pZCB7XG4gICAgLy8gICAgIGxldCBkYXRhOiBhbnk7XG4gICAgLy8gICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzY29yZScpID09PSBudWxsKSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2NvcmUnLCBKU09OLnN0cmluZ2lmeShbXSkpOztcbiAgICAvLyAgICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Njb3JlJykpIGRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzY29yZScpO1xuICAgIC8vICAgICByZXR1cm4gZGF0YTtcbiAgICAvLyB9XG5cbiAgICBwcml2YXRlIHNhdmVHYW1lU2Vzc2lvblRvdGFsU2NvcmUoY3VycmVudFNjb3JlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lU2Vzc2lvblRvdGFsU2NvcmUgKz0gY3VycmVudFNjb3JlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UmFuZG9tTGV0dGVyUG9zaXRpb24obGV0dGVyU3RyaW5nOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVyU3RyaW5nLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSYW5kb21MZXR0ZXIobGV0dGVyU3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gbGV0dGVyU3RyaW5nW3RoaXMuZ2V0UmFuZG9tTGV0dGVyUG9zaXRpb24obGV0dGVyU3RyaW5nKV07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSYW5kb21TY29yZShtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pO1xuICAgIH1cblxuICAgIHNldFJhbmRvbUtleSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcmFuZG9tTGV0dGVyOiBzdHJpbmcgPSB0aGlzLmdldFJhbmRvbUxldHRlcih0aGlzLkxFVFRFUlMpO1xuICAgICAgICB0aGlzLmN1cnJlbnRLZXkgPSByYW5kb21MZXR0ZXIudG9VcHBlckNhc2UoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50S2V5RWxlbWVudC50ZXh0Q29udGVudCA9IHRoaXMuY3VycmVudEtleTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFJvdW5kU2NvcmUoc2NvcmU6IG51bWJlciwgYWN0aW9uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yb3VuZFNjb3JlRWxlbWVudC50ZXh0Q29udGVudCA9IGAke2FjdGlvbn0ke3Njb3JlfWA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVUb3RhbFNjb3JlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRvdGFsU2NvcmVFbGVtZW50LnRleHRDb250ZW50ID0gYCR7dGhpcy5zY29yZS50b1N0cmluZygpfWA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbmNyZWFzZUJhbGxvb24oKTogdm9pZCB7XG4gICAgICAgIGxldCB3aWR0aDogbnVtYmVyID0gdGhpcy5iYWxsb29uRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgbGV0IGhlaWdodDogbnVtYmVyID0gdGhpcy5iYWxsb29uRWxlbWVudC5vZmZzZXRXaWR0aDtcblxuICAgICAgICB0aGlzLmJhbGxvb25FbGVtZW50LnN0eWxlLmhlaWdodCA9IGAke2hlaWdodCArIDV9cHhgO1xuICAgICAgICB0aGlzLmJhbGxvb25FbGVtZW50LnN0eWxlLndpZHRoID0gYCR7d2lkdGggKyA1fXB4YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlY3JlYXNlQmFsb29uKCkge1xuICAgICAgICBsZXQgd2lkdGg6IG51bWJlciA9IHRoaXMuYmFsbG9vbkVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgIGxldCBoZWlnaHQ6IG51bWJlciA9IHRoaXMuYmFsbG9vbkVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgdGhpcy5iYWxsb29uRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHQgLSA1fXB4YDtcbiAgICAgICAgdGhpcy5iYWxsb29uRWxlbWVudC5zdHlsZS53aWR0aCA9IGAke3dpZHRoIC0gNX1weGA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldCgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICAgICAgdGhpcy50aW1lciA9ICcnO1xuICAgICAgICB0aGlzLnByb2dyZXNzRWxlbWVudC5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGNoZWNrU2NvcmUoKTogdm9pZCB7XG4gICAgICAgIGlmKHRoaXMuc2NvcmUgPD0gMCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMudG90YWxTY29yZUVsZW1lbnQudGV4dENvbnRlbnQgPSAnWW91IGxvc2UhJztcbiAgICAgICAgICAgIHRoaXMucm91bmRTY29yZUVsZW1lbnQuaW5uZXJIVE1MID0gJyZuYnNwOyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5zY29yZSA+PSAyMDApIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLnRvdGFsU2NvcmVFbGVtZW50LnRleHRDb250ZW50ID0gJ1lvdSB3b24hJztcbiAgICAgICAgICAgIHRoaXMucm91bmRTY29yZUVsZW1lbnQuaW5uZXJIVE1MID0gJyZuYnNwOyc7XG4gICAgICAgICAgICB0aGlzLnNhdmVHYW1lU2Vzc2lvblRvdGFsU2NvcmUodGhpcy5zY29yZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdhbWVTZXNzaW9uVG90YWxTY29yZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkU2NvcmUoKTogdm9pZCB7XG4gICAgICAgICAgICBjb25zdCBtaW46IG51bWJlciA9IDU7XG4gICAgICAgICAgICBjb25zdCBtYXg6IG51bWJlciA9IDEwO1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50U2NvcmU6IG51bWJlciA9IHRoaXMuZ2V0UmFuZG9tU2NvcmUobWluLCBtYXgpO1xuICAgICAgICAgICAgdGhpcy5zY29yZSArPSBjdXJyZW50U2NvcmU7XG4gICAgICAgICAgICB0aGlzLnNldFJvdW5kU2NvcmUoY3VycmVudFNjb3JlLCAnKycpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUb3RhbFNjb3JlKCk7XG4gICAgICAgICAgICB0aGlzLmluY3JlYXNlQmFsbG9vbigpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVTY29yZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbWluOiBudW1iZXIgPSAyMDtcbiAgICAgICAgY29uc3QgbWF4OiBudW1iZXIgPSAyNTtcblxuICAgICAgICBjb25zdCBjdXJyZW50U2NvcmU6IG51bWJlciA9IHRoaXMuZ2V0UmFuZG9tU2NvcmUobWluLCBtYXgpO1xuICAgICAgICB0aGlzLnNjb3JlIC09IGN1cnJlbnRTY29yZTtcbiAgICAgICAgdGhpcy5zZXRSb3VuZFNjb3JlKGN1cnJlbnRTY29yZSwgJy0nKTtcbiAgICAgICAgdGhpcy51cGRhdGVUb3RhbFNjb3JlKCk7XG4gICAgICAgIHRoaXMuZGVjcmVhc2VCYWxvb24oKVxuICAgIH1cblxuICAgIGNoZWNrUHJlc3NlZEtleShrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAoa2V5ID09PSB0aGlzLmN1cnJlbnRLZXkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hZGRTY29yZSgpXG4gICAgICAgIH07XG4gICAgICAgIGlmIChrZXkgIT09IHRoaXMuY3VycmVudEtleSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW92ZVNjb3JlKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGFydCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRSYW5kb21LZXkoKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lcigpOiB2b2lkIHtcbiAgICAgICAgbGV0IHN0ZXAgPSAxMDtcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAxMDA7XG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY291bnRlciA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0VsZW1lbnQuc3R5bGUud2lkdGggPSBjb3VudGVyICsgJyUnO1xuICAgICAgICAgICAgICAgIGNvdW50ZXIgLT0gc3RlcDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XG5cbiAgICAgICAgICAgIGNvbnN0IG1pbjogbnVtYmVyID0gMTA7XG4gICAgICAgICAgICBjb25zdCBtYXg6IG51bWJlciA9IDE1O1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFNjb3JlOiBudW1iZXIgPSB0aGlzLmdldFJhbmRvbVNjb3JlKG1pbiwgbWF4KTtcbiAgICAgICAgICAgIHRoaXMuc2NvcmUgLT0gY3VycmVudFNjb3JlO1xuICAgICAgICAgICAgdGhpcy5zZXRSb3VuZFNjb3JlKGN1cnJlbnRTY29yZSwgJy0nKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVG90YWxTY29yZSgpO1xuICAgICAgICAgICAgdGhpcy5kZWNyZWFzZUJhbG9vbigpXG5cbiAgICAgICAgaWYodGhpcy5zY29yZSA+IDApIHtcbiAgICAgICAgICAgIGdhbWUuc2V0UmFuZG9tS2V5KCk7XG4gICAgICAgICAgICB0aGlzLnNldFRpbWVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBnYW1lLmNoZWNrU2NvcmUoKTtcbiAgICAgICAgfSwgdGhpcy5JTlRFUlZBTCAvIDEwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYnV0dG9uU3RhcnQoKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTdGFydCcpXG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgdGhpcy5zZXRUaW1lcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBidXR0b25FbmQoKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFbmQnKVxuICAgICAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5nYW1lU2Vzc2lvblRvdGFsU2NvcmUgPSAwO1xuICAgICAgICB0aGlzLmN1cnJlbnRLZXkgPSAnJztcbiAgICAgICAgaWYodGhpcy5zY29yZSAhPT0gMTAwKSB7XG4gICAgICAgICAgICB0aGlzLnRvdGFsU2NvcmVFbGVtZW50LnRleHRDb250ZW50ID0gJ1lvdSBsb3NlISc7XG4gICAgICAgICAgICB0aGlzLnJvdW5kU2NvcmVFbGVtZW50LmlubmVySFRNTCA9ICcmbmJzcDsnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGJ1dHRvblJlc3RhcnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5yb3VuZFNjb3JlRWxlbWVudC5pbm5lckhUTUwgPSAnJm5ic3A7JztcbiAgICAgICAgdGhpcy5jdXJyZW50S2V5ID0gJyc7XG4gICAgICAgIHRoaXMuc2NvcmUgPSAxMDA7XG4gICAgICAgIHRoaXMuZ2FtZVNlc3Npb25Ub3RhbFNjb3JlID0gMDtcbiAgICAgICAgdGhpcy50b3RhbFNjb3JlRWxlbWVudC50ZXh0Q29udGVudCA9IGAke3RoaXMuc2NvcmV9YDtcbiAgICB9XG59XG5cbmNvbnN0IGN1cnJlbnRLZXlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY3VycmVudC1rZXldJykgYXMgSFRNTFNwYW5FbGVtZW50O1xuY29uc3QgdG90YWxTY29yZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10b3RhbC1zY29yZV0nKSBhcyBIVE1MRGl2RWxlbWVudDtcbmNvbnN0IHJvdW5kU2NvcmVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcm91bmQtc2NvcmVdJykgYXMgSFRNTERpdkVsZW1lbnQ7XG5jb25zdCBiYWxsb29uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWJhbGxvb24taXRlbV0nKSBhcyBIVE1MRGl2RWxlbWVudDtcbmNvbnN0IHByb2dyZXNzRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2dyZXNzXScpIGFzIEhUTUxEaXZFbGVtZW50O1xuY29uc3QgYnV0dG9uc0NvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1idXR0b25zLWNvbnRhaW5lcl0nKSBhcyBIVE1MRGl2RWxlbWVudDtcblxuY29uc3QgZ2FtZSA9IG5ldyBHYW1lKGN1cnJlbnRLZXlFbGVtZW50LCB0b3RhbFNjb3JlRWxlbWVudCwgcm91bmRTY29yZUVsZW1lbnQsIGJhbGxvb25FbGVtZW50LCBwcm9ncmVzc0VsZW1lbnQpO1xuZ2FtZS5zdGFydCgpO1xuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcbiAgICBnYW1lLmNoZWNrU2NvcmUoKTtcbiAgICBjb25zdCBwcmVzc2VkS2V5OiBzdHJpbmcgPSBlLmtleS50b1VwcGVyQ2FzZSgpO1xuICAgIGlmKCFnYW1lLnBhdXNlZCkge1xuICAgICAgICBnYW1lLmNoZWNrUHJlc3NlZEtleShwcmVzc2VkS2V5KTtcbiAgICAgICAgZ2FtZS5zZXRSYW5kb21LZXkoKTtcbiAgICAgICAgZ2FtZS5zZXRUaW1lcigpO1xuICAgIH1cbn0pO1xuXG5idXR0b25zQ29udGFpbmVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICBpZihldmVudC50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBldmVudC50YXJnZXQuZGF0YXNldC5hY3Rpb24gIT09ICcnKSB7XG4gICAgICAgIGlmKGV2ZW50LnRhcmdldC5kYXRhc2V0LmFjdGlvbiA9PT0gJ3N0YXJ0JykgZ2FtZS5idXR0b25TdGFydCgpO1xuICAgICAgICBpZihldmVudC50YXJnZXQuZGF0YXNldC5hY3Rpb24gPT09ICdlbmQnKSBnYW1lLmJ1dHRvbkVuZCgpO1xuICAgICAgICBpZihldmVudC50YXJnZXQuZGF0YXNldC5hY3Rpb24gPT09ICdyZXN0YXJ0JykgZ2FtZS5idXR0b25SZXN0YXJ0KCk7XG4gICAgfVxufSkhO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9