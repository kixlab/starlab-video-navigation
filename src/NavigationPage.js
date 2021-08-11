import { useState, useEffect, useRef } from 'react';
import ReactTooltip from 'react-tooltip';
import './NavigationPage.css';

import video from "./video/The Best Steak Wrap - Clean Eating.mp4";
import sceneGraphs from './data/how_to_100m_data_sg.json';
import actionList from './data/atomic_action.json';


function NavigationPage() {
  const [objectList, setObjectList] = useState();
  const [selectedObj, setObject] = useState([]);

  const [objTime, setObjTime] = useState();
  const [actTime, setActTime] = useState();

  const [actions, setActionList] = useState(actionList);
  const [selectedAction, setAction] = useState();

  const [currentTime, setCurrentTime] = useState(0);
  const [playbarPosition, setplaybarPosition] = useState(0);

  const ref = useRef();
  const totalTime = (ref && ref.current && ref.current.duration) || 0;
  const playbarElement = document.getElementsByClassName('playbar');

  useEffect (() => {
    parse_data();
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

  const parse_data = () => {
    var obj_list = parse_objects();
    var action_list = parse_actions(obj_list);
    setObjectList(obj_list);
    setActionList(action_list);
  }

  const parse_objects = () => {
    var total_objs = new Array();
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
    // var major_objs = total_objs.splice(0, 15);
    return total_objs;
  }

  const parse_actions = (objList) => {
    var action_objs = new Array();
    // push total action
    action_objs.push({label: 'TOTAL', objects: objList, duration: {start: 0, end: 12225}});

    actions.map((action) => {
      var objNames = new Set();
      sceneGraphs.map((sg) => {
        if (sg.frame >= action.frame_start && sg.frame <= action.frame_end) {
          sg.objects.map((obj) => {
            objNames.add(obj.name);
          })
        }
      });
      var objs = new Array();
      objList.map((obj) => {
        if (objNames.has(obj.name)) {
          objs.push(obj);
        }
      });
      action_objs.push({label: action.class, objects: objs, duration: {start: action.frame_start, end: action.frame_end}});
    });
    console.log(action_objs)
    return action_objs;
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
    var obj_time = limit_time_with_action(obj_timelist);
    setObjTime(obj_time);
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

  const limit_time_with_action = (obj_timelist) => {
    var obj_time = new Array();
    obj_timelist.map((ele) => {
      if (ele.end >= actTime.start && ele.start <= actTime.end) {
        if (ele.start <= actTime.start) {
          if (ele.end <= actTime.end) {
            obj_time.push({start: actTime.start, end: ele.end});
          } else {
            obj_time.push({start: actTime.start, end: actTime.end});
          }
        } else {
          if (ele.end <= actTime.end) {
            obj_time.push({start: ele.start, end: ele.end})
          } else {
            obj_time.push({start: ele.start, end: actTime.end})
          }
        }
      } 
    });
    return obj_time;
  }

  const handle_action_click = (act) => {
    if (act == selectedAction) {
      setAction(null);
      setActTime(null);
    } else {
      var actTime = {start: act.duration.start * 0.041, end: act.duration.end * 0.041};
      setAction(act);
      setActTime(actTime);
    }
    setObject([]);
    setObjTime(null);
  }

  // video jump on click timeline
  const handle_timeline_click = () => {
    var newTime = playbarPosition * totalTime / 500;
    const observedVideoElement = ref && ref.current;
    observedVideoElement.currentTime = newTime;
  }

  // get time tootltip value with position on timeline
  const posToTime = (pos) => {
    var time = pos * totalTime / 500;
    var min = (Math.floor(time /  60)).toString();
    var sec = (Math.floor(time - min * 60)).toString();
    if (sec.length == 1) {
      sec = 0 + sec;
    }
    return min + ':' + sec;
  }

  const frameToTime = (frame_duration) => {
    var start = Math.floor(frame_duration.start / 25);
    var end = Math.floor(frame_duration.end / 25);
    var start_min = secToMin(start);
    var end_min = secToMin(end);
    return start_min + '-' + end_min;
  }

  const secToMin = (time) => {
    var min = (Math.floor(time /  60)).toString();
    var sec = (Math.floor(time - min * 60)).toString();
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
      <div className={"videoContainer"}>
        <h3>Video Section</h3>
        <video className={"videoWrapper"} 
          controls 
          ref={ref}
          src={video}>
        </video>
        <div className={"playbar"} onClick={handle_timeline_click} data-tip data-for="playbarTip">
          {objTime && objTime.map((ele, ind) => (
            <div 
              key={ind} 
              className={"timeline"} 
              style={{width: `calc(${ele.end}px - ${ele.start}px)`, left: `${ele.start}px`}} 
            />
          ))}
        </div>
        {totalTime != 0 &&
          <div className={"progressbar"} style={{width: `${getProgressLength()}px`}} data-tip data-for="playbarTip"></div>
        }
        <div className={"actionbarWrapper"}>
          {actTime &&
           <div>
              <div 
                className={"actionbar"} 
                style={{width: `calc(${actTime.end}px - ${actTime.start}px)`, left: `${actTime.start}px`}} 
                data-tip
                data-for="actionbarTip"
              />
              {selectedAction && 
                <ReactTooltip id="actionbarTip" place="top">
                {frameToTime(selectedAction.duration)}
                </ReactTooltip>
              }
            </div>
          }
        </div>
        <ReactTooltip id="playbarTip" place="top">
          {posToTime(playbarPosition)}
        </ReactTooltip>
        {selectedObj.length != 0 &&
          <div>
            <p>Selected Object :</p>
            {selectedObj.map((item, ind) => (
              <p key={ind}>{item.name}</p>
            ))}
          </div>
        } 
      </div>
      <div className="infoContainer">
        <h3>Control Section</h3>
        <div className="infoWrapper">
          <div className={"actionWrapper"}>
            <h3>Actions</h3>
            {actions && actions.map((action, ind) => (
              <div key={ind}>
              {selectedAction && selectedAction.label == action.label 
                ?
                <div className={"selectedActionInfo"}>
                  <div className={"selectedActionTop"} onClick={() => handle_action_click(action)}>
                    <div className={"actionName"}>{action.label}</div>
                    <div className={"actionDuration"}>{action.duration && frameToTime(action.duration)}</div>
                  </div> 
                  <div>
                    {selectedAction && selectedAction.objects.map((obj, ind) => (
                      <div 
                        key={ind} 
                        className={selectedObj.includes(obj) ? "selectedTag" : "objectTag"} 
                        onClick={() => handle_object_click(obj)}
                      >
                        {obj.name}
                      </div>
                    ))}
                  </div>
                </div>
                :
                <div className={"actionInfo"} onClick={() => handle_action_click(action)}>
                  <div className={"actionName"}>{action.label}</div>
                  <div className={"actionDuration"}>{action.duration && frameToTime(action.duration)}</div>
                </div>
              }
              </div>
            ))}
          </div>
          {/* <div className={"objectWrapper"}>
            <h3>Objects</h3>
            {selectedAction && selectedAction.objects.map((obj, ind) => (
              <div 
                key={ind} 
                className={selectedObj.includes(obj) ? "selectedTag" : "objectTag"} 
                onClick={() => handle_object_click(obj)}
              >
                {obj.name}
              </div>
            ))}
          </div> */}
          {/* <div className={"objectWrapper"}>
            <h3>Objects</h3>
            {objectList && objectList.map((obj, ind) => (
              <div 
                key={ind} 
                className={selectedObj.includes(obj) ? "selectedTag" : "objectTag"} 
                onClick={() => handle_object_click(obj)}
              >
                {obj.name}
              </div>
            ))}
          </div> */}
        </div>

        <div>

        </div>
      </div>
    </div>
  );
}

export default NavigationPage;
