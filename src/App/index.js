import React from "react";
import { Map, fromJS } from "immutable";

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

function runTaskManyTimes(taskFunction, repeatTimes = 1000) {
  const startTime = performance.now();
  let count = repeatTimes;
  while (count) {
    taskFunction();
    count--;
  }
  const totalTime = performance.now() - startTime;
  return totalTime / repeatTimes;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }
  makeNKeyFlatObjectBenchmark() {
    const perOperationCost = runTaskManyTimes(function() {
      makeNKeyFlatObject(100);
    });
    return perOperationCost;
  }
  makeNKeyFlatMapBrenchmark() {
    const perOperationCost = runTaskManyTimes(function() {
      makeNKeyFlatMap(100);
    });
    return perOperationCost;
  }
  makeNKeyDeepObjectBenchmark() {
    const perOperationCost = runTaskManyTimes(function() {
      makeNKeyDeepObject(100);
    });
    return perOperationCost;
  }
  makeNKeyDeepMapBenchmark() {
    const perOperationCost = runTaskManyTimes(function() {
      makeNKeyDeepObject(100);
    });
    return perOperationCost;
  }
  objectAssignBenchmark() {
    const obj1 = makeNKeyFlatObject(1000);
    const obj2 = makeNKeyFlatObject(1000);

    const perOperationCost = runTaskManyTimes(function() {
      Object.assign({}, obj1, obj2);
    });
    return perOperationCost;
  }
  mapMergeBenchmark() {
    const map1 = makeNKeyFlatMap(1000);
    const map2 = makeNKeyFlatMap(1000);

    const perOperationCost = runTaskManyTimes(function() {
      map1.merge(map2);
    });
    return perOperationCost;
  }
  flatMapToJSBenchmark() {
    const map1 = makeNKeyFlatMap(1000);

    const perOperationCost = runTaskManyTimes(function() {
      map1.toJS();
    });
    return perOperationCost;
  }
  deepMapToJSBenchmark() {
    const map1 = makeNkeyDeepMap(100);

    const perOperationCost = runTaskManyTimes(function() {
      map1.toJS();
    });
    return perOperationCost;
  }
  convertFlatObjectToMap() {
    const obj1 = makeNKeyFlatObject(1000);

    const perOperationCost = runTaskManyTimes(function() {
      fromJS(obj1);
    });
    return perOperationCost;
  }
  convertDeepObjectTooMap() {
    const obj1 = makeNKeyDeepObject(100);

    const perOperationCost = runTaskManyTimes(function() {
      fromJS(obj1);
    });
    return perOperationCost;
  }
  clickHandler() {
    console.log(
      `Make flat object average cost ${this.makeNKeyFlatObjectBenchmark()}ms`
    );
    console.log(
      `Make flat Map average cost ${this.makeNKeyFlatMapBrenchmark()}ms`
    );

    console.log(
      `Make deep object average cost ${this.makeNKeyDeepObjectBenchmark()}ms`
    );
    console.log(
      `Make deep Map average cost ${this.makeNKeyDeepMapBenchmark()}ms`
    );

    console.log(`Object.assign average cost ${this.objectAssignBenchmark()}ms`);
    console.log(`Map.merge average cost ${this.mapMergeBenchmark()}ms`);

    console.log(
      `Convert flat map to JS average cost ${this.flatMapToJSBenchmark()}ms`
    );
    console.log(
      `Convert deep map to JS average cost ${this.deepMapToJSBenchmark()}ms`
    );

    console.log(
      `Convert flat object to map average cost ${this.convertFlatObjectToMap()}ms`
    );
    console.log(
      `Convert deep object to map average cost ${this.convertDeepObjectTooMap()}ms`
    );
  }
  render() {
    return (
      <div>
        <button onClick={this.clickHandler}>test</button>
      </div>
    );
  }
}

export default App;
