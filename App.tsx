import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  initialize,
  requestPermission,
  readRecords,
  getGrantedPermissions,
  insertRecords,
} from 'react-native-health-connect';

export default function App() {
  useEffect(() => {
    const getHealthData = async () => {
      // inittiliaze the client
      const isInitialized = await initialize();
      console.log('What happened here ?', isInitialized);

      // request permissions
      const grantedPermissions = await requestPermission([
        {
          accessType: 'read',
          recordType: 'Steps',
        },
        {
          accessType: 'write',
          recordType: 'Steps',
        },
      ]);

      const checkGrantedPermissions = await getGrantedPermissions();
      console.log('Checking here ', checkGrantedPermissions);

      const now = new Date();
      now.setHours(14, 0, 0, 0);
      const startTime = now.toISOString();

      const startTimeObject = new Date(startTime);

      startTimeObject.setHours(startTimeObject.getHours() + 2);

      const endTime = startTimeObject.toISOString();

      // trying to write some records.
      const steps = await insertRecords([
        {
          recordType: 'Steps',
          count: 500,
          startTime: startTime,
          endTime: endTime,
        },
      ]);

      const getSteps = await readRecords('Steps', {
        timeRangeFilter: {
          operator: 'after',
          startTime: startTime,
        },
      });

      console.log('This is what record looks like', getSteps);
    };

    getHealthData();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
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
});
