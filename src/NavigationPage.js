import { useState, useEffect } from 'react';
import './NavigationPage.css';
import Graph from "react-graph-vis";

import video from "./video/The Best Steak Wrap - Clean Eating.mp4";

import actions from './data/atomic_action.json';
import sceneGraphs from './data/how_to_100m_data_sg.json';


function NavigationPage() {

  const [atomicActions, setActions] = useState(actions);
  const [actionGraphs, setActionGraphs] = useState();
  const [aggGraph, setAggGraph] = useState();

  useEffect (() => {
    parse_action_graph();
    parse_agg_graph();
  }, []);

  const parse_agg_graph = () => {
    const total_objs = new Set();
    sceneGraphs.map((sg) => {
      sg.objects.map((obj) => {
        total_objs.add(obj.name)
      })
    })
    var objs = Array.from(total_objs);
    var dataset = {
      nodes: [],
      edges: []
    };
    dataset.nodes.push({id: 1, label: "person"});
    for (var i = 0; i < objs.length; i++) {
      var node_obj = {id: i + 2, label: objs[i]};
      var edge_obj = { from : 1, to: i + 2}
      dataset.nodes.push(node_obj);
      dataset.edges.push(edge_obj);
    }
    setAggGraph(dataset);
  }

  const parse_action_graph = () => {
    var action_graphs = []
    atomicActions.map((action) => {
      const objs = new Set();
      sceneGraphs.map((sg) => {
        if (sg.frame >= action.frame_start && sg.frame <= action.frame_end) {

          sg.objects.map((obj) => {
            objs.add(obj.name);
          })
        }
      })
      var dataset = {
        nodes: [],
        edges: []
      };
      var obj_list = Array.from(objs);
      dataset.nodes.push({id: 1, label: "person"});
      for (var i = 0; i < obj_list.length; i++) {
        var node_obj = {id: i + 2, label: obj_list[i]};
        var edge_obj = { from : 1, to: i + 2}
        dataset.nodes.push(node_obj);
        dataset.edges.push(edge_obj);
      }
      action_graphs.push(dataset);
    })
    setActionGraphs(action_graphs);
  }

  const graph = {
    nodes: [
      { id: 1, label: "Node 1", title: "node 1 tootip text" },
      { id: 2, label: "Node 2", title: "node 2 tootip text" },
    ],
    edges: [
      { from: 1, to: 2 },
    ]
  };

  const agg_options = {
    height: "300px"
  };

  const options = {
    layout: {
      hierarchical: true
    },
    edges: {
      color: "#000000"
    },
    height: "300px"
  };

  const events = {
    select: function(event) {
      var { nodes, edges } = event;
    }
  };


  return (
    <div className="App">
      <div>
        <video className={"videoWrapper"} controls width="500px" src={video}></video>
        <div className={"aggGraph"}>
          <h1>Graph</h1>
          {aggGraph && 
            <Graph
              graph={aggGraph}
              options={agg_options}
              events={events}
              getNetwork={network=> {}}
            />}
        </div>
      </div>
      <h2>actions</h2>
      <div className="atomicActions">
        {atomicActions && atomicActions.map((ele, ind) => (
          <div className="actionWrapper" key={ind}>
            <div>
              <p>{ele.class}</p>
              {actionGraphs && 
                <Graph
                  graph={actionGraphs[ind]}
                  options={agg_options}
                  events={events}
                  getNetwork={network=> {}}
                />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NavigationPage;
