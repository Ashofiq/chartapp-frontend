<template>
    <slot name="content">

        <div class="row">
            <div class="col-md-3">
                <div class="card" style="height: 600px;   overflow: scroll;">
                  <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs" role="tablist">
                      <li class="nav-item" role="presentation">
                        <a href="#tabs-home-9" class="nav-link active" data-bs-toggle="tab" aria-selected="false" role="tab" tabindex="-1"><!-- Download SVG icon from http://tabler-icons.io/i/home -->
                          Fields
                        </a>
                      </li>
                      <li class="nav-item" role="presentation">
                        <a href="#tabs-profile-9" class="nav-link" data-bs-toggle="tab" aria-selected="true" role="tab"><!-- Download SVG icon from http://tabler-icons.io/i/user -->
                          Master Items
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="card-body">
                    <div class="tab-content">
                      <div class="tab-pane active show" id="tabs-home-9" role="tabpanel">
                        <div>
                          <h2>Fields List</h2>
                          <ul >
                            <li class="list-unstyled btn-group-vertical w-100 pb-1"
                              v-for="(item, index) in fieldList" :key="item.id"
                              :draggable="true"
                              @dragstart="dragStartHandler(item, index)"
                              @dragover="dragOverHandler(index)"
                              @drop="dropHandler(index)">
                              <label for="btn-radio-vertical-1" type="button" 
                              class="btn active">{{ item.field }}</label>
                            </li>
                          </ul>
                        </div>

                      </div>
                      <div class="tab-pane" id="tabs-profile-9" role="tabpanel">
                        <h4>Profile tab</h4>
                        <div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
                        
                        <a class="btn" data-bs-toggle="offcanvas" href="#offcanvasTop" role="button" aria-controls="offcanvasTop">
                          Toggle top offcanvas
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            <div class="col-md-9">
              <div class="row">
                  <!-- frame list -->
                  <div class="col-md-12">
                    <div class="card">
                      <div class="card-body">
                        <ChartList />
                      </div>
                    </div>
                  </div>

                  <div class="col-md-3 pt-3">
                    <div class="card" style="min-height: 563px;">
                      
                      <div class="card-body">

                        <div class="mb-3">
                          <label class="form-label">Y-AXIS</label>
                          <ul class="list-group list-group-numbered" 
                            :class="{ 'drag-over': list1Dragging }"
                            @dragover="dragOverList1Handler"
                            @dragleave="dragLeaveList1Handler"
                            @drop="dropList1Handler" style="min-height: 100px; border:1px solid">
                            <li class="pb-1 list-unstyled list-group-item d-flex justify-content-between align-items-start"
                              v-for="(item, index) in list1" :key="item.id"
                              :draggable="true"
                              @dragstart="dragStartList1Handler(item, index)">

                                <div class="ms-2 me-auto"
                                  data-bs-toggle="offcanvas" href="#offcanvasStart" 
                                  role="button" aria-controls="offcanvasStart"
                                  @click="selectedField = index"
                                >
                                  <div class="fw-bold">{{ item.name }}</div>
                                  Field
                                </div>
                                <span class="rounded-pill pr-2" @click="list1.splice(index, 1);">x</span>
                            
                            </li>
                          </ul>
                        </div>

                        <div class="mb-3">
                          <label class="form-label">X-AXIS</label>
                          <ul class="list-group list-group-numbered" 
                            :class="{ 'drag-over': list1Dragging }"
                            @dragover="dragOverList1Handler"
                            @dragleave="dragLeaveList1Handler"
                            @drop="dropList2Handler" style="min-height: 100px; border:1px solid">
                            <li class="pb-1 list-unstyled list-group-item d-flex justify-content-between align-items-start"
                            v-for="(item, index) in list2" :key="item.id"
                              :draggable="true"
                              @dragstart="dragStartList1Handler(item, index)">

                                  <div class="ms-2 me-auto">
                                  <div class="fw-bold">{{ item }}</div>
                                    Field
                                  </div>
                                  <span class="rounded-pill pr-2" @click="list2.splice(index, 1);">x</span>
                            
                            </li>
                          </ul>
                        </div>

                        <div class="mb-3">
                          <label class="form-label">Filter-By</label>
                          <ul class="list-group list-group-numbered" 
                            :class="{ 'drag-over': list1Dragging }"
                            @dragover="dragOverList1Handler"
                            @dragleave="dragLeaveList1Handler"
                            @drop="dropList3Handler" style="min-height: 100px; border:1px solid">
                            <li class="pb-1 list-unstyled list-group-item d-flex justify-content-between align-items-start"
                            v-for="(item, index) in list3" :key="item.id"
                              :draggable="true"
                              @dragstart="dragStartList1Handler(item, index)">

                                  <div class="ms-2 me-auto">
                                  <div class="fw-bold">{{ item }}</div>
                                    Field
                                  </div>
                                  <span class="rounded-pill pr-2" @click="list3.splice(index, 1);">x</span>
                            
                            </li>
                          </ul>
                        </div>
                        
                      </div>
                    </div>
                  </div>

                  <div class="col-md-9 pt-3">
                    <div class="card" style="min-height: 563px;">
                      <highcharts 
                        v-if="data.list?.type == 'chart'" 
                        :options="data.list.chartOptions"
                        :data="chartData"
                        :yAxisTitle="list1[0]"
                        >
                      </highcharts>

                      <span v-if="data.list?.type == 'count'">
                        <div class="card">
                          <slot v-for="(item, index) in data.countValue" :key="index">
                            <div class="card-body">
                              <h3 class="card-title">{{ item.name }}</h3>
                            </div>
                            <!-- Card footer -->
                            <div class="card-footer">
                              <a href="#" class="btn btn-primary">{{ item.value }}</a>
                            </div>
                          </slot>
                        </div>
                      </span>

                    </div>
                  </div>
              </div>
            </div>
        </div>
    </slot>

    <div class="offcanvas offcanvas-start" 
        tabindex="-1" id="offcanvasStart" 
        aria-labelledby="offcanvasStartLabel"
        style="width: 326px !important;"
        >
      <div class="offcanvas-header">
        <h2 class="offcanvas-title" id="offcanvasStartLabel">Extra Rules</h2>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div>
          <input v-if="selectedField != null && list1.length > 0 && list1[selectedField] != undefined" type="text" 
            class="form-control is-valid mb-2" 
            v-model="list1[selectedField].name"
            >

          <div class="mb-3">
            <label class="form-label">Aggregation Type</label>
            <div class="form-selectgroup">
              <label class="form-selectgroup-item"
              v-for="(item, index) in ['SUM', 'COUNT', 'AVERAGE']" :key="index">
                <input type="radio" name="icons" value="home" class="form-selectgroup-input" checked>
                <span class="form-selectgroup-label"
                 @click="list1[selectedField].aggr = item.toLowerCase()">
                  <!-- <svg xmlns="http://www.w3.org/2000/svg" class="icon me-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg> -->
                  {{ item }}
                </span>
              </label>
            </div>
          </div>

          <div class="mb-4">
            <label class="form-label">Custom</label>
            <div class="">
              <label class="form-selectgroup-item">
                <textarea class="form-control" placeholder="product * quantity"
                @change="list1[selectedField].customAggr = $event.target.value, analize()"></textarea>
              </label>
            </div>
          </div>
        </div>
        <!-- <div class="mt-3">
          <button class="btn btn-primary" type="button" data-bs-dismiss="offcanvas">
            Close offcanvas
          </button>
        </div> -->
      </div>
    </div>

