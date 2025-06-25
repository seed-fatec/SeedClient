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
        <img v-if="message.avatarUrl" :src="message.avatarUrl" />
        <div
          v-else
          class="bg-gray-300 w-full h-full rounded-full flex items-center justify-center"
        >
          <span class="text-gray-500">{{ message.senderName.charAt(0).toUpperCase() }}</span>
        </div>
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
