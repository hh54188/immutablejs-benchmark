import React from "react";
import { Map } from "immutable";

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

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  objectAssignBenchmark() {
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
  render() {
    return (
      <div>
        <button onClick={this.objectAssignBenchmark}>Object.assign</button>
      </div>
    );
  }
}

export default App;
