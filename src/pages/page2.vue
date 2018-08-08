<template>
    <div id="app">
    <vue-particles
        color="#ff0"
        :particleOpacity="0.7"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="4"
        linesColor="#ff0"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
      >
      </vue-particles>
    <router-view></router-view>
  </div>
</template>
<style scoped>
    .lizi {
        background: url('../assets/images/v2.jpg') no-repeat;
        background-size: 100% 100%;
    }
</style>
