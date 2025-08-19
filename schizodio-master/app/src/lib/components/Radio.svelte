<script lang="ts">
  import { getContext } from 'svelte';
  import { writable } from 'svelte/store';

  export let group: any;
  export let value: string;
  export let label = "";
  export let disabled = false;

  // Create or get the radio group store
  const groupStore = writable(group);
  $: groupStore.set(group);
</script>

<label class="flex items-center gap-2 cursor-pointer" class:cursor-not-allowed={disabled}>
  <div 
    class="win95-border-inset w-4 h-4 rounded-full flex items-center justify-center bg-win95-light"
    class:bg-win95-gray={disabled}
  >
    {#if $groupStore === value}
      <div class="w-2 h-2 bg-black rounded-full"></div>
    {/if}
  </div>
  <input
    type="radio"
    class="hidden"
    {value}
    bind:group
    {disabled}
  />
  <span class="text-sm" class:text-win95-dark={disabled}>{label}</span>
</label>