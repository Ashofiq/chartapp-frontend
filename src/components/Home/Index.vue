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
                              <label for="btn-radio-vertical-1" type="button" class="btn active">{{ item }}</label>
                            </li>
                          </ul>
                        </div>

                      </div>
                      <div class="tab-pane" id="tabs-profile-9" role="tabpanel">
                        <h4>Profile tab</h4>
                        <div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
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

                                <div class="ms-2 me-auto">
                                <div class="fw-bold">{{ item }}</div>
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
                      <highcharts v-if="data.list" :options="data.list.chartOptions"></highcharts>
                    </div>
                  </div>
              </div>
            </div>
        </div>
    </slot>
</template>

<script>
import ChartList from './../Chart/ChartList.vue';
import {Chart} from 'highcharts-vue'
import axios from 'axios'

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
        yAxis: this.list1,
        xAxis: this.list2
      }
      axios.post('/api/v1/analize', params).then(res =>{
        console.log(JSON.parse(res.data));
      })
      console.log('hit analize');
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