<script lang="ts">
  import { onMount, tick } from 'svelte';
  import Window from '$lib/components/Window.svelte';
  import Button from '$lib/components/Button.svelte';
  import Slider from '$lib/components/Slider.svelte';

  // Layer groups and their options
  const layerGroups = [
    'Background',
    'Body', 
    'Clothing',
    'Hair',
    'Eyebrows',
    'Eyes',
    'Eyewear',
    'Mouth',
    'Headwear',
    'Mask',
    'Accessories',
    'Weapons',
    'Sidekick',
    'Overlays'
  ];

  // Current selections for each layer group
  let selections: Record<string, string> = {};
  let layerOptions: Record<string, string[]> = {};
  let currentCarouselIndex: Record<string, number> = {};
  let previewCanvas: HTMLCanvasElement;
  let previewCtx: CanvasRenderingContext2D;
  let isGenerating = false;
  let isLoading = true;
  let isUpdating = false;
  
  // Image cache to avoid reloading the same images
  let imageCache: Record<string, HTMLImageElement> = {};
  let loadedImages: Record<string, HTMLImageElement> = {};
  let updateTimeout: ReturnType<typeof setTimeout> | null = null;

  // Initialize selections and carousel indices
  layerGroups.forEach(group => {
    selections[group] = '';
    currentCarouselIndex[group] = 0;
  });

  // Debug canvas binding
  $: if (previewCanvas) {
    console.log('Canvas bound successfully:', previewCanvas);
  }

  onMount(async () => {
    await loadLayerOptions();
    // Preload some common images in the background (non-blocking)
    preloadCommonImages();
    // Ensure canvas is mounted before drawing
    isLoading = false;
    await tick();
    // Randomize after canvas and options are ready (also triggers generatePreview)
    if (Object.keys(layerOptions).length > 0) {
      randomizeAll(false);
    }
  });

  async function loadLayerOptions() {
    try {
      console.log('Loading layer options...');
      // Load layer options for each group dynamically
      for (const group of layerGroups) {
        layerOptions[group] = await getLayerOptionsForGroup(group);
        console.log(`${group}: ${layerOptions[group].length} options`);
      }
    } catch (error) {
      console.error('Error loading layer options:', error);
    }
  }

  async function preloadCommonImages() {
    console.log('Preloading common images...');
    // Preload first few images from each group for faster switching
    for (const group of layerGroups) {
      const options = layerOptions[group] || [];
      if (options.length > 0) {
        // Preload first 3 images from each group
        const imagesToPreload = options.slice(0, 3);
        for (const option of imagesToPreload) {
          try {
            const exactFilename = await getExactFilename(group, option);
            const imagePath = `/layers/${group}/${exactFilename}`;
            // Load but don't wait for it
            loadImage(imagePath).catch(() => {
              // Silently fail for preloading
            });
          } catch (error) {
            // Silently fail for preloading
          }
        }
      }
    }
  }

    async function getLayerOptionsForGroup(group: string): Promise<string[]> {
    console.log(`Getting options for group: ${group}`);
    
    try {
      // Fetch the directory listing from the server
      const response = await fetch(`/api/layers/${group}`);
      if (!response.ok) {
        console.error(`Failed to fetch layer options for ${group}:`, response.status);
        return [];
      }
      
      const files = await response.json();
      console.log(`Files in ${group}:`, files);
      
      // Extract base names (remove .png extension and numbers at the end)
      const options = files
        .filter((file: string) => file.endsWith('.png'))
        .map((file: string) => {
          // Remove .png extension and numbers at the end
          const baseName = file.replace(/\.png$/, '').replace(/\d+$/, '');
          console.log(`Extracted base name from "${file}": "${baseName}"`);
          return baseName;
        })
        .filter((name: string, index: number, arr: string[]) => arr.indexOf(name) === index); // Remove duplicates
      
      console.log(`Options for ${group}:`, options);
      return options;
    } catch (error) {
      console.error(`Error fetching layer options for ${group}:`, error);
      return [];
    }
  }



  // Get the exact filename for an option
  async function getExactFilename(group: string, option: string): Promise<string> {
    try {
      console.log(`getExactFilename called for ${group}/${option}`);
      
      // Fetch the directory listing from the server
      const response = await fetch(`/api/layers/${group}`);
      if (!response.ok) {
        console.error(`Failed to fetch layer files for ${group}:`, response.status);
        return `${option}20.png`; // Default fallback
      }
      
      const files = await response.json();
      console.log(`Files returned for ${group}:`, files);
      
      // Find the file that matches this option
      const matchingFile = files.find((file: string) => {
        // Remove .png extension and numbers at the end
        const baseName = file.replace(/\.png$/, '').replace(/\d+$/, '');
        console.log(`File: "${file}" -> Base name: "${baseName}" -> Option: "${option}"`);
        const matches = baseName === option;
        if (matches) {
          console.log(`Found match: "${file}"`);
        }
        return matches;
      });
      
      console.log(`Matching file found:`, matchingFile);
      
      if (matchingFile) {
        console.log(`Found exact filename for ${group}/${option}: ${matchingFile}`);
        return matchingFile;
      }
      
      console.warn(`No exact filename found for ${group}/${option}, using default`);
      return `${option}20.png`; // Default fallback
    } catch (error) {
      console.error(`Error getting exact filename for ${group}/${option}:`, error);
      return `${option}20.png`; // Default fallback
    }
  }

  function debouncedGeneratePreview() {
    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }
    isUpdating = true;
    updateTimeout = setTimeout(() => {
      generatePreview().finally(() => {
        isUpdating = false;
      });
    }, 100); // 100ms debounce
  }

  function nextOption(group: string) {
    const options = layerOptions[group] || [];
    if (options.length > 0) {
      currentCarouselIndex[group] = (currentCarouselIndex[group] + 1) % options.length;
      selections[group] = options[currentCarouselIndex[group]];
      debouncedGeneratePreview();
    }
  }

  function prevOption(group: string) {
    const options = layerOptions[group] || [];
    if (options.length > 0) {
      currentCarouselIndex[group] = currentCarouselIndex[group] === 0 ? options.length - 1 : currentCarouselIndex[group] - 1;
      selections[group] = options[currentCarouselIndex[group]];
      debouncedGeneratePreview();
    }
  }

  function randomizeAll(useDebounce = true) {
    console.log('Randomizing all layers...');
    console.log('Layer options available:', layerOptions);
    
    layerGroups.forEach(group => {
      const options = layerOptions[group] || [];
      console.log(`${group} has ${options.length} options:`, options);
      if (options.length > 0) {
        const randomIndex = Math.floor(Math.random() * options.length);
        currentCarouselIndex[group] = randomIndex;
        selections[group] = options[randomIndex];
        console.log(`${group}: ${selections[group]} (index: ${randomIndex})`);
      } else {
        console.warn(`No options available for ${group}`);
      }
    });
    console.log('Final selections:', selections);
    if (useDebounce) {
      debouncedGeneratePreview();
    } else {
      generatePreview();
    }
  }

  async function generatePreview() {
    console.log('Generating preview...');
    console.log('Canvas exists:', !!previewCanvas);
    console.log('Is generating:', isGenerating);
    console.log('Current selections:', selections);
    
    if (!previewCanvas || isGenerating) {
      console.log('Canvas not ready or already generating');
      return;
    }
    
    isGenerating = true;
    const ctx = previewCanvas.getContext('2d');
    if (!ctx) {
      console.log('Could not get canvas context');
      isGenerating = false;
      return;
    }

    // Set canvas size for better quality (only if not already set)
    if (previewCanvas.width !== 400 || previewCanvas.height !== 400) {
      previewCanvas.width = 400;
      previewCanvas.height = 400;
    }

    // Clear canvas
    ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

    // Load and draw layers in order (bottom to top)
    const layerOrder = ['Background', 'Body', 'Mask', 'Mouth', 'Eyes', 'Eyebrows', 'Hair', 'Eyewear', 'Clothing', 'Headwear', 'Weapons', 'Sidekick', 'Accessories', 'Overlays'];
    
    let anyImageLoaded = false;
    
    // Load all images first, then draw them
    const imagePromises = layerOrder.map(async (layerGroup) => {
      const selection = selections[layerGroup];
      if (!selection) return null;
      
      try {
        const exactFilename = await getExactFilename(layerGroup, selection);
        if (!exactFilename.endsWith('.png')) {
          console.error(`Invalid filename format: ${exactFilename}`);
          return null;
        }
        
        const imagePath = `/layers/${layerGroup}/${exactFilename}`;
        console.log(`Loading: ${imagePath}`);
        
        const image = await loadImage(imagePath);
        return { layerGroup, image };
      } catch (error) {
        console.error(`Error loading image for ${layerGroup}: ${selection}`, error);
        return null;
      }
    });
    
    // Wait for all images to load
    const results = await Promise.all(imagePromises);
    
         // Draw all loaded images
     console.log('Drawing results:', results.length);
     for (const result of results) {
       if (result && result.image) {
         ctx.drawImage(result.image, 0, 0, previewCanvas.width, previewCanvas.height);
         anyImageLoaded = true;
         console.log(`Drew layer: ${result.layerGroup}`);
       } else {
         console.log('Skipped result:', result);
       }
     }
    
    // If no images were loaded, show a placeholder
    if (!anyImageLoaded) {
      console.log('No images loaded, showing placeholder');
      ctx.fillStyle = '#c0c0c0';
      ctx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);
      ctx.fillStyle = '#000000';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Brother Maker', previewCanvas.width / 2, previewCanvas.height / 2 - 20);
      ctx.fillText('Loading...', previewCanvas.width / 2, previewCanvas.height / 2 + 20);
    }
    
    isGenerating = false;
  }

  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      // Check if image is already cached
      if (imageCache[src]) {
        resolve(imageCache[src]);
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        // Cache the loaded image
        imageCache[src] = img;
        resolve(img);
      };
      img.onerror = (error) => {
        console.error(`Failed to load image: ${src}`, error);
        reject(error);
      };
      img.crossOrigin = 'anonymous';
      img.src = src;
    });
  }

  function downloadImage() {
    if (!previewCanvas) return;
    
    const link = document.createElement('a');
    link.download = 'schizodio-brother.png';
    link.href = previewCanvas.toDataURL();
    link.click();
  }

  async function shareToX() {
    if (!previewCanvas) return;
    
    try {
      // Convert canvas to blob and copy to clipboard
      const blob = await new Promise<Blob>((resolve) => {
        previewCanvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else throw new Error('Failed to create image blob');
        }, 'image/png');
      });

      // Copy image to clipboard
      const clipboardItem = new ClipboardItem({
        'image/png': blob
      });
      await navigator.clipboard.write([clipboardItem]);
      
      // Show alert first
      alert('Image copied to clipboard! 📋\n\nClick OK to open X tweet window.');
      
      // Then open X.com tweet popup
      const shareText = encodeURIComponent('Check out my #Schizodio Brother! 🤡 #Starknet');
      const popup = window.open(
        `https://x.com/intent/tweet?text=${shareText}`,
        'tweet',
        'width=550,height=420,scrollbars=yes,resizable=yes'
      );
      
      if (!popup) {
        alert('Popup blocked! Please allow popups and try again.');
      }
      
    } catch (error) {
      console.error('Error sharing to X:', error);
      alert('Failed to share image. Please try again.');
    }
  }


