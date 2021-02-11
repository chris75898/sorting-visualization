<template>
  <div id="app">
    <div class="row justify-content-center min-vh-100 w-100" style="margin: 0 auto;">
      <div class="col-12">
        <div class="d-flex flex-column h-100">
          <b-row class="row justify-content-center header">
            <b-col>
              <h3 class="text-center">Number of Nodes</h3>
              <vue-slider
                v-model="arraySize"
                :lazy="true"
                @change="generateData()"
                min="10"
                max="300"
                :disabled="isSorting"
              ></vue-slider>
            </b-col>
            <b-col>
              <h3 class="text-center">Move Speed</h3>
              <vue-slider v-model="moveSpeed" :data="Object.keys(delaySpeeds)"></vue-slider>
            </b-col>
            <b-col>
              <h3 class="text-center">Compare Speed</h3>
              <vue-slider :data="Object.keys(delaySpeeds)" v-model="compareSpeed"></vue-slider>
            </b-col>
          </b-row>
          <b-row class="header">
            <div style="margin: 0 auto" class="text-center">
              <b-button
                :disabled="isSorting"
                variant="outline-primary"
                class="mx-2 my-2"
                style="background-color: #F7F7FF"
                v-for="alg in sortingAlgorithms"
                :key="alg.name"
                @click="runAlgorithm(alg)"
                >{{ alg.name }}</b-button
              >
            </div>
          </b-row>
          <div style="width: 80%; margin: 0 auto; align-items: flex-end; flex-wrap: nowrap" class="row justify-content-center flex-grow-1 px-4">
            <div :style="{ 'margin': ('0 ' + (arraySize > 50 ? '0' : '1px')), 'min-width': '1px', 'border': 'solid gray 1px', height: (eachItem.value + '%')}" :class="{ hasFocus: eachItem.hasFocus, hasCompare: eachItem.hasCompare, bar: true, isCorrect: eachItem.isDone, 'd-linline': true, 'flex-fill': true, 'bar': true, 'isSwapping': eachItem.isSwapping }" v-for="eachItem in records" :key="eachItem.index">
            </div>
          </div>
          <b-row class="text-center pt-1">
            <b-col><span class="btn btn-primary header">Algorithm: <span class="font-weight-bold">{{currentAlgorithm}}</span></span></b-col>
            <b-col><span class="btn btn-primary header">Compares: <span class="badge badge-light">{{statistics.totalCompares}}</span></span></b-col>
            <b-col><span class="btn btn-primary header">Moves: <span class="badge badge-light">{{statistics.totalMoves}}</span></span></b-col>
          </b-row>
        </div>
      </div>
    </div>
    <h1 class="centered">Sorting Visualization</h1>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import { CommonFunctions } from "./CommonFunctions";
export default {
  name: "BarGraph",
  components: {
    VueSlider,
  },
  created: async function () {
    this.sortingAlgorithms.push(await import("./Algorithms/Bubble.js"));
    this.sortingAlgorithms.push(await import("./Algorithms/QuickSort.js"));
    this.sortingAlgorithms.push(await import("./Algorithms/InsertionSort.js"));
    this.sortingAlgorithms.push(await import("./Algorithms/SelectionSort.js"));
    this.sortingAlgorithms.push(await import("./Algorithms/Cocktail.js"));

  },
  mixins: [CommonFunctions],
  data: function () {
    return {
      arraySize: 50,
      sortingAlgorithms: [],
      records: this.generateData(),
      moveSpeed: "Regular",
      compareSpeed: "Regular",
      currentAlgorithm: "",
      delaySpeeds: {'Slow': 5, 'Regular': 4, 'Fast': 2, 'Super Fast': 0},
      statistics: {
        totalCompares: 0,
        totalMoves: 0,
      },
      isSorting: false,
      wasSorting: false
    };
  },
  methods: {
  },
};
</script>
<style>
body {
  background-size: 40px 40px;
  background-image: radial-gradient(circle, #000000 1px, rgba(0, 0, 0, 0) 1px);
}
.header {
  background-color: rgba(84, 94, 117, .8) !important;
}
.header h3 {
  color: rgba(247, 247, 255, 1) !important;
}
button:hover {
  color: black !important;
}
.bar {
  background-color: rgba(247, 247, 255, .9);
}
  .hasFocus {
    background-color: rgba(242, 208, 164, .9);
  }
  .hasCompare {
    border-color: rgba(192, 50, 33,.9);
  }
  .isCorrect {
    background-color: rgba(63, 130, 109, .9);
  }
  .isSwapping {
    background-color: rgba(192, 50, 33,.9);
  }
  .centered {
  position: fixed;
  top: 35%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  z-index: -999;
  letter-spacing: 3px;
}
</style>