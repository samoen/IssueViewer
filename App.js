import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const githubToken = process.env.EXPO_PUBLIC_GITHUB_PERSONAL_TOKEN;
const stack = createNativeStackNavigator();

export default function App() {

  const [issueList, setIssueList] = useState([])
  const [loading, setLoading] = useState(false)

  const getIssues = async ()=>{
    setLoading(true)
    try {
      const api = await fetch(
        `https://api.github.com/issues`,
        {
          headers: new Headers({
            'Authorization': `Bearer ${githubToken}`,
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/x-www-form-urlencoded',
          })
        }
      )
      const data = await api.json();
      // console.log(data);
      setIssueList(data)
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  }

  const IssueListScreenInner = ({ navigation }) => {
    if (loading) {
      return (
        <ActivityIndicator size="large" />
      )
    }
    if (issueList.length < 1) {
      return (
        <Button onPress={getIssues} title='Get Issues' />
      )
    }
    return (
      <>
        <Button onPress={getIssues} title='Refresh Issues' />
        <FlatList
          data={issueList}
          renderItem={({ item }) => issueListItem({ navigation, item })}
        />
      </>
    );
  };

  const IssueListScreen = ({ navigation }) => {
    return (
      <View style={styles.content}>
        <IssueListScreenInner navigation={navigation}></IssueListScreenInner>
      </View>
    )
  };

  const ViewIssueScreen = ({ navigation, route }) => {
    return (
      <View style={styles.content}>
        <Text>Issue Number: {route.params.number}</Text>
        <Text>Title: {route.params.title}</Text>
        <Text>Created At: {route.params.created_at}</Text>
        <Text>Body: {route.params.body}</Text>
      </View>
    )
  };

  const issueListItem = ({ navigation, item }) => {
    return (
      <Pressable onPress={() => navigation.navigate('View Issue', item)} style={styles.item}>
        <Text>{item.title}</Text>
      </Pressable>
    )
  };

  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="Issues List"
          component={IssueListScreen}
        />
        <stack.Screen
          name="View Issue"
          component={ViewIssueScreen}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: '20px',
    marginHorizontal: '20px',
  },
  item: {
    backgroundColor: 'pink',
    marginTop: '10px',
    padding: '10px',
  }
});
