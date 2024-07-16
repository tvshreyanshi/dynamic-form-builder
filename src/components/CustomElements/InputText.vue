<template>
    <div class="my-2 resizable-container">
        <div class="mb-1">
          <label :data-tooltip-target="help" :help="help"  class="text-sm text-white" v-if="label" :for="id">{{ label }}</label>
        </div>
        <div class="resizable-wrapper" :style="wrapperStyles" @mousedown="initResize">
            <input
            :id="id"
            :type="type"
            :min="min"
            :max="max"
            :step="step"
            :value="value"
            :placeholder="placeholder"
            @input="update"
            :data-vv-name="id"
            :data-vv-as="label"
            data-vv-delay="800"
            :help="help"
            class="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 placeholder:text-gray-400 sm:text-sm text-sm"
            :style="wrapperStyles" @mousedown="initResize"
             />
             <div class="resize-handle"></div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
// import { useField } from 'vee-validate';
import  inputDefault  from '../Composables/inputDefault'

export default defineComponent({
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
    components: {
    },
    // inject: ['$validator'],
    props: ({
        type: {
            type: String,
        },
        min: null,
        max: null,
        step: null,
        rules: null,
        placeholder: null,
        // labelColMd: {
        // type: Number,
        // default: 3,
        // },
        name: {
            type: String,
            required: false,
        },
        // labelColLg: {
        //     type: Number,
        //     default: 4,
        // },
        // inputColMd: {
        //     type: Number,
        //     default: 9,
        // },
        // inputColLg: {
        //     type: Number,
        //     default: 8,
        // },
        // simple: {
        //     type: Boolean,
        //     default: false,
        // },
        // preventUpdate: {
        //     type: Boolean,
        //     default: false,
        // },
        // rowIndex: null,
        // id: null,
        // label: null,
        // model: null,
        // module: null,
        // index: null,
        // value: null,
        // help: null,
        // hideField: {
        //     type: Boolean,
        //     default: false,
        // },
    }),
    setup(props) {
      // const { value: fieldValue, errorMessage, field } = useField(props.name, props.rules);
      const { propsval } = inputDefault();
      const inputValue = ref(props.value);
        return {
          // fieldValue,
          // errorMessage,
          // field,
          propsval,
          
          inputValue,
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
