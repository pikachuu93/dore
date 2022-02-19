/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Node,
  Text,
  StyleSheet,
} from 'react-native';

import KeepAwake from "react-native-keep-awake";

import NoteProvider from "./src/NoteProvider";
import AudioPermission from "./src/AudioPermission";
import DisplayNote from "./src/DisplayNote";
import Track from "./src/Track";

const App = () => {
    return (
        <SafeAreaView style={styles.main}>
            <KeepAwake />
            <ScrollView style={styles.main} contentContainerStyle={styles.main}>
                <AudioPermission style={styles.main}>
                    <NoteProvider>
                        <Track />
                    </NoteProvider>
                </AudioPermission>
            </ScrollView>
        </SafeAreaView>
    );
};

export default App;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
});
