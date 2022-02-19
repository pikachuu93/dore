import React, { Component, createContext, useContext } from 'react';
import { decode } from "base64-arraybuffer";
import PitchFinder from "pitchfinder";
import LiveAudioStream from "react-native-live-audio-stream";

import { hzToNote, NOTE_NAMES } from "./NoteFunctions";

const NoteContext = createContext(null);

const useNote = () => useContext(NoteContext);

const options = {
    sampleRate: 44100,
    channels: 1,
    bitsPerSample: 16,
    audioSource: 1,
    bufferSize: 2048 * 2,
};

export default class NoteProivder extends Component {
    onAudioData = (data) => {
        this.sample++;
        if (this.sample === this.SAMPLES_PER_UPDATE) {
            this.sample = 0;

            const decoded = decode(data)
            const buffer = new Int16Array(decoded);
            const newPitch = this.detectPitch(buffer);

            this.setState({ note: hzToNote(newPitch) });
        }
    }

    constructor(props) {
        super(props);

        this.sample = 0;
        this.SAMPLES_PER_UPDATE = 5;
        this.detectPitch = PitchFinder.YIN();

        this.state = { note: null };
    }

    init() {
        LiveAudioStream.init(options);
        LiveAudioStream.on('data', this.onAudioData);
        LiveAudioStream.start();
    }

    destroy() {
        LiveAudioStream.stop();
    }

    componentDidMount() {
        this.init();
    }

    componentWillUnmount() {
        this.destroy();
    }

    render() {
        return <NoteContext.Provider value={this.state.note}>
            {this.props.children}
        </NoteContext.Provider>;
    }
};

export { NoteContext, useNote };
