<template>
  <!-- drawer init and show -->
  <div class="flex">
    <div class="flex mt-16">
      <button class="flex" @click="closeLeftSidebar"><i class="fa-solid fa-bars text-3xl"></i></button>
    </div>
    <div v-if="leftSidebarOpened" class=" w-72 duration-300 fixed top-16 left-0 z-40 h-screen p-4 overflow-y-auto bg-white dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-navigation-label">
      <h5  class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
      <button @click="closeLeftSidebar()" type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Close menu</span>
      </button>
      <div class="py-4 overflow-y-auto">
          <ul class="space-y-2 font-medium" v-for="(sb, index) in sidebarMenu" :key="index">
            <li draggable="true" @dragstart="dragStart(sb)">
                <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span class="ms-3">{{ sb.title }}</span>
                </a>
            </li>
          </ul>
      </div>
      <div class="bg-slate-600 flex justify-center mt-[100px] items-center m-auto rounded">
       <button class="text-white" @click="showPreviousForm()">Show Previous form</button>
      </div>
    </div>
    <div class="bg-slate-600 justify-center mt-[100px] main-layout" @dragover.prevent="allowDrop" @drop="dragover()">
      <div v-if="mainLayoutItems.length == 0 && getFormData.length === 0" class="flex flex-col items-center">
        <img src="../../assets/images/drag.png" width="150px" height="150px" />
        <p class="text-white">Drop Element here...</p>
      </div>
      <div class="flex flex-col items-center">
        <form-builder
        resource=""
        :items="getFormData"
        :value="storeData"
        @updateItem="ItemSelected"
        @deleteClick="itemDelete"
        />
      </div>
       <!-- <div v-for="(item, index) in mainLayoutItems" :key="index"> -->
        <!-- {{ item.title }} -->
        <!-- :onSubmit="onSubmit" -->
        <div class="flex flex-col items-center">   
          <form-builder
          resource=""
          :items="mainLayoutItems"
          :value="storeData"
          @updateItem="ItemSelected"
          @deleteClick="itemDelete"
          @copyElement="itemCopy"
          />
        </div>
        <!-- :value="user" -->
      <!-- </div> -->
      <div v-if="mainLayoutItems.length > 0" class="flex justify-end m-3">
        <button class="bg-white p-2 rounded-md" @click="saveForm(mainLayoutItems)">
          Save <i class="fa-solid fa-square-check"></i>
        </button>
      </div>
    </div>
    <div v-if="selectedItem.length != 0" class="fixed top-16 right-0 z-40 w-80 h-screen p-4 overflow-y-auto transition-transform transform-none bg-white dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-navigation-label">
      <h5  class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
      <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Close menu</span>
      </button>
      <div class="py-4 overflow-y-auto">
          <ul class="space-y-2 font-medium">
            <li draggable="true" @dragstart="dragStart(sb)">
                <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <div class="block">
                    <div class="my-2 flex justify-between">
                      <p class="text-sm">Label</p>
                      <input type="text" v-model="selectedItem.label" class="block w-2/3 rounded-md border-0 py-1.5 pl-3 pr-5 text-gray-900 placeholder:text-gray-400 sm:text-sm"  />
                    </div>
                    <div class="my-3 flex justify-between">
                      <p class="text-sm">Title</p>
                      <input type="text" v-model="selectedItem.title" class="block w-2/3 rounded-md border-0 py-1.5 pl-3 pr-5 text-gray-900 placeholder:text-gray-400 sm:text-sm"  />
                    </div>
                    <hr />
                    <div v-if="selectedItem.input =='InputText' || selectedItem.input =='InputTextarea'" class="my-3 flex justify-between">
                      <p class="text-sm my-2">Placeholder</p>
                      <input type="text" v-model="selectedItem.placeholder" class="block w-2/3 rounded-md border-0 py-1.5 pl-3 pr-5 text-gray-900 placeholder:text-gray-400 sm:text-sm " />
                    </div>
                    <div class="my-3 flex justify-between">
                      <p class="text-sm my-2">Tool-Tip</p>
                      <input type="text" v-model="selectedItem.help" class="block w-2/3 rounded-md border-0 py-1.5 pl-3 pr-5 text-gray-900 placeholder:text-gray-400 sm:text-sm " />
                    </div>
                    <hr />
                    <div v-if="selectedItem.input !='InputText' && selectedItem.input !='InputTextarea' && selectedItem.input !='InputFile' && selectedItem.input !='InputHeading' && selectedItem.input != 'InputDate'" >
                      <p>Options</p>
                      <div class="my-2">
                        <label>Add Options</label>
                        <button class="ml-3 bg-white text-black p-3 h-7 items-center inline-flex rounded-md" @click="addOption">+</button>
                      </div>
                      <div v-for="(item,index) in selectedItem.options" :key="index" class="flex items-center">
                        <input type="text" v-model="item.text" class="block my-2 w-56 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        <button @click="removeItem(index)"><img src="../../assets/images/Icons//delete.svg" /></button>
                      </div>
                    </div>
                    <hr />
                    <div class="my-2 flex justify-between">
                      <p>Type</p>
                      <div class="flex items-center">
                        
                      </div>
                    </div>
                  </div>
                  <!-- <span class="ms-3">{{ selectedItem}}</span> -->
                </a>
            </li>
          </ul>
          
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import FormBuilder from "../CustomElements/FormBuilder.vue";
const mainLayoutItems = ref([]);
const storeData = ref({})

