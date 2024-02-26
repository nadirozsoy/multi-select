import instance from '@/config/instance'

export default {
  getCharacters(page?: number | null, name?: string | null) {
    return instance.get('/character', {
      params: {
        page,
        name
      }
    })
  }
}
