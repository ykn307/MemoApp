import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, KeyboardAvoidingView} from "react-native";
import CircleButton from "../components/CircleButton";
import firebase from "firebase";

const MemoCreateScreen = (props) => {
  const {navigation} =props;
  const [bodyText, setBodyText] = useState("");
function handlePress() {
  const {currentUser} = firebase.auth();
  const db = firebase.firestore();
  const ref = db.collection(`users/${currentUser.uid}/memos`);
  ref.add({
    bodyText,
    updatedAt: new Date,
  })
    .then((docRef) =>{
      console.log("Created!", docRef.id);
      navigation.goBack();
    })
    .catch((error) => {
      console.log("Error!",error);
    });

}

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <TextInput
        value={bodyText}
        multiline
        style={styles.input}
        onChangeText={(text) => {setBodyText(text);}}
        autoFocus={true}
        />
      </View>
      <CircleButton
      name="check"
      onPress={handlePress}
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

export default MemoCreateScreen;
