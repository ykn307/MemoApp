import React from "react";
import {View, Text, StyleSheet,TouchableOpacity, Alert, FlatList} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {shape, string, instanceOf, arrayOf} from "prop-types";


const MemoList = (props) =>{
  const {memos} = props;
  const navigation = useNavigation();

const renderItem = ({item}) => {
  return(
    <TouchableOpacity
        style={styles.memoListItem}
        onPress={() =>{navigation.navigate("MemoDetail", {id: item.id});}}
        >
          <View>
          <Text style={styles.memoListItemTitle} numberOfLines={1}>{item.bodyText}</Text>
            <Text style={styles.memoListItemDate}>{String(item.updateAt)}</Text>
          </View>
          <TouchableOpacity
          style={styles.memoDelete}
          onPress={() =>{Alert.alert("Are you sure?");}}
          >
            <Text>X</Text>
          </TouchableOpacity>
        </TouchableOpacity>
  );

}

  return (
      <View>
        <FlatList
          data={memos}
          renderItem={renderItem}
          keyExtractor={(item) => {return item.id;}}
          />
    </View>


  );
}

MemoList.propTypes = {
  memos: arrayOf(shape({
    id: string,
    bodyText:string,
    updateAt:instanceOf(Date),
  })).isRequired,
};

const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor:"#ffffff",
    flexDirection:"row",
    justifyContent:"space-between",
    paddingVertical:16,
    paddingHorizontal:19,
    alignItems:"center",
    borderBottomWidth:1,
    borderColor:"rgba(0,0,0,0.15)",
  },
  memoListItemTitle:{
    fontSize:16,
    lineHeight:32,
  },
  memoListItemDate:{
    fontSize:12,
    lineHeight:16,
    color:"#848484",
  },
  memoDelete: {
    padding: 8,
  },
});

export default MemoList;
