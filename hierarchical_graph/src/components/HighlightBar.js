import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HighlightBar = (props) => { 
    var highlights = [];

    const changeTimeToLength = (time) => {
        return time / props.duration * 640;
    }

    if(props.currentPlayback){
        var startTime = props.currentPlayback.time[0];
        var endTime = props.currentPlayback.time[1];

        highlights.push(
            <rect x={changeTimeToLength(startTime)} y="0" width={changeTimeToLength(endTime - startTime)} height="12" fill="#3786E2" stroke="transparent"/>
        )
    }

    return (
        <svg width="640" height="16">
            <rect x="0" y="0" width="640" height="12" fill="transparent" stroke="lightgray" strokeWidth="1" rx="4"/>
            {highlights}
        </svg>
    );
}

export default HighlightBar;
