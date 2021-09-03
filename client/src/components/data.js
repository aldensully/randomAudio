import React from 'react';
import './data.css';
import { Component } from 'react';
import { Howl, Howler } from 'howler';
import { createChainedFunction } from '@material-ui/core';

export default function AudioFetch(props) {

    async function getAudio() {

        const blobb = await fetch('/try').then(response => {
            if (response.error) {
                return response
            }
            else {
                return response.blob();
            }
        })
        if (blobb.error) {
            console.log('error getting audio file from backend');
        }
        else {
            try {
                var url = URL.createObjectURL(blobb);
                document.getElementById("aud").src = url;
                var playPromise = document.getElementById("aud").play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        // Automatic playback started!
                        console.log('playing')
                    }).then(() => {
                        URL.revokeObjectURL(url);
                    })
                        .catch(error => {
                            console.log('error');
                            URL.revokeObjectURL(url);
                        });
                }
            } catch (e) {
                console.log(e.message);
            }
        }
    }

    return (
        <div>
            <button onClick={getAudio}>
                Get Audio
            </button>
        </div>
    )


}


