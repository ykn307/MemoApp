import React, {useEffect} from 'react';
import {StyleSheet, View} from "react-native";

import MemoList from "../components/MemoList";
import CircleButton from "../components/CircleButton";
import LogOutButton from "../components/LogOutButton";


const MemoListScreen = (props) => {
  const {navigation } = props;
  useEffect(() => {
  navigation.setOptions({
    headerRight:() => <LogOutButton/>,
  });
}, []);
  return (
    <View style={styles.container}>
      <MemoList/>
      <CircleButton
      onPress={() =>{navigation.navigate("MemoCreate");}}
      >+</CircleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default MemoListScreen;
