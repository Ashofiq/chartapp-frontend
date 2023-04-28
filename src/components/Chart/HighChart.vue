<template>
    <highcharts :options="options"></highcharts>
</template>

<script>
import ChartList from './../Chart/ChartList.vue';
import {Chart} from 'highcharts-vue'

export default {
    components:{
        ChartList,
        highcharts: Chart 
    },

    created(){
        // title assign
    },

    props:{
        data:{
            type: Object,
            default: []
        },
        options:{
            type: Object,
            default: {}
        },
        tilte:{
            type: String,
            default: ''
        },
        yAxisTitle:{
            type:String,
            default: ''
        },
        xAxisTitle:{
            type:String,
            default: ''
        }
    }
}
</script>
