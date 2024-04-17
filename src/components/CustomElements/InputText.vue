<template>
    <div class="my-2">
        <div :md="labelColMd" :lg="labelColLg">
          <label v-if="label" :for="id">{{label}}:</label>
        </div>
        <input
        :id="id"
        :type="type"
        :min="min"
        :max="max"
        :step="step"
        :value="value"
        :placeholder="placeholder"
        @input="update"
        size="sm"
        :data-vv-name="id"
        :data-vv-as="label"
        data-vv-delay="800"
        class="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
         />
    </div>
</template>
<script>
import { defineComponent } from 'vue';
// import { inputDefault } from '../Composables';

export default defineComponent({
    props: ({
        type: null,
        min: null,
        max: null,
        step: null,
        rules: null,
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
            default: false,
        },
    }),
    setup() {
        // const { update } = inputDefault();
        // return {
        //     update,
        // }
    },
})
</script>
<style>
form h5 {
  margin-top: 2rem;
}


</style>
