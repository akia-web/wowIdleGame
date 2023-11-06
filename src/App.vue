<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import {money} from  "@/data/levels"
</script>

<template>
  <div class="dpf-row container-nav">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <div>Argent : {{ money }}</div>
  </div>

  <RouterView />
</template>

<style scoped>
.container-nav{
  background: black;
  color: white;
}
a{
  color: white;
  margin-right: 10px;
}
</style>
