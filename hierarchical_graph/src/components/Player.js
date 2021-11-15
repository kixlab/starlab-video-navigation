import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';

import HighlightBar from './HighlightBar';

const Player = (props) => {
    const [player, setPlayer] = useState(null);
    const [playbackTimeout, setPlaybackTimeout] = useState(null);
    const [progressInterval, setProgressInterval] = useState(null);
    const [progress, setProgress] = useState(0);

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
            clearInterval(progressInterval);
        } else if(event.data == 1) {
            var interval = setInterval(function () {
                updateProgressBar();
            }, 100)
            setProgressInterval(interval);
        }
    }

    const playback = (timeIdx) => {
        if(timeIdx == props.currentPlayback.time.length) {
            timeIdx = 0;
        }
        player.seekTo(props.currentPlayback.time[timeIdx][0]);
        player.playVideo();
        var timeout = setTimeout(playback, (props.currentPlayback.time[timeIdx][1] - props.currentPlayback.time[timeIdx][0])*1000, timeIdx+1)
        setPlaybackTimeout(timeout);
    }

    const updateProgressBar = () => {
        var currTime = player.getCurrentTime();
        var duration = player.getDuration();
        setProgress(currTime/duration * 100);
    };

    // set player seek time on props change
    useEffect(() => {
        if (player && props.currentPlayback) {
            player.seekTo(props.currentPlayback.time[0][0]);
            player.playVideo();
            if(playbackTimeout != null) {
                clearTimeout(playbackTimeout);
            }
            var timeout = setTimeout(playback, (props.currentPlayback.time[0][1] - props.currentPlayback.time[0][0])*1000, 1)
            setPlaybackTimeout(timeout);
        }
    }, [props.currentPlayback]);

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            controls: 0,
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    return (
        <>
            <YouTube videoId="T7icxr899qc" opts={opts} onReady={_onReady} onStateChange={_onStateChange}/>
            <ProgressBar type="range" value={progress}/>
            <br/>
            <HighlightBar currentPlayback={props.currentPlayback} duration={player ? player.getDuration() : 0}/>
        </>
    );
}

const ProgressBar = styled.input`
    width: 640px;
`;

export default Player;
