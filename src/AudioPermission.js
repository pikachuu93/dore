import React, { useState, useEffect } from 'react';

import { Text } from "react-native";

import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const AudioPermission = ({ children }) => {
    const [hasAudioPermission, setHasAudioPermission] = useState(false);

    useEffect(() => {
        check(PERMISSIONS.ANDROID.RECORD_AUDIO)
        .then(res => {
            console.log(res);
            if (res === RESULTS.DENIED) {
                request(PERMISSIONS.ANDROID.RECORD_AUDIO).then(res => setHasAudioPermission(res === RESULTS.GRANTED));
            } else if(res === RESULTS.GRANTED) {
                setHasAudioPermission(true);
            }
        });
    }, []);

    if (hasAudioPermission) {
        return children;
    } else {
        return <Text>No Audio Permissions.</Text>
    }
};

export default AudioPermission;
