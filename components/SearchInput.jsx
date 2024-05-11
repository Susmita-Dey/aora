import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const SearchInput = ({ otherStyles, ...props }) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="mt-0.5 text-white flex-1 font-pregular text-base"
        value={searchInput}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={setSearchInput}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;