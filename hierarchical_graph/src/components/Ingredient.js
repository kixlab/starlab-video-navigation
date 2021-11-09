import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Ingredient = (props) => {
    
    function selectColor(number) {
        const hue = number * 137.508; // use golden angle approximation
        return `hsl(${hue},50%,75%)`;
    }

    const generatePath = (start, end) => {
        var M = [((start.col) * (200+100) + 20 + 200), ((start.row) * (100+80) + 20 + 50)];
        var S1 = [((end.col) * (200+100) + 20), ((end.row) * (100+80) + 20 + 50)];
        var C2 = [S1[0] - 50, (M[1] + S1[1]) / 2];
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
        } else if(!props.name.includes("Intermediate")) {
            var start = {col: 0, row: props.idx};
            var end = props.steps[props.step_list[i+1]];
        }
        if(end) {
            paths.push(<path key={i} name={props.name} d={generatePath(start, end)} stroke={selectColor(props.idx)} fill="transparent" stroke-width="8"/>);
        }
    }

    var label = (<IngredientLabel x={20} y={props.idx*(100+80)+50+20+7}>{props.name.split(" ").join("\n")}</IngredientLabel>);
    if(props.name.includes(" ")) {
        label = (
            <>
                <IngredientLabel x={20} y={props.idx*(100+80)+50+20-7}>{props.name.split(" ")[0]}</IngredientLabel>)
                <IngredientLabel x={20} y={props.idx*(100+80)+50+20+28}>{props.name.split(" ")[1]}</IngredientLabel>)    
            </>
        )
    }

    return (
        <>
            {!props.name.includes("Intermediate") ?
                <>
                    {label}
                    <rect x={100 + 20} y={props.idx*(100+80) + 20} width="100" height="100" fill="gray"/>
                </>
                : ""
            }
            {paths}
        </>
    );
}

const IngredientLabel = styled.text`
    font-size: 28px;
`;

export default Ingredient;
