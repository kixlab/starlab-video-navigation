import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Step from './Step';
import Ingredient from './Ingredient';
import Tool from './Tool';

const data = {
    ingredients: [
        {name: "Chicken Breast", idx: 0},
        {name: "Apple", idx: 1},
        {name: "Garlic", idx: 2},
        {name: "Ginger", idx: 3},
        {name: "Salt", idx: 4},
        {name: "Milk", idx: 5},
        {name: "Soy Sauce", idx: 6},
        {name: "Gochu Garu", idx: 7},
        {name: "Gochu Jang", idx: 8},
        {name: "Pepper", idx: 9},
        {name: "Water", idx: 10},
        {name: "Potato", idx: 11},
        {name: "Onion", idx: 12},
        {name: "Green Pepper", idx: 13},
        {name: "Green Onion", idx: 14},
        {name: "Intermediate 1", step_list: [6, 8]},
        {name: "Intermediate 2", step_list: [7, 8]},
        {name: "Intermediate 3", step_list: [8, 9, 10, 11, 12]},
    ],
    steps: [
        {name: "Wash", row: 2, col: 0, time: [96, 100], prev_steps: null, ingredients: [0]},
        {name: "Slice", row: 2, col: 1, time: [106, 136], prev_steps: [0], ingredients: null},
        {name: "Peel & Slice", row: 3, col: 1, time: [257, 280], prev_steps: null, ingredients: [1]},
        {name: "Mince", row: 4, col: 1, time: [213, 228], prev_steps: null, ingredients: [2]},
        {name: "Mince", row: 5, col: 1, time: [218, 228], prev_steps: null, ingredients: [3]},
        {name: "Mix", row: 2, col: 2, time: [140, 174], prev_steps: [1], ingredients: [4, 5]},
        {name: "Put", row: 2, col: 3, time: [289, 316], prev_steps: [2, 5], ingredients: null},
        {name: "Mix", row: 4, col: 3, time: [186, 250], prev_steps: [3, 4], ingredients: [6, 7, 8, 9]},
        {name: "Add", row: 2, col: 4, time: [323, 338], prev_steps: [6, 7], ingredients: [10]},
        {name: "Cook", row: 2, col: 5, time: [342, 348], prev_steps: [8], ingredients: null},
        {name: "Chop", row: 4, col: 4, time: [361, 370], prev_steps: null, ingredients: [11]},
        {name: "Chop", row: 5, col: 4, time: [374, 392], prev_steps: null, ingredients: [12]},
        {name: "Chop", row: 6, col: 4, time: [405, 410], prev_steps: null, ingredients: [13]},
        {name: "Chop", row: 7, col: 4, time: [415, 423], prev_steps: null, ingredients: [14]},
        {name: "Add", row: 2, col: 6, time: [488, 498], prev_steps: [9, 10, 11, 12], ingredients: null},
        {name: "Simmer", row: 2, col: 7, time: [500, 519], prev_steps: [14], ingredients: null},
        {name: "Add", row: 2, col: 8, time: [570, 577], prev_steps: [13, 15], ingredients: null},
    ],
    tools: [
        {name: "Sink", start: [2, 0], end: [2, 0]},
        {name: "Cutting Board 1", start: [2, 1], end: [5, 1]},
        {name: "Bowl 1", start: [2, 2], end: [2, 2]},
        {name: "Bowl 2", start: [4, 3], end: [4, 3]},
        {name: "Cutting Board 2", start: [2, 3], end: [2, 3]},
        {name: "Cutting Board 3", start: [4, 4], end: [7, 4]},
        {name: "Sauce Pot", start: [2, 4], end: [2, 8]},
    ]
}

const Graph = (props) => { 
    const [dataset, setDataset] = useState(data);

    const setStep = (step) => {
        props.setCurrentPlayback({type: "step", idx: step, time: dataset.steps[step].time});
    }

    const checkIsCurrent = (type, idx) => {
        if (props.currentPlayback) {
            return props.currentPlayback.type === type && props.currentPlayback.idx === idx ? true : false;
        }
        return false;
    }

    return (
        <svg viewBox="0 0 5000 2000">
            {dataset.tools.map((tool, i) => (
                <Tool start={tool.start} end={tool.end} name={tool.name} isCurrent={checkIsCurrent("tools", i)}/>
            ))}
            {dataset.steps.map((step, i) => (
                <Step idx={i} row={step.row} col={step.col} name={step.name}
                      setStep={setStep} isCurrent={checkIsCurrent("step", i)}
                      prev_steps={step.prev_steps} ingredients={step.ingredients} 
                      all_steps={dataset.steps} all_ingredients={dataset.ingredients}/>
            ))}
        </svg>
    );
}

export default Graph;
