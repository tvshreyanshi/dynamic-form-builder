<template>
    <div>
        <input
        :id="id"
        :type="'file'"
        :step="step"
        :placeholder="placeholder"
        @change="changeCall"
        :data-vv-name="id"
        :data-vv-as="label"
        data-vv-delay="800"
        :class="['mt-3 d-none']"
         />
    </div>
</template>
<script>
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'InputFile',
    props: ({
    type: null,
    min: null,
    max: null,
    step: null,
    rules: null,
    placeholder: null,
    isMultiple: null,
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
    setup(props) {
      const selectedFile = ref('');
        const getFileInput = computed(() => {
            if (props.value) {
            const path = props.value;
            const getfileName = path.split('/').pop().split('-').pop();
            return getfileName;
        }
        return '';
        });
        const changeCall = (e) => {
            const file = e.target.files;
            selectedFile.value = file[0].name;
            // this.update({ id: this.id, value: this.isMultiple ? file[0] : file[0] });
        }
        const clickFile = (fileInputId) => {
            document.getElementById(fileInputId).click();
        }
        return {
            getFileInput,
            changeCall,
            clickFile,
        }
        
    },
})
</script>
