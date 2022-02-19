export default class NoteSet {
    constructor() {
        this.step = 1;
        this.offset = 0;
    }

    next() {
        const note = { offset: this.offset, duration: 1 };

        this.offset += this.step;

        if (this.offset >= 7) {
            this.step = -1;
        } else if (this.offset <= 0) {
            this.step = 1;
        }

        return note;
    }
}