</template>

<script>
import ChartList from './../Chart/ChartList.vue';
import Chart from '../Chart/HighChart.vue'
import axios from 'axios'
import ChartHelper from "../../helpers/chartHelper.js";

export default {
  components:{
    ChartList,
    highcharts: Chart 
  },

  watch:{
    list1:  {
        handler: function() {
          this.analize();
        },
        deep: true
    },
    "data.list":{
      handler: function() {
        this.analize();
      }
    }
  },

  data(){
    return{
      data:{
        appId:1
      },
      fieldList: [
          
      ],
      list1: [],
      list2: [],
      list3: [],
      draggedItem: null,
      draggedItemIndex: null,
      list1Dragging: false,
      list2Dragging: false,
      list3Dragging: false,

      chartData: [],

      // 
      selectedField:null
    }
  },
  created(){
    this.getFieldList();
  },
  methods: {

    getFieldList(){
      axios.post('/api/v1/fieldlist', {appId: this.data.appId})
          .then(res => {
            this.fieldList = res.data
          })
    },

    analize(){
      var params = {
        appId: 1,
        yAxis: this.list1?.map(e => {return e.field}),
        xAxis: this.list2?.map(e => {return e.field}),
        filterBy: this.filterBy?.map(e => {return e.field}),
        selectedChart: this.data.list?.sectionType ?? '',
        rawData:{
          yAxis: this.list1,
          xAxis: this.list2,
          filterBy: this.list3,
        },

      }
      axios.post('/api/v1/analize', params).then(res =>{
        console.log(res);
        this.processData(res.data);
      })
      console.log('hit analize');
    },

    processData(pdArray){
      const chartHelper = new ChartHelper();

      var selectedChart = this.data.list;
      if (selectedChart.sectionType == 'pieChart') {
        pdArray = JSON.parse(pdArray)

        pdArray = chartHelper.barChartDataProcess(pdArray)
        this.data.list.chartOptions.series[0].data = pdArray

      }else if(selectedChart.sectionType == 'barChart'){

        pdArray = JSON.parse(pdArray)
        pdArray = chartHelper.barChartDataProcess(pdArray)
        this.data.list.chartOptions.series[0].data = pdArray
        var selectedField = this.list1.map(e => {return e.name})
        this.data.list ? this.data.list.chartOptions.yAxis.title.text = JSON.stringify(selectedField) : 'a'
      
      } else if(selectedChart.sectionType == 'count'){
        this.data.countValue = pdArray
      }
    },

    dragStartHandler(item, index) {
      this.draggedItem = item;
      this.draggedItemIndex = index;
    },
    dragStartList1Handler(item, index) {
      this.draggedItem = item;
      this.draggedItemIndex = index;
      this.list1.splice(index, 1);
    },
    dragStartList2Handler(item, index) {
      this.draggedItem = item;
      this.draggedItemIndex = index;
      this.list2.splice(index, 1);
    },
    dragStartList3Handler(item, index) {
      this.draggedItem = item;
      this.draggedItemIndex = index;
      this.list3.splice(index, 1);
    },
    dragOverHandler(index) {
      event.preventDefault();
    },
    dragOverList1Handler(event) {
      event.preventDefault();
      this.list1Dragging = true;
    },
    dragOverList2Handler(event) {
      event.preventDefault();
      this.list2Dragging = true;
    },
    dragOverList3Handler(event) {
      event.preventDefault();
      this.list3Dragging = true;
    },
    dragLeaveList1Handler() {
      this.list1Dragging = false;
    },
    dragLeaveList2Handler() {
      this.list2Dragging = false;
    },
    dragLeaveList3Handler() {
      this.list3Dragging = false;
    },
    dropHandler(index) {
      this.list1.splice(index, 0, this.draggedItem);
      this.draggedItem = null;
    },
    dropList1Handler() {
      this.list1.splice(this.draggedItemIndex, 0, this.draggedItem);
      this.draggedItem = null;
      this.list1Dragging = false;
    },
    dropList2Handler() {
      this.list2.splice(this.draggedItemIndex, 0, this.draggedItem);
      this.draggedItem = null;
      this.list2Dragging = false;
    },
    dropList3Handler() {
      this.list3.splice(this.draggedItemIndex, 0, this.draggedItem);
      this.draggedItem = null;
      this.list3Dragging = false;
    },
  },
}
</script>


<style scoped>
  ul{padding: 0rem}
  .list-group-item{
    padding: 3px !important;
    background: #F1F5F9;
  }
</style>