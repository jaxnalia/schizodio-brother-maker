<script lang="ts">
  export let tabs: string[] = [];
  export let activeTab: string;
</script>

<div class="flex">
  {#each tabs as tab}
    <button
      class="win95-button px-3 py-1 -mr-[2px]"
      class:active={activeTab === tab}
      on:click={() => activeTab = tab}
    >
      {tab}
    </button>
  {/each}
</div>
<div class="win95-border-inset p-2 -mt-[2px]">
  <slot></slot>
</div>