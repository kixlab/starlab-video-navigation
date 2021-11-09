import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Tool = (props) => { 
    var width = (props.end[1] - props.start[1])*(200+100) + 200 + 40;
    var height = (props.end[0] - props.start[0])*(100+80) + 100 + 80;

    return (
        <>
            <StepLabel x={props.start[1]*(200+100)} y={props.start[0]*(100+80) - 30}>{props.name}</StepLabel>
            <rect x={props.start[1]*(200+100)} y={props.start[0]*(100+80) - 20} width={width} height={height} fill="white" stroke="lightgray" stroke-width="4" rx="16"/>
        </>
    );
}

const StepLabel = styled.text`
    font-size: 36px;
`;

export default Tool;
