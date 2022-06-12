/* eslint-disable no-unused-expressions */
export default class aviaService {
  searchId = ''

  static async getResourse(query) {
    try {
      const responce = await fetch(query)

      if (!responce.ok) {
        throw new Error(`Could not fetch ${query}, received ${responce.status}`)
      }

      const data = await responce.json()
      return data
    } catch {
      throw new Error('Could not fetch received')
    }
  }

  static async getSearchId() {
    const res = await this.getResourse('https://aviasales-test-api.kata.academy/search').then((data) => data.searchId)
    this.searchId = res
  }

  static async getTickets() {
    try {
      if (!this.searchId) {
        await this.getSearchId()
      }
      const res = await this.getResourse(`https://aviasales-test-api.kata.academy/tickets?searchId=${this.searchId}`)
      return res
    } catch {
      return -1
    }
  }
}
