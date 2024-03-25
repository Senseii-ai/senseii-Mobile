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
import Message from "./components/Message";

// right now, create a sample application that will render an array of messages as a chat.

// this is the flow
// get the user message
// send the user message to the chat API
// wait for response, get a single string as the reponse, add it to the messages array
// render

export interface IMessage {
  content: string;
  role: "user" | "assistant";
}
const messageSample: IMessage[] = [
  {
    content: "Hello, how can I help you today ?",
    role: "assistant",
  },
  {
    content: "I am having a problem with my account",
    role: "user",
  },
];

export default function () {
  const [messages, setMessages] = useState<IMessage[]>(messageSample);
  console.log(messages);

  // const loadMessages = async()=>{
  //   const messages = messageSample
  //   setMessages(messages)
  //   return messages
  // }

  const [currentMessage, setCurrentMessage] = useState("");

  return (
    <SafeAreaView className="bg-[#1A1A1A] h-full ">
      <View>
        <View className="text-white">
          {/* <TextInput
            placeholder="This is test"
            onChangeText={setCurrentMessage}
          /> */}
          <Text className="text-white">is is wild{currentMessage}</Text>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.content}
            renderItem={({ item }) => {
              return (
                  <Message item={item} />
              );
            }}
            className="flex"
          />
        </View>
      </View>
      <StatusBar />
    </SafeAreaView>
  );
}
