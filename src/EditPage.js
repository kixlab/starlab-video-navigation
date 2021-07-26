import { useState, useEffect } from 'react';
import './App.css';
import Graph from "react-graph-vis";

import actions from './data/atomic_action.json';
import graphs from './data/how_to_100m_data_sg.json';


function EditPage() {

  const [atomicActions, setActions] = useState(actions);
  const [sceneGraphs, setGraphs] = useState(graphs);

  const aggGraph = {
    
  }


  const parse_actions = () => {

  }

  const parse_scene_graph = () => {

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

  const options = {
    layout: {
      hierarchical: true
    },
    edges: {
      color: "#000000"
    },
    height: "500px"
  };

  const events = {
    select: function(event) {
      var { nodes, edges } = event;
    }
  };


  return (
    <div className="App">
      <video controls src="./video/The Best Steak Wrap - Clean Eating.mp4"></video>

      <div className="atomicActions">
        {atomicActions && atomicActions.map((ele, ind) => (
          <div className="actionWrapper" key={ind}>
            <div>
              {ele.class}
              <Graph
                graph={graph}
                options={options}
                events={events}
                getNetwork={network => {
                  //  if you want access to vis.js network api you can set the state in a parent component using this property
                 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditPage;
