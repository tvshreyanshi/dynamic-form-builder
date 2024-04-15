<template>
    <div>
        <label :for="id">{{ label }}</label>
        <select
        :id="id"
        :disabled="disabled"
        :data-vv-name="id"
        :data-vv-as="label"
        data-vv-delay="0"
        data-vv-value-path="localValue"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
        <!-- <template> -->
          <option value="" >-- please select --</option>
          <option :value="null">None</option>
          <option v-for="(item,index) in options" :key="index" :value="item.value">{{ item.text }}</option>
        <!-- </template> -->
        </select>
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
