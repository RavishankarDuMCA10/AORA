import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants';
// import { ResizeMode, Video } from "expo-av";
import { useVideoPlayer, VideoView } from 'expo-video';

const VideoCard = ({video: { title, thumbnail, video, creator: { username, avatar }}}) => {

    const [play, setPlay] = useState(false);
    const player = useVideoPlayer(video, (player) => {
        player.loop = true;
        player.play();
    });
    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                        <Image source={{uri: avatar}} 
                        className="w-full h-full rounded-lg"
                        resizeMode='contain' />
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{title}</Text>
                        <Text className="text-gray-100 font-pregular text-xs" numberOfLines={1}>{username}</Text>
                    </View>
                </View>
                <View className="pt-2">
                    <Image source={icons.menu} className="w-5 h-5" resizeMode='contain' />
                </View>
            </View>   
            {play ? (                
                <VideoView 
                    style={styles.video} 
                    player={player} 
                    allowsFullscreen 
                    allowsPictureInPicture 
                />
            ) : (
                <TouchableOpacity 
                activeOpacity={0.7}
                className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
                onPress={() => setPlay(true)}
                >
                    <Image 
                    source={{uri: thumbnail}}
                    className="w-full h-full rounded-lg"
                    resizeMode='contain' />
                    <Image
                    source={icons.play}
                    className="w-12 h-12 absolute"
                    resizeMode='contain'
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default VideoCard;


const styles = StyleSheet.create({
  video: { width: 350, height: 275 },
  contentContainer: { flex: 1, padding: 10, alignItems: 'center' },
});