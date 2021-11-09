import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';

const Player = (props) => {

    const _onReady = (event) => {
        event.target.pauseVideo();
    }

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    return (
        <YouTube videoId="T7icxr899qc" opts={opts} onReady={_onReady} />
    );
}

export default Player;
