<template>
    <div class="my-2">
        <div class="mb-1">
          <label :data-tooltip-target="help" :help="help"  class="text-sm text-white" v-if="label" :for="id">{{ label }}</label>
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
            :data-vv-name="id"
            :data-vv-as="label"
            data-vv-delay="800"
            :help="help"
            class="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 placeholder:text-gray-400 sm:text-sm text-sm"
             />
    </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
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
        labelColMd: {
        type: Number,
        default: 3,
        },
        name: {
            type: String,
            required: false,
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
        // const { value1, errorMessage } = useField(props.name)
        // return {
        //     value1,
        //     errorMessage,
        // }
    },
})
</script>
<style>
form h5 {
  margin-top: 2rem;
}
</style>
