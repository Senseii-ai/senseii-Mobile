import { readRecords } from "react-native-health-connect";
import {
  ReadRecordsOptions,
  RecordResult,
} from "react-native-health-connect/lib/typescript/types";

export interface IVitals {
  bloodGlucose: RecordResult<"BloodGlucose">[];
  bloodPressure: RecordResult<"BloodPressure">[];
  bodyFat: RecordResult<"BodyFat">[];
  bodyTemperature: RecordResult<"BodyTemperature">[];
  waterMass: RecordResult<"BodyWaterMass">[];
  heartRate: RecordResult<"HeartRate">[];
  heartRateVariability: RecordResult<"HeartRateVariabilityRmssd">[];
  hydrationRecord: RecordResult<"Hydration">[];
  oxygenSaturation: RecordResult<"OxygenSaturation">[];
  respiratoryRate: RecordResult<"RespiratoryRate">[];
  restingHeartRate: RecordResult<"RestingHeartRate">[];
  vo2Max: RecordResult<"Vo2Max">[];
}

export const getGlucoseRecords = async (
  options: ReadRecordsOptions
): Promise<RecordResult<"BloodGlucose">[]> => {
  try {
    const records = await readRecords("BloodGlucose", options);
    return records;
  } catch (error) {
    console.error("Error fetching glucose records");
    throw error;
  }
};

export const getBloodPressureRecords = async (
  options: ReadRecordsOptions
): Promise<RecordResult<"BloodPressure">[]> => {
  try {
    const records = await readRecords("BloodPressure", options);
    return records;
  } catch (error) {
    console.error("Error fetching blood pressure records");
    throw error;
  }
};

export const getBodyFatRecords = async (
  options: ReadRecordsOptions
): Promise<RecordResult<"BodyFat">[]> => {
  try {
    const records = await readRecords("BodyFat", options);
    return records;
  } catch (error) {
    console.error("Error fetching body fat records");
    throw error;
  }
};

export const getBodyTemperatureRecords = async (
  options: ReadRecordsOptions
): Promise<RecordResult<"BodyTemperature">[]> => {
  try {
    const records = await readRecords("BodyTemperature", options);
    return records;
  } catch (error) {
    console.error("Error fetching body temperature records");
    throw error;
  }
};

export const getWaterMassRecords = async (
  options: ReadRecordsOptions
): Promise<RecordResult<"BodyWaterMass">[]> => {
  try {
    const records = await readRecords("BodyWaterMass", options);
    return records;
  } catch (error) {
    console.error("Error fetching water mass records");
    throw error;
  }
};

export const getHeartRateRecords = async (
  options: ReadRecordsOptions
): Promise<RecordResult<"HeartRate">[]> => {
  try {
    const records = await readRecords("HeartRate", options);
    return records;
  } catch (error) {
    console.error("Error fetching heart rate records");
    throw error;
  }
};

export const getHeartRateVariabilityRecords = async (
  options: ReadRecordsOptions
) => {
  try {
    const records = await readRecords("HeartRateVariabilityRmssd", options);
    return records;
  } catch (error) {
    console.error("Error fetching heart rate variability records");
    throw error;
  }
};

export const getHydrationRecords = async (options: ReadRecordsOptions) => {
  try {
    const records = await readRecords("Hydration", options);
    return records;
  } catch (error) {
    console.error("Error fetching hydration records");
    throw error;
  }
};

export const getOxygenSaturationRecords = async (
  options: ReadRecordsOptions
) => {
  try {
    const records = await readRecords("OxygenSaturation", options);
    return records;
  } catch (error) {
    console.error("Error fetching oxygen saturation records");
    throw error;
  }
};

export const getRespiratoryRateRecords = async (
  options: ReadRecordsOptions
) => {
  try {
    const records = await readRecords("RespiratoryRate", options);
    return records;
  } catch (error) {
    console.error("Error fetching respiratory rate records");
    throw error;
  }
};

export const getRestingHeartRateRecords = async (
  options: ReadRecordsOptions
) => {
  try {
    const records = await readRecords("RestingHeartRate", options);
    return records;
  } catch (error) {
    console.error("Error fetching resting heart rate records");
    throw error;
  }
};

export const getVo2MaxRecords = async (options: ReadRecordsOptions) => {
  try {
    const records = await readRecords("Vo2Max", options);
    return records;
  } catch (error) {
    console.error("Error fetching vo2 max records");
    throw error;
  }
};

export const getVitalsRecords = async (options: ReadRecordsOptions): Promise<IVitals> => {
  try {
    let vitals = {} as IVitals;

    const glucoseRecords = await getGlucoseRecords(options);
    const bloodPressureRecords = await getBloodPressureRecords(options);
    const bodyFatRecords = await getBodyFatRecords(options);
    const bodyTemperatureRecords = await getBodyTemperatureRecords(options);
    const waterMassRecords = await getWaterMassRecords(options);
    const heartRateRecords = await getHeartRateRecords(options);
    const heartRateVariabilityRecords = await getHeartRateVariabilityRecords(
      options
    );
    const hydrationRecords = await getHydrationRecords(options);
    const oxygenSaturationRecords = await getOxygenSaturationRecords(options);
    const respiratoryRateRecords = await getRespiratoryRateRecords(options);
    const restingHeartRateRecords = await getRestingHeartRateRecords(options);
    const vo2MaxRecords = await getVo2MaxRecords(options);

    vitals = {
      bloodGlucose: glucoseRecords,
      bloodPressure: bloodPressureRecords,
      bodyFat: bodyFatRecords,
      bodyTemperature: bodyTemperatureRecords,
      waterMass: waterMassRecords,
      heartRate: heartRateRecords,
      heartRateVariability: heartRateVariabilityRecords,
      hydrationRecord: hydrationRecords,
      oxygenSaturation: oxygenSaturationRecords,
      respiratoryRate: respiratoryRateRecords,
      restingHeartRate: restingHeartRateRecords,
      vo2Max: vo2MaxRecords,
    };
    return vitals;
  } catch (error) {
    console.error(error);
    throw error
  }
};
