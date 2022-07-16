import {dateToString} from "../utils";
import React , {useEffect,useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from "react-native";
import {shape, string} from "prop-types";
import firebase from "firebase";

import CircleButton from "../components/CircleButton";


const MemoDetailScreen = (props) => {
  const {navigation, route} = props;
  const {id} = route.params;
  console.log(id);
  const [memo, setMemo] = useState(null);

useEffect(() => {
  const {currentUser} = firebase.auth();
  let unsubscribe = () => {};
  if (currentUser) {
    const db = firebase.firestore();
  const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
 unsubscribe = ref.onSnapshot((doc) =>{
    console.log(doc.id, doc.data());
    const data = doc.data();
    setMemo({
      id:doc.id,
      bodyText:data.bodyText,
      updateAt:Date(data.updateAt),
    });
  });
  }
  return unsubscribe;
},[]);

  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
      <Text style={styles.memoTitle} numberOfLines={1}>{memo && memo.bodyText}</Text>
        <Text style={styles.memoDate}>{memo && Date(memo.updateAt)}</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoText}>
        {memo && memo.bodyText}
        </Text>
      </ScrollView>
      <CircleButton
      style={{top:60, bottom:"auto"}}
      onPress={() =>{navigation.navigate("MemoEdit",{id:memo.id, bodyText:memo.bodyText});}}
      >+</CircleButton>
    </View>
  );
}

MemoDetailScreen.propTypes ={
  route:shape({
    params:shape({
      id:string
    }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#ffffff",
  },
  memoHeader:{
    paddingVertical:24,
    paddingHorizontal:19,
    justifyContent:"center",
    backgroundColor:"#467FD3",
    height:96,
  },
  memoTitle:{
    color:"#ffffff",
    fontSize:20,
    lineHeight:32,
    fontWeight:"bold",
  },
  memoDate:{
    color:"#ffffff",
    fontSize:12,
    lineHeight:16,
  },
  memoBody:{
    paddingVertical:32,
    paddingHorizontal: 27,
  },
  memoText:{
    fontSize:16,
    lineHeight:24,
  },
});

export default MemoDetailScreen;
