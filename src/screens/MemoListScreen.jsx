import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert} from "react-native";
import firebase from "firebase";

import MemoList from "../components/MemoList";
import CircleButton from "../components/CircleButton";
import LogOutButton from "../components/LogOutButton";


const MemoListScreen = (props) => {
  const {navigation } = props;
  const [memos, setMemos] = useState([]);
  useEffect(() => {
  navigation.setOptions({
    headerRight:() => <LogOutButton/>,
  });
}, []);

useEffect(() => {
  const db = firebase.firestore();
  const {currentUser} = firebase.auth();
  let unsubscribe = () => {};
  if (currentUser) {
    const ref= db.collection(`users/${currentUser.uid}/memos`).orderBy("updatedAt", "desc");
  unsubscribe = ref.onSnapshot((snapshot) => {
    const userMemos = [];

    snapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
      const data = doc.data();
      userMemos.push({
        id:doc.id,
        bodyText:data.bodyText,
        updateAt:Date(data.updateAt),
      });
    });
    setMemos(userMemos);
  },(error) => {
    console.log(error);
    Alert.alert("データの読み込みに失敗しました。");
  });
  }
  return unsubscribe;
},[]);
  return (
    <View style={styles.container}>
      <MemoList memos={memos}/>
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
