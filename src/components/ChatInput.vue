<script setup>
import { ref, watch, nextTick } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(["update:modelValue", "send"]);

const message = ref(props.modelValue || "");
const textareaInput = ref(null);

watch(
  () => props.modelValue,
  (val) => {
    message.value = val;
  }
);

const adjustTextareaHeight = () => {
  if (textareaInput.value) {
    textareaInput.value.style.height = "auto";
    textareaInput.value.style.height = `${textareaInput.value.scrollHeight}px`;
  }
};

const emitSend = () => {
  if (message.value.trim()) {
    emit("send", message.value);
    emit("update:modelValue", "");
    message.value = "";
    nextTick(adjustTextareaHeight);
  }
};

watch(message, (val) => {
  emit("update:modelValue", val);
});
</script>

<template>
  <div class="flex items-end space-x-2">
    <textarea
      v-model="message"
      @input="adjustTextareaHeight"
      ref="textareaInput"
      class="textarea textarea-bordered w-full resize-none overflow-hidden"
      placeholder="Digite sua mensagem..."
      rows="1"
      style="min-height: 3rem; max-height: 10rem"
      @keydown.enter.exact.prevent="emitSend"
    ></textarea>
    <button class="btn btn-primary btn-square" @click="emitSend">
      <Icon icon="mdi:send" class="w-6 h-6" />
    </button>
  </div>
</template>
