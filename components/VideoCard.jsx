import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { ResizeMode, Video, VideoFullscreenUpdate } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";

//we recieve the fullscreen object from the video we're focusing on
const unlockRotation = async ({ fullscreenUpdate }) => {
  // if the video finished switching from normal to fullscreen we unlocck the rotation
  if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_PRESENT) {
    await ScreenOrientation.unlockAsync();
  }
  // else if the video finished switching back to normal we lock the screen in portrait
  else if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS) {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  }
};

const VideoCard = ({
  video: {
    title,
    thumbnail,
    prompt,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary items-center p-0/5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-gray-100 font-pregular text-xs"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <Video
          className="w-full h-60 rounded-xl mt-3"
          source={{ uri: video }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (!status) {
              console.log("No Playback Status");
            }
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
          onFullscreenUpdate={unlockRotation} //<----- This is the new line of code
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            setPlay(true);
          }}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
