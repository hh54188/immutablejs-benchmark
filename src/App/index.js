import React from "react";
import { Map, fromJS } from "immutable";

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
  render() {
    return (
      <div>
        <button onClick={this.convertDeepObjectTooMap}>test</button>
      </div>
    );
  }
}

export default App;
