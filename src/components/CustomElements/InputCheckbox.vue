<template>
  <div>
    <div class="my-2 block">
      <div v-for="(item, index) in options" :key="index" class="flex items-center">
        <input
          type="checkbox"
          :id="'checkbox_' + index"
          :name="'checkbox_group'"
          :checked="shouldBeChecked"
          :value="data.value"
          plain
          size="sm"
          class="mr-2"
        />
        <div :md="labelColMd" :lg="labelColLg">
          <label v-if="label" :for="'checkbox_' + index">{{ item.text }}</label> 
        </div>
      </div>  
      </div>
    </div>
</template>
<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "InputCheckbox",
  props: {
    type: null,
    options: null,
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
  setup() {
    const shouldBeChecked = computed((val) => {
      return val;
    });
    return {
      shouldBeChecked,
    };
  },
});
</script>
