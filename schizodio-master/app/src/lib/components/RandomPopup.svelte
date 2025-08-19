<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';

  export let message: string = '';
  export let x: number = 0;
  export let y: number = 0;
  export let visible: boolean = false;

  const dispatch = createEventDispatcher();

  function closePopup() {
    dispatch('close');
  }

  // Random rotation and scale for chaotic effect
  const rotation = Math.random() * 20 - 10; // -10 to 10 degrees
  const scale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2 scale
</script>

{#if visible}
  <div
    class="random-popup"
    style="
      left: {x}px; 
      top: {y}px; 
      transform: rotate({rotation}deg) scale({scale});
    "
  >
    <div class="popup-content">
      <div class="mega-text text-center rainbow">🚨 ALERT! 🚨</div>
      <div class="schizo-text text-center glitch-text">{message}</div>
      <div class="flex gap-2 justify-center mt-3">
        <div class="chaotic-hover">
          <Button on:click={closePopup}>OK</Button>
        </div>
        <div class="chaotic-hover">
          <Button on:click={closePopup}>Cancel</Button>
        </div>
        <div class="chaotic-hover">
          <Button on:click={closePopup}>Maybe</Button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .random-popup {
    position: fixed;
    z-index: 9999;
    background: #c0c0c0;
    border: 3px solid #000;
    padding: 20px;
    box-shadow: 8px 8px 0px #000;
    max-width: 400px;
    animation:
      popup-bounce 0.5s ease-out,
      float 3s ease-in-out infinite;
    font-family: 'Courier New', monospace;
  }

  .popup-content {
    animation: glitch 2s infinite;
  }

  @keyframes popup-bounce {
    0% {
      transform: scale(0.3);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .schizo-text {
    font-size: 1.2rem;
    font-weight: bold;
    text-shadow:
      2px 2px 0px #ff00ff,
      -2px -2px 0px #00ffff;
  }

  .mega-text {
    font-size: 1.8rem;
    font-weight: bold;
  }

  .rainbow {
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7700,
      #ffdd00,
      #00ff00,
      #0099ff,
      #6600ff,
      #ff0099
    );
    background-size: 400% 400%;
    animation: rainbow 2s ease-in-out infinite;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @keyframes rainbow {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .glitch-text {
    position: relative;
    animation: text-glitch 3s infinite;
  }

  .glitch-text::before,
  .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
  }

  .glitch-text::before {
    animation: glitch-anim-1 2s infinite;
    color: #ff00ff;
    z-index: -1;
  }

  .glitch-text::after {
    animation: glitch-anim-2 3s infinite;
    color: #00ffff;
    z-index: -2;
  }

  @keyframes glitch-anim-1 {
    0%,
    5%,
    100% {
      transform: translate(0);
    }
    10% {
      transform: translate(-2px, 2px);
    }
    15% {
      transform: translate(2px, -2px);
    }
    20% {
      transform: translate(-2px, -2px);
    }
  }

  @keyframes glitch-anim-2 {
    0%,
    15%,
    100% {
      transform: translate(0);
    }
    5% {
      transform: translate(2px, 2px);
    }
    10% {
      transform: translate(-2px, -2px);
    }
    25% {
      transform: translate(2px, -2px);
    }
  }

  @keyframes text-glitch {
    0%,
    93%,
    100% {
      transform: translate(0);
    }
    1% {
      transform: translate(-2px, 1px);
    }
    2% {
      transform: translate(2px, -1px);
    }
    3% {
      transform: translate(-1px, 2px);
    }
    4% {
      transform: translate(1px, -2px);
    }
    5% {
      transform: translate(-1px, 1px);
    }
    6% {
      transform: translate(2px, 1px);
    }
    7% {
      transform: translate(-2px, -1px);
    }
    8% {
      transform: translate(1px, 2px);
    }
    9% {
      transform: translate(-1px, -2px);
    }
    10% {
      transform: translate(2px, -2px);
    }
  }

  .glitch {
    animation: glitch 2s infinite;
  }

  @keyframes glitch {
    0%,
    90%,
    100% {
      transform: translate(0);
    }
    10% {
      transform: translate(-2px, 2px);
    }
    20% {
      transform: translate(2px, -2px);
    }
    30% {
      transform: translate(-2px, -2px);
    }
    40% {
      transform: translate(2px, 2px);
    }
    50% {
      transform: translate(-2px, 2px);
    }
    60% {
      transform: translate(2px, -2px);
    }
    70% {
      transform: translate(-2px, -2px);
    }
    80% {
      transform: translate(2px, 2px);
    }
  }

  .chaotic-hover:hover {
    animation: chaos 0.5s infinite;
    cursor: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDBMMTI4IDE2TDE2IDMyTDAgMTZMMTYgMFoiIGZpbGw9IiNGRjAwRkYiLz4KPC9zdmc+'),
      auto;
  }

  @keyframes chaos {
    0% {
      transform: rotate(0deg) scale(1);
    }
    25% {
      transform: rotate(90deg) scale(1.1);
    }
    50% {
      transform: rotate(180deg) scale(0.9);
    }
    75% {
      transform: rotate(270deg) scale(1.1);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
</style>
