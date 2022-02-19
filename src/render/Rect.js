import React, { PureComponent } from 'react';

import { View, Text } from "react-native";

const SOLFEGE_COLORS = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
const SOLFEGE_NAMES = ["Do", "Re", "Mi", "Fa", "So", "La", "Ti"];

export default class Rect extends PureComponent {
    render() {
        const [left, top, width, height, offset] = this.props.position;

        return <View style={{
            position: "absolute",
            backgroundColor: SOLFEGE_COLORS[offset % 7],
            left,
            top,
            width,
            height,
        }}>
            <Text>{SOLFEGE_NAMES[offset % 7]}</Text>
        </View>;
    }
}
