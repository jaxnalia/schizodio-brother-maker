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
      // Try to fetch from server first (for local development)
      const response = await fetch(`/api/layers/${group}`);
      if (response.ok) {
        const files = await response.json();
        console.log(`Files in ${group}:`, files);
        
        // Extract base names (remove .png extension and numbers at the end)
        const options = files
          .filter((file: string) => file.endsWith('.png'))
          .map((file: string) => {
            const baseName = file.replace(/\.png$/, '').replace(/\d+$/, '');
            return baseName;
          })
          .filter((name: string, index: number, arr: string[]) => arr.indexOf(name) === index);
        
        console.log(`Options for ${group}:`, options);
        return options;
      }
    } catch (error) {
      console.log(`Server API not available, using fallback for ${group}`);
    }
    
    // Fallback: Use hardcoded options (for deployment)
    const fallbackOptions: Record<string, string[]> = {
      'Background': ['A_Roads', 'Akademia_Italia', 'Alotments', 'Atms_Ktms', 'Bajan_Bando', 'Bajan_Cliff_View', 'Bajan_Safehouse', 'Bajan_Villa', 'Big_pharma', 'Bitcoin_Broly', 'Black_Pool', 'Blue_Cryptonite', 'Blue_Eyes_Thunder_Dragon', 'Bonus_stage', 'Cell_Games', 'China', 'China_Courtyard', 'Chongqing', 'Chongqing_磁器口古镇', 'Chuppa_pillz', 'Cloud_Nine', 'CountrySide_1', 'CountrySide_2', 'County_Line', 'Cour_dhonneur', 'Danube_River', 'DMT', 'Dubai_Desert', 'Dubai_Desert_2', 'Duck_hunt', 'Fenty_Bando', 'Fishers_Bastion', 'Five_joints', 'Furīza_no_Uchūsen', 'Hadoken_波動拳', 'Honest_werk', 'Hong_Kong', 'Hongya_Cave_洪崖洞', 'Hyperbolic_Timechamber', 'Jiggas_in_paris', 'Jumeirah_Beach_Residence', 'Kong_Island', 'Light_Mist', 'Magyar_Állami_Operaház', 'Marina_Skyline', 'Marky_b', 'Mega_Drive', 'Money_Shot', 'Museum_of_the_Future', 'Nacht_der_Untoten', 'Nacht_der_Untoten_2', 'Nity_Ave', 'NYCafé', 'Open_Sea', 'Open_Sea_2', 'Palm_Jumeirah', 'Paradise_1', 'Paradise_2', 'Paradise_3', 'Paradise_4', 'Paradise_5', 'Paradise_6', 'Pepe_Pillz', 'Phantom', 'Pick_n_Mix', 'Pink_Champagne', 'Planet_Kai', 'Raffles_City', 'Rekt_Bardock', 'Richard_Haynes_Boardwalk', 'Schizo_Yoshi_Kart', 'Shang_Tsungs_Palace', 'Sleepy_Hollow', 'SNES_Cartridge', 'Star_Dawg', 'Széchenyi_Lánchíd', 'Tesla_Pillz', 'The_Canal', 'The_Endz', 'The_Endz_2', 'The_Marina', 'The_Office_SZN1', 'The_Office_SZN2', 'The_Peak', 'The_Pit', 'Touch_grass', 'UPS_pillz', 'White_Widow', 'Yangtze_River'],
      'Body': ['Boy_Who_Cried_Wolf', 'Brother', 'Gora', 'Greeny', 'Lobster_Pink', 'Purple_Urkle', 'Schizo_Blue', 'Schizo_Panda', 'Snowflake', 'Stone_Cyborg'],
      'Clothing': ['ADHD_Tshirt', 'Agbada_Tshirt', 'Apestar_Jacket', 'Argent_Tshirt', 'Autism_Jumper', 'Baby_Schizo_Pink_Tshirt', 'Baby_Schizo_White_Tshirt', 'Backwoods_Hoodie', 'Bitchari_T_shirt', 'Black_Jacket', 'Blue_Puffer', 'Bob_Sponge_Tshirt', 'Chaatgpt_Tshirt', 'Ekubo_Tshirt', 'ETHLend_Tshirt', 'Faguar_Tshirt', 'Flintstones_Tshirt', 'Get_Money_Tshirt', 'Gods_Strongest_Schizo', 'Gold_Skull_Shirt', 'Golden_Boy_Tracksuit', 'Goochi_Track_Jacket', 'Guru_Suit', 'I_Am_Carrying_Tshirt', 'I_Have_A_Weapon', 'Im_with_Schizodio_Tshirt', 'Israeli_Coin_Tshirt', 'Krusty_Tshirt', 'Kurta_Jeet', 'Life_is_Soup_Tshirt', 'Love_Nigeria_Tshirt', 'Luv_Cobie_Tshirt', 'Mushroom_Jacket', 'Mushroomon_Jacket', 'Okay_Now_Tshirt', 'Paradex_Tshirt', 'Peaky_Blind_Tshirt', 'Pink_Puffer', 'Polymarket_Tshirt', 'Puff_Tshirt', 'Purple_Aki_Tshirt', 'Purple_Tuxedo', 'Relax_Vest', 'Remilia_Jacket', 'Saiyan_Suit', 'Scared_of_Women', 'Schizario_Tshirt', 'Schizo_Duck_Tshirt', 'Schizo_Game_Tshirt', 'Schizo_Hut_Tshirt', 'Schizo_Network_Tshirt', 'Schizo_Red_Tshirt', 'Schizo_Tunez_Tshirt', 'Schizoberry_Tshirt', 'Schizodio_Company_Blue_Tshirt', 'Schizodio_Company_Brown_Tshirt', 'School_Uniform', 'SLM_Tshirt', 'Spider_Tshirt', 'Squid_Jacket', 'Starknet_Tshirt', 'StarkWare_Alf_Tshirt', 'Stoney_Puffer', 'Stop_Being_Poor_Vest'],
      'Hair': ['Black_Jellycut', 'Black_Pompadour', 'Blondie_Brown_Pompadour', 'Blue_Curtain_Bob', 'Blue_Jellycut', 'Brown_Curtain_Bob', 'Brown_Jellycut', 'Brown_Pompadour', 'Green_Curtain_Bob', 'Green_Jellycut', 'Green_Pompadour', 'Orange_Curtain_Bob', 'Orange_Jellycut', 'Orange_Pompadour', 'Pink_Curtain_Bob', 'Pink_Jellycut', 'Pink_Pompadour', 'Purple_Curtain_Bob', 'Purple_Jellycut', 'Purple_Pompadour', 'Rainbow_Curtain_Bob', 'Rainbow_Jellycut', 'Rainbow_Pompadour', 'Red_Curtain_Bob', 'Red_Jellycut', 'Red_Pompadour', 'White_Curtain_Bob', 'White_Jellycut', 'White_Pompadour', 'Yellowy_Orange_Curtain_Bob', 'Yellowy_Orange_Jellycut', 'Yellowy_Orange_Pompadour'],
      'Eyebrows': ['Black_Notched_Slits', 'Black_Slits', 'Blue_Notched_Slit', 'Blue_Slits', 'Brown_Notched_Slits', 'Brown_Slits', 'Green_Notched_Slits', 'Green_Slits', 'Orange_Notched_Slits', 'Orange_Slits', 'Pink_Notched_Slits', 'Pink_Slits', 'Purple_Notched_Slits', 'Purple_Slits', 'Rainbow_Notched_Slits', 'Rainbow_Slits', 'Red_Notched_Slits', 'Red_Slits', 'Standard_', 'White_Notched_Slits', 'White_Slits', 'Yellowy_Orange_Notched_Slits', 'Yellowy_Orange_Slits'],
      'Eyes': ['Blood_Shot', 'Confusion', 'Crying', 'Dead', 'Determined', 'Evil', 'Happy', 'Laser', 'Love', 'Money', 'Neutral', 'Pissed', 'Sad', 'Scared', 'Sleepy', 'Squint', 'Stoned', 'Surprised', 'Suspicious', 'Tired', 'Wink', 'Worried', 'Zombie'],
      'Eyewear': ['No_Eyewear', 'Safety_Glasses_Blue', 'Safety_Glasses_Green', 'Safety_Glasses_Red', 'Safety_Glasses_Yellow'],
      'Mouth': ['Happy', 'Neutral', 'Open', 'Sad', 'Scared', 'Smile', 'Surprised', 'Tongue', 'Wink'],
      'Headwear': ['90s_Trapstar', 'Birka_Red', 'Clown_Headwarmer', 'Crown', 'Devil_Horns', 'Flower_Crown', 'Golden_Crown', 'Halo', 'Headband', 'Headphones', 'Helmet', 'Hood', 'Jester_Hat', 'Knight_Helmet', 'Party_Hat', 'Pirate_Hat', 'Police_Cap', 'Santa_Hat', 'Scarf', 'Ski_Goggles', 'Snapback', 'Sombrero', 'Space_Helmet', 'Sunglasses', 'Top_Hat', 'Turban', 'Viking_Helmet', 'Wizard_Hat'],
      'Mask': ['Cyborg_Hypio', 'No_Mask', 'Schizodio_OG_Mask'],
      'Accessories': ['Backwoods_Blunt', 'God_Candle', 'Grime_Reaper_Candle', 'Honey_Comb_Blunt', 'Memory_Card_Chain', 'No_Accessories', 'Pixelated_Ciggy', 'Shotgun_Shell_Chain'],
      'Weapons': ['Ak47_Pixel_Green', 'Avnu_Machete', 'Blades_Sword', 'Bow_Arrow', 'Chainsaw', 'Crossbow', 'Dagger', 'Flame_Thrower', 'Grenade', 'Gun', 'Hammer', 'Katana', 'Knife', 'Laser_Gun', 'Mace', 'Rocket_Launcher', 'Shield', 'Spear', 'Staff', 'Sword', 'Throwing_Star'],
      'Sidekick': ['Alf', 'Arnesh', 'Baboon', 'Bat', 'Bear', 'Bird', 'Cat', 'Chicken', 'Cow', 'Deer', 'Dog', 'Dolphin', 'Dragon', 'Duck', 'Eagle', 'Elephant', 'Fish', 'Fox', 'Frog', 'Giraffe', 'Goat', 'Gorilla', 'Horse', 'Kangaroo', 'Koala', 'Lion', 'Monkey', 'Mouse', 'Owl', 'Panda', 'Penguin', 'Pig', 'Rabbit', 'Shark', 'Sheep', 'Snake', 'Tiger', 'Turtle', 'Unicorn', 'Whale', 'Wolf', 'Zebra'],
      'Overlays': ['Abdel_Called_Me', 'Alexa_Hears', 'Bastard_Guy', 'Bitch_Im_Back', 'Dont_Trust_Anyone', 'Fuck_The_System', 'Get_Money', 'I_Believed_in_Something', 'I_Dont_Need_A_Lawyer', 'I_Have_A_Weapon', 'Im_Carrying', 'Im_Not_A_Cop', 'Im_With_Schizodio', 'Keep_It_Real', 'Life_Is_Soup', 'Make_Starknet_Great_Again', 'Money_Over_Everything', 'No_Snitching', 'On_My_Momma', 'Real_Nigga', 'Schizo_For_Life', 'Schizodio_Company', 'Stay_Humble', 'This_My_Jigga', 'Trust_No_One', 'We_Out_Here', 'What_You_Know_About_That', 'You_Dont_Know_Me']
    };
    
    const options = fallbackOptions[group] || [];
    console.log(`Options for ${group}:`, options);
    return options;
  }



  // Get the exact filename for an option
  async function getExactFilename(group: string, option: string): Promise<string> {
    console.log(`getExactFilename called for ${group}/${option}`);
    
    try {
      // Try to fetch from server first (for local development)
      const response = await fetch(`/api/layers/${group}`);
      if (response.ok) {
        const files = await response.json();
        console.log(`Files returned for ${group}:`, files);
        
        // Find the file that matches this option
        const matchingFile = files.find((file: string) => {
          const baseName = file.replace(/\.png$/, '').replace(/\d+$/, '');
          const matches = baseName === option;
          if (matches) {
            console.log(`Found match: "${file}"`);
          }
          return matches;
        });
        
        if (matchingFile) {
          console.log(`Found exact filename for ${group}/${option}: ${matchingFile}`);
          return matchingFile;
        }
      }
    } catch (error) {
      console.log(`Server API not available, using fallback for ${group}/${option}`);
    }
    
    // Fallback: Use standard naming convention (for deployment)
    const filename = `${option}20.png`;
    console.log(`Using fallback filename for ${group}/${option}: ${filename}`);
    return filename;
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
