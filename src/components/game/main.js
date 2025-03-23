import { MainMenu }  from "./scene/mainMenu.js";
import { GameScene } from "./scene/game.js";
import { GameOver } from "./scene/gameOver.js";
import { AUTO, Game } from 'phaser';

console.log('ping main.js')

var config = {
    type: AUTO,
    width: 500,
    height: 500,
    parent:"game-container",
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        MainMenu,
        GameScene, 
        GameOver
    ]
};

const StartGame = (parent) => {
    return new Game({...config, parent})
}
export default StartGame;