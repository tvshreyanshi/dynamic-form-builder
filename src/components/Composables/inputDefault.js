import { defineProps } from 'vue'
export default function inputDefault() {
  // eslint-disable-next-line no-unused-vars
  const propsval = defineProps({
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
      hideField: false,
  })
  // const emit = defineEmits(["change"]);
  // const update = (value) => {
  //   console.log('--in update',);
  //   if(!propsval.preventUpdate) {
  //     let s = 'updateItem';
  //     if(propsval.module) {
  //         s = `${propsval.module}/${s}`;
  //         console.log('value of s:', s);
  //     }
  //     const payload = {
  //       item: propsval.id,
  //       value: typeof value === 'object' && value && value.value ? value.value : value,
  //     };
  //     if (propsval.index !== undefined) {
  //       payload.index = propsval.index;
  //     }else {
  //       emit('change', value);
  //     }
  //   }
  // }
  // return {
  //   update,
  // }
}