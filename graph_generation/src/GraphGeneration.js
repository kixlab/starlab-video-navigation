import React, { useState, useEffect } from 'react';
import { Graph } from 'react-d3-graph';
import vtt from './data/finding-it-annos-v0.1.1/YCII/RR/101/ucky1nWb7LY.en.txt';
import Boundingbox from 'react-bounding-box';

import './GraphGeneration.css';

function GraphGeneration() {
    const [steps, setStep] = useState([]);
    const [graph_data, setGraphData] = useState();

    useEffect (() => {
        fetch(vtt)
            .then(r => r.text())
            .then(text => {
                setStep(parseStep(text))
                setGraphData(parseGraph(text))
            });
      }, []);

    // const params = {
    //     imgUrl: '/Users/sangkyung/Desktop/starlab/2level_graph/starlab-video-navigation/graph_generation/src/data/YC2Data/ucky1nWb7LY/000001.jpg',
    //     boxes: [
    //         [393, 233, 125, 137]
    //     ]
    // }

    // const params = {
    //     image:
    //       "https://images.unsplash.com/photo-1612831660296-0cd5841b89fb?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    //     boxes: [[100, 100, 250, 250]]
    //   };

    const myConfig = {
        nodeHighlightBehavior: true,
        node: {
            color: 'lightgreen',
            size: 120,
            highlightStrokeColor: 'blue'
        },
        link: {
            highlightColor: 'lightblue'
        },
        directed: true,
        width: 800,
        height: 800
    };


    const parseStep = (vtt_data) => {
        var data = vtt_data.split('\n\n')
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
        var data = vtt_data.split('\n\n').slice(0, -1)
        console.log(data)
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

        console.log(nodes)
        links = links.map(ele => {
            return {source: ele[0], target: ele[1]}
        })
        console.log(links)
        return {nodes: nodes, links: links}
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
                        id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
                        data={graph_data}
                        config={myConfig}
                    />
                }
            </div>
        </div>
    )
}

export default GraphGeneration;