import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { RootToaster, Toast } from 'react-native-root-toaster';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Click on the following button to display a Toast</Text>
      <RootToaster text={'Default text'} />
      <Button title="Press Me" onPress={() => Toast.show('Hello world!')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