export default defineComponent({
  components: {
    FormBuilder,
  },
  setup() {
    const selectedItem = ref([]);
    const leftSidebarOpened = ref(true);
    const getFormData = ref([]);
    const sidebarMenu = [
      {
        title: "Input",
        label: 'Name',
        id: 'input',
        input: 'InputText',
        placeholder: 'enter name',
        help: 'Input Text'
        // type: 'password'
        // rules: 'required',
      },
      {
        title: "Checkbox",
        label: 'CheckBox',
        id: 'checkbox',
        icon: 'fa-regular fa-square-check',
        input: 'InputCheckbox',
        options: [
          { text: 'Horizontal', value: 'HORIZONTAL' },
          { text: 'Vertical', value: 'VERTICAL' },
        ],
        // rules: 'required',
      },
      {
        title: "Radio",
        label: 'Radio Button',
        id: 'radio',
        input: 'InputRadio',
        options: [
          { text: 'Male', value: 'Male' },
          { text: 'Female', value: 'Female' },
          { text: 'Other', value: 'Other' },
        ],
        // rules: 'required',
      },
      {
        title: "Select",
        label: 'ss',
        id: 'select',
        input: 'InputSelect',
        // rules: 'required',
        options: [
          { text: 'English', value: 'EN' },
          { text: 'Français', value: 'FR' },
        ],
      },
      {
        title: "Teaxt Area",
        label: 'NOTES',
        id: 'textarea',
        input: 'InputTextarea',
      },
      {
        title: "Upload File",
        label: 'File',
        id: 'inputfile',
        input: 'InputFile'
      },
      {
        title: "Heading Text",
        label: 'Heading 1',
        id: 'h1',
        headingType: 'h1',
        input: 'InputHeading'
      },
      {
        title: "Title Text",
        label: 'Heading 2',
        id: 'h2',
        headingType: 'h2',
        input: 'InputHeading'
      },
      {
        title: "Small Text",
        label: 'Heading 3',
        id: 'h3',
        headingType: 'h3',
        input: 'InputHeading'
      },
      {
        title: 'Date',
        label: 'DatePicker',
        id: 'inputdate',
        input: 'InputDate',
      }
    ];
    const dragStart = (item) => {
      event.dataTransfer.setData("text/plain", JSON.stringify(item));
    };
    const allowDrop = (event) => {
      event.preventDefault();
    }
    const dragover = () => {
      event.preventDefault();
      const data = JSON.parse(event.dataTransfer.getData("text/plain"));
      mainLayoutItems.value.push(data);
    };
    const ItemSelected = (evt) => {
        const inputOptions = [
          {
              text: 'Date',
              value: 'date'
          },
          {
              text: 'input',
              value: 'Input'
          }
        ]
        selectedItem.value = {...evt, ...inputOptions}
        console.log('selectedItem.value', selectedItem.value);
    };
    const closeLeftSidebar = () => {
      leftSidebarOpened.value = !leftSidebarOpened.value
    };
    const itemDelete = (evt) => {
      const index = mainLayoutItems.value.findIndex(item => item.id === evt.id);
      const index1 = getFormData.value.findIndex(item => item.id === evt.id);
      if (index !== -1) {
        mainLayoutItems.value.splice(index, 1)
      }
      if (index1 !== -1) {
        getFormData.value.splice(index1, 1);
      }
    }
    const addOption = () => {
      selectedItem.value.options.push([]);
    }
    const removeItem = (index) => {
      selectedItem.value.options.splice(index, 1)
    }
    const saveForm = (items) => {
      const array1 = JSON.stringify(items);
      localStorage.setItem('dynamicForms', array1)
    }
    const showPreviousForm = () => {
      const data = localStorage.getItem('dynamicForms')
      if (data) {
        getFormData.value = JSON.parse(data)
      } else {
        getFormData.value.push({
        title: "Input",
        label: 'Name',
        id: 'input',
        input: 'InputText',
        placeholder: 'enter name',
        help: 'Input Text'
        // type: 'password'
        // rules: 'required',
        });
      }
    }
    const itemCopy = (item, colIndex) => {
      console.log('colIndex', colIndex);
      
      mainLayoutItems.value.push(item);
    }
    return {
      sidebarMenu,
      dragStart,
      dragover,
      allowDrop,
      mainLayoutItems,
      storeData,
      ItemSelected,
      selectedItem,
      leftSidebarOpened,
      closeLeftSidebar,
      itemDelete,
      addOption,
      removeItem,
      saveForm,
      getFormData,
      showPreviousForm,
      itemCopy
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

