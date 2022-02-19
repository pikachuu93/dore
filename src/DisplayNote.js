import React from 'react';
import { Text } from "react-native";

import { useNote } from "./NoteProvider";

const DisplayNote = () => {
    const note = useNote();

    return <Text>Note: {note?.name} {note?.octave}</Text>;
};

export default DisplayNote;
