<template>
    <div>
        <label v-if="label" :for="id">{{label}}:</label>
        <textarea
        :id="id"
        :value="value"
        :placeholder="placeholder"
        :rows="3"
        class="form-control form-control-sm peer bg-slate-300 h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
        :data-vv-name="id"
        :data-vv-as="label"
        data-vv-delay="800">
      </textarea>
    </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'InputTextarea',
    props: ({
    placeholder: null,
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
        default: false
      },
    }),
    setup() {
        
    },
})
</script>
