<template>
    <div v-if="help && id" class="relative">
    <span data-tooltip-target="tooltip-top" :id="`tooltip_${id}`" class="text-blue-500 cursor-pointer">?</span>
    <div :id="`tooltip_${id}`"  role="tooltip" class="hidden bg-blue-500 text-white text-xs rounded-lg py-1 px-2 absolute z-10 bottom-full left-0 ml-2">
      {{ help }}
      <svg class="absolute text-blue-500 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve">
        <polygon class="fill-current" points="0,0 127.5,127.5 255,0"/>
      </svg>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    name: 'HelpTooltip',
    props: {
      help: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
  };
  </script>