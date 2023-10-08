<template>
  {{hello}}
  <button v-on:click="change('lala')">Click</button>

  <div v-for='item in itemsUser' v-bind:key='item.name'>
    <span>{{item.name}}</span>
  </div>

  <div v-for='item in props.itemGlace' v-bind:key='item.name'>
    <span>{{item.name}}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { User } from "@/types/User"
import {Glace} from "@/types/Glace"

const hello = ref<string>('bidule');
const itemsUser =ref<User[]>([
  {
    name:'Nord',
    age: 90
  },
    {
    name:'Coders',
    age: 81
  },
])

const props = defineProps<{
itemGlace: Glace[]
}>()
const change =(change:string)=>{
  hello.value = change
}

</script>
<style scoped>
</style>
