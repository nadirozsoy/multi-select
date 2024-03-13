/* eslint-disable @typescript-eslint/no-explicit-any */
import { setCharacters } from '@/stores/characters'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'

export function useCharacters() {
  const queryClient = useQueryClient()

  const {
    data: characters,
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    isSuccess,
    hasNextPage,
    error
  } = useInfiniteQuery({
    queryKey: ['characters'],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) => setCharacters(pageParam),
    getNextPageParam: (lastPage: unknown, pages: unknown[]) => {
      if ((lastPage as any).info?.next) {
        return pages.length + 1
      } else {
        return
      }
    },
    initialPageParam: 1,
    staleTime: 1000 * 60
  })

  const handleSearch = async (value?: string | null) => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['characters'],
      queryFn: ({ pageParam }: { pageParam?: number }) => setCharacters(pageParam, value),
      initialPageParam: 1,
      getNextPageParam: (lastPage: unknown, pages: unknown[]) => {
        if ((lastPage as any).info?.next) {
          return pages.length + 1
        } else {
          return
        }
      }
    })
  }

  const transformedCharacters = characters?.pages
    .map(page => page.results)
    .flat()
    .map((character: any) => ({
      value: character.id,
      label: character.name,
      image: character.image,
      episode: character.episode
    }))

  return {
    transformedCharacters,
    characters,
    isLoading,
    isError,
    isSuccess,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    handleSearch,
    error
  }
}
