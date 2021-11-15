import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NODE_HEIGHT, NODE_WIDTH, NODE_MARGIN_H, NODE_MARGIN_W, GRAPH_PAD_W, GRAPH_PAD_H, TOOL_PADD_H, TOOL_PADD_W} from "../global.js";


const Tool = (props) => { 
    var start = [999, 999];
    var end = [-1, -1];
    for(var i = 0; i < props.steps.length; i++) { 
        var step = props.all_steps[props.steps[i]];
        if(step.row <= start[0] && step.col <= start[1]) {
            start = [step.row, step.col];
        }
        if(step.row >= end[0] && step.col >= end[1]) {
            end = [step.row, step.col];
        }
    }

    var width = (end[1] - start[1])*(NODE_WIDTH+NODE_MARGIN_W) + NODE_WIDTH + TOOL_PADD_W;
    var height = (end[0] - start[0])*(NODE_HEIGHT+NODE_MARGIN_H) + NODE_HEIGHT + TOOL_PADD_H;

    const setTool = () => {
        props.setTool(props.idx);
    } 

    return (
        <ClickableG onClick={setTool}>
            <StepLabel x={start[1]*(NODE_WIDTH+NODE_MARGIN_W) + GRAPH_PAD_W - TOOL_PADD_W/2} 
                       y={start[0]*(NODE_HEIGHT+NODE_MARGIN_H) + GRAPH_PAD_H - TOOL_PADD_H/2 - 10}
                       style={props.isCurrent ? {"font-weight": "bold", "fill": "#3786E2"} : {}}>
                           {props.name}
            </StepLabel>
            <rect x={start[1]*(NODE_WIDTH+NODE_MARGIN_W) + GRAPH_PAD_W - TOOL_PADD_W/2}
                  y={start[0]*(NODE_HEIGHT+NODE_MARGIN_H) + GRAPH_PAD_H - TOOL_PADD_H/2}
                  width={width} height={height} rx="16" fill={props.isCurrent ? "#e3edf7" : "#fff"} 
                  stroke={props.isCurrent ? "#3786E2" : "lightgray"} strokeWidth="4"/>
        </ClickableG>
    );
}

const ClickableG = styled.g`
    cursor: pointer;
`;


const StepLabel = styled.text`
    font-size: 36px;
`;

export default Tool;
