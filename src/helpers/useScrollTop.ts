export function useScrollTop(scrollContainerRef: React.RefObject<HTMLDivElement>) {
  const handleScrollTop = () => {
    if (scrollContainerRef.current && scrollContainerRef.current.scrollTop !== 0) {
      scrollContainerRef.current.scrollTop = 0
    }
  }
  return { handleScrollTop }
}
