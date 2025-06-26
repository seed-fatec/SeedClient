import { Scene } from 'phaser';
import sponge from '@assets/sponge.png';
import gameoveraudio from '@assets/gameover.mp3';

export class GameOver extends Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    preload() {
        this.load.image('sponge', sponge);
        this.load.audio('gameoveraudio', gameoveraudio);
    }
    create() {
        this.sound.pauseOnBlur = false;
        const music = this.sound.add('gameoveraudio');
        music.play();

        this.add.text(100, 130, 'Game Over', { fontSize: '50px', fill: '#fff', fontFamily: 'Poppins', fontStyle: 'bold' });
        this.add.image(250,270, 'sponge').setDisplaySize(150, 150);
        this.add.text(150, 370, 'Press enter to restart', { fontSize: '18px', fontFamily: 'Poppins', fontStyle: 'bold' });

        
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){
        if(this.keyEnter.isDown){
            this.scene.start('GameScene');
        }
    }
}