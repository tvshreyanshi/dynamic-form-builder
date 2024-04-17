<template>
    <div>
        Date Picker
        <div>
            <input
            type="date"
            :name="name"
            :min="min"
            :max="max"
            class="block w-full rounded-md border-0 py-1.5 pl-3 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'InputDate',
    props: ({
        type: null,
        name: {
            type: String,
        },
        min: null,
        max: null,
    }),
    setup() {
        
    },
})
</script>
