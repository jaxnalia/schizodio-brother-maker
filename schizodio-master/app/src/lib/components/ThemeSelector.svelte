<script lang="ts">
  import { themes, currentTheme } from '../stores/theme';
  import Select from './Select.svelte';
  
  let selectedTheme = $currentTheme.name;
  
  $: {
    const theme = themes.find(t => t.name === selectedTheme);
    if (theme) {
      currentTheme.set(theme);
    }
  }
</script>

<div class="mb-4">
  <h3 class="text-sm font-bold my-2">Color Scheme</h3>
  <Select bind:value={selectedTheme}>
    {#each themes as theme}
      <option value={theme.name}>{theme.name}</option>
    {/each}
  </Select>
</div>