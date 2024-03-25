import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  KeyboardAvoidingView,
  FlatList,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import axios from "axios";

type Message = {
  id: string;
  text: string;
};

const getMessages = async()=>{
  const messages = await axios.get("http://192.168.1.5:9090/api/threads/getThreadMessages")
  return messages?.data.body.data
}
export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Mono": require("./assets/fonts/Roboto_Mono/RobotoMono-VariableFont_wght.ttf"),
  });

  useEffect(()=>{
    const retrievedMessages = getMessages()
    setMessages(retrievedMessages)
  })

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleSend = async () => {
    if (currentMessage.trim()) {
      setMessages((previousMessages) => [
        { id: currentMessage, text: currentMessage },
        ...previousMessages,
      ]);
      setCurrentMessage("");
    }
    try {
      console.log(" i was run ");
      const response = await axios.post(
        "http://192.168.1.5:9090/api/chat/testChat",
        {
          message: currentMessage,
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  if (!fontsLoaded) {
    return null;
  }
  // return (
  //     <SafeAreaView className="bg-[#1A1A1A] h-full" >
  //       <View className="h-full mx-5 " >
  //         <Text className="text-white text-lg" style={{fontFamily: "Roboto-Mono"}}>
  //           Open what up App.tsx to start working on your app I don't know
  //         </Text>
  //         <StatusBar />
  //       </View>
  //     </SafeAreaView>
  // );
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <FlatList
          data={messages}
          inverted
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-blue-100 m-2 p-2 rounded-lg self-end">
              <Text className="text-black">{item.text}</Text>
            </View>
          )}
          className="flex-1"
        />

        <View className="flex-row items-center p-2">
          <TextInput
            placeholder="Type your message here..."
            className="flex-1 p-2 bg-gray-200 rounded-md"
            onChangeText={setCurrentMessage}
            value={currentMessage}
          />
          <TouchableOpacity
            onPress={handleSend}
            className="bg-blue-500 m-2 p-2 rounded-full"
          >
            <Text className="text-white">Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
