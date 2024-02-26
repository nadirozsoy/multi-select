/* eslint-disable @typescript-eslint/no-explicit-any */
import { setLocations } from '@/stores/locations'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'

export function useLocations() {
  const queryClient = useQueryClient()

  const {
    data: locations,
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    isSuccess,
    hasNextPage,
    error
  } = useInfiniteQuery({
    queryKey: ['locations'],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) => setLocations(pageParam),
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
      queryKey: ['locations'],
      queryFn: ({ pageParam }: { pageParam?: number }) => setLocations(pageParam, value),
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

  return {
    locations,
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
