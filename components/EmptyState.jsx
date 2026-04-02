import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const EmptyState = ({title, subtitle}) => {
  return (
    <View className="justify-center items-center px-4">
        <Image 
        source={ images.empty }
        className="w-[270px] h-[215px]"
        resizeMode='contain'
        />
        <Text className="text-xl text-white font-psemibold mt-2">
            {title}
        </Text>
        <Text className="text-sm text-gray-100 font-pmedium">
            {subtitle}
        </Text> 
        <CustomButton 
            title="Create Video"
            handlePress={() => router.push('/create')}
            containerStyles="w-full py-5"
        />       
    </View>
  )
}

export default EmptyState