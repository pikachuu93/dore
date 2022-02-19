import React, { Component } from 'react';

import { GameEngine } from "react-native-game-engine";

import { View, Text, StyleSheet } from "react-native";
import { NoteContext } from "./NoteProvider";

import  NoteSet from "./NoteSet";

import { solfegeToNote, noteToHz } from "./NoteFunctions";

import Rect from "./render/Rect";
import Circle from "./render/Circle";

export default class Track extends Component {
    static contextType = NoteContext;

    constructor(props) {
        super(props);

        this.doh = { note: 0, octave: 3 };

        this.startTime = new Date().getTime() / 1000;
        this.beatsPerSecond = 40 / 60;
        this.pixelsPerBeat = 100;
        this.scaleY = 20;
        this.height = 30;
        this.beatsConsumed = 0;

        this.noteSet = new NoteSet();

        this.notes = [
            this.noteSet.next(),
            this.noteSet.next(),
            this.noteSet.next(),
            this.noteSet.next(),
            this.noteSet.next(),
            this.noteSet.next(),
            this.noteSet.next(),
            this.noteSet.next(),
        ];

        this.update = this.update.bind(this);
    }

    getHorizontalOffset(width, ellapsedTime, beatOffset = 0) {
        return width + beatOffset * this.pixelsPerBeat - ellapsedTime * this.beatsPerSecond * this.pixelsPerBeat;
    }

    cullEllapsedNotes(width, ellapsedTime) {
        const first = this.notes[0];
        const rightHandSide = this.getHorizontalOffset(width, ellapsedTime, this.beatsConsumed) + this.pixelsPerBeat * first.duration;

        if (rightHandSide < 0) {
            this.beatsConsumed += first.duration;
            this.notes.shift();
            this.notes.push(this.noteSet.next());
        }
    }

    generateNoteEntities(entities, width, height, ellapsedTime) {
        let beatOffset = this.beatsConsumed;

        for (const note of this.notes) {
            const absNote = solfegeToNote(this.doh, note.offset);
            const noteOffset = absNote.note - this.doh.note + 12 * (absNote.octave - this.doh.octave);

            entities.push({
                position: [
                    this.getHorizontalOffset(width, ellapsedTime, beatOffset),
                    height / 2 - this.scaleY / 2 - this.scaleY * noteOffset,
                    this.pixelsPerBeat * note.duration,
                    this.scaleY,
                    note.offset,
                ],
                renderer: Rect,
            });
             
            beatOffset += note.duration;
        }
    }

    generatePitchIndicatorEntity(entities, width, height) {
        if (!this.context) {
            return;
        }

        const note = this.context;

        const noteOffset = note.note - this.doh.note + 12 * (note.octave - this.doh.octave) + note.error;

        entities.push({
            position: [
                width / 2,
                height / 2 - this.scaleY * noteOffset,
                6,
            ],
            renderer: Circle,
        });
    }

    update(_, other) {
        if (!other.layout) {
            return [];
        }

        const now = new Date().getTime() / 1000;
        const delta = other.time.previousDelta;
        const { height, width } = other.layout;

        const entities = [];

        const ellapsedTime = (now - this.startTime);

        this.cullEllapsedNotes(width, ellapsedTime);
        this.generateNoteEntities(entities, width, height, ellapsedTime);
        this.generatePitchIndicatorEntity(entities, width, height);

        return entities;
    }

    render() {
        return <GameEngine
            style={styles.main}
            systems={[this.update]}
            entities={[]}
        />
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexGrow: 1,
    },
});
