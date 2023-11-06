<template>
<div class="padding10">
    <div class="containerBox container20 dpf-column dpf-j-btw">
        <span>{{ props.itemContainer.gainSecondes }}$ /travailleur</span>
        <div>
            <span>{{ props.itemContainer.stock }}</span>
            <div class="box" v-on:click="getMoney(props.itemContainer)"></div>
        </div>
    </div>
    <div class="container10">
        <button v-on:click="getManager(props.itemContainer)">Manager</button>
    </div>
    <div class="containerWorker container40 dpf-row dpf-a-bottom">
        <div class="workers" :class="'class-' +props.itemContainer.index" v-on:click="startWorker(props.itemContainer)" v-for="index in props.itemContainer.workers" >
        </div>
    </div>
    
    <div class="container-amelioration container20 dpf-column" >
        <div class="amelioration" :id="'levelUp-'+props.itemContainer.index" :class="{'active':money >= props.itemContainer.price1 && props.itemContainer.level !== maxLevel}"
        v-on:click="openPopup(props.itemContainer)">
        <p> Niveau </p>
        <p class="text-center">{{ props.itemContainer.level }}</p>
        </div>

        <!-- <div class="amelioration" :class="{'active':money >= item.price1 && item.level !== 'max'}"
        v-on:click="updateLevel(item)">
        <span> lvl {{ item.level }}</span> <br>
        <span v-if="item.level !== 'max'"> {{item.price1}} $</span>
        </div> -->
    </div>
</div>
</template>

<script setup lang="ts">
import type { Level } from "@/types/Level";
import {maxLevel, money} from  "@/data/levels"
import { ref, defineEmits } from "vue"

const props = defineProps<{
    itemContainer: Level
}>()

const emit = defineEmits();


const getMoney = (item:Level):void=>{
    money.value = arrondir(money.value +  item.stock);
    item.stock = 0;
   const buttonLevelUp =  document.querySelector('#levelUp-'+item.index) as HTMLElement

    if(money.value >= item.price1){
        console.log(item.price1)
        setTimeout(function () {
        buttonLevelUp.classList.add('levelUp')
    },100)
    } 
}

const getManager=(item:Level):void=>{
    item.haveManager = true;
    startWorker(item);
    for(let i = 1; i<item.workers+1;i++){
        setInterval(function () {
            startWorker(item);
        }, item.speedWorkers+ 200);
    }

}

const startWorker = (item:Level):void=>{
    console.log(document.styleSheets)
    if(item.isClickable){
        item.isClickable = false;
        const worker =  document.getElementsByClassName("class-"+item.index);
        for (let i = 0; i < worker.length; i++) {
            const element = worker[i] as HTMLElement;

            setTimeout(function () {
                element.classList.add('workers'+i);
                element.style.animationDuration = item.speedWorkers+"ms";
            }, i*100)
          

            setTimeout(function () {
                element.classList.remove("workers"+i);
                item.stock =arrondir(item.stock + item.gainSecondes) ;
                item.isClickable = true;
            }, item.speedWorkers+i* 100)
        }      
    }
  
}

const arrondir=(number:number):number=>{
    return Math.ceil(number*100)/100;
}

const openPopup=(item:Level):void=>{  
    emit('selectLevel', item);
}


</script>
<style scoped src="./animation.css"></style>
<style scoped src="./style.css"></style>
