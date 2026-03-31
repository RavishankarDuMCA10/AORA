import { View, Text, Image } from 'react-native'
import {Tabs, Redirect } from 'expo-router'

import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2 w-12">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs text-center`}>
        {name}
      </Text>
    </View>
  )  
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false
        }}
      >
        <Tabs.Screen  
          name="home"
          options={{
            title:"Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
              icon={icons.home}
              name="Home" 
              color={color} 
              focused={focused} />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout