<script lang="ts">
    import { fade } from 'svelte/transition';
    import Button from "./Button.svelte";

    export let text = "0x00acc2fa3bb7f6a6726c14d9e142d51fe3984dbfa32b5907e1e76425177875e2";
    export let buttonText = 'Copy';
    export let successText = 'Copied!';
    // export let className = '';
    
    let showSuccess = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    
    async function copyToClipboard() {
      try {
        await navigator.clipboard.writeText(text);
        showSuccess = true;
        
        // Clear any existing timeout
        if (timeoutId) clearTimeout(timeoutId);
        
        // Reset after 2.5 seconds
        timeoutId = setTimeout(() => {
          showSuccess = false;
        }, 2500);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    }
    
    // Cleanup on component destruction
    import { onDestroy } from 'svelte';
    onDestroy(() => {
      if (timeoutId) clearTimeout(timeoutId);
    });
  </script>
  
  <Button
  width="80px"
    on:click={copyToClipboard}
  
    ariaLabel={showSuccess ? successText : buttonText}
  >
    {#if showSuccess}
      <span>
        {successText}
      </span>
    {:else}
      <span>
        {buttonText}
      </span>
    {/if}
  </Button>
