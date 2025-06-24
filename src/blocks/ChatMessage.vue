<script setup>
const props = defineProps({
  message: { type: Object, required: true },
  currentUserId: { type: [String, Number], required: true },
});

const isCurrentUser = props.message.senderId === props.currentUserId;
</script>

<template>
  <div class="chat" :class="isCurrentUser ? 'chat-end' : 'chat-start'">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img :src="'https://placehold.co/100x100.png'" :alt="message.senderName" />
      </div>
    </div>
    <div class="chat-header">
      {{ isCurrentUser ? "Você" : message.senderName }}
      <time class="text-xs opacity-50 ml-1">{{ message.timestamp }}</time>
    </div>
    <div
      class="chat-bubble break-words"
      :class="[
        isCurrentUser ? 'chat-bubble-primary' : 'bg-base-300 text-base-content',
        !message.sent ? 'animate-pulse opacity-60' : '',
      ]"
      v-html="message.content.replace(/\n/g, '<br>')"
    ></div>
  </div>
</template>
