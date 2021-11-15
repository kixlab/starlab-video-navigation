import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NODE_HEIGHT, NODE_WIDTH, NODE_MARGIN_H, NODE_MARGIN_W, GRAPH_PAD_W, GRAPH_PAD_H, INGRE_PADD_W } from "../global.js";

const Link = (props) => {
    
    function selectColor(number) {
        const hue = number * 137.508; // use golden angle approximation
        return `hsl(${hue},50%,75%)`;
    }

    const generateIngrPath = (start_point, end_point, margin) => {
        var M = start_point;
        var S1 = end_point;
        var C2 = [S1[0] - NODE_MARGIN_W/2 + margin, (M[1] + S1[1]) / 2];
        var C0 = [C2[0], M[1]];
        var C1 = C0;
        var S0 = [C2[0], S1[1]];

        return `M ${M[0]} ${M[1]} 
                C ${C0[0]} ${C0[1]}, ${C1[0]} ${C1[1]}, ${C2[0]} ${C2[1]} 
                S ${S0[0]} ${S0[1]}, ${S1[0]}, ${S1[1]}`        
    }

    const generateStepPath = (start_point, end_point, margin) => {
        var M = start_point;
        var S1 = end_point;
        var C2 = [S1[0] - NODE_MARGIN_W + margin, (M[1] + S1[1]) / 2];
        var C0 = [C2[0], M[1]];
        var C1 = C0;
        var S0 = [C2[0], S1[1]];

        return `M ${M[0]} ${M[1]} 
                C ${C0[0]} ${C0[1]}, ${C1[0]} ${C1[1]}, ${C2[0]} ${C2[1]} 
                S ${S0[0]} ${S0[1]}, ${S1[0]}, ${S1[1]}`
    }

    var total_ingre = (props.ingredients ? props.ingredients.length : 0);

    var end_point = [
        ((props.col) * (NODE_WIDTH+NODE_MARGIN_W) + GRAPH_PAD_W), 
        ((props.row) * (NODE_HEIGHT+NODE_MARGIN_H) + GRAPH_PAD_H + NODE_HEIGHT/2)
    ];

    var circles = [];
    var paths = [];
    if(props.ingredients) {
        for(var i = 0; i < props.ingredients.length; i++) {
            var margin = NODE_MARGIN_W/2/total_ingre * i;
            var start_point = [end_point[0] - NODE_MARGIN_W/2 + margin, end_point[1] - NODE_HEIGHT/2];
            paths.push(<path key={i} name={props.name} d={generateIngrPath(start_point, end_point, margin)} 
                             stroke={selectColor(props.ingredients[i].idx)} 
                             fill="transparent" stroke-width="8"/>);
            circles.push(<circle key={i} cx={start_point[0]} cy={start_point[1] - 10} r="20" 
                                 fill={selectColor(props.ingredients[i].idx)}/>);
        }
    }

    var total_steps = (props.prev_steps ? props.prev_steps.length : 0);
    if(props.prev_steps) {
        for(var i = 0; i < props.prev_steps.length; i++) {
            var prev_step = props.prev_steps[i];
            var margin = NODE_MARGIN_W/2/total_steps * i;
            var start_point = [
                ((prev_step.col) * (NODE_WIDTH+NODE_MARGIN_W) + NODE_WIDTH + GRAPH_PAD_W), 
                ((prev_step.row) * (NODE_HEIGHT+NODE_MARGIN_H) + GRAPH_PAD_H + NODE_HEIGHT/2)
            ];

            paths.push(<path key={i} name={props.name} d={generateStepPath(start_point, end_point, margin)} 
                             stroke={selectColor(Math.floor(Math.random() * 10))} 
                             fill="transparent" stroke-width="8"/>);
        }
    }

    return (
        <>
            {circles}
            {paths}
        </>
    );
}

const IngredientLabel = styled.text`
    font-size: 28px;
    text-align: center;
`;

export default Link;
