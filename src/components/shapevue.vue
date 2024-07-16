<template>
    <div
      class="shape"
      :style="shapeStyles"
      @mousedown="initResize"
    >
      <div class="resize-handle"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'shapeVue',
    data() {
      return {
        width: 100,
        height: 100,
        isResizing: false,
        initialMouseX: 0,
        initialMouseY: 0,
        initialWidth: 0,
        initialHeight: 0,
      };
    },
    computed: {
      shapeStyles() {
        return {
          width: this.width + 'px',
          height: this.height + 'px',
          backgroundColor: 'blue',
          position: 'relative',
        };
      },
    },
    methods: {
      initResize(event) {
        this.isResizing = true;
        this.initialMouseX = event.clientX;
        this.initialMouseY = event.clientY;
        this.initialWidth = this.width;
        this.initialHeight = this.height;
        document.addEventListener('mousemove', this.resize);
        document.addEventListener('mouseup', this.stopResize);
      },
      resize(event) {
        if (this.isResizing) {
          this.width = this.initialWidth + (event.clientX - this.initialMouseX);
          this.height = this.initialHeight + (event.clientY - this.initialMouseY);
        }
      },
      stopResize() {
        this.isResizing = false;
        document.removeEventListener('mousemove', this.resize);
        document.removeEventListener('mouseup', this.stopResize);
      },
    },
  };
  </script>
  
  <style scoped>
  .shape {
    border: 2px solid black;
    display: inline-block;
    user-select: none;
  }
  .resize-handle {
    width: 10px;
    height: 10px;
    background-color: red;
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: se-resize;
  }
  </style>
  