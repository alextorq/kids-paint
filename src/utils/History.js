class History {
    constructor() {
        this.history = [];
        this.buffer = [];
    }

    addToBuffer(item) {
        this.buffer.push(item)
    }


    filterUnic(buffer) {
        const result = [];
        const resultID = [];
        for (const item of buffer) {
            if (!resultID.includes(item.index)) {
                result.push(item)
                resultID.push(item.index)
            }
        }
        return result;
    }

    addToHistory() {
        if (this.buffer.length) {
            this.history.push({
                payload: this.filterUnic(this.buffer),
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