import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NODE_HEIGHT, NODE_WIDTH, NODE_MARGIN_H, NODE_MARGIN_W, GRAPH_PAD_W, GRAPH_PAD_H } from "../global.js";

import Link from './Link';

const Step = (props) => { 
    const setStep = () => {
        props.setStep(props.idx);
    } 
    return (
        <>
            <ClickableG onClick={setStep}>
                <StepLabel x={props.col*(NODE_WIDTH+NODE_MARGIN_W) + GRAPH_PAD_W}
                        y={props.row*(NODE_HEIGHT+NODE_MARGIN_H) + GRAPH_PAD_H - 8}
                        style={props.isCurrent ? {"font-weight": "bold", "fill": "#3786E2"} : {}}>
                            {props.name}
                </StepLabel>
                <rect x={props.col*(NODE_WIDTH+NODE_MARGIN_W) + GRAPH_PAD_W} 
                    y={props.row*(NODE_HEIGHT+NODE_MARGIN_H) + GRAPH_PAD_H} 
                    width={NODE_WIDTH} height={NODE_HEIGHT} fill="lightgray"
                    stroke={props.isCurrent ? "#3786E2" : "transparent"} stroke-width="8"/>
            </ClickableG>
            <Link row={props.row} col={props.col} 
                  prev_steps={props.prev_steps ? props.prev_steps.map(idx => { 
                      var step = props.all_steps[idx];
                      step.idx = idx;
                      return step;
                    }) : null} 
                  ingredients={props.ingredients ? props.ingredients.map(idx => props.all_ingredients[idx]) : null} 
                  all_ingredients={props.all_ingredients} all_steps={props.all_steps}/>
        </>
    );
}

const ClickableG = styled.g`
    cursor: pointer;
`;

const StepLabel = styled.text`
    font-size: 30px;
`;

const CurrStepLabel = styled.text`

`;

export default Step;
