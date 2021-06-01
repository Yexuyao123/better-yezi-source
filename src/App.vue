<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./src/css/common.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  font-size: 16px;
  color: $gray-10;
  min-width: 1750px;
  overflow-x: auto;
  $color-primary1: #00416a; /* fallback for old browsers */
  background: $d-color0;
  width: 100%;
  height: 100%;
  //border: #f8a5c2 1px solid;
}
</style>
