<template>
    <div class="container">
        <div 
            v-for="item in level" v-bind:key="item.index"
            class="green-background mb"
            >
                <LevelContainer 
                :itemContainer="item" 
                class="containerBidule dpf-row dpf-j-btw dpf-a-center" 
                v-if="!item.nextUnblock && !item.isLock"
                @selectLevel="handleSelectLevel">
                </LevelContainer> 

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
import { level, money} from  "@/data/levels"
import PopupLevel from "../popup/Level/level.vue"
import LevelContainer from "../Level/level.vue"
import { PopupLevelType } from "@/types/PopupLevelType"
let popup = ref<boolean>(false)
let selectLevel = ref<Level>(level.value[0])
const infoLevel = ref<PopupLevelType | null>(null)


const getBackgroundAndGap=(item:number): { ecart: string; url: string }=>{
    switch (item){
        case 1:
        return {ecart:"1%",url:"url('src/assets/elfe/stand.gif')" };
        case 2: 
        return {ecart:"-0.5%",url:"url('src/assets/human/stand.gif')" };
        case 3: 
        return {ecart:"-1%",url:"url('src/assets/nain/stand.gif')" };
        case 4: 
        return {ecart:"-1.5%",url:"url('src/assets/human/stand.gif')" };
        case 5: 
        return {ecart:"-2%",url:"url('src/assets/nain/stand.gif')" };
        default:
            return {ecart:"0px",url:"url('src/assets/nain/stand.gif')" };
    }
}

const unblock=(item:Level): void=>{
    item.isLock = false;
    item.nextUnblock = false;
}

const handleClosePopup = (data:boolean): void => {
    popup.value = data
}

const handleAddWorker = (data:Level, add:number): void => {
    const worker =  document.getElementsByClassName("class-"+data.index);
    const lastWorker = data.workers - add
    
    for(let i = lastWorker+1; i<=lastWorker + add; i++){
        console.log(i)
        setTimeout(function () {
        const bidule =  worker[i-1] as HTMLElement
        const option : {ecart:string, url:string } = getBackgroundAndGap(i)
        bidule.style.left = option!.ecart
        bidule.style.backgroundImage = option!.url
        }, 100 )
    }
}

const handleSelectLevel = (data:Level): void => {
    selectLevel.value = data;
    popup.value=true
}

</script>
<style scoped src="./style.css"></style>