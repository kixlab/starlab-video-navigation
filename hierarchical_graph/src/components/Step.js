import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NODE_HEIGHT, NODE_WIDTH, NODE_MARGIN_H, NODE_MARGIN_W, GRAPH_PAD } from "../global.js";

const Step = (props) => { 
    const setStep = () => {
        props.setStep(props.idx);
    }

    return (
        <ClickableG onClick={setStep}>
            {props.isCurrent ?
                <CurrStepLabel x={props.col*(NODE_WIDTH+NODE_MARGIN_W) + GRAPH_PAD}
                               y={props.row*(NODE_HEIGHT+NODE_MARGIN_H) + GRAPH_PAD - 8}>
                                   {props.name}
                </CurrStepLabel> :
                <StepLabel x={props.col*(NODE_WIDTH+NODE_MARGIN_W) + GRAPH_PAD}
                           y={props.row*(NODE_HEIGHT+NODE_MARGIN_H) + GRAPH_PAD - 8}>
                               {props.name}
                </StepLabel>
            }
            <rect x={props.col*(NODE_WIDTH+NODE_MARGIN_W) + GRAPH_PAD} 
                  y={props.row*(NODE_HEIGHT+NODE_MARGIN_H) + GRAPH_PAD} 
                  width={NODE_WIDTH} height={NODE_HEIGHT} fill="lightgray"
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
