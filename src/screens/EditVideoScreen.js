/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Video, { FilterType } from "react-native-video";

const EditVideoScreen = ({ route }) => {
  const { url } = route.params;

  const [filterType, setfilterType] = useState(FilterType.NONE);

  const changeFilter = (filterType) => {
    console.log("filterTypes", filterType);
    setfilterType(filterType);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Video
        filterEnabled={true}
        filter={filterType}
        paused
        muted
        source={{
          uri: "https://v.pinimg.com/videos/mc/720p/f6/88/88/f68888290d70aca3cbd4ad9cd3aa732f.mp4",
        }}
        style={{ height: "100%", width: "100%", position: "absolute" }}
      />
      <TouchableOpacity
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
    </View>
  );
};

export default EditVideoScreen;
