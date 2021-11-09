import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';

const Player = (props) => {
    const [player, setPlayer] = useState(null);
    const [playbackTimeout, setPlaybackTimeout] = useState(null);

    const _onReady = (event) => {
        event.target.pauseVideo();
        setPlayer(event.target);
    }
    
    const _onStateChange = (event) => {
        if(event.data == 2) {
            props.setCurrentPlayback(null);
            if(playbackTimeout) {
                clearTimeout(playbackTimeout);
            }
        }
    }

    const playback = (time) => {
        var currTime = player.getCurrentTime();
        player.seekTo(time[0]);
        player.playVideo();
        var timeout = setTimeout(playback, (time[1] - time[0])*1000, time)
        setPlaybackTimeout(timeout);
    }

    // set player seek time on props change
    useEffect(() => {
        if (player && props.currentPlayback) {
            player.seekTo(props.currentPlayback.time[0]);
            player.playVideo();
            if(playbackTimeout != null) {
                clearTimeout(playbackTimeout);
            }
            var timeout = setTimeout(playback, (props.currentPlayback.time[1] - props.currentPlayback.time[0])*1000, props.currentPlayback.time)
            setPlaybackTimeout(timeout);
        }
    }, [props.currentPlayback]);

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    return (
        <YouTube videoId="T7icxr899qc" opts={opts} onReady={_onReady} onStateChange={_onStateChange}/>
    );
}

export default Player;
