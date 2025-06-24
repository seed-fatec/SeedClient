import * as signalR from "@microsoft/signalr";
import { signalrUrl } from '~/config/env';
import { onUnmounted, ref } from "vue";
import { useAuthStore } from "../stores/auth";

export function useSignalR() {
  const connection = ref(null);
  const isConnected = ref(false);
  const authStore = useAuthStore();

  async function startConnection() {
    if (!authStore.accessToken)
      throw new Error("Token de acesso não encontrado");
    connection.value = new signalR.HubConnectionBuilder()
      .withUrl(signalrUrl, {
        accessTokenFactory: () => authStore.accessToken,
      })
      .withAutomaticReconnect()
      .build();

    connection.value.onclose(() => {
      isConnected.value = false;
    });

    await connection.value.start();
    isConnected.value = true;
  }

  async function stopConnection() {
    if (connection.value) {
      await connection.value.stop();
      isConnected.value = false;
    }
  }

  onUnmounted(() => {
    stopConnection();
  });

  return {
    connection,
    isConnected,
    startConnection,
    stopConnection,
  };
}
