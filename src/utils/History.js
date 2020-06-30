class History {
    constructor() {
        this.history = [];
        this.buffer = [];
    }

    addToBuffer(item) {
        this.buffer.push(item)
    }

    addToHistory() {
        if (this.buffer.length) {
            this.history.push({
                payload: [...this.buffer],
                meta: {
                    time: Date.now()
                }
            })
        }
        this.clearBuffer()
    }

    restoreStep() {
        this.clearBuffer()
        if (this.history.length) {
            return this.history.pop().payload;
        }
        return null;
    }

    clearBuffer() {
        this.buffer = [];
    }

    clear() {
        this.history = [];
        this.buffer = [];
    }
}

export default new History();