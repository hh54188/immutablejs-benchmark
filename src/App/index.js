import React from "react";
import { Map, fromJS } from "immutable";
import experiment from "./exp_sample";
// https://github.com/vigneshshanmugam/react-memorystats
import MemoryStatsComponent from "react-memorystats";

function makeNKeyComplexObject(n) {
  const target = {};
  let keyCount = n;
  while (keyCount) {
    let tempReference = {};
    target[`key-${keyCount}`] = tempReference;
    let deepCount = n;
    while (deepCount) {
      tempReference = tempReference[`key-${deepCount}`] = {};
      deepCount--;
    }
    keyCount--;
  }
  return target;
}

function makeNKeyFlatObject(n) {
  const target = {};
  while (n) {
    target[`key-${n}`] = `value-${n}`;
    n--;
  }
  return target;
}

function makeNKeyDeepObject(n) {
  const target = {};
  let tempReference = target;
  while (n) {
    tempReference = tempReference[`key-${n}`] = {};
    n--;
  }
  return target;
}

function makeNKeyFlatMap(n) {
  let target = new Map();
  while (n) {
    target = target.set(`key-${n}`, `value-${n}`);
    n--;
  }
  return target;
}

function makeNkeyDeepMap(n) {
  let target = new Map();
  let paths = [];
  while (n) {
    paths.push(`key-${n}`);
    target = target.setIn(paths, new Map());
    n--;
  }
  return target;
}

function objectAssignMemoryAllocation(times) {
  let target = { count: 1 };
  while (times) {
    target = Object.assign({}, target, { count: target.count + 1 });
    times--;
  }
}

function mapAssignMemeoryAllocation(times) {
  let target = new Map({ count: 1 });
  while (times) {
    target = target.set("count", target.get("count") + 1);
    times--;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  makeObjectBenchmark() {
    const startTime = performance.now();
    const runCount = 1000;
    let count = runCount;
    while (count) {
      // Flat Object (100):
      // const originObject = makeNKeyFlatObject(100); // 0.02ms
      // const originObject = makeNKeyFlatMap(100); // 0.04ms

      // Flat Object (1000):
      // const originObject = makeNKeyFlatObject(1000); // 0.16ms
      // const originObject = makeNKeyFlatMap(1000); // 0.38ms

      // Deep Object (1000):
      // const originObject = makeNKeyDeepObject(100); // 0.015ms
      // const originObject = makeNkeyDeepMap(100); // 0.33ms
      count--;
    }
    const totalTime = performance.now() - startTime;
    console.log(totalTime / runCount);
  }
  objectAssignBenchmark() {
    const obj1 = makeNKeyFlatObject(1000);
    const obj2 = makeNKeyFlatObject(1000);

    const startTime = performance.now();
    const runCount = 1000;
    let count = runCount;
    while (count) {
      const result = Object.assign({}, obj1, obj2);
      count--;
    }
    const totalTime = performance.now() - startTime;
    console.log(totalTime / runCount); // 0.7ms
  }
  mapMergeBenchmark() {
    const map1 = makeNKeyFlatMap(1000);
    const map2 = makeNKeyFlatMap(1000);

    const startTime = performance.now();
    const runCount = 1000;
    let count = runCount;
    while (count) {
      const result = map1.merge(map2);
      count--;
    }
    const totalTime = performance.now() - startTime;
    console.log(totalTime / runCount); // 0.2ms
  }
  flatMapToJSBenchmark() {
    const map1 = makeNKeyFlatMap(1000);

    const startTime = performance.now();
    const runCount = 1000;
    let count = runCount;
    while (count) {
      map1.toJS();
      count--;
    }
    const totalTime = performance.now() - startTime;
    console.log(totalTime / runCount); // 0.12ms
  }
  deepMapToJSBenchmark() {
    const map1 = makeNkeyDeepMap(100);

    const startTime = performance.now();
    const runCount = 1000;
    let count = runCount;
    while (count) {
      map1.toJS();
      count--;
    }
    const totalTime = performance.now() - startTime;
    console.log(totalTime / runCount); // 0.04ms
  }
  convertFlatObjectToMap() {
    const obj1 = makeNKeyFlatObject(1000);

    const startTime = performance.now();
    const runCount = 1000;
    let count = runCount;
    while (count) {
      fromJS(obj1);
      count--;
    }
    const totalTime = performance.now() - startTime;
    console.log(totalTime / runCount); // 0.38ms
  }
  convertDeepObjectTooMap() {
    const obj1 = makeNKeyDeepObject(100);

    const startTime = performance.now();
    const runCount = 1000;
    let count = runCount;
    while (count) {
      fromJS(obj1);
      count--;
    }
    const totalTime = performance.now() - startTime;
    console.log(totalTime / runCount); // 0.05ms
  }
  clickHandler() {
    // objectAssignMemoryAllocation(1000);
    mapAssignMemeoryAllocation(1000);
  }
  render() {
    return (
      <div>
        <MemoryStatsComponent corner="topRight" />
        <button onClick={this.clickHandler}>test</button>
      </div>
    );
  }
}

export default App;
