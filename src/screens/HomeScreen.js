/** @format */

import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import data from "../components/data";
import VideoPlayer from "../components/VideoPlayer";
import { WINDOW_HEIGHT } from "../components/utils";

const HomeScreen = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const bottomTabHeight = useBottomTabBarHeight();

  return (
    <FlatList
      data={data}
      pagingEnabled
      renderItem={({ item, index }) => (
        <VideoPlayer data={item} isActive={activeVideoIndex === index} />
      )}
      onScroll={(e) => {
        const index = Math.round(
          e.nativeEvent.contentOffset.y / (WINDOW_HEIGHT - bottomTabHeight)
        );
        setActiveVideoIndex(index);
      }}
    />
  );
};

export default HomeScreen;
