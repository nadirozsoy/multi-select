import MultiSelect from '@/components/shared/MultiSelect/MultiSelect'
import { useCharacters } from '@/features/useCharacters'
import { useLocations } from '@/features/useLocations'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export default function Homepage() {
  const {
    characters,
    fetchNextPage: fetchNextPageCharacters,
    hasNextPage: hasNextPageCharacters,
    isFetchingNextPage: isFetchingNextPageCharacters,
    handleSearch: handleSearchCharacters,
    isLoading: isLoadingCharacters,
    isError: isErrorCharacters,
    error: errorCharacters
  } = useCharacters()
  const {
    locations,
    fetchNextPage: fetchNextPageLocations,
    isFetchingNextPage: isFetchingNextPageLocations,
    hasNextPage: hasNextPageLocations,
    handleSearch: handleSearchLocations,
    isLoading: isLoadingLocations,
    isError: isErrorLocations,
    error: errorLocations
  } = useLocations()
  const { ref: charactersIntersectionRef, inView: charactersInView } = useInView()
  const { ref: locationsIntersectionRef, inView: locationsInView } = useInView()

  useEffect(() => {
    if (charactersInView) {
      fetchNextPageCharacters()
    }
  }, [charactersIntersectionRef, charactersInView])

  useEffect(() => {
    if (locationsInView) {
      fetchNextPageLocations()
    }
  }, [locationsIntersectionRef, locationsInView])

  return (
    <div className='containerSmall mt-12'>
      <div className='mx-auto flex w-fit flex-col items-center gap-4'>
        <MultiSelect
          options={characters?.pages}
          handleSearch={handleSearchCharacters}
          isLoading={isLoadingCharacters}
          isError={isErrorCharacters}
          error={errorCharacters}
        >
          <button
            ref={charactersIntersectionRef}
            onClick={() => fetchNextPageCharacters()}
            disabled={!hasNextPageCharacters || isFetchingNextPageCharacters}
            className='mt-auto h-fit w-full rounded-lg bg-primary p-2 font-medium text-white'
          >
            {isFetchingNextPageCharacters ? (
              <Loader2 className='mx-auto mt-4 animate-spin' />
            ) : hasNextPageCharacters ? (
              'Load Newer'
            ) : (
              'Nothing more to load'
            )}
          </button>
        </MultiSelect>
        <MultiSelect
          options={locations?.pages}
          handleSearch={handleSearchLocations}
          isLoading={isLoadingLocations}
          isError={isErrorLocations}
          error={errorLocations}
        >
          <button
            ref={locationsIntersectionRef}
            onClick={() => fetchNextPageLocations()}
            disabled={!hasNextPageLocations || isFetchingNextPageLocations}
            className='mt-auto h-fit w-full rounded-lg bg-primary p-2 font-medium text-white'
          >
            {isFetchingNextPageLocations ? (
              <Loader2 className='mx-auto mt-4 animate-spin' />
            ) : hasNextPageLocations ? (
              'Load Newer'
            ) : (
              'Nothing more to load'
            )}
          </button>
        </MultiSelect>
      </div>
    </div>
  )
}
