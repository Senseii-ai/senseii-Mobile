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
import {
  BloodGlucoseRecord,
  BloodPressureRecord,
  BodyFatRecord,
  BodyTemperatureRecord,
  BodyWaterMassRecord,
  HeartRateRecord,
  HeartRateVariabilityRmssdRecord,
  HydrationRecord,
  OxygenSaturationRecord,
  RespiratoryRateRecord,
  RestingHeartRateRecord,
  Vo2MaxRecord,
} from 'react-native-health-connect/lib/typescript/types';

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
      const BoddyFatRecrod: BodyFatRecord = {
        recordType: 'BodyFat',
        percentage: 20,
        time: new Date().toISOString(),
      };

      const BloodPressureRecord: BloodPressureRecord = {
        recordType: 'BloodPressure',
        systolic: {
          value: 120,
          unit: 'millimetersOfMercury',
        },
        diastolic: {
          value: 80,
          unit: 'millimetersOfMercury',
        },
        time: new Date().toISOString(),
        bodyPosition: 2,
        measurementLocation: 2,
      };

      const bloodGlucoseRecord: BloodGlucoseRecord = {
        recordType: 'BloodGlucose',
        level: {
          value: 200,
          unit: 'milligramsPerDeciliter',
        },
        mealType: 2,
        specimenSource: 2,
        relationToMeal: 2,
        time: new Date().toISOString(),
      };

      const BodyTemperatureRecord: BodyTemperatureRecord = {
        recordType: 'BodyTemperature',
        temperature: {
          value: 98.6,
          unit: 'fahrenheit',
        },
        time: new Date().toISOString(),
      };

      const WaterMass: BodyWaterMassRecord = {
        recordType: 'BodyWaterMass',
        mass: {
          value: 200,
          unit: 'kilograms',
        },
        time: new Date().toISOString(),
      };

      const HeartRateRecords: HeartRateRecord = {
        recordType: 'HeartRate',
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        samples: [
          {
            beatsPerMinute: 20,
            time: new Date().toISOString(),
          },
        ],
      };

      const HeartRateVariability: HeartRateVariabilityRmssdRecord = {
        recordType: 'HeartRateVariabilityRmssd',
        heartRateVariabilityMillis: 20,
        time: new Date().toISOString(),
      };

      const HydrationRecord: HydrationRecord = {
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        recordType: 'Hydration',
        volume: {
          value: 20,
          unit: 'liters',
        },
      };

      const OxygenSaturationRecord: OxygenSaturationRecord = {
        recordType: 'OxygenSaturation',
        percentage: 20,
        time: new Date().toISOString(),
      };

      const RespiratoryRateRecord: RespiratoryRateRecord = {
        recordType: 'RespiratoryRate',
        rate: 20,
        time: new Date().toISOString(),
      };

      const RestingHeartRate: RestingHeartRateRecord = {
        recordType: 'RestingHeartRate',
        beatsPerMinute: 20,
        time: new Date().toISOString(),
      };

      const Vo2MaxRecord: Vo2MaxRecord = {
        recordType: 'Vo2Max',
        measurementMethod: 2,
        vo2MillilitersPerMinuteKilogram: 20,
        time: new Date().toISOString(),
      };

      console.log('This is what record looks like');
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
