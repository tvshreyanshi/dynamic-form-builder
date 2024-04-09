export default {
    props: {
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
    },
    setup() {
        const update = (value) => {
            if(!this.props.preventUpdate) {
                let s = 'updateItem';
                if(this.props.module) {
                    s = `${this.props.module}/${s}`;
                    console.log('value of s:', s);
                }
            }
            const payload = {
                item: this.id,
                value: typeof value === 'object' && value && value.value ? value.value : value,
              };
              if (this.index !== undefined) {
                payload.index = this.index;
              }else {
                this.$emit('change', value);
              }
        }
        return {
            update,
        }
    }
}