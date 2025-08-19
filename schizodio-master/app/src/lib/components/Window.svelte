<script lang="ts">
  export let title: string;
  export let width = '100%';
  export let height = 'auto';
</script>

<div
  class="bg-win95-gray win95-border"
  style="width: {width}; height: {height};"
>
  <div
    class="bg-win95-blue text-xs text-win95-light px-1 py-0.5 flex justify-between items-center font-windows font-bold"
  >
    <div>{title}</div>
    <button
      class="win95-button flex items-center justify-center p-0 leading-none window-close-btn"
    >
      ×
    </button>
  </div>
  <div class="p-2">
    <slot></slot>
  </div>
</div>

<style>
  /* Ensure X button doesn't change on mobile */
  .window-close-btn {
    width: 16px !important;
    height: 16px !important;
    min-width: 16px !important;
    min-height: 16px !important;
    font-size: 12px !important;
    line-height: 1 !important;
    padding: 0 !important;
    margin: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background-color: #c0c0c0 !important;
    border: 2px solid !important;
    border-color: #ffffff #808080 #808080 #ffffff !important;
    color: #000000 !important;
    cursor: pointer !important;
    font-family: 'MS Sans Serif', 'Microsoft Sans Serif', sans-serif !important;
    font-weight: bold !important;
    text-shadow: none !important;
    box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1) !important;
    transform: none !important;
    animation: none !important;
    transition: none !important;
  }

  .window-close-btn:hover {
    background-color: #c0c0c0 !important;
    border-color: #808080 #ffffff #ffffff #808080 !important;
    transform: none !important;
  }

  .window-close-btn:active {
    background-color: #c0c0c0 !important;
    border-color: #808080 #ffffff #ffffff #808080 !important;
    box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.1) !important;
    transform: none !important;
  }

  /* Mobile specific overrides to prevent any changes */
  @media (max-width: 768px) {
    .window-close-btn {
      width: 16px !important;
      height: 16px !important;
      min-width: 16px !important;
      min-height: 16px !important;
      font-size: 12px !important;
      line-height: 1 !important;
      padding: 0 !important;
      margin: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      background-color: #c0c0c0 !important;
      border: 2px solid !important;
      border-color: #ffffff #808080 #808080 #ffffff !important;
      color: #000000 !important;
      cursor: pointer !important;
      font-family: 'MS Sans Serif', 'Microsoft Sans Serif', sans-serif !important;
      font-weight: bold !important;
      text-shadow: none !important;
      box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1) !important;
      transform: none !important;
      animation: none !important;
      transition: none !important;
      flex-shrink: 0 !important;
      flex-grow: 0 !important;
    }

    .window-close-btn:hover {
      background-color: #c0c0c0 !important;
      border-color: #808080 #ffffff #ffffff #808080 !important;
      transform: none !important;
    }

    .window-close-btn:active {
      background-color: #c0c0c0 !important;
      border-color: #808080 #ffffff #ffffff #808080 !important;
      box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.1) !important;
      transform: none !important;
    }
  }
</style>
