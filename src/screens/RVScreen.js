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
  FlatList,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const RVScreen = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [visiabled, setVisiabled] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [audioFiles, setAudioFiles] = useState([]);
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

  useEffect(() => {
    if (visiabled === true) {
      getAudiofiles();
    }
  }, [visiabled]);

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

  // const downloadFile = async () => {
  //   const uri = "http://techslides.com/demos/sample-videos/small.mp4";
  //   let fileUri = FileSystem.documentDirectory + "small.mp4";
  //   FileSystem.downloadAsync(uri, fileUri)
  //     .then(({ uri }) => {
  //       saveFile(uri);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // const saveFile = async (fileUri) => {
  //   // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   // if (status === "granted") {
  //   const asset = await MediaLibrary.createAssetAsync(fileUri);
  //   await MediaLibrary.createAlbumAsync("Like Video", asset)
  //     .then((res) => {
  //       if (res) {
  //         Alert.alert("download complete");
  //       }
  //     })
  //     .catch((err) => {
  //       if (err) {
  //         Alert.alert("issue with download contact support");
  //       }
  //     });
  //   // }
  // };

  const editVideo = (videoUri, audioUri) => {
    setVisiabled(false);
    console.log("videoUri", videoUri);
    console.log("item.uri", audioUri);
  };

  const getAudiofiles = async () => {
    try {
      const res = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.audio,
      });
      let newres = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.audio,
        first: res.totalCount,
      });

      if (newres?.assets) {
        setAudioFiles(newres?.assets);
        setVisiabled(true);
      }
    } catch (err) {
      console.log("err", err);
    }

    // const audUri = res.assets.map((val) => val.uri);
    // const audFileName = res.assets.map((val) => val.filename);

    // const uri = audUri.toString();
    // const filename = audFileName.toString();

    // setAudioFiles({ identifier: filename, audioURI: uri });
  };

  return (
    <>
      {device == null ? (
        <View style={{ flex: 1 }} />
      ) : (
        <View style={{ marginTop: Platform.OS === "ios" ? 70 : 50 }}>
          {/* {visiabled === false && (
            <View
              style={{
                backgroundColor: "rgba(100, 100, 100, 0.5)",
                position: "absolute",
                height: "93%",
                width: "100%",
                zIndex: 1,
              }}
            />
          )} */}

          <Camera
            device={device}
            video={true}
            // audio={true}
            isActive={true}
            ref={camera}
            //   style={styles.preview}
            style={{ height: "100%", width: "100%" }}
          />
        </View>
      )}

      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          // marginTop: 10,
          paddingVertical: Platform.OS === "ios" ? 20 : 10,
          justifyContent: "center",
          backgroundColor: "#000000",
        }}>
        <TouchableOpacity
          style={{ width: "35%", paddingLeft: 20 }}
          onPress={() => toggleCameraType()}>
          <MaterialIcons name='flip-camera-android' size={30} color='white' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => getAudiofiles()}
          style={{ flexDirection: "row", width: "65%", paddingLeft: 20 }}>
          <MaterialIcons name='audiotrack' size={30} color='white' />
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Audio
          </Text>
        </TouchableOpacity>
      </View>
      {visiabled ? (
        <View
          style={{
            position: "absolute",
            backgroundColor: "#fff",
            height: "100%",
            width: "100%",
          }}>
          <ScrollView style={{ flexGrow: 1 }}>
            {audioFiles.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    editVideo(videoUri, item.uri);
                  }}>
                  <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                    <Text>{item.filename}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : null}
      <View
        style={{
          backgroundColor: "#000",
          position: "absolute",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          bottom: 0,
          height: "12.6%",
          // paddingVertical: 10,
        }}>
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
            // width: "35%",
            paddingRight: 20,
            // backgroundColor: "green",
            position: "absolute",
            right: 0,
          }}
          disabled={disabled}
          onPress={() => {
            setVisiabled(true);

            // downloadFile();
          }}>
          <Text
            style={{
              color: disabled === true ? "white" : "red",
              fontSize: 20,
            }}>
            {" "}
            Right
          </Text>
        </TouchableOpacity>
        <View
          style={{
            height: 7,
            marginVertical: 5,
            width: "100%",
            bottom: 0,
            borderWidth: 1,
            borderColor: "#000",
            position: "absolute",
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
      </View>
      {/* {visiabled === true && (
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
      )} */}
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
    // position: "absolute",
    // bottom: 0,
    alignSelf: "center",
    // marginVertical: 10,
    height: 55,
    width: 55,
    borderRadius: 30,
    backgroundColor: "#ff4343",
  },
  buttonStop: {
    // position: "absolute",
    // bottom: 0,
    alignSelf: "center",
    // marginVertical: 20,
    height: 35,
    width: 35,
    borderRadius: 3,
    backgroundColor: "#ff4343",
  },
  bar: {
    // borderRadius: 5,
    height: 5,
  },
});
