import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"


// How this is going to be implemented
// 1: fetch data from health connect every 5 minutes
// 2: store the data in a local place
// 3: every 30 minutes, check compare the data from last sync
// 4: if the data is different, aggregate it on the basis of types of Data
// 5: make data type specific http calls to the server
export const HEALTH_DATA_SYNC_TASK = "health-data-sync"

TaskManager.defineTask(HEALTH_DATA_SYNC_TASK, async () => {
    const now = new Date()

    console.log("Get Background Fetch Data", now.toISOString())

    console.log(BackgroundFetch.BackgroundFetchResult)
    return BackgroundFetch.BackgroundFetchResult.NewData
})

// register the task
export async function registerBackgroundFetchAsync() {
    console.log("I was registered man")
    return BackgroundFetch.registerTaskAsync(HEALTH_DATA_SYNC_TASK, {
        minimumInterval: 1 * 60, // 5 minutes
        stopOnTerminate: false,
        startOnBoot: true,
    })
}

export async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(HEALTH_DATA_SYNC_TASK)
}

export async function checkStatusAsync(){
    return await BackgroundFetch.getStatusAsync()
}

export async function checkIsRegistered(){
    return await TaskManager.isTaskRegisteredAsync(HEALTH_DATA_SYNC_TASK)
}