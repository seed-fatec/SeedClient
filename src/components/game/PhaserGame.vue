<script setup lang="ts">
import { onMounted, ref } from 'vue';
import StartGame from './main.js';
// const StartGame = require('./main.js').default;
import Phaser from 'phaser';

const game = ref();

onMounted(() => {
    game.value = StartGame('game-container');
});

defineExpose({game});

</script>

<template >
    <h1>hello</h1>
    <div id="game-container" min-h-screen bg-neutral-200 flex items-center justify-center>
        
    </div>
    <p id="player-position">adsf</p>   
</template>