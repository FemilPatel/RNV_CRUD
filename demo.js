/** @format */

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addUser, deleteUser, updateUsername } from "./src/redux/users";

const demo = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.value);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 25 }}> CRUD </Text>
        <TextInput
          value={name}
          style={{
            marginVertical: 10,
            backgroundColor: "#F2F2F2",
            borderRadius: 5,
            width: "80%",
            paddingLeft: 10,
            paddingVertical: 8,
          }}
          placeholder='Name...'
          onChangeText={(text) => {
            setName(text);
          }}
        />
        <TextInput
          style={{
            marginVertical: 10,
            backgroundColor: "#F2F2F2",
            width: "80%",
            borderRadius: 5,
            paddingLeft: 10,
            paddingVertical: 8,
          }}
          value={username}
          placeholder='Username...'
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#2192FF",
            width: "30%",
            marginVertical: 10,
            paddingHorizontal: 8,
            paddingVertical: 5,
            borderRadius: 3,

            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            dispatch(
              addUser({
                id: userList[userList.length - 1]?.id + 1,
                name,
                username,
              })
            );
          }}>
          <Text>Add User</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ width: "95%", alignSelf: "center", marginTop: 10 }}>
          {userList.map((user) => {
            return (
              <View
                key={user.id}
                style={{
                  flexDirection: "row",
                  marginVertical: 5,
                }}>
                <View
                  style={{
                    width: "38%",
                  }}>
                  <Text style={{ fontSize: 13 }} numberOfLines={1}>
                    {user.username}
                  </Text>
                </View>
                <View style={{ width: "28%" }}>
                  <TextInput
                    // value={newUsername}
                    placeholder='New Username...'
                    onChangeText={(value) => {
                      setNewUsername(value);
                    }}
                  />
                </View>
                <View
                  style={{
                    width: "34%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#F57328",
                      paddingHorizontal: 8,
                      paddingVertical: 5,
                      borderRadius: 3,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      dispatch(
                        updateUsername({ id: user.id, username: newUsername })
                      );
                    }}>
                    <Text>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#FF1E1E",
                      paddingHorizontal: 8,
                      paddingVertical: 5,
                      borderRadius: 3,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      dispatch(deleteUser({ id: user.id }));
                    }}>
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default demo;
