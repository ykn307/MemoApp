import React from 'react';
import {StyleSheet, View} from "react-native";

import MemoList from "../components/MemoList";
import CircleButton from "../components/CircleButton";

const MemoListScreen = (props) => {
  const {navigation} = props;
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
