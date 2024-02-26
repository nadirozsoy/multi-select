import { locations as locationsApi } from '@/services'

export async function setLocations(page?: number | null, name?: string | null) {
  const { data: res } = await locationsApi.getLocations(page, name)
  return res
}
