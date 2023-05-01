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
              name: 'Bar Chart',
              methodName: 'doughNutChart',
              type: 'chart',
              sectionType:'barChart',
              viewComponent: 'doughnutchart',
              column: [],
              image: 'bar.png',
              chartOptions: {
                chart: {
                    type: 'column'
                },
                title: {
                    align: 'left',
                    text: 'Bar Chart'
                },
                subtitle: {
                    align: 'left',
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    }
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'Total percent market share'
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}%'
                        }
                    }
                },

                tooltip: {
                    headerFormat: "{series.name}<br>",
                    pointFormat: "{point.name}: <b>{point.y:.2f}%</b> of total<br/>"
                },

                series: [
                    {
                        name: 'Browsers',
                        colorByPoint: true,
                        data:[]
                    }
                ],
              }
            },
            {   
                id:2,
                name: 'Bar Chart (X and Y axix, X axis is groupable column)',
                methodName: 'barChart',
                type: 'chart',
                sectionType:'pieChart',
                viewComponent: 'piechart',
                column: [],
                image: 'pie.jpg',
                chartOptions: {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Pie Chart',
                        align: 'left'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    accessibility: {
                        point: {
                            valueSuffix: '%'
                        }
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                connectorColor: 'silver'
                            }
                        }
                    },
                    series: [{
                        name: 'Percentage',
                        data: []
                    }]
                }
            },
            {   
                id:3,
                name: 'Count',
                methodName: 'count',
                type: 'count',
                sectionType:'count',
                viewComponent: 'count',
                column: [],
                image: 'count.png',
                
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
  