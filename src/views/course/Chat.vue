<script setup>
import { ref, computed, nextTick, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useUsersStore } from "~/stores/users";
import { useSignalRStore } from "~/stores/signalr";
import { useChatStore } from "~/stores/chat";
import { useAuthStore } from "~/stores/auth";
import ChatHeader from "~/blocks/ChatHeader.vue";
import ChatInput from "~/components/ChatInput.vue";
import ChatMessage from "~/blocks/ChatMessage.vue";

const newMessage = ref("");
const textareaInput = ref(null);
const messagesContainer = ref(null);
const messages = ref([]);

const route = useRoute();
const recipientId = route.params.id;

const usersStore = useUsersStore();
const signalrStore = useSignalRStore();
const chatStore = useChatStore();
const authStore = useAuthStore();

const { data: currentUser } = authStore.me();
const { execute: executeRecipient, data: recipientData } =
  usersStore.getById(recipientId);
const { data: chatMessages, execute: fetchMessages } =
  chatStore.getMessages(recipientId);

executeRecipient();

const recipient = computed(() => recipientData.value);

const adjustTextareaHeight = () => {
  if (textareaInput.value) {
    textareaInput.value.style.height = "auto";
    textareaInput.value.style.height = `${textareaInput.value.scrollHeight}px`;
  }
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

function formatTime(ts) {
  if (!ts) return "";
  const date = new Date(ts);
  if (isNaN(date.getTime())) return "";
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
}

watch(
  [chatMessages, currentUser],
  ([newVal, user]) => {
    if (newVal && Array.isArray(newVal.messages) && user) {
      messages.value = newVal.messages.map((msg) => {
        return {
          id: msg.id,
          avatarUrl: msg.sender_id == user.id ? user.avatar_url : recipient.value.avatar_url,
          senderName: msg.sender_id == user.id ? user.name : recipient.value.name,
          senderId: msg.sender_id,
          recipientId: msg.recipient_id,
          content: msg.content,
          timestamp: formatTime(msg.timestamp),
          sent: true,
        };
      });
    }
  },
  { immediate: true }
);

onMounted(async () => {
  await fetchMessages();

  if (!signalrStore.connection) {
    await signalrStore.connect();
  }

  if (signalrStore.connection) {
    signalrStore.connection.onreconnected = () => {};

    signalrStore.connection.on("ReceiveMessage", (data) => {
      messages.value.push({
        id: data.message.id,
        senderId: data.message.sender_id,
        avatarUrl: data.message.sender_id == currentUser.value.id ? currentUser.value.avatar_url : recipient.value.avatar_url,
        senderName: data.message.sender_id == currentUser.value.id ? currentUser.value.name : recipient.value.name,
        recipientId: data.message.recipient_id,
        content: data.message.content,
        timestamp: formatTime(data.message.timestamp),
        sent: true,
      });
      nextTick(() => scrollToBottom());
    });
  }

  nextTick(() => scrollToBottom());
});

const sendMessage = () => {
  if (newMessage.value.trim() === "") return;

  messages.value.push({
    id: Date.now(),
    avatarUrl: currentUser.value.avatar_url,
    senderName: currentUser.value.name,
    senderId: currentUser.value.id,
    recipientId: recipientId,
    content: newMessage.value.trim(),
    timestamp: formatTime(),
    sent: false,
  });

  const { execute: send } = chatStore.sendMessage(
    recipientId,
    newMessage.value
  );

  send().then(() => {
    const msg = messages.value.find(
      (m) => !m.sent && m.senderId === currentUser.value.id
    );
    if (msg) {
      msg.sent = true;
    }
  });

  newMessage.value = "";
  nextTick(() => {
    adjustTextareaHeight();
    scrollToBottom();
  });
};
</script>

<template>
  <div
    class="flex h-[calc(100vh-64px)] bg-base-100 overflow-y-hidden border-t border-t-base-300"
  >
    <div class="flex-1 flex flex-col min-h-0">
      <ChatHeader
        v-if="recipient"
        :username="recipient?.name"
        :avatarSrc="recipient.avatar_url"
      />

      <div
        ref="messagesContainer"
        class="flex-1 p-4 space-y-4 overflow-y-auto bg-base-200/30"
      >
        <ChatMessage
          v-for="message in messages"
          :key="message.id + '-sent'"
          :message="message"
          :currentUserId="currentUser.id"
        />
      </div>

      <div class="p-4 bg-base-100 border-t border-base-300">
        <ChatInput v-model="newMessage" @send="sendMessage" />
      </div>
    </div>
  </div>
</template>
