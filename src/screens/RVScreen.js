/** @format */

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Alert,
  Animated,
  Easing,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import * as MediaLibrary from "expo-media-library";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  VESDK,
  Configuration,
  VideoEditorModal,
} from "react-native-videoeditorsdk";

const RVScreen = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [visiabled, setVisiabled] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [audioFiles, setAudioFiles] = useState({
    identifier: "",
    audioURI: "",
  });
  const [cameraPosition, setCameraPosition] = useState("front");
  const devices = useCameraDevices();
  //   const device = devices.back;

  const device = cameraPosition == "front" ? devices.front : devices.back;
  const camera = useRef();

  const barWidth = useRef(new Animated.Value(0)).current;
  const progressPercent = barWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", `100%`],
  });

  const onAnimate = () => {
    barWidth.setValue(0);
    Animated.timing(barWidth, {
      toValue: 100,
      duration: 15000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    try {
      hasPermission();
    } catch (error) {
      console.log("err", error);
    }
  }, []);

  // useEffect(() => {
  //   try {
  //     getAudiofiles();
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }, []);

  useEffect(() => {
    if (isRecording) {
      startVideoRecording();
      setTimeout(() => {
        setIsRecording(false);
        setDisabled(false);
      }, 15000);
    } else {
      stopRecording();
    }
  }, [isRecording]);

  const hasPermission = async () => {
    await Camera.requestCameraPermission();
    await Camera.requestMicrophonePermission();
    await MediaLibrary.requestPermissionsAsync();
  };

  const startVideoRecording = async () => {
    camera.current.startRecording({
      onRecordingFinished: (video) => setVideoUri(video.path),
      onRecordingError: (error) => console.error(error),
    });
  };

  // const pauseVideoRecording = async () => {
  //   try {
  //     await camera.current.pauseRecording();
  //   } catch (error) {
  //     console.log("err", error);
  //   }
  // };
  // const resumeVideoRecording = async () => {
  //   await camera.current.resumeRecording();
  // };

  const stopRecording = async () => {
    try {
      await camera?.current?.stopRecording();
    } catch (error) {
      console.log("error", error);
    }
  };

  const onRecord = async () => {
    setIsRecording(!isRecording);
    // resumeVideoRecording();
  };

  const toggleCameraType = () => {
    if (cameraPosition === "front") {
      setCameraPosition("back");
    } else {
      setCameraPosition("front");
    }
  };

  // const editVideo = () => {
  //   // let video =
  //   //   "https://v.pinimg.com/videos/mc/720p/f6/88/88/f68888290d70aca3cbd4ad9cd3aa732f.mp4";
  //   // // Set up configuration
  //   // // let configuration: Configuration = {
  //   // //   // audio: {
  //   // //   //   categories: [audioFiles],
  //   // //   // },
  //   // //   // Configure audio tool
  //   // //   audio: {
  //   // //     // Configure audio clip library
  //   // //     categories: [
  //   // //       // Create audio clip category with audio clips
  //   // //       {
  //   // //         identifier: "example_audio_category_custom",
  //   // //         name: "Custom",
  //   // //         items: [audioFiles],
  //   // //       },
  //   // //     ],
  //   // //   },
  //   // // };
  //   // VESDK.openEditor(video).then(
  //   //   (result) => {
  //   //     console.log(result);
  //   //   },
  //   //   (error) => {
  //   //     console.log(error);
  //   //   }
  //   // );
  //   return (

  //   );
  // };

  // const getAudiofiles = async () => {
  //   const res = await MediaLibrary.getAssetsAsync({
  //     mediaType: MediaLibrary.MediaType.audio,
  //   });
  //   console.log("res.assets", res.assets);

  //   const audUri = res.assets.map((val) => val.uri);
  //   const audFileName = res.assets.map((val) => val.filename);

  //   const uri = audUri.toString();
  //   const filename = audFileName.toString();

  //   setAudioFiles({ identifier: filename, audioURI: uri });
  // };

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
      <View
        style={{
          height: 7,
          marginTop: 10,
          // borderRadius: 5,
          // width: "90%",
          marginHorizontal: 10,
          borderWidth: 1,
          borderColor: "#000",
        }}>
        <Animated.View
          style={[
            styles.bar,
            {
              backgroundColor: "red",
              width: progressPercent,
            },
          ]}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          onRecord();
          onAnimate();
        }}
        activeOpacity={0.7}
        style={isRecording ? styles.buttonStop : styles.buttonRecord}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          right: Platform.OS === "ios" ? 30 : 20,
          top: Platform.OS === "ios" ? 100 : 50,
        }}
        onPress={() => toggleCameraType()}>
        <MaterialIcons name='flip-camera-android' size={30} color='white' />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          setVisiabled(true);
        }}
        style={{ position: "absolute", bottom: 20, right: 20 }}>
        <Text
          style={{ color: disabled === true ? "white" : "red", fontSize: 20 }}>
          {" "}
          Right
        </Text>
      </TouchableOpacity>
      {visiabled === true && (
        <VideoEditorModal
          visible={visiabled}
          video={{
            uri: videoUri,
          }}
          // configuration={{ audio: [{ categories: [audioFiles] }] }}
          // configuration={{
          //   audio: [
          //     {
          //       categories: [
          //         {
          //           items: [
          //             {
          //               identifier: audioFiles.identifier,
          //               audioURI: audioFiles.audioURI,
          //             },
          //           ],
          //         },
          //       ],
          //     },
          //   ],
          // }}
        />
      )}
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
  bar: {
    // borderRadius: 5,
    height: 5,
  },
});
