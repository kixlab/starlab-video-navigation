import { useState, useEffect, useRef } from 'react';
import ReactTooltip from 'react-tooltip';
import './NavigationPage.css';

import video from "./video/The Best Steak Wrap - Clean Eating.mp4";
import sceneGraphs from './data/how_to_100m_data_sg.json';


function NavigationPage() {
  const [objectList, setObjectList] = useState();
  const [selectedObj, setObject] = useState([]);
  const [objTime, setObjTime] = useState();

  const [currentTime, setCurrentTime] = useState(0);
  // const [metadata, setMetadata] = useState(null);
  const [playbarPosition, setplaybarPosition] = useState(0);

  const ref = useRef();
  const totalTime = (ref && ref.current && ref.current.duration) || 0;
  const playbarElement = document.getElementsByClassName('playbar');


  useEffect (() => {
    parse_objects();
    addTimeUpdate();
    const setFromEvent = (e) => setplaybarPosition(e.clientX - playbarElement[0].offsetLeft);
    window.addEventListener("mousemove", setFromEvent);
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  const addTimeUpdate = () => {
    const observedVideoElement = ref && ref.current;
    if (observedVideoElement) {
      observedVideoElement.addEventListener("timeupdate", function() {
        setCurrentTime(observedVideoElement.currentTime);
      })
    }
  }

  const parse_objects = () => {
    const total_objs = new Array();
    sceneGraphs.map((sg) => {
      sg.objects.map((obj) => {
        var ind = 0;
        for (var i = 0; i < total_objs.length; i++) {
          if (total_objs[i].name == obj.name) {
            ind = 1;
            total_objs[i].value += 1;
            
            // last element
            var current_dur = total_objs[i].duration[total_objs[i].duration.length - 1];
            if (!current_dur.end || sg.frame == current_dur.end + 25 || sg.frame == 10301) {
              current_dur.end = sg.frame;
            }
            else {
              total_objs[i].duration.push({start: sg.frame, end: undefined});
            }

          }
        }
        // new object
        if (ind == 0) {
          total_objs.push({name: obj.name, value: 1, duration: [{start: sg.frame, end: undefined}]});
        }
      })
    });
    total_objs.sort((prev, next) => (next.value - prev.value));
    var major_objs = total_objs.splice(0, 15);
    setObjectList(major_objs);
  }

  const getOverlapTime = (objs) => {
    var obj_timelist = new Array();
    if (objs.length == 0) {
      obj_timelist = [];
    }
    else if (objs.length == 1) {
      obj_timelist = objs[0].duration.map((ele) => {
        return {start: ele.start * 0.041, end: ele.end * 0.041}
      })
    } else {
      var prevObj = objs[0];
      var nextObj = objs[1];
      var overlapTime = new Array();
  
      prevObj.duration.map((prev) => {
        nextObj.duration.map((next) => {
          if (prev.start >= next.start) {
            if (prev.start >= next.end) {
              // no overlapping
            } 
            else if (prev.end >= next.end) {
              overlapTime.push({start: prev.start, end: next.end});
            }
            else {
              overlapTime.push({start: prev.start, end: prev.end});
            }
          }
          else if (prev.start <= next.start && prev.end >= next.start) {
            if (prev.end >= next.end) {
              overlapTime.push({start: next.start, end: next.end});
            } else {
              overlapTime.push({start: next.start, end: prev.end});
            }
          }
        })
      });
      obj_timelist = overlapTime.map((ele) => {
        return {start: ele.start * 0.041, end: ele.end * 0.041}
      })
      
    }
    setObjTime(obj_timelist);
  }

  const handle_object_click  = (obj) => {
    var newObjects = new Array();
    if (selectedObj.includes(obj)) {
      newObjects = selectedObj.filter(item => item.name !== obj.name);
      setObject(newObjects);
      getOverlapTime(newObjects);
    } else {
      newObjects = [...selectedObj];
      if (newObjects.length >= 2) {
        alert ('maximum 2 objects are available');
      } else {
        newObjects.push(obj);
        setObject(newObjects);
        getOverlapTime(newObjects);
      }
    }
  }

  const handle_timeline_click = () => {
    var newTime = playbarPosition * totalTime / 500;
    const observedVideoElement = ref && ref.current;
    observedVideoElement.currentTime = newTime;
  }

  const posToTime = (time) => {
    var tmp = time * totalTime/ 500;
    var min = (Math.floor(tmp /  60)).toString();
    var sec = (Math.floor(tmp - min * 60)).toString();
    if (sec.length == 1) {
      sec = 0 + sec;
    }
    return min + ':' + sec;
  }

  const getProgressLength = () => {
    return currentTime * 500 / totalTime;
  }


  return (
    <div className={"navigationPage"}>
      <h1>Navigation</h1>
        <div className={"videoContainer"}>
          <video className={"videoWrapper"} 
            controls 
            ref={ref}
            // onLoadedMetadata = {e => {
            //   setMetadata({
            //     duration: e.target.duration,
            //     current: e.target.currentTime,
            //   })
            // }}
            src={video}>
            
          </video>
          <div className={"playbar"} onClick={handle_timeline_click} data-tip data-for="playbarTip">
            {objTime && objTime.map((ele, ind) => (
              <div 
                key={ind} 
                className={"timeline"} 
                style={{width: `calc(${ele.end}px - ${ele.start}px)`, left: `${ele.start}px`}} 
              >
              </div>
            ))}
          </div>
          {totalTime != 0 &&
            <div className={"progressbar"} style={{width: `${getProgressLength()}px`}} data-tip data-for="playbarTip"></div>
          }
          <ReactTooltip id="playbarTip" place="top">
            {posToTime(playbarPosition)}
          </ReactTooltip>
          <div className={"objectWrapper"}>
            <h2>Objects</h2>
            {objectList && objectList.map((obj, ind) => (
              <div className={"tagWrapper"} key={ind}>
                {selectedObj.includes(obj) 
                  ? (<div className={"selectedTag"} onClick={() => handle_object_click(obj)}>{obj.name}</div>)
                  : (<div className={"objectTag"} onClick={() => handle_object_click(obj)}>{obj.name}</div>)
                }
              </div>
            ))}
          </div>
        </div>
      <div className="infoContainer">
        <h1>{currentTime && currentTime}</h1>
        <h2>{totalTime}</h2>
      </div>
    </div>
  );
}

export default NavigationPage;
