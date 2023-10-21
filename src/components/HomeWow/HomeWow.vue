<template>
   <span>Argent : {{ money }}</span>
   

    <div class="container">
        <div 
            v-for="item in level" v-bind:key="item.index"
            class="green mb"
            
            >
                <div class="containerBidule dpf-row dpf-j-btw dpf-a-center" v-if="!item.nextUnblock && !item.isLock">
                    <div class="containerBox container20 dpf-column">
                        <span>{{ item.gainSecondes }}$ /travailleur</span>
                        <div>
                            <span>{{ item.stock }}</span>
                            <div class="box" v-on:click="getMoney(item)"></div>
                        </div>
                    </div>
                    <div class="container10">
                        <button v-on:click="getManager(item)">Manager</button>
                    </div>
                    <div class="containerWorker container60 dpf-row dpf-a-bottom">
                        <div class="workers" :class="'class-' +item.index" v-on:click="startWorker(item)" v-for="index in item.workers" >
                        </div>
                    </div>
                    
                    <div class="container-amelioration container10 dpf-column">
                        <div class="amelioration" :class="{'active':money >= item.price1 && item.level !== maxLevel}"
                        v-on:click="openPopup(item.index)">
                        <span> lvl {{ item.level }}</span> <br>
                        <span v-if="item.level !== maxLevel"> {{item.price1}} $</span>
                        </div>

                        <!-- <div class="amelioration" :class="{'active':money >= item.price1 && item.level !== 'max'}"
                        v-on:click="updateLevel(item)">
                        <span> lvl {{ item.level }}</span> <br>
                        <span v-if="item.level !== 'max'"> {{item.price1}} $</span>
                        </div> -->
                    </div>
                </div> 

                <div class="containerBidule" v-if="item.nextUnblock && item.isLock">
                    <button v-on:click="unblock(item)">{{ item.priceUnblock }} $</button>

                </div>
        </div>
    </div>
    <PopupLevel :item="selectLevel" v-if="popup" @closePopup="handleClosePopup" @addWorker="handleAddWorker"/>

</template>

<script setup lang="ts">
import { ref } from "vue"
import { Level } from "@/types/Level"
import {maxLevel, level, addWorker, money} from  "@/data/levels"
import PopupLevel from "../popup/Level/level.vue"
import { PopupLevelType } from "@/types/PopupLevelType"
// const money = ref<number>(0)
let popup = ref<boolean>(false)
let selectLevel = ref<Level>(level.value[0])
const infoLevel = ref<PopupLevelType | null>(null)

const getManager=(item:Level):void=>{
    item.haveManager = true;
    startWorker(item);
    setInterval(function () {
        console.log('start setInterval')
    startWorker(item);
  }, 900);

}


const handleAddWorker = (data:Level) => {
    const worker =  document.getElementsByClassName("class-"+data.index);

   setTimeout(function () {
    const bidule =  worker[data.workers-1] as HTMLElement
    const option : {ecart:string, url:string } = getBackgroundAndGap(data)
    bidule.style.left = option!.ecart
    bidule.style.backgroundImage = option!.url
    }, 100 )

}

const getBackgroundAndGap=(item:Level):{ ecart: string; url: string }=>{
    switch (item.workers){
        case 1:
        return {ecart:"1%",url:"url('src/assets/elfe/stand.gif')" };
        case 2: 
        return {ecart:"-0.5%",url:"url('src/assets/human/stand.gif')" };
        case 3: 
        return {ecart:"-1%",url:"url('src/assets/nain/stand.gif')" };
        case 4: 
        return {ecart:"10px",url:"url('src/assets/human/stand.gif')" };
        case 5: 
        return {ecart:"0px",url:"url('src/assets/human/stand.gif')" };
        default:
            return {ecart:"0px",url:"url('src/assets/human/stand.gif')" };
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

            }, i*500)
          

                setTimeout(function () {
                    element.classList.remove("workers"+i);
                    item.stock =arrondir(item.stock + item.gainSecondes) ;
                    item.isClickable = true;
                   
            }, item.speedWorkers+i* 500)
        }  
       
    }
  
}


const getMoney = (item:Level):void=>{
    money.value = arrondir(money.value +  item.stock);
    item.stock = 0;
}

const arrondir=(number:number):number=>{
    return Math.ceil(number*100)/100;
}
const unblock=(item:Level):void=>{

    item.isLock = false;
    item.nextUnblock = false;
}

const openPopup=(id:number)=>{  
    popup.value=true
    selectLevel.value = level.value[id]
}

const handleClosePopup = (data:boolean) => {
    popup.value = data
}

</script>
<style scoped src="./animation.css"></style>
<style scoped src="./style.css"></style>