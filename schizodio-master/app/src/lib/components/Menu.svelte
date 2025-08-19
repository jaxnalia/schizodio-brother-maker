<script lang="ts">
  export let items: { label: string; disabled?: boolean }[] = [];
  export let isOpen = false;

  function handleClick(item: typeof items[0]) {
    if (!item.disabled) {
      isOpen = false;
    }
  }
</script>

{#if isOpen}
  <div class="absolute win95-border bg-win95-gray py-1 min-w-[150px] z-50">
    {#each items as item}
      <button
        class="w-full text-left px-4 py-1 text-sm hover:bg-win95-blue hover:text-win95-light disabled:text-win95-dark disabled:hover:bg-transparent disabled:hover:text-win95-dark"
        disabled={item.disabled}
        on:click={() => handleClick(item)}
      >
        {item.label}
      </button>
    {/each}
  </div>
{/if}