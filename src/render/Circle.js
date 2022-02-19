import React, { PureComponent } from 'react';

import { View, Text } from "react-native";

export default class Circle extends PureComponent {
    render() {
        const [centerX, centerY, radius] = this.props.position;

        return <View style={{
            position: "absolute",
            backgroundColor: "black",
            left: centerX - radius,
            top: centerY - radius,
            width: 2 * radius,
            height: 2 * radius,
            borderRadius: radius,
        }} />;
    }
}
