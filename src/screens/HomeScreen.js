/** @format */

import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
// import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import data from "../components/data";
import VideoPlayer from "../components/VideoPlayer";
import { WINDOW_HEIGHT } from "../components/utils";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  // const bottomTabHeight = useBottomTabBarHeight();

  const mute = useIsFocused();

  return (
    <FlatList
      data={data}
      pagingEnabled
      renderItem={({ item, index }) => (
        <VideoPlayer
          data={item}
          isActive={activeVideoIndex === index}
          mute={mute ? false : true}
        />
      )}
      onScroll={(e) => {
        const index = Math.round(e.nativeEvent.contentOffset.y / WINDOW_HEIGHT);
        setActiveVideoIndex(index);
      }}
    />
  );
};

export default HomeScreen;
