import React, { useState, useEffect } from 'react';
import AudioFetch from './components/data';
import { Component } from 'react';
import { Container } from '@material-ui/core';
import { Button } from '@material-ui/core';
import AudioTest from './audio/audioComp';
import { CssBaseline } from '@material-ui/core';
import makeStyles from './styles/styles';
import GetAudioButton from './components/getAudioButton';
import AudioComp from './components/audioComp';
import Aud from './4-ArqRSYE3o1.mp3';

function App() {
    const classes = makeStyles();
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [count, setCount] = useState(0);
    const [currentUrl, setCurrentUrl] = useState('');

    async function fetchAudio() {
        const blobb = await fetch('/try').then(response => {
            if (response.error) {
                console.log(response.error);
                return response
            }
            else {
                return response.blob();
            }
        })
        return blobb;

    }

    async function getAudioInit() {

        setCurrentUrl('');
        setLoading(true);

        try {
            setTimeout(function check() {
                const c = getStatus();
                if (c === true) {
                    alert('took to long to load, please try again');
                    setLoading(false);
                    setCurrentUrl('');
                }
            }, 15000);

            const blobb = await fetchAudio();
            if (blobb.error) {
                console.log('error getting audio file from backend');
            }
            else {
                var url = URL.createObjectURL(blobb);
                setCurrentUrl(url);
                setLoading(false);
            }
        }
        catch (e) {
            alert(e.message);
        }

        function getStatus() {
            if (loading) return true;
            else return false;
        }

        // setTimeout(function load() {
        //     setCurrentUrl(Aud);
        //     setLoading(false);
        // }, 2000);  //dummy loading time for developement
        //create loading dock for audio component
        //if user clicks save
    }

    function saveAudio() {
        setUrls([...urls, currentUrl]);
        setCurrentUrl('');
    }
    function deleteAudio() {
        setCurrentUrl('');
        setLoading(false);
    }
    function deleteRecentAudio(index) {
        console.log('trying to delete index: ', index);
        const temp = urls;
        temp.splice(index, 1);
        setUrls(temp);
    }

    let loadingScreen;
    let errorScreen;
    let audiodock;

    if (loading) {
        loadingScreen = <div style={{ fontSize: '2em', color: '#e1e1e1', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'inherit', height: '10vh' }}>
            searching...
        </div>
    }
    else loadingScreen = null;
    if (error) {
        errorScreen = <h1>error loading file from server</h1>
    }
    else errorScreen = null;
    if (currentUrl) {
        audiodock =
            <div style={{
                display: 'flex', width: '100%', height: '12vh', alignItems: 'center', backgroundColor: 'inherit', padding: 10, flexDirection: 'row',
                borderRadius: 5, marginTop: '2vh'
            }}>
                <audio controls src={currentUrl} />
                <div style={{
                    width: '20% ', height: '100% ', marginLeft: '1vw', justifyContent: 'center', display: 'flex', flexDirection: 'row', alignItem: 'center',
                }}>
                    <Button style={{ alignSelf: 'center', backgroundColor: '#758afe', color: '#e1e1e1', width: 'fit-content', height: '30px' }} onClick={saveAudio}>Save</Button>
                    <Button style={{ alignSelf: 'center', backgroundColor: 'red', color: '#e1e1e1', width: 'fit-content', marginLeft: '1vh', height: '30px' }} onClick={deleteAudio}>Delete</Button>
                </div>
            </div >
    }
    else audiodock = null;

    // const AddedElement = () => { return <AudioComp src={} /> }
    return (
        <CssBaseline>
            <div className={classes.mainPage}>
                <h1 className={classes.heading}>Random Audio</h1>
                <div className={classes.getAudioDiv}>
                    <GetAudioButton onGetAudioClick={getAudioInit} />
                </div>
                <div className={classes.audioDock}>
                    {loadingScreen}
                    {errorScreen}
                    {audiodock}
                </div>
                <div id="audioContainer" className={classes.audioContainer}>
                    <div style={{
                        width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'center', padding: '0.8vh', borderBottom: '1px solid #758afe', fontSize: '1.5em', color: '#e1e1e1'
                    }}>
                        Recent
                    </div>
                    {urls.length <= 10 ? [...Array(urls.length)].map((_, i) => <AudioComp onDeleteAudio={deleteRecentAudio} index={i} src={urls[i]} key={i} />) : alert("maximum of 10 samples at one time")}
                </div>
            </div>
        </CssBaseline>
    );
}

export default App;