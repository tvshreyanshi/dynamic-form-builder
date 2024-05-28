<!-- eslint-disable vue/no-mutating-props -->
<template>
  <form
    autocomplete="off"
    :name="resource ? `${resource}-form` : 'global-form'"
    @submit.prevent="submitForm"
    class="m-4"
  >
  <div v-for="(chunk, rowIndex) in createGroupedArray(items, cols)" :key="rowIndex"> <!-- row -->
      <div v-for="(item, colIndex) in chunk" :key="colIndex" > <!-- set as col -->
        <div v-if="item.type === 'subtitle'" :class="[item.subTitleClass ? item.subTitleClass: '', '']">
          <h5>{{ item.text }}</h5>
          <!-- slot for pass any in between header -->
          <slot v-if="item.newOption" :name="item.id"></slot>
        </div>
        <div class="flex items-center selectInput cursor-pointer" v-else :draggable="true" @dragstart="internaldragstart($event, rowIndex, colIndex)" @dragover.prevent="allowDrop" @drop="interalDragOver($event, rowIndex, colIndex)">
          <div class="d-flex w-100">
            <!-- :key="key" -->
            <component
            :is="item.input"
            :id="item.id"
            :label="item.label"
            :module="resource && `${resource}s`"
            v-bind="fieldProperties(item)"
            v-model="value[item.id]"
            :placeholder="item.placeholder"
            @click="selectItem(rowIndex, colIndex, item)"
            :class="{ selected: isSelected(rowIndex, index)}"
            :headingType="item.headingType"
            :help="item.help">
            </component>
            <!-- @change="onChange($event, item.id)" -->
          </div>
          <div class="flex justify-between m-3">
            <button class="mr-2" @click="$emit('copyElement', item, colIndex)"><i class="fa-regular fa-copy text-white"></i></button>
            <button size="sm" variant="outline-danger shadow-none" @click="$emit('deleteClick', item)">
              <i class="fa-solid fa-trash-can text-white"></i>
            </button>
          </div>
          <!--slot for any component in between any form input -->
          <slot v-if="item.newOption" :name="item.id"></slot>
        </div>
      </div>
    </div>
    <div v-if="onSubmit" class="form-footer">
      <button
        v-if="onSubmit && canSave"
        type="submit"
        variant="primary"
        :size="buttonsSize"
        title="save"
      >
        SAVE
      </button>
    </div>
  </form>
</template>
<script>
import { ref, defineComponent } from 'vue';
import { computeProperties } from '../Composables';
import InputCheckbox from './InputCheckbox.vue';
import InputRadio from './InputRadio.vue';
import InputSelect from './InputSelect.vue';
import InputText from "./InputText.vue";
import InputTextarea from './InputTextarea.vue';
import InputFile from './InputFile.vue';
import InputHeading from './InputHeading.vue';
import InputDate from './InputDate.vue';

export default defineComponent({
  name: "FormBuilder",
  components: {
    InputText,
    InputCheckbox,
    InputRadio,
    InputSelect,
    InputTextarea,
    InputFile,
    InputHeading,
    InputDate
  },
  props: {
    value: {
      type: Object,
    },
    resource: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    cols: {
      type: Number,
      default: 1,
    },
    onSubmit: {
      type: Function,
    },
    formLoading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: [Error, Boolean, Object],
      default: false,
    },
    success: {
      type: Boolean,
      default: false,
    },
    backButtonName: {
      type: String,
      required: false,
    },
    backButtonNameWithParams: {
      type: String,
      required: false,
    },
    buttonsSize: {
      type: String,
      default: 'lg',
    },
    canSave: {
      type: Boolean,
      default: true,
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
        help: null,
        hideField: {
          type: Boolean,
          default: false,
        },
  },
  emits: ['deleteClick', 'copyElement'],
  setup(props, {emit}) {
    const internalDragItem = ref(null);
    const internalDragIndex = ref(null);
    const selectedItemIndex = ref(null);
    // const emit = defineEmits(['updateItem']);
      const { fieldProperties } = computeProperties();
      // const { update } = inputDefault();
      const createGroupedArray = (arr, chunkSize) => {

      const chunks = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
      }
      return chunks;
    }
    const selectItem = (rowIndex, colIndex, items) => {
      selectedItemIndex.value = { rowIndex, colIndex };
      emit('updateItem', items);
    };
    const isSelected = (rowIndex, colIndex) => {
      const selected = selectedItemIndex.value;
      return selected && selected.rowIndex === rowIndex && selected.colIndex === colIndex;
    };
    const internaldragstart = (event, rowIndex, colIndex) => {
      internalDragItem.value = { rowIndex, colIndex };
      event.dataTransfer.effectAllowed = 'move'      
    }
    const allowDrop = (event) => {
      event.preventDefault();
    }
    const interalDragOver = (event, rowIndex, colIndex) => {
      event.preventDefault();
      const draggedIndex = internalDragItem.value;
      if (!draggedIndex || (draggedIndex.rowIndex === rowIndex && draggedIndex.colIndex === colIndex)) {
        return;
      }

      const fromIndex = draggedIndex.rowIndex * props.cols + draggedIndex.colIndex;
      const toIndex = rowIndex * props.cols + colIndex;

      // Move the item in the array
      // eslint-disable-next-line vue/no-mutating-props
      const item = props.items.splice(fromIndex, 1)[0];
      // eslint-disable-next-line vue/no-mutating-props
      props.items.splice(toIndex, 0, item);
      

      // Update the dragged item index
      internalDragItem.value = { rowIndex, colIndex };
    }
      return{
        fieldProperties,
        // update,
        createGroupedArray,
        selectItem,
        isSelected,
        internaldragstart,
        interalDragOver,
        allowDrop,
        internalDragItem,
        internalDragIndex
      }
  },
});
</script>
<style>
.selectInput:focus-within, .selectInput:active {
    border: 2px solid white;
}
</style>

