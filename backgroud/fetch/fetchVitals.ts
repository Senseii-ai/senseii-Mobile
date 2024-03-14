// get data every 5 minutes

import { BloodGlucoseRecord } from "react-native-health-connect/lib/typescript/types"
import { getGrantedPermissions, initialize, requestPermission } from "react-native-health-connect"

export const getBloodGlucose = async()=>{
    // const isInitialized = await initialize()
    const isInitialized = await initialize()
    const grantedPermissions = await getGrantedPermissions()
    console.log('Checking here check ', grantedPermissions);

    const requestedPermission = await requestPermission([{
        accessType: 'read',
        recordType: 'ActiveCaloriesBurned'
    }])

    console.log(requestedPermission)
    console.log("check this", await getGrantedPermissions())
}