/** @format */

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import * as MediaLibrary from "expo-media-library";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const RVScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  // const [audio, setAudio] = useState({uri: '', type: ''});
  const [cameraPosition, setCameraPosition] = useState("front");
  const devices = useCameraDevices();
  //   const device = devices.back;

  const device = cameraPosition == "front" ? devices.front : devices.back;

  const camera = useRef();

  // useEffect(() => {
  //   console.log('audio', audio);
  // }, [audio]);

  useEffect(() => {
    hasPermission();
  }, []);

  useEffect(() => {
    if (isRecording) {
      startRecording();
      setTimeout(() => {
        setIsRecording(false);
      }, 15000);
    } else {
      stopRecording();
    }
  }, [isRecording]);

  const hasPermission = async () => {
    await Camera.requestCameraPermission();
    await Camera.requestMicrophonePermission();
  };

  const startRecording = async () => {
    camera.current.startRecording({
      onRecordingFinished: (video) => console.log(video),
      onRecordingError: (error) => console.error(error),
    });
  };

  const stopRecording = async () => {
    await camera?.current?.stopRecording();
  };

  const onRecord = async () => {
    setIsRecording(!isRecording);
  };

  const toggleCameraType = () => {
    if (cameraPosition === "front") {
      setCameraPosition("back");
    } else {
      setCameraPosition("front");
    }
  };

  const getAudio = async () => {
    const res = await MediaLibrary.getAssetInfoAsync({ mediaType: "audio" });
    console.log("res", res);
  };

  return (
    <>
      {device == null ? (
        <View style={{ flex: 1 }} />
      ) : (
        <Camera
          device={device}
          video={true}
          audio={true}
          isActive={true}
          ref={camera}
          //   style={styles.preview}
          style={StyleSheet.absoluteFill}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          onRecord();
        }}
        activeOpacity={0.7}
        style={isRecording ? styles.buttonStop : styles.buttonRecord}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          right: Platform.OS === "ios" ? 30 : 20,
          top: Platform.OS === "ios" ? 60 : 30,
        }}
        onPress={() => toggleCameraType()}>
        <MaterialIcons name='flip-camera-android' size={30} color='white' />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: "absolute",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          top: Platform.OS === "ios" ? 60 : 30,
        }}
        onPress={() => getAudio()}>
        <MaterialIcons name='audiotrack' size={30} color='white' />
        <Text style={{ color: "white", fontWeight: "700" }}>Audio</Text>
      </TouchableOpacity>
    </>
  );
};

export default RVScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonRecord: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    marginVertical: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#ff4343",
  },
  buttonStop: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    marginVertical: 20,
    height: 30,
    width: 30,
    borderRadius: 3,
    backgroundColor: "#ff4343",
  },
});
