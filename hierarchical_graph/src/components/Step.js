import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Step = (props) => { 
    const setSeekTime = () => {
        props.setSeekTime(props.time);
    }

    return (
        <ClickableG onClick={setSeekTime}>
            <StepLabel x={props.col*(200+100) + 20} y={props.row*(100+80) + 12}>{props.name}</StepLabel>
            <rect x={props.col*(200+100) + 20} y={props.row*(100+80) + 20} width="200" height="100" fill="gray"/>
        </ClickableG>
    );
}

const ClickableG = styled.g`
    cursor: pointer;
`;

const StepLabel = styled.text`
    font-size: 30px;
`;

export default Step;
