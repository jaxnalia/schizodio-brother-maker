<script lang="ts">
  export let value = "";
  export let placeholder = "";
  export let disabled = false;
</script>

<input
  class="win95-input w-full"
  type="text"
  bind:value
  {placeholder}
  {disabled}
  on:input
  on:change
/>