<template>
  <!-- drawer init and show -->
  <div class="flex">
    <div class="fixed top-16 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform transform-none bg-white dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-navigation-label">
      <h5  class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
      <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Close menu</span>
      </button>
      <div class="py-4 overflow-y-auto">
          <ul class="space-y-2 font-medium" v-for="(sb, index) in sidebarMenu" :key="index">
            <li draggable="true" @dragstart="dragStart(sb)">
                <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <!-- <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                  </svg> -->
                  <span class="ms-3">{{ sb.title }}</span>
                </a>
            </li>
          </ul>
      </div>
    </div>
    <div class="flex-initial bg-slate-600 flex justify-center mt-[100px] main-layout" @dragover.prevent="allowDrop" @drop="dragover()">
      <p>Drop here</p>
      <div v-for="(item, index) in mainLayoutItems" :key="index">
        {{ item.title }}
      </div>
    </div>
</div>
</template>
<script>
import { defineComponent, ref } from "vue";
const mainLayoutItems = ref([]);

export default defineComponent({
  components: {
  },
  setup() {
    const sidebarMenu = [
      {
        title: "Input",
        icon: '<i class="fa-solid fa-gauge"></i>',

      },
      {
        title: "Select",
        icon: '<i class="fa-regular fa-file-lines"></i>',
      },
      {
        title: "Teaxt Area",
        icon: '<i class="fa-regular fa-image"></i>',
      },
      {
        title: "Checkbox",
        icon: '<i class="fa-solid fa-file-contract"></i>',
      },
     
    ];
    const dragStart = (item) => {
      console.log('drag event', item);
      event.dataTransfer.setData("text/plain", JSON.stringify(item));
    };
    const allowDrop = (event) => {
      event.preventDefault();
    }
    const dragover = (item) => {
      event.preventDefault();
      console.log('item', item);
      const data = JSON.parse(event.dataTransfer.getData("text/plain"));
      console.log('drop', data);
      mainLayoutItems.value.push(data);
    };
    return {
      sidebarMenu,
      dragStart,
      dragover,
      allowDrop,
      mainLayoutItems,
    };
  },
});
</script>
<style>
.main-layout {
  width: 600px;
  align-items: center;
  margin: auto;
  /* margin-top: 100px; */
  min-height: 300px;
  height: max-content;
  border-radius: 7px;
}
</style>