<script lang="ts">
  import { currentTheme } from '../lib/stores/theme';
  import '../app.css';

  $: ({
    colors: { background, window, text, highlight, highlightText },
  } = $currentTheme);
</script>

<main
  class="static h-screen w-full p-5 font-windows overflow-x-hidden"
  style="--win95-bg: {background}; --win95-window: {window}; --win95-text: {text}; --win95-highlight: {highlight}; --win95-highlight-text: {highlightText}; -webkit-font-smoothing: none || antialiased || subpixel-antialiased -moz-osx-font-smoothing: auto || inherit || unset || grayscale font-smoothing: auto || inherit || unset || grayscale"
>
  <slot />
</main>

<style>
  :global(html, body) {
    overflow-x: hidden;
    max-width: 100vw;
  }

  main {
    background-color: var(--win95-bg);
    overflow-x: hidden;
  }

  :global(.win95-border) {
    border-color: var(--win95-window) var(--win95-text) var(--win95-text)
      var(--win95-window) !important;
  }

  :global(.win95-border-inset) {
    border-color: var(--win95-text) var(--win95-window) var(--win95-window)
      var(--win95-text) !important;
    background-color: var(--win95-window) !important;
  }

  :global(.bg-win95-blue) {
    background-color: var(--win95-highlight) !important;
  }

  :global(.text-win95-light) {
    color: var(--win95-highlight-text) !important;
  }

  :global(.bg-win95-gray) {
    background-color: var(--win95-window) !important;
  }

  :global(.text-win95-text) {
    color: var(--win95-text) !important;
  }
</style>
