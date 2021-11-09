import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';

const Player = (props) => {
    const [player, setPlayer] = useState(null);

    const _onReady = (event) => {
        event.target.pauseVideo();
        setPlayer(event.target);
    }

    // set player seek time on props change
    useEffect(() => {
        if (player) {
            player.seekTo(props.seekTime);
        }
    }, [props.seekTime]);

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
