import { StatusBar } from "expo-status-bar";
import { Button } from "react-native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getBloodGlucose } from "./backgroud/fetch/fetchVitals";
import {
  registerBackgroundFetchAsync,
  unregisterBackgroundFetchAsync,
  checkIsRegistered,
  checkStatusAsync,
  HEALTH_DATA_SYNC_TASK
} from "./backgroud/healthDataSync";
import useHealthConnect from "./hooks/healthConnect";

export default function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const {testHook} = useHealthConnect()

  // testHook()


  useEffect(() => {
    // getHealthData();
    const getHealthData = async () => {
      await getBloodGlucose()
    }
    // check();
    //getHealthData()
  }, []);

  const check = async () => {
    const isRegistered = await checkIsRegistered();
    console.log("isRegistered", isRegistered)

    setIsRegistered(isRegistered)
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }

      check();
  };
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app I don't know</Text>
      <StatusBar style="auto" />
      <Text>Background Fetch task name: {' '}          <Text >
            {isRegistered ? HEALTH_DATA_SYNC_TASK: 'Not registered yet!'}
          </Text></Text>
      <Button
        title={
          isRegistered
            ? "Unregister BackgroundFetch task"
            : "Register BackgroundFetch task"
        }
        onPress={toggleFetchTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
