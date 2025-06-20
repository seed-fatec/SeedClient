import { defineStore } from 'pinia'
import { useSignalR } from '../composables/signalr'

export const useSignalRStore = defineStore('signalr', {
  state: () => ({
    connection: null,
    isConnected: false
  }),
  actions: {
    async connect() {
      const signalr = useSignalR()
      await signalr.startConnection()

      if (signalr.connection.value) {
        this.connection = signalr.connection.value
        this.isConnected = signalr.isConnected
      }
    },
    async disconnect() {
      if (this.connection) {
        await this.connection.stop()
        this.isConnected = false
        this.connection = null
      }
    }
  }
})
