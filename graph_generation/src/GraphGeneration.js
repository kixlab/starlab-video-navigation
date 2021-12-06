import React, { useState, useEffect } from 'react';
import { Graph } from 'react-d3-graph';
import vtt1 from '/Users/sangkyung/Desktop/starlab/2level_graph/starlab-video-navigation/graph_generation/src/data/finding-it-annos-v0.1.1/YCII/RR/101/ucky1nWb7LY.en.vtt';
import vtt2 from '/Users/sangkyung/Desktop/starlab/2level_graph/starlab-video-navigation/graph_generation/src/data/finding-it-annos-v0.1.1/YCII/RR/102/dmJB7NHZ2cI.en.vtt';
import vtt3 from '/Users/sangkyung/Desktop/starlab/2level_graph/starlab-video-navigation/graph_generation/src/data/finding-it-annos-v0.1.1/YCII/RR/103/G21LXiasKf4.en.vtt';
import vtt4 from '/Users/sangkyung/Desktop/starlab/2level_graph/starlab-video-navigation/graph_generation/src/data/finding-it-annos-v0.1.1/YCII/RR/104/NujJqJUXSQY.en.vtt';
import vtt5 from '/Users/sangkyung/Desktop/starlab/2level_graph/starlab-video-navigation/graph_generation/src/data/finding-it-annos-v0.1.1/YCII/RR/105/JXCmp1jMi0w.en.vtt';
import './GraphGeneration.css';
import GraphParsing from './GraphParsing';

// set the vtt number
const vtt = vtt3

function GraphGeneration() {
    const [steps, setStep] = useState([]);
    const [graph_data, setGraphData] = useState();

    useEffect (() => {
        fetch(vtt)
            .then(r => r.text())
            .then(text => {
                setStep(parseStep(text))
                setGraphData(parseGraph(text))
                processSteps(text)
            });
      }, []);


    const myConfig = {
        nodeHighlightBehavior: true,
        node: {
            color: 'lightblue',
            size: 120,
            highlightStrokeColor: 'blue'
        },
        link: {
            highlightColor: 'blue'
        },
        directed: true,
        width: 800,
        height: 800
    };


    const parseStep = (vtt_data) => {
        var data = vtt_data.split('\n\n').slice(1, -1)
        var steps = []
        data.map((ele, ind) => {
            var lines = ele.split('\n')
            lines.map((line) => {
                if(line.includes('annot')) {
                    var tmp = line.split("annot: ")
                    steps.push(ind.toString()+ '. ' + tmp[1])
                }
            })

        });
        return steps
    }

    const parseGraph = (vtt_data) => {
        var steps = parseStep(vtt_data)
        var nodes = steps.map(ele => {
            return {id: ele}
        });

        var links = []

        var regExp = /\(([^)]+)\)/g;
        var data = vtt_data.split('\n\n').slice(1, -1)

        data.map((ele, ind)=> {
            var matches = ele.match(regExp)
            matches && matches.map(match => {
                var val = parseInt(match.substring(1, match.length - 1))
                if (val != -1) {  
                    var tmp_edge = [nodes[val].id, nodes[ind].id]
                    var check = true
                    links.map((e) => {
                        if(JSON.stringify(e) === JSON.stringify(tmp_edge)) {
                            check = false
                        }
                    })
                    check && links.push(tmp_edge)
                } 
            })
        });

        links = links.map(ele => {
            return {source: ele[0], target: ele[1]}
        })
        return {nodes: nodes, links: links}
    }

    const parseSecInTime = (time) => {
        var before_time = time.split(':').reverse()
        var after_time = 0
        before_time.map((t, ind) => {
            var time_in_num = parseInt(t)
            after_time += time_in_num * (60 ** ind)
        });
        return after_time
    } 

    const getIngredientInd = (ing_lines, ingredients_list) => {
        // console.log(ingredients_list)
        var ing_ind_list = []
        ing_lines.map(line => {
            var ings = line.split(']')[1].split(',')
            ings.map(ele => {
                var ing = ele.split('(')[0].trim()
                var ing_ind = ingredients_list.indexOf(ing)
                if (ing_ind != -1) {ing_ind_list.push(ing_ind)}
            }); 
        });
        return ing_ind_list
    }

    const processSteps = (vtt_data) => {
        var data = vtt_data.split('\n\n').slice(1, -1)
        var steps = []
        var regExp = /\(([^)]+)\)/g;
        var ingredients_list = processIngredients(vtt_data)

        getIngredientObjList(ingredients_list)

        
        data.map(ele => {
            // parse by lines
            var lines = ele.split('\n')

            // parse step name
            var step_name = lines[2].split(':')[1].trim()

            // parse step time
            var time_in_str = lines[1].split('-->')
            var start_time = parseSecInTime(time_in_str[0].trim())
            var end_time = parseSecInTime(time_in_str[1].trim())

            // parse previous steps
            var prev_steps = ele.match(regExp)
            prev_steps.forEach((prev, ind) => prev_steps[ind] = parseInt(prev.substring(1, prev.length-1)))
            prev_steps = prev_steps.filter(prev => prev!= -1)
            if (prev_steps.length == 0) {prev_steps = null}
            

            var ingredients = getIngredientInd(lines.slice(5), ingredients_list)
            if (ingredients_list.length == 0) {ingredients = null}


            steps.push({name: step_name, time: [start_time, end_time], prev_steps: prev_steps, ingredients: ingredients});
        });
        console.log(steps)
    }

    const processIngredients = (vtt_data) => {
        var ingredients = []
        var data = vtt_data.split('\n\n').slice(1, -1)
        var regExp = /\(([^)]+)\)/g
        data.map(step => {
            // remove unnecssary info
            var lines = step.split('\n')
            lines.splice(0, 5)
            // console.log(lines)
            lines.map(line => {
                var ings = line.split(']')[1].split(',')
                ings.map(ing => {
                    var dependency = ing.match(regExp)
                    if (dependency == '(-1)') {
                        ingredients.push(ing.split('(')[0].trim())
                    }
                }); 
            });
        });
        return ingredients
    }

    const getIngredientObjList = (ingredients_list) => {
        var ingredients_obj_list = ingredients_list.map((ing) => {return {name: ing}})
        console.log(ingredients_obj_list)
        return ingredients_obj_list
    }

    const processTools = () => {

    }


    return (
        <div>
            <div className="stepContainer">
                <h2>STEPS</h2>
                {steps.map((item, ind) => (
                    <div key={ind} className="stepBlock"> {item} </div>
                ))}
            </div>
            <div className="graphContainer">
                {graph_data && 
                    <Graph
                        id='graph-id'
                        data={graph_data}
                        config={myConfig}
                    />
                }
            </div>
            {/* {graph_data && <GraphParsing graph_data={graph_data} />} */}
        </div>
    )
}

export default GraphGeneration;