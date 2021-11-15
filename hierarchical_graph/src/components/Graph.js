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
        {name: "Wash", row: 1, col: 0, time: [96, 100], prev_steps: null, ingredients: [0]},
        {name: "Slice", row: 1, col: 1, time: [106, 136], prev_steps: [0], ingredients: null},
        {name: "Peel & Slice", row: 2, col: 1, time: [257, 280], prev_steps: null, ingredients: [1]},
        {name: "Mince", row: 3, col: 1, time: [213, 228], prev_steps: null, ingredients: [2, 3]},
        {name: "Mix", row: 1, col: 2, time: [140, 174], prev_steps: [1], ingredients: [4, 5]},
        {name: "Put", row: 1, col: 3, time: [289, 316], prev_steps: [2, 4], ingredients: null},
        {name: "Mix", row: 3, col: 3, time: [186, 250], prev_steps: [3], ingredients: [6, 7, 8, 9]},
        {name: "Add", row: 1, col: 4, time: [323, 338], prev_steps: [5, 6], ingredients: [10]},
        {name: "Cook", row: 1, col: 5, time: [342, 348], prev_steps: [7], ingredients: null},
        {name: "Chop", row: 3, col: 4, time: [361, 370], prev_steps: null, ingredients: [11]},
        {name: "Chop", row: 4, col: 4, time: [374, 392], prev_steps: null, ingredients: [12]},
        {name: "Chop", row: 5, col: 4, time: [405, 410], prev_steps: null, ingredients: [13]},
        {name: "Chop", row: 6, col: 4, time: [415, 423], prev_steps: null, ingredients: [14]},
        {name: "Add", row: 1, col: 6, time: [488, 498], prev_steps: [8, 9, 10, 11], ingredients: null},
        {name: "Simmer", row: 1, col: 7, time: [500, 519], prev_steps: [13], ingredients: null},
        {name: "Add", row: 1, col: 8, time: [570, 577], prev_steps: [12, 14], ingredients: null},
    ],
    tools: [
        {name: "Sink", steps: [0]},
        {name: "Cutting Board 1", steps: [1, 2, 3]},
        {name: "Bowl 1", steps: [4]},
        {name: "Bowl 2", steps: [6]},
        {name: "Cutting Board 2", steps: [5]},
        {name: "Cutting Board 3", steps: [9, 10, 11, 12]},
        {name: "Sauce Pot", steps: [7, 8, 13, 14, 15]},
    ]
}

data.steps.forEach((step, i) => step.idx = i)

const Graph = (props) => { 
    const [dataset, setDataset] = useState(data);

    const setStep = (step) => {
        props.setCurrentPlayback({type: "step", idx: step, time: [dataset.steps[step].time]});
    }

    const setTool = (tool) => {
        props.setCurrentPlayback({
            type: "tool", idx: tool, 
            time: dataset.tools[tool].steps.map(idx => dataset.steps[idx].time)
        });
    }

    const setIngredient = (ingrIdx, step_list) => {
        var time_list = step_list.map(idx => dataset.steps[idx].time);
        props.setCurrentPlayback({
            type: "ingredient", idx: ingrIdx, 
            time: time_list, step_list: step_list
        });
    }

    const checkIsCurrent = (type, idx) => {
        if (props.currentPlayback) {
            return props.currentPlayback.type === type && props.currentPlayback.idx === idx ? true : false;
        }
        return false;
    }

    return (
        <svg viewBox="0 0 4500 2000">
            {dataset.tools.map((tool, i) => (
                <Tool idx={i} steps={tool.steps} name={tool.name} all_steps={dataset.steps} 
                      isCurrent={checkIsCurrent("tool", i)} setTool={setTool}/>
            ))}
            {dataset.steps.map((step, i) => (
                <Step idx={i} row={step.row} col={step.col} name={step.name}
                      setStep={setStep} setIngredient={setIngredient}
                      isCurrent={checkIsCurrent("step", i)}
                      prev_steps={step.prev_steps} ingredients={step.ingredients} 
                      all_steps={dataset.steps} all_ingredients={dataset.ingredients}/>
            ))}
        </svg>
    );
}

export default Graph;
