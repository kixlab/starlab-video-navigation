import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NODE_HEIGHT, NODE_WIDTH, NODE_MARGIN_H, NODE_MARGIN_W, GRAPH_PAD, TOOL_PADD_H, TOOL_PADD_W} from "../global.js";


const Tool = (props) => { 
    var width = (props.end[1] - props.start[1])*(NODE_WIDTH+NODE_MARGIN_W) + NODE_WIDTH + TOOL_PADD_W;
    var height = (props.end[0] - props.start[0])*(NODE_HEIGHT+NODE_MARGIN_H) + NODE_HEIGHT + TOOL_PADD_H;

    return (
        <>
            <StepLabel x={props.start[1]*(NODE_WIDTH+NODE_MARGIN_W) + GRAPH_PAD - TOOL_PADD_W/2} 
                       y={props.start[0]*(NODE_HEIGHT+NODE_MARGIN_H) + GRAPH_PAD - TOOL_PADD_H/2 - 10}>
                           {props.name}
            </StepLabel>
            <rect x={props.start[1]*(NODE_WIDTH+NODE_MARGIN_W) + GRAPH_PAD - TOOL_PADD_W/2}
                  y={props.start[0]*(NODE_HEIGHT+NODE_MARGIN_H) + GRAPH_PAD - TOOL_PADD_H/2}
                  width={width} height={height} 
                  fill="white" stroke="lightgray" stroke-width="4" rx="16"/>
        </>
    );
}

const StepLabel = styled.text`
    font-size: 36px;
`;

export default Tool;
