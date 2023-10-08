<script setup lang="ts">
import HelloWord from '../components/HelloWorld.vue'
import {Glace} from "@/types/Glace"
import { ref } from "vue"
const items = ref<Glace[]>([
  {
    name:"glace a l'eau",
    price:10
  },
  {
    name:"glace vanille",
    price:10
  },
])
</script>

<template>
  <main>
    <HelloWord :itemGlace="items" />
  </main>
</template>
