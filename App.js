import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-web';
// import { Octokit } from "octokit";

const githubToken = process.env.EXPO_PUBLIC_GITHUB_PERSONAL_TOKEN;
// const octokit = new Octokit({ 
  //   auth: githubToken
  // });
const mylist = [{title:'oh'}, {title:'yes'}, {title:'cool'}]
let myState = 'oooh lala'
async function getIssues(){
  try{
      const api = await fetch(
        `https://api.github.com/issues`,
        {
          headers: new Headers({
            'Authorization':`Bearer ${githubToken}`,
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/x-www-form-urlencoded',
          })
        }
      ) 
        
      const data = await api.json();
      console.log(data);
      return data;

  }catch(error){
      console.log(`fetch errored ${error}`);
  }
}
const d = getIssues();
// console.log(d)


export default function App() {
  
  console.log('hi');
  console.log('token is ' + githubToken)

  return (
    <View style={styles.container}>
      <FlatList
        data={mylist}
        renderItem={({item}) => <Text style={styles.item}>{item.title}</Text>}
      />
      <Text>mystate {myState}</Text>
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
