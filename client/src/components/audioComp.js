import React, { useState, useEffect, useRef } from 'react';
import { Slider, Button } from '@material-ui/core';
import ReactHowler from 'react-howler'
import '../styles/audioComp.css';

export default function AudioComp(props) {
    const [url, setUrl] = useState(props.src);
    const [audioTitle, setAudioTitle] = useState("title");
    const [volumeHover, setVolumeHover] = useState(false);
    const ref = useRef();
    const id = String(Math.floor(Math.random() * 10000));

    useEffect(() => {
        setUrl(props.src);
        console.log("audio url: ", props.src);
    })

    function volumeHoverFunction() {
        setVolumeHover(true)
    }

    function playAudio() {
        ref.current.play();
        var playPromise = document.getElementById(id).play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Automatic playback started!
                console.log('playing')
            })
                .catch(error => {
                    console.log('error');
                });
        }
    }
    function pauseAudio() {
        var pausePromise = document.getElementById(id).pause();
        if (pausePromise !== undefined) {
            pausePromise.then(() => {
                console.log('paused')
            })
                .catch(error => {
                    console.log(error.message);
                });
        }
    }
    function stopAudio() {
        document.getElementById(id).pause();
        document.getElementById(id).currentTime = 0;
    }

    let volumeSlider;
    if (volumeHover) {
        volumeSlider = <Slider orientation="vertical" style={{ position: 'relative', zIndex: 3, height: '8vh' }} />
    }
    else volumeSlider = null;

    return (
        <div style={{
            display: 'flex', flexDirection: 'row', width: '100% ', backgroundColor: 'inherit', marginTop: '2vh'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '90%' }
            } >
                <audio controls ref={ref} id={id} src={url} />
            </ div>
            <div style={{
                display: 'flex', alignItems: 'center', marginLeft: '1vh', justifyContent: 'center'
            }}>
                <Button onClick={props.onDeleteAudio(props.index)} margin="dense" size="small" style={{ width: 'fit-content', backgroundColor: 'red', color: '#fafbff' }
                } > delete</Button>
            </div>
        </div >
    )
}