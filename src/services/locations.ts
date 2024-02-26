import instance from '@/config/instance'

export default {
  getLocations(page?: number | null, name?: string | null) {
    return instance.get('/location', {
      params: {
        page,
        name
      }
    })
  }
}
