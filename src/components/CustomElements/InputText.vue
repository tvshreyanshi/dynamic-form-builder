<template>
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
     />

</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: ({
        type: null,
        min: null,
        max: null,
        step: null,
        rules: null,
        placeholder: null,
    }),
    setup() {
        
    },
})
</script>
