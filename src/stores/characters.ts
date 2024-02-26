import { characters as charactersApi } from '@/services'

export async function setCharacters(page?: number | null, name?: string | null) {
  const { data: res } = await charactersApi.getCharacters(page, name)
  return res
}
