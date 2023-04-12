<template>
    <div>
      <h2>Main List</h2>
      <ul>
        <li v-for="(item, index) in mainList" :key="item.id"
          :draggable="true"
          @dragstart="dragStartHandler(item, index)"
          @dragover="dragOverHandler(index)"
          @drop="dropHandler(index)">
          {{ item.name }}
        </li>
      </ul>
  
      <h2>List 1</h2>
      <ul :class="{ 'drag-over': list1Dragging }"
        @dragover="dragOverList1Handler"
        @dragleave="dragLeaveList1Handler"
        @drop="dropList1Handler">
        <li v-for="(item, index) in list1" :key="item.id"
          :draggable="true"
          @dragstart="dragStartList1Handler(item, index)">
          {{ item.name }}
        </li>
      </ul>
  
      <h2>List 2</h2>
      <ul :class="{ 'drag-over': list2Dragging }"
        @dragover="dragOverList2Handler"
        @dragleave="dragLeaveList2Handler"
        @drop="dropList2Handler" style="height: 100px;">
        <li v-for="(item, index) in list2" :key="item.id"
          :draggable="true"
          @dragstart="dragStartList2Handler(item, index)">
          {{ item.name }}
        </li>
      </ul>
  
      <h2>List 3</h2>
      <ul :class="{ 'drag-over': list3Dragging }"
        @dragover="dragOverList3Handler"
        @dragleave="dragLeaveList3Handler"
        @drop="dropList3Handler">
        <li v-for="(item, index) in list3" :key="item.id"
          :draggable="true"
          @dragstart="dragStartList3Handler(item, index)">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        mainList: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
          { id: 3, name: 'Item 3' },
          { id: 4, name: 'Item 4' },
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
    
  }
</script>