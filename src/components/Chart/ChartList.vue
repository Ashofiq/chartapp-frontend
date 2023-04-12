<template>
    <carousel :items-to-show="7">
      <slide v-for="item in items" :key="item.id">
        <!-- {{ slide }} -->{{ item.id }}
        <img :src="require(`@/assets/chart-image/${item.image}`)" 
          @click="addList(item)"
          :alt="item.name" :title="item.name" width="70" style="cursor: pointer;">
      </slide>
  
      <template #addons>
        <navigation />
        <!-- <pagination /> -->
      </template>
    </carousel>
  </template>
  
  <script>
  // If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
  import 'vue3-carousel/dist/carousel.css'
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
  
  export default {
    name: 'App',
    data(){
      return {
        items: [
            {   
                id:1,
                name: 'Doughnut Chart (Base on 1 Column, Group Then Count)',
                methodName: 'doughNutChart',
                type: 'chart',
                viewComponent: 'doughnutchart',
                column: [],
                image: 'bar.png',
                chartOptions: {
                  chart: {
                      type: 'column'
                  },
                  title: {
                      text: 'World\'s largest cities per 2021'
                  },
                  subtitle: {
                      text: 'Source: <a href="https://worldpopulationreview.com/world-cities" target="_blank">World Population Review</a>'
                  },
                  xAxis: {
                      type: 'category',
                      labels: {
                          rotation: -45,
                          style: {
                              fontSize: '13px',
                              fontFamily: 'Verdana, sans-serif'
                          }
                      }
                  },
                  yAxis: {
                      min: 0,
                      title: {
                          text: 'Population (millions)'
                      }
                  },
                  legend: {
                      enabled: false
                  },
                  tooltip: {
                      pointFormat: 'Population in 2021: <b>{point.y:.1f} millions</b>'
                  },
                  series: [{
                      name: 'Population',
                      data: [
                          ['Tokyo', 37.33],
                          ['Delhi', 31.18],
                          ['Shanghai', 27.79],
                          ['Sao Paulo', 22.23],
                          ['Mexico City', 21.91],
                          ['Dhaka', 21.74],
                          ['Cairo', 21.32],
                          ['Beijing', 20.89],
                          ['Mumbai', 20.67],
                          ['Osaka', 19.11],
                          ['Karachi', 16.45],
                          ['Chongqing', 16.38],
                          ['Istanbul', 15.41],
                          ['Buenos Aires', 15.25],
                          ['Kolkata', 14.974],
                          ['Kinshasa', 14.970],
                          ['Lagos', 14.86],
                          ['Manila', 14.16],
                          ['Tianjin', 13.79],
                          ['Guangzhou', 13.64]
                      ],
                      dataLabels: {
                          enabled: true,
                          rotation: -90,
                          color: '#FFFFFF',
                          align: 'right',
                          format: '{point.y:.1f}', // one decimal
                          y: 10, // 10 pixels down from the top
                          style: {
                              fontSize: '13px',
                              fontFamily: 'Verdana, sans-serif'
                          }
                      }
                  }]
                }
            },
            {   
                id:2,
                name: 'Bar Chart (X and Y axix, X axis is groupable column)',
                methodName: 'barChart',
                type: 'chart',
                viewComponent: 'barchart',
                column: [],
                image: 'bar.png',
                chartOptions: {
                  chart: {
                      plotBackgroundColor: null,
                      plotBorderWidth: null,
                      plotShadow: false,
                      type: 'bar'
                  },
                  series: [{
                    data: [1,2,3] // sample data
                  }]
                }
            },
            {   
                id:3,
                name: 'Line Chart',
                methodName: 'lineChart',
                type: 'chart',
                viewComponent: 'linechart',
                column: [],
                image: 'bar.png',
                
            },
            {   
                id:4,
                name: 'Date List',
                methodName: 'dateList',
                type: 'dateList',
                viewComponent: 'dateList',
                column: [],
                image: 'bar.png'

            }
        ],
            
      }
    },
    methods:{
      addList(item){
        this.$parent.data.list = item
      }
    },
    components: {
      Carousel,
      Slide,
      Pagination,
      Navigation,
    },
  }
  </script>
  