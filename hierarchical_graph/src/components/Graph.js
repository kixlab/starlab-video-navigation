import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Step from './Step';
import Ingredient from './Ingredient';

const data = {
    ingredients: [
        {name: "Salt", step_list: [5]},
        {name: "Milk", step_list: [5]},
        {name: "Chicken Breast", step_list: [0, 1, 5, 6]},
        {name: "Apple", step_list: [2, 6]},
        {name: "Ginger", step_list: [3, 7]},
        {name: "Garlic", step_list: [4, 7]},
        {name: "Soy Sauce", step_list: [7]},
        {name: "Gochu Garu", step_list: [7]},
        {name: "Gochu Jang", step_list: [7]},
        {name: "Pepper", step_list: [7]},
        {name: "Water", step_list: [8]},
        {name: "Potato", step_list: [13, 10]},
        {name: "Onion", step_list: [14, 10]},
        {name: "Green Pepper", step_list: [15, 10]},
        {name: "Green Onion", step_list: [16, 12]},
        {name: "Intermediate 1", step_list: [6, 8]},
        {name: "Intermediate 2", step_list: [7, 8]},
        {name: "Intermediate 3", step_list: [8, 9, 10, 11, 12]},
    ],
    steps: [
        {name: "Wash", row: 2, col: 1, time: 96},
        {name: "Slice", row: 2, col: 2, time: 106},
        {name: "Peel & Slice", row: 3, col: 2, time: 257},
        {name: "Mince", row: 4, col: 2, time: 213},
        {name: "Mince", row: 5, col: 2, time: 218},
        {name: "Mix", row: 2, col: 3, time: 140},
        {name: "Put", row: 3, col: 4, time: 289},
        {name: "Mix", row: 6, col: 4, time: 186},
        {name: "Add", row: 6, col: 5, time: 323},
        {name: "Cook", row: 6, col: 6, time: 342},
        {name: "Add", row: 6, col: 7, time: 488},
        {name: "Simmer", row: 6, col: 8, time: 500},
        {name: "Add", row: 6, col: 9, time: 570},
        {name: "Chop", row: 11, col: 5, time: 361},
        {name: "Chop", row: 12, col: 5, time: 374},
        {name: "Chop", row: 13, col: 5, time: 405},
        {name: "Chop", row: 14, col: 5, time: 415},
    ],
    tools: [
        {name: "Sink", start: [2, 1], end: [2, 1]},
        {name: "Cutting Board 1", start: [2, 2], end: [5, 2]},
        {name: "Bowl 1", start: [2, 3], end: [2, 3]},
        {name: "Bowl 2", start: [6, 4], end: [6, 4]},
        {name: "Cutting Board 2", start: [3, 4], end: [3, 4]},
        {name: "Cutting Board 3", start: [11, 5], end: [14, 5]},
        {name: "Sauce Pot", start: [6, 5], end: [6, 9]},
    ]
}

const Graph = (props) => { 
    const [dataset, setDataset] = useState(data);

    return (
        <svg viewBox="0 0 3500 3000">
            {dataset.steps.map((step) => (
                <Step row={step.row} col={step.col} name={step.name} time={step.time} setSeekTime={props.setSeekTime}/>
            ))}
            {dataset.ingredients.map((ingredient, i) => (
                <Ingredient idx={i} name={ingredient.name} step_list={ingredient.step_list} steps={dataset.steps}/>
            ))}
        </svg>
    );
}

export default Graph;
