import { View, Text, FlatList } from 'react-native'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'


const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch} = useAppwrite(() => searchPosts(query));

  console.log('Search results for query: ', query);
  console.log(posts);

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}

        ListHeaderComponent={() => (
          <View className="my-6 px-4"> 
            <Text className="text-sm text-gray-100 font-pmedium">
              Search Results
            </Text>
            <Text className="text-2xl text-white font-psemibold">
              {query}
            </Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />                                                          
            </View>            
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos found"
            subtitle="No videos found for this search query."
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search