/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import Video, { FilterType } from "react-native-video";
import Canvas from "react-native-canvas";

const EditVideoScreen = ({ route }) => {
  // const { url } = route.params;

  const [filterType, setfilterType] = useState(FilterType.NONE);

  let invert = useRef();

  // const changeFilter = (filterType) => {
  //   console.log("filterTypes", filterType);
  //   setfilterType(filterType);
  // };

  return (
    <View
      style={{
        flex: 1,

        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "red",
      }}>
      <Video
        filterEnabled={true}
        filter={filterType}
        // paused
        muted
        repeat={true}
        source={{
          uri: "https://v.pinimg.com/videos/mc/720p/f6/88/88/f68888290d70aca3cbd4ad9cd3aa732f.mp4",
        }}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          // backgroundColor: "red",
        }}
      />

      {/* <TouchableOpacity
        style={{}}
        onPress={() => {
          changeFilter(FilterType.MONO);
        }}>
        <Text>FilterType.MONO </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          changeFilter(FilterType.CHROME);
        }}>
        <Text>FilterType.CHROME </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          changeFilter(FilterType.SEPIA);
        }}>
        <Text>FilterType.SEPIA </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          changeFilter(FilterType.INVERT);
        }}>
        <Text>FilterType.INVERT </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          changeFilter(FilterType.MONOCHROME);
        }}>
        <Text>FilterType.MONOCHROME </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          changeFilter(FilterType.POSTERIZE);
        }}>
        <Text>FilterType.POSTERIZE </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          changeFilter(FilterType.MAXIMUMCOMPONENT);
        }}>
        <Text>FilterType.MAXIMUMCOMPONENT </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          changeFilter(FilterType.MINIMUMCOMPONENT);
        }}>
        <Text>FilterType.MINIMUMCOMPONENT </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          changeFilter(FilterType.FADE);
        }}>
        <Text>FilterType.FADE </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          changeFilter(FilterType.INSTANT);
        }}>
        <Text>FilterType.INSTANT </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          changeFilter(FilterType.NOIR);
        }}>
        <Text>FilterType.NOIR </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          changeFilter(FilterType.PROCESS);
        }}>
        <Text>FilterType.PROCESS </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          changeFilter(FilterType.TONAL);
        }}>
        <Text>FilterType.TONAL </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          changeFilter(FilterType.TRANSFER);
        }}>
        <Text>FilterType.TRANSFER </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default EditVideoScreen;
