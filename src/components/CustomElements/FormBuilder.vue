<!-- eslint-disable vue/no-mutating-props -->
<template>
  <form
    autocomplete="off"
    :name="resource ? `${resource}-form` : 'global-form'"
    @submit.prevent="submitForm"
  >
  <b-row v-for="(chunk, key) in createGroupedArray(items, cols)" :key="key">
      <b-col v-for="(item, key) in chunk" :key="key" >
        <div v-if="item.type === 'subtitle'" :class="[item.subTitleClass ? item.subTitleClass: '', '']">
          <h5>{{ item.text }}</h5>
          <!-- slot for pass any in between header -->
          <slot v-if="item.newOption" :name="item.id"></slot>
        </div>
        <div v-else>
          <div class="d-flex w-100">
            <!-- <div v-if="item.isCustomInput">
              <b-button size="sm" variant="outline-secondary shadow-none" class="mt-2 mr-2" @click="$emit('editClick',item)">
                <span class="icon-edit"></span>
              </b-button>
            </div> -->{{ item.label }}
            <component
            v-if="!item.hideField"
            :is="item.input"
            :id="item.id"
            :label="item.label"
            :module="resource && `${resource}s`"
            v-bind="fieldProperties(item)"
            v-model="value[item.id]"
            :key="key"
            :placeholder="item.placeholder"
            :help="item.help">
            </component>
            <!-- @change="onChange($event, item.id)" -->
            <div v-if="item.isCustomInput">
              <b-button size="sm" variant="outline-danger shadow-none" class="mt-2" @click="$emit('deleteClick', item)">
                <delete-icon></delete-icon>
              </b-button>
            </div>
          </div>
          <!--slot for any component in between any form input -->
          <slot v-if="item.newOption" :name="item.id"></slot>
        </div>
      </b-col>
    </b-row>
    <div v-if="onSubmit" class="form-footer">
      <b-button
        v-if="onSubmit && canSave"
        type="submit"
        variant="primary"
        :size="buttonsSize"
        title="save"
      >
        SAVE
      </b-button>
    </div>
  </form>
</template>
<script>
// import { defineComponent } from 'vue';
import { computeProperties } from '../Composables';
import InputText from "./InputText.vue";

export default {
  name: "FormBuilder",
  components: {
    InputText,
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
  },
  setup() {
      const { fieldProperties } = computeProperties();
      // const { update } = inputDefault();
      console.log('in formBuilder');
      const createGroupedArray = (arr, chunkSize) => {

        console.log('in array');
      const chunks = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
      }
      return chunks;
    }      
      return{
        fieldProperties,
        // update,
        createGroupedArray,
      }

  },
};
</script>

