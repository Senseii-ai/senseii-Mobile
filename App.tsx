import { StatusBar } from "expo-status-bar";
import { Button } from "react-native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  initialize,
  requestPermission,
  insertRecords,
} from "react-native-health-connect";
import { StepsRecord } from "react-native-health-connect/lib/typescript/types";
import {
  registerBackgroundFetchAsync,
  unregisterBackgroundFetchAsync,
  checkIsRegistered,
  checkStatusAsync,
} from "./backgroud/healthDataSync";

const insertStepsCount = async () => {
  const now = new Date();
  now.setHours(9, 0, 0, 0);
  const startTime = now.toISOString();
  const startTimeObject = new Date(startTime);
  startTimeObject.setHours(startTimeObject.getHours() + 2);
  const endTime = startTimeObject.toISOString();

  const steps: StepsRecord = {
    recordType: "Steps",
    count: 500,
    startTime,
    endTime,
  };

  const insertedRecords = await insertRecords([steps]);
  return insertedRecords;
};

const getHealthData = async () => {
  const isInitialized = await initialize();
  if (!isInitialized) {
    console.log("Failed to initialize");
  }

  const grantedPermissions = await requestPermission([
    {
      accessType: "read",
      recordType: "Steps",
    },
    {
      accessType: "write",
      recordType: "Steps",
    },
  ]);

  const insertedRecords = await insertStepsCount();
  console.log("Inserted records", insertedRecords);
};

export default function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // getHealthData();
    check();
  }, []);

  const check = async () => {
    const isRegistered = await checkIsRegistered();
    setIsRegistered(isRegistered);
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
