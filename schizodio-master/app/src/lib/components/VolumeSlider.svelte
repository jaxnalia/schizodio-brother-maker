<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    // import Slider from './Slider.svelte';
    
    export let value = 1;
    export let steps = 10;
    
    const dispatch = createEventDispatcher<{
      change: number;
    }>();
    
    function handleInput(event: Event) {
      const input = event.target as HTMLInputElement;
      const newValue = parseFloat(input.value);
      dispatch('change', newValue);
    }
  </script>
  <!-- <Slider bind:value={value} min={0} max={100} step={10} on:input={handleInput} /> -->

  <div class="volume-control">
    <!-- <svg 
      class="volume-icon" 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
    </svg> -->
    <input
      type="range"
      min="0"
      max="1"
      step={1/steps}
      {value}
      on:input={handleInput}
      class="volume-slider bg-win95-dark win95-input"
    />
  </div>
  
  <style>
    .volume-control {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }
  
    .volume-icon {
      width: 20px;
      height: 20px;
      color: #888;
    }
  
    .volume-slider {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 22px;
      /* border-radius: 2px; */
      /* background: #444; */
      outline: none;
      cursor: pointer;
      
    }
  
    
  
    /* .volume-slider::-webkit-slider-thumb:hover {
      transform: scale(1.2);
    }
  
    .volume-slider::-moz-range-thumb:hover {
      transform: scale(1.2);
    } */
  </style>