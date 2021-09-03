import React, { Component } from 'react';
import AD from '../4-ArqRSYE3o1.mp3';

class AudioTest extends React.Component {

    playAudio() {

        console.log("playyyyy")

        var audiofile = new Audio();
        audiofile.src = AD;
        audiofile.load();

        if (audiofile !== undefined) {
            audiofile.play()
                .then(() => {
                    console.log("Playing")
                })
                .catch(error => {
                    console.log('nope... ', error)
                })
        }
    }
    render() {
        return (
            <div>
                <button onClick={this.playAudio}>PLAY AUDIO</button>
            </div>
        );
    }

}

export default AudioTest;