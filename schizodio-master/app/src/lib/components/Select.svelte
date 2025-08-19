<script lang="ts">
  export let value: string;
  export let disabled = false;
</script>

<div class="relative inline-block">
  <select
    bind:value
    {disabled}
    class="win95-border appearance-none pr-6 pl-1 py-1 bg-win95-light text-sm min-w-[120px]"
    class:bg-win95-gray={disabled}
    class:cursor-not-allowed={disabled}
  >
    <slot></slot>
  </select>
  <div class="absolute right-0 top-0 bottom-0 win95-border-inset w-5 pointer-events-none flex items-center justify-center">
    <div class="border-t-4 border-t-black border-l-4 border-l-transparent border-r-4 border-r-transparent mt-1"></div>
  </div>
</div>