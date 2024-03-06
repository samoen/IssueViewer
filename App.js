import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-web';

const mylist = [{title:'oh'}, {title:'yes'}, {title:'cool'}]

export default function App() {
  
  return (
    <View style={styles.container}>
      <FlatList
        data={
          mylist
        }
        renderItem={({item}) => <Text style={styles.item}>{item.title}</Text>}
      />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item:{
    backgroundColor:'pink',
    marginTop:'5px'
  }
});
