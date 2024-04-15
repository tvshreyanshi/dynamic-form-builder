<template>
  <div>
    <div>
      <div>
        <input
          type="radio"
          :id="id"
          :checked="shouldBeChecked"
          :value="fieldValue"
          :options="options"
          @change="update"
          @input="validateRadio"
          plain 
          />
          <label
            class="mt-px inline-block ps-[0.15rem] hover:cursor-pointer"
            :for="id">
           {{ label }}
          </label>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: "InputCheckbox",
  props: {
    type: null,
    options: {
      type: Object,
    },
    fieldValue: {
      type: Boolean,
      default: false,
    },
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
    const shouldBeChecked = computed(() => {
      return props.value;
    });
    return {
      shouldBeChecked,
    }
  },
})
</script>
