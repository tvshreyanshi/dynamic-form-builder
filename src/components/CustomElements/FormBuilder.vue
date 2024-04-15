<!-- eslint-disable vue/no-mutating-props -->
<template>
  <form
    autocomplete="off"
    :name="resource ? `${resource}-form` : 'global-form'"
    @submit.prevent="submitForm"
  >
  <div v-for="(chunk, rowIndex) in createGroupedArray(items, cols)" :key="rowIndex"> <!-- row -->
      <div v-for="(item, colIndex) in chunk" :key="colIndex" > <!-- set as col -->
        <div v-if="item.type === 'subtitle'" :class="[item.subTitleClass ? item.subTitleClass: '', '']">
          <h5>{{ item.text }}</h5>
          <!-- slot for pass any in between header -->
          <slot v-if="item.newOption" :name="item.id"></slot>
        </div>
        <div class="flex items-center" v-else>
          
          <div class="d-flex w-100">
            <component
            :is="item.input"
            :id="item.id"
            :label="item.label"
            :module="resource && `${resource}s`"
            v-bind="fieldProperties(item)"
            v-model="value[item.id]"
            :key="key"
            :placeholder="item.placeholder"
            @click="selectItem(rowIndex, colIndex, item)"
            :class="{ selected: isSelected(rowIndex, index)}"
            :help="item.help">
            </component>
            <!-- @change="onChange($event, item.id)" -->
          </div>
          <div>
            <button size="sm" variant="outline-danger shadow-none" @click="$emit('deleteClick', item)">
                <img class="mt-[30px]" src="../../assets//images//Icons/delete.svg" />
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

export default defineComponent({
  name: "FormBuilder",
  components: {
    InputText,
    InputCheckbox,
    InputRadio,
    InputSelect,
    InputTextarea
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
  emits: ['deleteClick'],
  setup(props, {emit}) {
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
      return{
        fieldProperties,
        // update,
        createGroupedArray,
        selectItem,
        isSelected,
      }
  },
});
</script>

