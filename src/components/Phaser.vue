<script setup>
import { onMounted, ref } from "vue";
import StartGame from "./game/main.js";
import Phaser from "phaser";

const game = ref();

onMounted(() => {
  game.value = StartGame("game-container");
});

defineExpose({ game });
</script>

<template>
  <div id="game-container" class="bg-primary p-8 border-lg rounded-xl"></div>
  <div id="box">
    <p id="restart-message"></p>
    <p id="player-position"></p>
  </div>
</template>
