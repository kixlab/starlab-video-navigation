import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Step = (props) => { 
    const setStep = () => {
        props.setStep(props.idx);
    }

    return (
        <ClickableG onClick={setStep}>
            {props.isCurrent ?
                <CurrStepLabel x={props.col*(200+100) + 20} y={props.row*(100+80) + 12}>{props.name}</CurrStepLabel> :
                <StepLabel x={props.col*(200+100) + 20} y={props.row*(100+80) + 12}>{props.name}</StepLabel>
            }
            <rect x={props.col*(200+100) + 20} y={props.row*(100+80) + 20} width="200" height="100" fill="lightgray"
                  stroke={props.isCurrent ? "#3786E2" : "transparent"} stroke-width="8"/>
        </ClickableG>
    );
}

const ClickableG = styled.g`
    cursor: pointer;
`;

const StepLabel = styled.text`
    font-size: 30px;
`;

const CurrStepLabel = styled.text`
    font-size: 30px;
    font-weight: bold;
    fill: #3786E2;
`;

export default Step;
