import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NODE_HEIGHT, NODE_WIDTH, NODE_MARGIN_H, NODE_MARGIN_W, GRAPH_PAD, INGRE_PADD_W } from "../global.js";

const Ingredient = (props) => {
    
    function selectColor(number) {
        const hue = number * 137.508; // use golden angle approximation
        return `hsl(${hue},50%,75%)`;
    }

    const generateInitPath = (start, end) => {
        var M = [((start.col) * (NODE_WIDTH/2+INGRE_PADD_W) + NODE_WIDTH/4 + GRAPH_PAD), (NODE_HEIGHT/2 + GRAPH_PAD + NODE_HEIGHT)];
        var S1 = [((end.col) * (NODE_WIDTH+NODE_MARGIN_W) + GRAPH_PAD), ((end.row) * (NODE_HEIGHT+NODE_MARGIN_H) + GRAPH_PAD + NODE_HEIGHT/2)];
        var C2 = [S1[0] - NODE_MARGIN_W/2, (M[1] + S1[1]) / 2];
        var C0 = [C2[0], M[1]];
        var C1 = C0;
        var S0 = [C2[0], S1[1]];

        return `M ${M[0]} ${M[1]} C ${C0[0]} ${C0[1]}, ${C1[0]} ${C1[1]}, ${C2[0]} ${C2[1]} S ${S0[0]} ${S0[1]}, ${S1[0]}, ${S1[1]}`        
    }

    const generatePath = (start, end) => {
        var M = [((start.col) * (NODE_WIDTH+NODE_MARGIN_W) + NODE_WIDTH + GRAPH_PAD), ((start.row) * (NODE_HEIGHT+NODE_MARGIN_H) + GRAPH_PAD + NODE_HEIGHT/2)];
        var S1 = [((end.col) * (NODE_WIDTH+NODE_MARGIN_W) + GRAPH_PAD), ((end.row) * (NODE_HEIGHT+NODE_MARGIN_H) + GRAPH_PAD + NODE_HEIGHT/2)];
        var C2 = [S1[0] - NODE_MARGIN_W/2, (M[1] + S1[1]) / 2];
        var C0 = [C2[0], M[1]];
        var C1 = C0;
        var S0 = [C2[0], S1[1]];

        return `M ${M[0]} ${M[1]} C ${C0[0]} ${C0[1]}, ${C1[0]} ${C1[1]}, ${C2[0]} ${C2[1]} S ${S0[0]} ${S0[1]}, ${S1[0]}, ${S1[1]}`
    }

    var paths = [];

    for(var i = -1; i < props.step_list.length; i++) {
        if(i != -1) {
            var start = props.steps[props.step_list[i]];
            var end = props.steps[props.step_list[i+1]];
            if(end)
                paths.push(<path key={i} name={props.name} d={generatePath(start, end)} stroke={selectColor(props.idx)} fill="transparent" stroke-width="8"/>);
        } else if(!props.name.includes("Intermediate")) {
            var start = {row: 0, col: props.idx};
            var end = props.steps[props.step_list[i+1]];
            paths.push(<path key={i} name={props.name} d={generateInitPath(start, end)} stroke={selectColor(props.idx)} fill="transparent" stroke-width="8"/>);
        }
    }

    var label = (<IngredientLabel x={props.idx*(NODE_WIDTH/2+INGRE_PADD_W) + GRAPH_PAD} 
                                  y={NODE_HEIGHT/2 + GRAPH_PAD - 7}>
                                      {props.name.split(" ").join("\n")}
                </IngredientLabel>);
    if(props.name.includes(" ")) {
        label = (
            <>
                <IngredientLabel x={props.idx*(NODE_WIDTH/2+INGRE_PADD_W) + GRAPH_PAD} 
                                 y={NODE_HEIGHT/2 + GRAPH_PAD - 35}>
                                    {props.name.split(" ")[0]}
                </IngredientLabel>)
                <IngredientLabel x={props.idx*(NODE_WIDTH/2+INGRE_PADD_W) + GRAPH_PAD} 
                                 y={NODE_HEIGHT/2 + GRAPH_PAD - 7}>
                                     {props.name.split(" ")[1]}
                </IngredientLabel>)    
            </>
        )
    }

    return (
        <>
            {!props.name.includes("Intermediate") ?
                <>
                    {label}
                    <rect x={props.idx*(NODE_WIDTH/2+INGRE_PADD_W) + GRAPH_PAD} 
                          y={NODE_HEIGHT/2 + GRAPH_PAD} 
                          width={NODE_WIDTH/2} height={NODE_HEIGHT} fill="gray"/>
                </>
                : ""
            }
            {paths}
        </>
    );
}

const IngredientLabel = styled.text`
    font-size: 28px;
    text-align: center;
`;

export default Ingredient;
