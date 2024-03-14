import { useEffect, useState } from "react";
import {
  getGrantedPermissions,
  initialize,
  readRecord,
  requestPermission,

} from "react-native-health-connect";
import { Permission } from "react-native-health-connect/lib/typescript/types";

export const useHealthConnect = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [grantedPermissions, setGrantedPermissions] = useState([] as Permission[])

  useEffect(() => {
    init();
  });

  // initialize the Health Connect client
  const init = async () => {
    try {
      const initialized = await initialize();
      if (initialized) {
        setIsInitialized(true);
        return true;
      } else {
        throw new Error("Failed to initialize health connect");
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  };

  // To request permissions
  const requestForPermissions= async (requestedPermissions: Permission[]) => {
    try {
    const newPermissions = await requestPermission(requestedPermissions)
    const isEqual = compareObjects(requestedPermissions, newPermissions)
    if (!isEqual){
        throw new Error("Failed to request permissions")
    }
    const updatedPermissions = await getGrantedPermissions()
    setGrantedPermissions(updatedPermissions)
    } catch (error) {
        console.error(error);
    }
  }

  // get all the granted Permissions
  const getPermissions = async (): Promise<Permission[]> => {
    const grantedPermissions = await getGrantedPermissions();
    return grantedPermissions;
  };
};

const compareObjects = (requestedPermissions: Permission[], grantedPermissions: Permission[])=> {
    if (requestedPermissions.length !== grantedPermissions.length){
        return false
    }

    for(let i = 0; i < requestedPermissions.length; i++){
        if (requestedPermissions[i].accessType !== grantedPermissions[i].accessType || requestedPermissions[i].recordType !== grantedPermissions[i].recordType){
            return false
    }
    return true
}}