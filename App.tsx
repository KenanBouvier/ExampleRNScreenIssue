import * as React from 'react';
import {
  View,
  Text,
  RefreshControl,
  SectionList,
  Button,
  ScrollView,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import {useState} from 'react';
import {sectionData} from './data';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useHeaderHeight} from '@react-navigation/elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function HomeScreen() {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLargeTitleShadowVisible: true,
      headerShown: true,
      headerTransparent: true,
      headerSearchBarOptions: {
        placeholder: 'Search',
        cancelButtonText: 'Cancel',
      },
    });
  }, [navigation]);

  return (
    <View
      style={{
        marginTop: headerHeight,
        flexGrow: 1,
        marginBottom: insets.bottom,
      }}>
      <>
        <SectionList
          sections={sectionData}
          contentInsetAdjustmentBehavior="automatic"
          keyExtractor={(item, index) => item + index}
          initialNumToRender={60}
          maxToRenderPerBatch={60}
          refreshControl={
            <RefreshControl
              tintColor={'black'}
              progressViewOffset={40}
              refreshing={isRefreshing}
              onRefresh={async () => {
                setIsRefreshing(true);
                await new Promise(res => {
                  setTimeout(() => res(undefined), 1000);
                });
                setIsRefreshing(false);
              }}
              size={100}
            />
          }
          renderItem={({item}) => (
            <View>
              <Text>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={{backgroundColor: '#d3d3d3', fontSize: 20}}>
              {title}
            </Text>
          )}
        />
      </>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function HomeScreen1() {
  const navigation = useNavigation();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{flexGrow: 1, backgroundColor: 'gray'}}>
      <Text>Hello</Text>
      <Button
        onPress={() => {
          // @ts-ignore
          navigation.navigate('Home');
        }}
        title="Home"
      />
    </ScrollView>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{contentStyle: {backgroundColor: 'white'}}}>
        <Stack.Screen
          name="Home1"
          component={HomeScreen1}
          options={{
            headerLargeTitle: true,
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerLargeTitle: true,
            headerTransparent: true,
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