</script>

<svelte:head>
  <title>Schizodio Brother Baker 🤡</title>
</svelte:head>

<div class="flex flex-col gap-4 p-4 h-full">
  <Window title="Schizodio Brother Maker" width="100%" height="auto">
    <div class="flex flex-col lg:flex-row gap-4 h-full">
      <!-- Preview Section -->
      <div class="flex-1 bg-win95">
        Preview
        <!-- <Window title="Preview" width="100%" height="400px"> -->
          <div class="flex justify-center items-center h-full bg-win95">
            {#if isLoading}
              <div class="text-center">
                <div class="text-lg mb-2">Loading...</div>
                <div class="text-sm text-win95-dark">Preparing the Brother Maker</div>
              </div>
            {:else}
                             <div class="relative">
                                   <canvas 
                    bind:this={previewCanvas}
                    width="400" 
                    height="400" 
                    class="border-2 border-win95-darker"
                    style="image-rendering: pixelated;"
                    on:load={() => console.log('Canvas loaded')}
                    on:error={() => console.log('Canvas error')}
                    on:click={() => console.log('Canvas clicked')}
                  ></canvas>
                 {#if isUpdating}
                   <div class="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                     <div class="text-white text-sm">Updating...</div>
                   </div>
                 {/if}
               </div>
            {/if}
          </div>
        <!-- </Window> -->
        
        <!-- Action Buttons -->
        <div class="flex gap-2 mt-4">
                     <Button on:click={() => randomizeAll(true)} width="auto" disabled={isLoading}>
            🎲 Randomize All
          </Button>
          <Button on:click={downloadImage} width="auto" disabled={isLoading}>
            💾 Download
          </Button>
          <Button on:click={shareToX} width="auto" disabled={isLoading}>
            🐦 Share to X
          </Button>
        </div>
      </div>

      <!-- Layer Controls -->
      
      <div style="height:650px; width:100%" class="flex-1 overflow-y-auto">
        <!-- <Window title="Layer Controls" width="100%" height="600px"> -->
            
          <div class="space-y-4">
            {#each layerGroups as group}
              <div class="win95-border-inset p-2">
                <div class="text-sm font-bold mb-2 text-win95-text">{group}</div>
                
                {#if layerOptions[group] && layerOptions[group].length > 0}
                  <div class="flex items-center gap-2">
                    <Button on:click={() => prevOption(group)} width="auto">
                      ◀
                    </Button>
                    
                    <div class="flex-1 text-center text-sm text-win95-text min-h-[20px] flex items-center justify-center">
                      {selections[group] || 'None'}
                    </div>
                    
                    <Button on:click={() => nextOption(group)} width="auto">
                      ▶
                    </Button>
                  </div>
                  
                                     <div class="mt-2">
                     <Slider 
                       min={0} 
                       max={layerOptions[group].length - 1} 
                       value={currentCarouselIndex[group]}
                                               on:valueChange={(event) => {
                          currentCarouselIndex[group] = event.detail;
                          selections[group] = layerOptions[group][event.detail];
                          debouncedGeneratePreview();
                        }}
                     />
                   </div>
                {:else}
                  <div class="text-sm text-win95-dark">Loading...</div>
                {/if}
              </div>
            {/each}
          </div>
        <!-- </Window> -->
      </div>
    </div>
  </Window>
</div>

<style>
  canvas {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
</style>
