<script lang="ts">
  export let checked = false;
  export let label = "";
  export let disabled = false;
</script>

<label class="flex items-center gap-2 cursor-pointer" class:cursor-not-allowed={disabled}>
  <div 
    class="win95-border-inset w-4 h-4 flex items-center justify-center bg-win95-light"
    class:bg-win95-gray={disabled}
  >
    {#if checked}
      <div class="text-xs leading-none relative -top-[1px]">✓</div>
    {/if}
  </div>
  <span class="text-sm" class:text-win95-dark={disabled}>{label}</span>
</label>