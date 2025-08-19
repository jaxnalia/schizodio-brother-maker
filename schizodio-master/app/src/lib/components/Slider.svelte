<script lang="ts">
  import { getClientX, calculateSliderValue, type SliderEvent } from '../utils/slider';

  export let value = 50;
  export let min = 0;
  export let max = 100;
  export let step = 1;
  export let disabled = false;

  let isDragging = false;
  let sliderTrack: HTMLDivElement;

  function handleStart(event: SliderEvent) {
    if (!disabled) {
      isDragging = true;
      handleMove(event);
    }
  }

  function handleEnd() {
    isDragging = false;
  }

  function handleMove(event: SliderEvent) {
    if (isDragging && sliderTrack) {
      const clientX = getClientX(event);
      const rect = sliderTrack.getBoundingClientRect();
      value = calculateSliderValue(clientX, rect, min, max, step);
    }
  }
</script>

<svelte:window 
  on:mouseup={handleEnd}
  on:mousemove={handleMove}
  on:touchend={handleEnd}
  on:touchcancel={handleEnd}
  on:touchmove|preventDefault={handleMove}
/>

<div class="flex w-full items-center gap-2 text-xs">
  <div
    bind:this={sliderTrack}
    class="win95-border-inset flex-1 h-5 relative cursor-pointer"
    class:cursor-not-allowed={disabled}
    on:mousedown={handleStart}
    on:touchstart|preventDefault={handleStart}
  >
    <div 
      class="absolute top-0 bottom-0 left-0 bg-win95-dark"
      style="width: 100%"
    />
    <div
      class="win95-button absolute w-3 h-full -ml-1.5 cursor-grab active:cursor-grabbing"
      class:cursor-not-allowed={disabled}
      style="left: {((value - min) / (max - min)) * 100}%"
    />
  </div>
</div>