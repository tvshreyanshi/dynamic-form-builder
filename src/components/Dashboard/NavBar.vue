<template>
    <nav class="bg-white dark:bg-gray-800 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
            <!-- <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse"> -->
                <div class="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                    <img src="../../assets//images/Form-Builder.png" class="h-8 cursor-pointer" alt="Form-Builder Logo" />
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FORM BUILDER</span>
                </div>
            <!-- </a> -->
        </div>
    </nav>
    <side-bar />
</template>
<script>
import SideBar from './SideBar.vue'
export default {
    components: {
        SideBar,
    }
}
</script>