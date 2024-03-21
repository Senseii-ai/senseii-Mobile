import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView} from "react-native-safe-area-context";
import {useFonts} from "expo-font"

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Mono": require("./assets/fonts/Roboto_Mono/RobotoMono-VariableFont_wght.ttf"),
  })

  if (!fontsLoaded) {
    return null
  }
  return (
      <SafeAreaView className="bg-[#1A1A1A] h-full" >
        <View className="h-full mx-5 " >
          <Text className="text-white text-lg" style={{fontFamily: "Roboto-Mono"}}>
            Open what up App.tsx to start working on your app I don't know
          </Text>
          <StatusBar />
        </View>
      </SafeAreaView>
  );
}
