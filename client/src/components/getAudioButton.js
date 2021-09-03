import React from 'react';
import { Button, makeStyles } from '@material-ui/core';


export default function GetAudioButton(props) {
    const classes = useStyles();
    function buttonClick() {
        props.onGetAudioClick();
    }

    return (
        <Button id="audButt" className={classes.button}
            size="large" margin="dense" onClick={buttonClick}
        >
            Find Audio
        </Button>
    )
}
const useStyles = makeStyles({
    button: {
        height: '10vh',
        width: 'fit-content',
        padding: '1.6vh',
        color: '#e1e1e1',
        borderRadius: 50,
        fontSize: '2em',
        backgroundColor: "#536dfe",
        '&:hover': {
            backgroundColor: '#758afe',
            boxShadow: '0px 0px 20px 0px #758aff'
        },

    }
})