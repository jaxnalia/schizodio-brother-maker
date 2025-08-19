<script lang="ts">
  export let value = 0;
  export let max = 100;
</script>

<div class="win95-border-inset h-5 bg-win95-light">
  <div 
    class="h-full bg-win95-blue"
    style="width: {(value / max) * 100}%"
  ></div>
</div>