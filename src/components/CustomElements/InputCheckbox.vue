<template>
    <div>
        <input
        type="checkbox"
        id="id"
        :options="options"
        :checked="shouldBeChecked"
        :value="fieldValue"
        plain 
        size="sm"
        />
    </div>
</template>
<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
    name: 'InputCheckbox',
    props: ({
        options: {
            type: Object
        },
        fieldValue: {
            type: Boolean,
            default: false,
        }
    }),
    setup() {
        const shouldBeChecked = computed((val) => {
            return val;
        });
        return {
            shouldBeChecked,
        }
        
    },
})
</script>
