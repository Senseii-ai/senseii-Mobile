// get data every 5 minutes

import { BloodGlucoseRecord } from "react-native-health-connect/lib/typescript/types";
import {
  getGrantedPermissions,
  initialize,
  requestPermission,
  insertRecords,
} from "react-native-health-connect";

export const getBloodGlucose = async () => {
  // const isInitialized = await initialize()
  const isInitialized = await initialize();
  const grantedPermissions = await getGrantedPermissions();
  console.log("Checking here check ", grantedPermissions);

  const requestedPermission = await requestPermission([
    {
      accessType: "read",
      recordType: "ActiveCaloriesBurned",
    },
  ]);

  console.log(requestedPermission);
  console.log("check this", await getGrantedPermissions());
};

export const writeSteps = async () => {
  const isInitialized = await initialize();
  const grantedPermissions = await getGrantedPermissions();
  console.log("Checking here check ", grantedPermissions);

  const requestedPermission = await requestPermission([
    {
      accessType: "write",
      recordType: "Steps",
    },
  ]);

  const now = new Date();
  now.setHours(14, 0, 0, 0);
  const startTime = now.toISOString();

  const startTimeObject = new Date(startTime);

  startTimeObject.setHours(startTimeObject.getHours() + 2);

  const endTime = startTimeObject.toISOString();

  // trying to write some records.
  const steps = await insertRecords([
    {
      recordType: "Steps",
      count: 500,
      startTime: startTime,
      endTime: endTime,
    },
  ]);
};
