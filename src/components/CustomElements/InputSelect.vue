<template>
    <div>
        <!-- <label :for="id">{{ label }}</label> -->
        <div class="resizable-wrapper" :style="wrapperStyles" @mousedown="initResize">
          <select
          :id="id"
          :disabled="disabled"
          :data-vv-name="id"
          :data-vv-as="label"
          data-vv-delay="0"
          data-vv-value-path="localValue"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :style="wrapperStyles"
          @mousedown="initResize"
          >
          <!-- <template> -->
            <option value="" >-- please select --</option>
            <option :value="null">None</option>
            <option v-for="(item,index) in options" :key="index" :value="item.value">{{ item.text }}</option>
          <!-- </template> -->
          </select>
          <div class="resize-handle"></div>
        </div>
        <!-- <span v-if="empty && options.length === 0">{{ empty }}</span> -->
    </div>
</template>
<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
    name: 'InputSelect',
    props: {
    labelCol: {
      type: Number,
      default: 3,
    },
    inputCol: {
      type: Number,
      default: 9,
    },
    empty: {
      type: String,
      default: '',
    },
    rules: {
      type: String,
      default: '',
    },
    options: null,
    styleCSS: {
      type: Object,
    },
    change: null,
    isDisabled: null,
    labelColMd: {
        type: Number,
        default: 3,
      },
      labelColLg: {
        type: Number,
        default: 4,
      },
      inputColMd: {
        type: Number,
        default: 9,
      },
      inputColLg: {
        type: Number,
        default: 8,
      },
      simple: {
        type: Boolean,
        default: false,
      },
      preventUpdate: {
        type: Boolean,
        default: false,
      },
      rowIndex: null,
      id: null,
      label: null,
      model: null,
      module: null,
      index: null,
      value: null,
      help: null,
      hideField: {
        type: Boolean,
        default: false,
      },
  },
  data() {
    return {
      width: 300, // Initial width of the wrapper
      height: 40, // Initial height of the wrapper
      isResizing: false,
      initialMouseX: 0,
      initialMouseY: 0,
      initialWidth: 0,
      initialHeight: 0,
    };
  },
  computed: {
    wrapperStyles() {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
        position: 'relative',
      };
    },
  },
  methods: {
    initResize(event) {
      if (event.target.classList.contains('resize-handle')) {
        this.isResizing = true;
        this.initialMouseX = event.clientX;
        this.initialMouseY = event.clientY;
        this.initialWidth = this.width;
        this.initialHeight = this.height;
        document.addEventListener('mousemove', this.resize);
        document.addEventListener('mouseup', this.stopResize);
      }
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
    setup(props) {
        const fieldValue = computed(() => {
          return props.value
        })
        return {
          fieldValue
        }
    },
})
</script>
<style>
form h5 {
  margin-top: 2rem;
}
.resizable-container {
  display: inline-block;
}

.resizable-wrapper {
  /* border: 2px solid black; */
  display: inline-block;
  overflow: hidden;
  user-select: none;
  position: relative;
  padding: 3px;
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
