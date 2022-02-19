const NOTE_NAMES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

// Based on A4 = 440Hz, so A0 = 440 / 16 = 27.5Hz
const A0 = 27.5;
const Log2A0 = Math.log2(A0);

const hzToNote = hz => {
    if (!hz) {
        return;
    }

    const semitonesFromA0 = 12 * (Math.log2(hz) - Log2A0);
    const semitonesFromC0 = semitonesFromA0 - 3;

    const octave = Math.round(semitonesFromC0 / 12);
    const semitonesFromC = semitonesFromC0 % 12;

    const closestNote = Math.round(semitonesFromC);
    const error = semitonesFromC - closestNote;

    const note = closestNote % 12;
    const name = NOTE_NAMES[note];

    return { octave, note, name, error, hz };
};

const noteToHz = n => {
    const { octave, note } = n;
    const semitonesFromC0 = 12 * (octave) + note
    const semitonesFromA0 = semitonesFromC0 + 3;

    return A0 * Math.pow(2, semitonesFromA0 / 12 - 1);
};

const SOLFEGE_OFFSETS = [0, 2, 4, 5, 7, 9, 11];
const SOLFEGE_COLORS = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

const solfegeToNote = (doh, offset) => {
    let octave = doh.octave;

    while (offset >= 7) {
        octave += 1;
        offset -= 7;
    }

    return { octave, note: doh.note + SOLFEGE_OFFSETS[offset] };
};

export { hzToNote, noteToHz, solfegeToNote, NOTE_NAMES };
