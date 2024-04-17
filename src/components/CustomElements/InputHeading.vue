<template>
    <div>
        <h1 v-if="headingType == 'h1'">{{ label }}</h1>
        <h2 v-if="headingType == 'h2'">{{ label }}</h2>
        <h3 v-if="headingType == 'h3'">{{ label }}</h3>
        <h4 v-if="headingType == 'h4'">{{ label }}</h4>
        <h5 v-if="headingType == 'h5'">{{ label }}</h5>
        <h6 v-if="headingType == 'h6'">{{ label }}</h6>
    </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'InputHeadingH1',
    props: ({
        headingType: null,
        label: null,
    }),
    setup() {
        
    },
})
</script>
<style>
h1, h2, h3, h4, h5, h6 {
    font-size: revert!important;
}
</style>