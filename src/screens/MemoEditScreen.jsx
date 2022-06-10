import React from 'react';
import {View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Alert} from "react-native";
import CircleButton from "../components/CircleButton";

const MemoEditScreen = (props) => {
  const {navigation} = props;
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <TextInput value="買い物リスト" multiline style={styles.input}/>
      </View>
      <CircleButton
      name="check"
       onPress={()=>{navigation.goBack();}}
       >✔️</CircleButton>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  inputContainer:{
    paddingHorizontal:27,
    paddingVertical: 32,
    flex:1,
  },
  input: {
    flex:1,
    textAlignVertical:"top",
    fontSize:16,
    lineHeight:24,
  },
});

export default MemoEditScreen;
