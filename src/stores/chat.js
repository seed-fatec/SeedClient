import { defineStore } from "pinia";
import { useApi } from "~/composables/api";

export const useChatStore = defineStore("chat", {
  actions: {
    sendMessage(userId, message) {
      return useApi(`/users/${userId}/chat`).post({ message }).json();
    },
    getMessages(userId) {
      return useApi(`/users/${userId}/chat`).get().json();
    },
  },
});
