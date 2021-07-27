import React, { useState, useEffect } from 'react';

import Graph from "react-graph-vis";
import atomicActions from './data/atomic_action.json';
import './EditPage.css';


import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });

function App() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [actions, setActions] = useState(atomicActions);
  const [cutVideos, setCutVideos] = useState([]);
  const [out, setOut] = useState();

  const colorOpt = ['oragne', 'blue', 'green', 'yellow', 'gray', 'black', 'red', 'pink'];

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(() => {
    load();
  }, [])

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

  const events = {
    select: function(event) {
      var { nodes, edges } = event;
    }
  };

  // const cutWithTime = async () => {
  //   // Write the file to memory 
  //   ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

  //   // Run the FFMpeg command
  //   await ffmpeg.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2', '-f', 'mp4', 'out.mp4');

  //   // Read the result
  //   const data = ffmpeg.FS('readFile', 'out.mp4');

  //   // Create a URL
  //   const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
  //   setOut(url)
  // }

  const cutByAction = async (action_obj) => {
    var dur = ((action_obj.frame_end - action_obj.frame_start) / 30).toString();
    var start = (action_obj.frame_start / 30).toString();
    console.log(start, dur, 'ss');

    // Write the file to memory 
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

    // Run the FFMpeg command
    await ffmpeg.run('-i', 'test.mp4', '-t', dur, '-ss', start, '-f', 'mp4', action_obj.class);

    // Read the result
    const data = ffmpeg.FS('readFile', action_obj.class);

    // Create a URL
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));

    // cutVideos.push({"class": action_obj.class, "src": url});
    setCutVideos(prev => [...prev, {"class": action_obj.class, "src": url}]);
    console.log(cutVideos);
  }

  return ready ? (
    <div className="App">
      <h2>Video Editing Tool</h2>
      <div>
        <div className={"inputView"}>
          <h3>Source</h3>
          <div className={"videoSource"}>
           {!video && <input type="file" onChange={(e) => setVideo(e.target.files?.item(0))} />}
            {video && 
              <div className={"videoContainer"}>
                <video
                  controls
                  width="400"
                  src={URL.createObjectURL(video)}>
                </video>
              </div>
            }
            <p>Actions</p>
            {actions && actions.map((ele, ind) => (
              <div 
                key={ind}
                style={{width: `calc(calc(${ele.frame_end} - ${ele.frame_start}) * 13)px`, marginLeft: `calc(${ele.frame_start} * 13) px)`}}
                className="atomicActionBar" 
                onClick={() => cutByAction(ele)}
              >
                {ele.class}
              </div>
            ))}
          </div>
          <div className={"graph"}>
            <Graph
                graph={graph}
                options={agg_options}
                events={events}
                getNetwork={network=> {}}
                />
          </div>
        </div>

        <div className={"cutView"}>
          <h3>Cut With Actions</h3>
            {cutVideos && cutVideos.map((v, ind) => (
              <div key={ind}>
                <p>{v.class}</p>
                <video controls src={v.src} width="250" />
              </div>
            ))}
          <h3>Cut With Graphs</h3>
        </div>

        <div className={"outputView"}>
          <h3>Output</h3>
          {out && <video controls src={out} width="250" />}

        </div>
      </div>
    </div>
  )
    :
    (
      <p>Loading...</p>
    );
}

export default App;
