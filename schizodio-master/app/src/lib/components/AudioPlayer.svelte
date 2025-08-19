<script lang="ts">
  import { onMount } from 'svelte';
  import type { AudioPlayerState } from './types';
  import VolumeSlider from './VolumeSlider.svelte';
  import Button from './Button.svelte';
  
  export let audioSrc: string;
  export let title = 'Audio Player';
  export let autoplay = true;
  
  let audio: HTMLAudioElement;
  let state: AudioPlayerState = 'paused';

  let volume = 1;
  
  onMount(() => {
    audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = volume;
    
    audio.addEventListener('playing', () => state = 'playing');
    audio.addEventListener('pause', () => state = 'paused');
    
    if (autoplay) {
      // We need to handle autoplay with user interaction due to browser policies
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Autoplay prevented:', error);
          state = 'paused';
        });
      }
    }
    
    return () => {
      audio.pause();
      audio.remove();
    };
  });
  
  function togglePlay() {
    if (state === 'playing') {
      audio.pause();
    } else {
      audio.play();
    }
  }

  // Export the togglePlay function so parent components can call it
  export { togglePlay };

  function handleVolumeChange(event: CustomEvent<number>) {
    volume = event.detail;
    if (audio) {
      audio.volume = volume;
    }
  }
</script>

<div class="audio-player w-full gap-2">
  <Button on:click={togglePlay} width="54px">
    {#if state === 'playing'}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <rect x="6" y="4" width="4" height="16"/>
        <rect x="14" y="4" width="4" height="16"/>
      </svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>
    {/if}
  </Button>
  
  <VolumeSlider value={volume} steps={10} on:change={handleVolumeChange} />
</div>

<style>
  .audio-player {
    display: flex;
    flex-direction: row;
    
    align-items: center;
  }

  .audio-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #1a1a1a;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .audio-button:hover {
    transform: scale(1.05);
    background: #2a2a2a;
  }

  .audio-button svg {
    width: 24px;
    height: 24px;
    color: #ffffff;
  }
</style>