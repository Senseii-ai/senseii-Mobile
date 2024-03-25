import { View, Text } from "react-native";
import { IMessage } from "../App";

export interface MessageProps {
    item: IMessage
}


export default function Message({item}: MessageProps) {
  if (item.role === "user") {
    return (
      <View className="bg-[#AB93E0] self-end py-2 px-2 my-2">
        <Text className="text-white">{item.content}</Text>
      </View>
    );
  } else {
    return (
      <View className="bg-[#DCC1FF] self-start py-2 px-2 my-2">
        <Text className="text-white">{item.content}</Text>
      </View>
    );
  }
}
