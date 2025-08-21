<script lang="ts">
  import { onMount, tick } from 'svelte';
  import Window from '$lib/components/Window.svelte';
  import Button from '$lib/components/Button.svelte';
  import Slider from '$lib/components/Slider.svelte';
  import schizodio_title from '../../assets/images/schizodio.png';
  import '$lib/styles/win95.css';
  import '../../app.css';

  // Sound effects for random playback on click
  const soundEffects = [
    'https://www.myinstants.com/media/sounds/china_GN3TDUt.mp3',
    'https://www.myinstants.com/media/sounds/hadouken-sound-effect-256-kbps.mp3',
    'https://www.myinstants.com/media/sounds/smzinho-apanhando-no-tekken.mp3',
    'https://www.myinstants.com/media/sounds/tekken-is-so-shit.mp3',
    'https://www.myinstants.com/media/sounds/chicken_CvIaVtK.mp3',
    'https://www.myinstants.com/media/sounds/shoryureppa-02-ken.mp3',
    'https://www.myinstants.com/media/sounds/mktoasty.mp3',
    'https://www.myinstants.com/media/sounds/perfect-street-fighter-sound-effect.mp3',
    'https://www.myinstants.com/media/sounds/tiger-uppercut-sagat.mp3',
    // 'https://www.myinstants.com/media/sounds/groan-tube-1_kdDdtlv.mp3',
    // 'https://www.myinstants.com/media/sounds/groan-tube-2_xK05nvu.mp3',
    'https://www.myinstants.com/media/sounds/hitmarker_1.mp3',
    'https://www.myinstants.com/media/sounds/hit-marker.mp3',
    'https://www.myinstants.com/media/sounds/take-off_2YqCEjc.mp3',
    'https://www.myinstants.com/media/sounds/man-screaming-aaaah.mp3'
  ];

  // Mute state
  let isMuted = false;

  // Function to play random sound
  function playRandomSound() {
    if (isMuted) return; // Don't play if muted
    
    const randomIndex = Math.floor(Math.random() * soundEffects.length);
    const audio = new Audio(soundEffects[randomIndex]);
    audio.volume = 0.5; // Set volume to 50%
    audio.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
  }

  // Global click handler for the entire page
  function handlePageClick() {
    playRandomSound();
  }

  // Toggle mute function
  function toggleMute() {
    isMuted = !isMuted;
  }

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
            const imagePath = `https://raw.githubusercontent.com/jaxnalia/schizodio-brother-maker/721b1710b5108ad67c2ab794622598f45ddc80e1/schizodio-master/app/static/layers/${group}/${exactFilename}`;
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
    
    // Use hardcoded options for both local and production - based on actual filenames
    const fallbackOptions: Record<string, string[]> = {
      'Background': ['A_Roads', 'Akademia_Italia', 'Alotments', 'Atms_&_Ktms', 'Bajan_Bando', 'Bajan_Cliff_View', 'Bajan_Safehouse', 'Bajan_VIlla', 'Big_pharma', 'Bitcoin_Broly', 'Black_Pool', 'Blue_Cryptonite', 'Blue_Eyes_Thunder_Dragon_', 'Bonus_stage', 'Cell_Games', 'China_', 'China_Courtyard', 'Chongqing', 'Chongqing_磁器口古镇_', 'Chuppa_pillz', 'Cloud_Nine', 'CountrySide_1', 'CountrySide_2', 'County_Line', 'Cour_d\'honneur', 'Danube_River', 'DMT', 'Dubai_Desert', 'Dubai_Desert_2', 'Duck_hunt', 'Fenty_Bando', 'Fisherman\'s_Bastion', 'Five_joints', 'Furīza_no_Uchūsen', 'Hadoken_波動拳', 'Honest_werk', 'Hong_Kong', 'Hongya_Cave_洪崖洞', 'Hyperbolic_Timechamber', 'Jiggas_in_paris', 'Jumeirah_Beach_Residence', 'Kong_Island', 'Light_&_Mist', 'Magyar_Állami_Operaház', 'Marina_Skyline', 'Marky_b', 'Mega_Drive', 'Money_Shot', 'Museum_of_the_Future', 'Nacht_der_Untoten', 'Nacht_der_Untoten_2', 'Nity_Ave', 'NYCafé', 'Open_Sea', 'Open_Sea_2', 'Palm_Jumeirah', 'Paradise_1', 'Paradise_2', 'Paradise_3', 'Paradise_4', 'Paradise_5', 'Paradise_6', 'Pepe_Pillz', 'Phantom', 'Pick\'n_Mix', 'Pink_Champagne', 'Planet_Kai', 'Raffles_City', 'Rekt_Bardock', 'Richard_Haynes_Boardwalk', 'Schizo_Yoshi_Kart', 'Shang_Tsung\'s_Palace', 'Sleepy_Hollow', 'SNES_Cartridge', 'Star_Dawg', 'Széchenyi_Lánchíd', 'Tesla_Pillz', 'The_Canal', 'The_endz', 'The_Endz_2', 'The_Marina', 'The_Office_SZN1', 'The_Office_SZN2', 'The_Peak', 'The_Pit', 'Touch_grass', 'UPS_pillz', 'White_Widow', 'Yangtze_River'],
      'Body': ['Boy_Who_Cried_Wolf', 'Brother', 'Gora', 'Greeny', 'Lobster_Pink', 'Purple_Urkle', 'Schizo_Blue', 'Snowflake', 'Stone_Cyborg'],
      'Clothing': ['ADHD_Tshirt', 'Agbada_Tshirt', 'Apestar_Jacket', 'Argent_Tshirt', 'Autism_Jumper', 'Baby_Schizo_Pink_Tshirt', 'Baby_Schizo_White_Tshirt', 'Backwoods_Hoodie', 'Bitchari_T_shirt', 'Black_Jacket', 'Blue_Puffer', 'Bob_Sponge_Tshirt', 'Chaatgpt_Tshirt', 'Ekubo_Tshirt', 'ETHLend_Tshirt', 'Faguar_Tshirt', 'Flintstones_Tshirt', 'Get_Money_Tshirt', 'Gods_Strongest_Schizo', 'Gold_Skull_Shirt', 'Golden_Boy_Tracksuit', 'Goochi_Track_Jacket', 'Guru_Suit', 'I_Am_Carrying_Tshirt', 'I_Have_A_Weapon', 'Im_with_Schizodio_Tshirt', 'Israeli_Coin_Tshirt', 'Krusty_Tshirt', 'Kurta_Jeet', 'Life_is_Soup_Tshirt', 'Love_Nigeria_Tshirt', 'Luv_Cobie_Tshirt', 'Mushroom_Jacket', 'Mushroomon_Jacket', 'Okay_Now_Tshirt', 'Paradex_Tshirt', 'Peaky_Blind_Tshirt', 'Pink_Puffer', 'Polymarket_Tshirt', 'Puff_Tshirt', 'Purple_Aki_Tshirt_', 'Purple_Tuxedo', 'Relax_Vest', 'Remilia_Jacket', 'Saiyan_Suit', 'Scared_of_Women', 'Schizario_Tshirt', 'Schizoberry_Tshirt', 'Schizodio_Company_Blue_Tshirt', 'Schizodio_Company_Brown_Tshirt', 'Schizo_Duck_Tshirt', 'Schizo_Game_Tshirt', 'Schizo_Hut_Tshirt', 'Schizo_Network_Tshirt', 'Schizo_Red_Tshirt', 'Schizo_Tunez_Tshirt', 'School_Uniform', 'SLM_Tshirt', 'Spider_Tshirt', 'Squid_Jacket', 'Starknet_Tshirt', 'StarkWare_Alf_Tshirt', 'Stoney_Puffer', 'Stop_Being_Poor_Vest', 'Strapped_Schizo_Tshirt', 'Tamil_Tiger_Tshirt', 'They_Tshirt', 'Turkey_Camo_Tshirt', 'Turkey_Track_Jacket', 'Turquoise_Tuxedo', 'Tuxedo', 'Venom_Suit', 'Xverse_Tshirt', 'Zero_Tshirt'],
      'Hair': ['Black_Jellycut', 'Black_Pompadour', 'Blondie_Brown_Pompadour', 'Blue_Sherbert_Fringe_Flow', 'Brown_Curtain_Bob', 'Brown_Fringe_Flow', 'Cyan_Blue_Pompadour', 'Dark_Green_Jelly_Cut', 'Dark_Red_Fringe_Flow', 'Fringe_Cyan', 'Fringe_Pink', 'Fringe_White', 'Ginger_Curtain_Bob', 'Green_Fringe_Flow', 'Green_Jellycut', 'Light_Blonde_Pompadour', 'Milady_Black', 'Milady_Dark_Blue', 'Milady_Green', 'Milady_Red', 'Purple_Curtain_Bob', 'Purple_Pompadour', 'Quan_Orange', 'Quan_Pink', 'Quan_Red_Black', 'Rainbow_Curtain_Bob', 'Rainbow_Sherbet_Fringe_Flow', 'Red_Jellycut', 'Remilio_Madoka', 'Remilio_Madoka_Red', 'White_Jellycut', 'Yellowy_Orange_Curtain_Bob'],
      'Eyebrows': ['Black_Notched_Slits', 'Black_Slits', 'Blue_Notched_Slit', 'Cyan_Camo', 'Funky', 'Purple_Camo', 'Purple_Slits', 'Red_Eyebrows_', 'Sad', 'Schizodio_Blue', 'Standard', 'Standard_2', 'Tinted_Green_Notched_Slit'],
      'Eyes': ['Blood_Shot', 'Confusion', 'Crying_', 'Dead', 'Dead_Splash', 'Ekubo_Bionic_Eyes', 'Fire_Devil', 'Four_Spots', 'Green_Pilled', 'Hazelnut', 'Kano\'s_Bionic_Eyes', 'Milady_Blue', 'Milady_Green', 'Milady_Schizo_Tattoo', 'Purple_Urkle', 'Remilio_Light_Green', 'Reptilian_Red', 'Schizo_Green', 'Schizo_Light_Blue', 'Schizo_OG_White', 'Schizo_Purple', 'Schizo_Red', 'Schizo_Tattoo_Eyes', 'Schizo_Yellow', 'Stoned_Red', 'Whirlpool'],
      'Eyewear': ['No_Eyewear', 'Safety_Glasses_Blue', 'Safety_Glasses_Green', 'Safety_Glasses_Orange', 'Safety_Glasses_Pink', 'Safety_Glasses_Purple', 'Schizo_Scouter'],
      'Mouth': ['Happy', 'Neutral', 'Open', 'Rectangle', 'Smiley', 'Squiggle', 'Squiggly', 'Squiggly_Blue', 'Symbiote', 'U', 'U_Blue', 'V', 'V_Blue', 'W', 'W_Red'],
      'Headwear': ['90s_Trapstar', 'Birka_Red', 'Clown_Headwarmer', 'Ekubo_Cap', 'Espeon_Beaniee', 'ETH_HODL_Cap', 'Fedora_Hat', 'Frieza_Helmet', 'Frogsplash_Winterhat', 'Frog_Hat', 'Fwog_Hybrid_Hat', 'Gengar_Winterhat', 'Halo', 'HEX_Cap', 'HODL_Btc_Cap', 'IKEA_Bucket_Hat', 'Jamaican_Clown_Headwarmer', 'Jesus_Cross_Cap', 'MSGA_Cap', 'Monster_Ink_Bucket_Hat', 'Nigerian_Clown_Headwarmer', 'No_Headwear', 'Oasis_Cap', 'Pepe_Indian_Russian_Hat', 'Pika_Hat', 'Polymarket_Cap', 'Rainbow_Squid_Hat', 'Remilia_Black_Cap', 'Remilia_Cap', 'Remilia_Greeny_Gold_Cap', 'Ronnie_Beanie', 'Schizodio_Bucket_Hat', 'Schizodio_Headband_', 'Slink_Cap', 'Sonic_Beanie', 'Starknet_Pirate_Hat', 'Strawberry_Winterhat', 'Stwo_Cap', 'Tinchu_Hat', 'Toy_Alien_Cap', 'Turban', 'Uganda_Schizo_Cap', 'Umbreon_Beanie_', 'Wif_Beanie', 'Xverse_Cap'],
      'Mask': ['Cyborg_Hypio', 'No_Mask', 'Schizodio_OG_Mask'],
      'Accessories': ['Backwoods_Blunt', 'God_Candle', 'Grime_Reaper_Candle', 'Honey_Comb_Blunt', 'Memory_Card_Chain', 'No_Accessories', 'Pixelated_Ciggy', 'Shotgun_Shell_Chain'],
      'Weapons': ['Ak47_Pixel_Green', 'Avnu_Machete', 'Blades_Sword', 'Braavos_Shield', 'Duck_Hunt_Gun', 'Hyperlane_Bazooka', 'Light_Sabre', 'Man_Hunt_Bat', 'Man_Hunt_Chainsaw', 'Man_Hunt_Spade', 'Nigerian_Gun', 'No_Weapons', 'Paradex_Axe', 'Purps_Hammer', 'Red_Hammer', 'Schizo_Unicorn_Blaster', 'Soul_Sword', 'Soul_Sword_2', 'Spamco_Arcade_Gun', 'Sushi_Shooter', 'Sword', 'Syrup_Bat', 'Turkish_Shooter', 'Why_Serious_Shooter'],
      'Sidekick': ['Alf', 'Arnesh', 'Baboon', 'Bernard', 'Billy_no_Mates', 'Black_Kangal', 'Blanka', 'Blobby', 'Chiliz', 'Copium_Linctus_Pro', 'Cow', 'Dancing_Triangle', 'Devil', 'Dexter', 'Doll', 'D_Balls', 'Dragon', 'Eddie', 'Eli_Owl', 'Evil_Alf', 'Grim_Reaper', 'Hey_Mamma', 'Kazuya', 'Kekec', 'Kevin_Perry', 'Kevin_Perry_2', 'Laughing', 'Lean_Harry', 'Mojo', 'Monkey_Bomb', 'Ogb', 'PERCY', 'Pinky', 'Ponziland', 'Purple_Aki', 'Randall', 'Schizo_Barney', 'Schizo_Barney_2', 'Sifu', 'Slinky', 'Sol_Snatcher', 'Toasty', 'Tuff_Times', 'Weasel', 'yasin_sidekick_'],
      'Overlays': ['Abdel_Called_Me', 'Alexa_Hears', 'Bastard_Guy', 'Black_Panther_Tamil_Tiger', 'Downstairs_Upstairs', 'Duck_Hunt_Cartridge', 'Eating_The_Pets', 'Hai_Hai', 'Happy_Schizo_Pack', 'iSupport', 'Is_My_Bitch', 'It\'s_Not_Illegal', 'I_Believed_in_Something', 'I_is_Carrying', 'I_Just_Got_Skemmed', 'I_Never_Rugged', 'Milady_Munchies', 'Nigerian_Gun_Fingers', 'No_Overlay', 'North_Korean_Dev', 'Punk_Ass_Schizo', 'Schizo_Cali_Pack', 'Schizo_Headshot', 'Schizo_Master_Ball', 'Schizo_Mylar_Pack', 'Sherbinski', 'There_is_a_Meme', 'This_My_Jigga', 'Turkey_Twizzlers', 'Turkish_Barber', 'Why_So_Serious', 'Winmeth', 'WMT', 'Your_Soul_is_Mine', 'You_Will_Never_Find_Me', 'Zabubu_Pack']
    };
    
    const options = fallbackOptions[group] || [];
    console.log(`Options for ${group}:`, options);
    return options;
  }



  // Get the exact filename for an option
  async function getExactFilename(group: string, option: string): Promise<string> {
    console.log(`getExactFilename called for ${group}/${option}`);
    
    // Use the exact filenames from the repository
    const exactFilenames: Record<string, Record<string, string>> = {
      'Background': {
        'A_Roads': 'A_Roads20.png',
        'Akademia_Italia': 'Akademia_Italia20.png',
        'Alotments': 'Alotments20.png',
        'Atms_&_Ktms': 'Atms_&_Ktms20.png',
        'Bajan_Bando': 'Bajan_Bando20.png',
        'Bajan_Cliff_View': 'Bajan_Cliff_View20.png',
        'Bajan_Safehouse': 'Bajan_Safehouse20.png',
        'Bajan_VIlla': 'Bajan_VIlla20.png',
        'Big_pharma': 'Big_pharma20.png',
        'Bitcoin_Broly': 'Bitcoin_Broly20.png',
        'Black_Pool': 'Black_Pool20.png',
        'Blue_Cryptonite': 'Blue_Cryptonite20.png',
        'Blue_Eyes_Thunder_Dragon_': 'Blue_Eyes_Thunder_Dragon_20.png',
        'Bonus_stage': 'Bonus_stage20.png',
        'Cell_Games': 'Cell_Games20.png',
        'China_': 'China_20.png',
        'China_Courtyard': 'China_Courtyard20.png',
        'Chongqing': 'Chongqing20.png',
        'Chongqing_磁器口古镇_': 'Chongqing_磁器口古镇_20.png',
        'Chuppa_pillz': 'Chuppa_pillz20.png',
        'Cloud_Nine': 'Cloud_Nine20.png',
        'CountrySide_1': 'CountrySide_120.png',
        'CountrySide_2': 'CountrySide_220.png',
        'County_Line': 'County_Line20.png',
        'Cour_d\'honneur': 'Cour_d\'honneur20.png',
        'Danube_River': 'Danube_River20.png',
        'DMT': 'DMT20.png',
        'Dubai_Desert': 'Dubai_Desert20.png',
        'Dubai_Desert_2': 'Dubai_Desert_220.png',
        'Duck_hunt': 'Duck_hunt20.png',
        'Fenty_Bando': 'Fenty_Bando20.png',
        'Fisherman\'s_Bastion': 'Fisherman\'s_Bastion20.png',
        'Five_joints': 'Five_joints20.png',
        'Furīza_no_Uchūsen': 'Furīza_no_Uchūsen20.png',
        'Hadoken_波動拳': 'Hadoken_波動拳20.png',
        'Honest_werk': 'Honest_werk20.png',
        'Hong_Kong': 'Hong_Kong20.png',
        'Hongya_Cave_洪崖洞': 'Hongya_Cave_洪崖洞20.png',
        'Hyperbolic_Timechamber': 'Hyperbolic_Timechamber20.png',
        'Jiggas_in_paris': 'Jiggas_in_paris20.png',
        'Jumeirah_Beach_Residence': 'Jumeirah_Beach_Residence20.png',
        'Kong_Island': 'Kong_Island20.png',
        'Light_&_Mist': 'Light_&_Mist20.png',
        'Magyar_Állami_Operaház': 'Magyar_Állami_Operaház20.png',
        'Marina_Skyline': 'Marina_Skyline20.png',
        'Marky_b': 'Marky_b20.png',
        'Mega_Drive': 'Mega_Drive20.png',
        'Money_Shot': 'Money_Shot20.png',
        'Museum_of_the_Future': 'Museum_of_the_Future20.png',
        'Nacht_der_Untoten': 'Nacht_der_Untoten20.png',
        'Nacht_der_Untoten_2': 'Nacht_der_Untoten_220.png',
        'Nity_Ave': 'Nity_Ave20.png',
        'NYCafé': 'NYCafé20.png',
        'Open_Sea': 'Open_Sea20.png',
        'Open_Sea_2': 'Open_Sea_220.png',
        'Palm_Jumeirah': 'Palm_Jumeirah20.png',
        'Paradise_1': 'Paradise_120.png',
        'Paradise_2': 'Paradise_220.png',
        'Paradise_3': 'Paradise_320.png',
        'Paradise_4': 'Paradise_420.png',
        'Paradise_5': 'Paradise_520.png',
        'Paradise_6': 'Paradise_620.png',
        'Pepe_Pillz': 'Pepe_Pillz20.png',
        'Phantom': 'Phantom20.png',
        'Pick\'n_Mix': 'Pick\'n_Mix20.png',
        'Pink_Champagne': 'Pink_Champagne20.png',
        'Planet_Kai': 'Planet_Kai20.png',
        'Raffles_City': 'Raffles_City20.png',
        'Rekt_Bardock': 'Rekt_Bardock20.png',
        'Richard_Haynes_Boardwalk': 'Richard_Haynes_Boardwalk20.png',
        'Schizo_Yoshi_Kart': 'Schizo_Yoshi_Kart20.png',
        'Shang_Tsung\'s_Palace': 'Shang_Tsung\'s_Palace20.png',
        'Sleepy_Hollow': 'Sleepy_Hollow20.png',
        'SNES_Cartridge': 'SNES_Cartridge20.png',
        'Star_Dawg': 'Star_Dawg20.png',
        'Széchenyi_Lánchíd': 'Széchenyi_Lánchíd20.png',
        'Tesla_Pillz': 'Tesla_Pillz20.png',
        'The_Canal': 'The_Canal20.png',
        'The_endz': 'The_endz20.png',
        'The_Endz_2': 'The_Endz_220.png',
        'The_Marina': 'The_Marina20.png',
        'The_Office_SZN1': 'The_Office_SZN120.png',
        'The_Office_SZN2': 'The_Office_SZN220.png',
        'The_Peak': 'The_Peak20.png',
        'The_Pit': 'The_Pit20.png',
        'Touch_grass': 'Touch_grass20.png',
        'UPS_pillz': 'UPS_pillz20.png',
        'White_Widow': 'White_Widow20.png',
        'Yangtze_River': 'Yangtze_River20.png'
      },
      'Body': {
        'Boy_Who_Cried_Wolf': 'Boy_Who_Cried_Wolf5.png',
        'Brother': 'Brother20.png',
        'Gora': 'Gora20.png',
        'Greeny': 'Greeny20.png',
        'Lobster_Pink': 'Lobster_Pink20.png',
        'Purple_Urkle': 'Purple_Urkle20.png',
        'Schizo_Blue': 'Schizo_Blue20.png',
        // 'Schizo_Panda': 'Schizo_Panda2.png',
        'Snowflake': 'Snowflake20.png',
        'Stone_Cyborg': 'Stone_Cyborg20.png'
      },
      'Clothing': {
        'ADHD_Tshirt': 'ADHD_Tshirt20.png',
        'Agbada_Tshirt': 'Agbada_Tshirt20.png',
        'Apestar_Jacket': 'Apestar_Jacket20.png',
        'Argent_Tshirt': 'Argent_Tshirt15.png',
        'Autism_Jumper': 'Autism_Jumper20.png',
        'Baby_Schizo_Pink_Tshirt': 'Baby_Schizo_Pink_Tshirt20.png',
        'Baby_Schizo_White_Tshirt': 'Baby_Schizo_White_Tshirt20.png',
        'Backwoods_Hoodie': 'Backwoods_Hoodie20.png',
        'Bitchari_T_shirt': 'Bitchari_T_shirt20.png',
        'Black_Jacket': 'Black_Jacket20.png',
        'Blue_Puffer': 'Blue_Puffer20.png',
        'Bob_Sponge_Tshirt': 'Bob_Sponge_Tshirt20.png',
        'Chaatgpt_Tshirt': 'Chaatgpt_Tshirt20.png',
        'Ekubo_Tshirt': 'Ekubo_Tshirt5.png',
        'ETHLend_Tshirt': 'ETHLend_Tshirt5.png',
        'Faguar_Tshirt': 'Faguar_Tshirt20.png',
        'Flintstones_Tshirt': 'Flintstones_Tshirt20.png',
        'Get_Money_Tshirt': 'Get_Money_Tshirt20.png',
        'Gods_Strongest_Schizo': 'Gods_Strongest_Schizo20.png',
        'Gold_Skull_Shirt': 'Gold_Skull_Shirt20.png',
        'Golden_Boy_Tracksuit': 'Golden_Boy_Tracksuit20.png',
        'Goochi_Track_Jacket': 'Goochi_Track_Jacket20.png',
        'Guru_Suit': 'Guru_Suit20.png',
        'I_Am_Carrying_Tshirt': 'I_Am_Carrying_Tshirt20.png',
        'I_Have_A_Weapon': 'I_Have_A_Weapon20.png',
        'Im_with_Schizodio_Tshirt': 'Im_with_Schizodio_Tshirt20.png',
        'Israeli_Coin_Tshirt': 'Israeli_Coin_Tshirt20.png',
        'Krusty_Tshirt': 'Krusty_Tshirt20.png',
        'Kurta_Jeet': 'Kurta_Jeet20.png',
        'Life_is_Soup_Tshirt': 'Life_is_Soup_Tshirt20.png',
        'Love_Nigeria_Tshirt': 'Love_Nigeria_Tshirt20.png',
        'Luv_Cobie_Tshirt': 'Luv_Cobie_Tshirt20.png',
        'Mushroom_Jacket': 'Mushroom_Jacket20.png',
        'Mushroomon_Jacket': 'Mushroomon_Jacket20.png',
        'Okay_Now_Tshirt': 'Okay_Now_Tshirt20.png',
        'Paradex_Tshirt': 'Paradex_Tshirt15.png',
        'Peaky_Blind_Tshirt': 'Peaky_Blind_Tshirt20.png',
        'Pink_Puffer': 'Pink_Puffer20.png',
        'Polymarket_Tshirt': 'Polymarket_Tshirt20.png',
        'Puff_Tshirt': 'Puff_Tshirt20.png',
        'Purple_Aki_Tshirt_': 'Purple_Aki_Tshirt_20.png',
        'Purple_Tuxedo': 'Purple_Tuxedo20.png',
        'Relax_Vest': 'Relax_Vest20.png',
        'Remilia_Jacket': 'Remilia_Jacket20.png',
        'Saiyan_Suit': 'Saiyan_Suit2.png',
        'Scared_of_Women': 'Scared_of_Women20.png',
        'Schizario_Tshirt': 'Schizario_Tshirt20.png',
        'Schizoberry_Tshirt': 'Schizoberry_Tshirt20.png',
        'Schizodio_Company_Blue_Tshirt': 'Schizodio_Company_Blue_Tshirt20.png',
        'Schizodio_Company_Brown_Tshirt': 'Schizodio_Company_Brown_Tshirt20.png',
        'Schizo_Duck_Tshirt': 'Schizo_Duck_Tshirt20.png',
        'Schizo_Game_Tshirt': 'Schizo_Game_Tshirt20.png',
        'Schizo_Hut_Tshirt': 'Schizo_Hut_Tshirt20.png',
        'Schizo_Network_Tshirt': 'Schizo_Network_Tshirt20.png',
        'Schizo_Red_Tshirt': 'Schizo_Red_Tshirt20.png',
        'Schizo_Tunez_Tshirt': 'Schizo_Tunez_Tshirt20.png',
        'School_Uniform': 'School_Uniform20.png',
        'SLM_Tshirt': 'SLM_Tshirt20.png',
        'Spider_Tshirt': 'Spider_Tshirt20.png',
        'Squid_Jacket': 'Squid_Jacket2.png',
        'Starknet_Tshirt': 'Starknet_Tshirt20.png',
        'StarkWare_Alf_Tshirt': 'StarkWare_Alf_Tshirt20.png',
        'Stoney_Puffer': 'Stoney_Puffer20.png',
        'Stop_Being_Poor_Vest': 'Stop_Being_Poor_Vest20.png',
        'Strapped_Schizo_Tshirt': 'Strapped_Schizo_Tshirt20.png',
        'Tamil_Tiger_Tshirt': 'Tamil_Tiger_Tshirt20.png',
        'They_Tshirt': 'They_Tshirt20.png',
        'Turkey_Camo_Tshirt': 'Turkey_Camo_Tshirt20.png',
        'Turkey_Track_Jacket': 'Turkey_Track_Jacket20.png',
        'Turquoise_Tuxedo': 'Turquoise_Tuxedo20.png',
        'Tuxedo': 'Tuxedo20.png',
        'Venom_Suit': 'Venom_Suit20.png',
        'Xverse_Tshirt': 'Xverse_Tshirt20.png',
        'Zero_Tshirt': 'Zero_Tshirt20.png'
      },
      'Hair': {
        'Black_Jellycut': 'Black_Jellycut20.png',
        'Black_Pompadour': 'Black_Pompadour20.png',
        'Blondie_Brown_Pompadour': 'Blondie_Brown_Pompadour20.png',
        'Blue_Sherbert_Fringe_Flow': 'Blue_Sherbert_Fringe_Flow20.png',
        'Brown_Curtain_Bob': 'Brown_Curtain_Bob20.png',
        'Brown_Fringe_Flow': 'Brown_Fringe_Flow20.png',
        'Cyan_Blue_Pompadour': 'Cyan_Blue_Pompadour20.png',
        'Dark_Green_Jelly_Cut': 'Dark_Green_Jelly_Cut20.png',
        'Dark_Red_Fringe_Flow': 'Dark_Red_Fringe_Flow20.png',
        'Fringe_Cyan': 'Fringe_Cyan20.png',
        'Fringe_Pink': 'Fringe_Pink20.png',
        'Fringe_White': 'Fringe_White20.png',
        'Ginger_Curtain_Bob': 'Ginger_Curtain_Bob20.png',
        'Green_Fringe_Flow': 'Green_Fringe_Flow20.png',
        'Green_Jellycut': 'Green_Jellycut20.png',
        'Light_Blonde_Pompadour': 'Light_Blonde_Pompadour20.png',
        'Milady_Black': 'Milady_Black20.png',
        'Milady_Dark_Blue': 'Milady_Dark_Blue20.png',
        'Milady_Green': 'Milady_Green20.png',
        'Milady_Red': 'Milady_Red20.png',
        'Purple_Curtain_Bob': 'Purple_Curtain_Bob20.png',
        'Purple_Pompadour': 'Purple_Pompadour20.png',
        'Quan_Orange': 'Quan_Orange20.png',
        'Quan_Pink': 'Quan_Pink20.png',
        'Quan_Red_Black': 'Quan_Red_Black20.png',
        'Rainbow_Curtain_Bob': 'Rainbow_Curtain_Bob20.png',
        'Rainbow_Sherbet_Fringe_Flow': 'Rainbow_Sherbet_Fringe_Flow20.png',
        'Red_Jellycut': 'Red_Jellycut20.png',
        'Remilio_Madoka': 'Remilio_Madoka20.png',
        'Remilio_Madoka_Red': 'Remilio_Madoka_Red20.png',
        'White_Jellycut': 'White_Jellycut20.png',
        'Yellowy_Orange_Curtain_Bob': 'Yellowy_Orange_Curtain_Bob20.png'
      },
      'Eyebrows': {
        'Black_Notched_Slits': 'Black_Notched_Slits20.png',
        'Black_Slits': 'Black_Slits20.png',
        'Blue_Notched_Slit': 'Blue_Notched_Slit20.png',
        'Cyan_Camo': 'Cyan_Camo20.png',
        'Funky': 'Funky20.png',
        'Purple_Camo': 'Purple_Camo20.png',
        'Purple_Slits': 'Purple_Slits20.png',
        'Red_Eyebrows_': 'Red_Eyebrows_20.png',
        'Sad': 'Sad20.png',
        'Schizodio_Blue': 'Schizodio_Blue20.png',
        'Standard': 'Standard20.png',
        'Standard_2': 'Standard_220.png',
        'Tinted_Green_Notched_Slit': 'Tinted_Green_Notched_Slit20.png'
      },
      'Eyes': {
        'Blood_Shot': 'Blood_Shot25.png',
        'Confusion': 'Confusion20.png',
        'Crying_': 'Crying_20.png',
        'Dead': 'Dead20.png',
        'Dead_Splash': 'Dead_Splash20.png',
        'Ekubo_Bionic_Eyes': 'Ekubo_Bionic_Eyes15.png',
        'Fire_Devil': 'Fire_Devil20.png',
        'Four_Spots': 'Four_Spots20.png',
        'Green_Pilled': 'Green_Pilled20.png',
        'Hazelnut': 'Hazelnut20.png',
        'Kano\'s_Bionic_Eyes': 'Kano\'s_Bionic_Eyes15.png',
        'Milady_Blue': 'Milady_Blue20.png',
        'Milady_Green': 'Milady_Green20.png',
        'Milady_Schizo_Tattoo': 'Milady_Schizo_Tattoo20.png',
        'Purple_Urkle': 'Purple_Urkle20.png',
        'Remilio_Light_Green': 'Remilio_Light_Green20.png',
        'Reptilian_Red': 'Reptilian_Red20.png',
        'Schizo_Green': 'Schizo_Green20.png',
        'Schizo_Light_Blue': 'Schizo_Light_Blue20.png',
        'Schizo_OG_White': 'Schizo_OG_White20.png',
        'Schizo_Purple': 'Schizo_Purple20.png',
        'Schizo_Red': 'Schizo_Red20.png',
        'Schizo_Tattoo_Eyes': 'Schizo_Tattoo_Eyes20.png',
        'Schizo_Yellow': 'Schizo_Yellow20.png',
        'Stoned_Red': 'Stoned_Red20.png',
        'Whirlpool': 'Whirlpool20.png'
      },
      'Eyewear': {
        'No_Eyewear': 'No_Eyewear850.png',
        'Safety_Glasses_Blue': 'Safety_Glasses_Blue3.png',
        'Safety_Glasses_Green': 'Safety_Glasses_Green3.png',
        'Safety_Glasses_Orange': 'Safety_Glasses_Orange3.png',
        'Safety_Glasses_Pink': 'Safety_Glasses_Pink3.png',
        'Safety_Glasses_Purple': 'Safety_Glasses_Purple3.png',
        'Schizo_Scouter': 'Schizo_Scouter8.png'
      },
      'Mouth': {
        'Happy': 'Happy30.png',
        'Neutral': 'Neutral30.png',
        'Open': 'Open25.png',
        'Rectangle': 'Rectangle20.png',
        'Smiley': 'Smiley25.png',
        'Squiggle': 'Squiggle20.png',
        'Squiggly': 'Squiggly20.png',
        'Squiggly_Blue': 'Squiggly_Blue15.png',
        'Symbiote': 'Symbiote5.png',
        'U': 'U15.png',
        'U_Blue': 'U_Blue10.png',
        'V': 'V15.png',
        'V_Blue': 'V_Blue10.png',
        'W': 'W15.png',
        'W_Red': 'W_Red10.png'
      },
      'Headwear': {
        '90s_Trapstar': '90s_Trapstar5.png',
        'Birka_Red': 'Birka_Red3.png',
        'Clown_Headwarmer': 'Clown_Headwarmer3.png',
        'Ekubo_Cap': 'Ekubo_Cap3.png',
        'Espeon_Beaniee': 'Espeon_Beaniee3.png',
        'ETH_HODL_Cap': 'ETH_HODL_Cap3.png',
        'Fedora_Hat': 'Fedora_Hat3.png',
        'Frieza_Helmet': 'Frieza_Helmet8.png',
        'Frogsplash_Winterhat': 'Frogsplash_Winterhat5.png',
        'Frog_Hat': 'Frog_Hat3.png',
        'Fwog_Hybrid_Hat': 'Fwog_Hybrid_Hat3.png',
        'Gengar_Winterhat': 'Gengar_Winterhat8.png',
        'Halo': 'Halo3.png',
        'HEX_Cap': 'HEX_Cap8.png',
        'HODL_Btc_Cap': 'HODL_Btc_Cap3.png',
        'IKEA_Bucket_Hat': 'IKEA_Bucket_Hat3.png',
        'Jamaican_Clown_Headwarmer': 'Jamaican_Clown_Headwarmer3.png',
        'Jesus_Cross_Cap': 'Jesus_Cross_Cap3.png',
        'MSGA_Cap': 'MSGA_Cap3.png',
        'Monster_Ink_Bucket_Hat': 'Monster_Ink_Bucket_Hat3.png',
        'Nigerian_Clown_Headwarmer': 'Nigerian_Clown_Headwarmer3.png',
        'No_Headwear': 'No_Headwear700.png',
        'Oasis_Cap': 'Oasis_Cap3.png',
        'Pepe_Indian_Russian_Hat': 'Pepe_Indian_Russian_Hat3.png',
        'Pika_Hat': 'Pika_Hat3.png',
        'Polymarket_Cap': 'Polymarket_Cap3.png',
        'Rainbow_Squid_Hat': 'Rainbow_Squid_Hat3.png',
        'Remilia_Black_Cap': 'Remilia_Black_Cap3.png',
        'Remilia_Cap': 'Remilia_Cap3.png',
        'Remilia_Greeny_Gold_Cap': 'Remilia_Greeny_Gold_Cap3.png',
        'Ronnie_Beanie': 'Ronnie_Beanie8.png',
        'Schizodio_Bucket_Hat': 'Schizodio_Bucket_Hat3.png',
        'Schizodio_Headband_': 'Schizodio_Headband_3.png',
        'Slink_Cap': 'Slink_Cap3.png',
        'Sonic_Beanie': 'Sonic_Beanie3.png',
        'Starknet_Pirate_Hat': 'Starknet_Pirate_Hat3.png',
        'Strawberry_Winterhat': 'Strawberry_Winterhat5.png',
        'Stwo_Cap': 'Stwo_Cap3.png',
        'Tinchu_Hat': 'Tinchu_Hat3.png',
        'Toy_Alien_Cap': 'Toy_Alien_Cap3.png',
        'Turban': 'Turban3.png',
        'Uganda_Schizo_Cap': 'Uganda_Schizo_Cap3.png',
        'Umbreon_Beanie_': 'Umbreon_Beanie_3.png',
        'Wif_Beanie': 'Wif_Beanie3.png',
        'Xverse_Cap': 'Xverse_Cap3.png'
      },
      'Mask': {
        'Cyborg_Hypio': 'Cyborg_Hypio24.png',
        'No_Mask': 'No_Mask850.png',
        'Schizodio_OG_Mask': 'Schizodio_OG_Mask26.png'
      },
      'Accessories': {
        'Backwoods_Blunt': 'Backwoods_Blunt10.png',
        'God_Candle': 'God_Candle25.png',
        'Grime_Reaper_Candle': 'Grime_Reaper_Candle25.png',
        'Honey_Comb_Blunt': 'Honey_Comb_Blunt10.png',
        'Memory_Card_Chain': 'Memory_Card_Chain10.png',
        'No_Accessories': 'No_Accessories1900.png',
        'Pixelated_Ciggy': 'Pixelated_Ciggy10.png',
        'Shotgun_Shell_Chain': 'Shotgun_Shell_Chain10.png'
      },
      'Weapons': {
        'Ak47_Pixel_Green': 'Ak47_Pixel_Green3.png',
        'Avnu_Machete': 'Avnu_Machete5.png',
        'Blades_Sword': 'Blades_Sword3.png',
        'Braavos_Shield': 'Braavos_Shield5.png',
        'Duck_Hunt_Gun': 'Duck_Hunt_Gun3.png',
        'Hyperlane_Bazooka': 'Hyperlane_Bazooka5.png',
        'Light_Sabre': 'Light_Sabre3.png',
        'Man_Hunt_Bat': 'Man_Hunt_Bat3.png',
        'Man_Hunt_Chainsaw': 'Man_Hunt_Chainsaw3.png',
        'Man_Hunt_Spade': 'Man_Hunt_Spade3.png',
        'Nigerian_Gun': 'Nigerian_Gun3.png',
        'No_Weapons': 'No_Weapons700.png',
        'Paradex_Axe': 'Paradex_Axe5.png',
        'Purps_Hammer': 'Purps_Hammer3.png',
        'Red_Hammer': 'Red_Hammer3.png',
        'Schizo_Unicorn_Blaster': 'Schizo_Unicorn_Blaster3.png',
        'Soul_Sword': 'Soul_Sword3.png',
        'Soul_Sword_2': 'Soul_Sword_23.png',
        'Spamco_Arcade_Gun': 'Spamco_Arcade_Gun3.png',
        'Sushi_Shooter': 'Sushi_Shooter3.png',
        'Sword': 'Sword3.png',
        'Syrup_Bat': 'Syrup_Bat8.png',
        'Turkish_Shooter': 'Turkish_Shooter3.png',
        'Why_Serious_Shooter': 'Why_Serious_Shooter3.png'
      },
      'Sidekick': {
        'Alf': 'Alf15.png',
        'Arnesh': 'Arnesh15.png',
        'Baboon': 'Baboon15.png',
        'Bernard': 'Bernard15.png',
        'Billy_no_Mates': 'Billy_no_Mates15.png',
        'Black_Kangal': 'Black_Kangal15.png',
        'Blanka': 'Blanka15.png',
        'Blobby': 'Blobby15.png',
        'Chiliz': 'Chiliz15.png',
        'Copium_Linctus_Pro': 'Copium_Linctus_Pro15.png',
        'Cow': 'Cow15.png',
        'Dancing_Triangle': 'Dancing_Triangle15.png',
        'Devil': 'Devil3.png',
        'Dexter': 'Dexter15.png',
        'Doll': 'Doll15.png',
        'D_Balls': 'D_Balls15.png',
        'Dragon': 'Dragon2.png',
        'Eddie': 'Eddie15.png',
        'Eli_Owl': 'Eli_Owl15.png',
        'Evil_Alf': 'Evil_Alf5.png',
        'Grim_Reaper': 'Grim_Reaper5.png',
        'Hey_Mamma': 'Hey_Mamma15.png',
        'Kazuya': 'Kazuya15.png',
        'Kekec': 'Kekec15.png',
        'Kevin_Perry': 'Kevin_Perry15.png',
        'Kevin_Perry_2': 'Kevin_Perry_215.png',
        'Laughing': 'Laughing15.png',
        'Lean_Harry': 'Lean_Harry15.png',
        'Mojo': 'Mojo15.png',
        'Monkey_Bomb': 'Monkey_Bomb15.png',
        'Ogb': 'Ogb15.png',
        'PERCY': 'PERCY15.png',
        'Pinky': 'Pinky15.png',
        'Ponziland': 'Ponziland15.png',
        'Purple_Aki': 'Purple_Aki15.png',
        'Randall': 'Randall15.png',
        'Schizo_Barney': 'Schizo_Barney8.png',
        'Schizo_Barney_2': 'Schizo_Barney_28.png',
        'Sifu': 'Sifu15.png',
        'Slinky': 'Slinky15.png',
        'Sol_Snatcher': 'Sol_Snatcher15.png',
        'Toasty': 'Toasty15.png',
        'Tuff_Times': 'Tuff_Times15.png',
        'Weasel': 'Weasel15.png',
        'yasin_sidekick_': 'yasin_sidekick_15.png'
      },
      'Overlays': {
        'Abdel_Called_Me': 'Abdel_Called_Me5.png',
        'Alexa_Hears': 'Alexa_Hears3.png',
        'Bastard_Guy': 'Bastard_Guy3.png',
        'Black_Panther_Tamil_Tiger': 'Black_Panther_Tamil_Tiger3.png',
        'Downstairs_Upstairs': 'Downstairs_Upstairs3.png',
        'Duck_Hunt_Cartridge': 'Duck_Hunt_Cartridge3.png',
        'Eating_The_Pets': 'Eating_The_Pets3.png',
        'Hai_Hai': 'Hai_Hai1.png',
        'Happy_Schizo_Pack': 'Happy_Schizo_Pack2.png',
        'iSupport': 'iSupport3.png',
        'Is_My_Bitch': 'Is_My_Bitch3.png',
        'It\'s_Not_Illegal': 'It\'s_Not_Illegal3.png',
        'I_Believed_in_Something': 'I_Believed_in_Something5.png',
        'I_is_Carrying': 'I_is_Carrying5.png',
        'I_Just_Got_Skemmed': 'I_Just_Got_Skemmed2.png',
        'I_Never_Rugged': 'I_Never_Rugged5.png',
        'Milady_Munchies': 'Milady_Munchies3.png',
        'Nigerian_Gun_Fingers': 'Nigerian_Gun_Fingers3.png',
        'No_Overlay': 'No_Overlay700.png',
        'North_Korean_Dev': 'North_Korean_Dev2.png',
        'Punk_Ass_Schizo': 'Punk_Ass_Schizo3.png',
        'Schizo_Cali_Pack': 'Schizo_Cali_Pack2.png',
        'Schizo_Headshot': 'Schizo_Headshot3.png',
        'Schizo_Master_Ball': 'Schizo_Master_Ball1.png',
        'Schizo_Mylar_Pack': 'Schizo_Mylar_Pack3.png',
        'Sherbinski': 'Sherbinski3.png',
        'There_is_a_Meme': 'There_is_a_Meme8.png',
        'This_My_Jigga': 'This_My_Jigga3.png',
        'Turkey_Twizzlers': 'Turkey_Twizzlers3.png',
        'Turkish_Barber': 'Turkish_Barber3.png',
        'Why_So_Serious': 'Why_So_Serious3.png',
        'Winmeth': 'Winmeth1.png',
        'WMT': 'WMT3.png',
        'Your_Soul_is_Mine': 'Your_Soul_is_Mine8.png',
        'You_Will_Never_Find_Me': 'You_Will_Never_Find_Me3.png',
        'Zabubu_Pack': 'Zabubu_Pack3.png'
      }
    };
    
    const filename = exactFilenames[group]?.[option];
    if (filename) {
      console.log(`Using exact filename for ${group}/${option}: ${filename}`);
      return filename;
    } else {
      console.error(`No exact filename found for ${group}/${option}`);
      return `${option}20.png`; // Fallback
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
    
    // Set canvas size for better quality (1024x1024 for high quality, display size handled by CSS)
    if (previewCanvas.width !== 1024 || previewCanvas.height !== 1024) {
      previewCanvas.width = 1024;
      previewCanvas.height = 1024;
    }

    // Create a temporary canvas to build the new image
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 1024;
    tempCanvas.height = 1024;
    const tempCtx = tempCanvas.getContext('2d');
    
    if (!tempCtx) {
      console.log('Could not get temporary canvas context');
      isGenerating = false;
      return;
    }

    // Clear temporary canvas
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

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
        
        const imagePath = `https://raw.githubusercontent.com/jaxnalia/schizodio-brother-maker/721b1710b5108ad67c2ab794622598f45ddc80e1/schizodio-master/app/static/layers/${layerGroup}/${exactFilename}`;
        console.log(`Loading from GitHub: ${imagePath}`);
        
        const image = await loadImage(imagePath);
        return { layerGroup, image };
      } catch (error) {
        console.error(`Error loading image for ${layerGroup}: ${selection}`, error);
        return null;
      }
    });
    
    // Wait for all images to load
    const results = await Promise.all(imagePromises);
    
    // Draw all loaded images on temporary canvas
    console.log('Drawing results:', results.length);
    for (const result of results) {
      if (result && result.image) {
        tempCtx.drawImage(result.image, 0, 0, tempCanvas.width, tempCanvas.height);
        anyImageLoaded = true;
        console.log(`Drew layer: ${result.layerGroup}`);
      } else {
        console.log('Skipped result:', result);
      }
    }
    
    // If no images were loaded, show a placeholder on temporary canvas
    if (!anyImageLoaded) {
      console.log('No images loaded, showing placeholder');
      tempCtx.fillStyle = '#c0c0c0';
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      tempCtx.fillStyle = '#000000';
      tempCtx.font = '20px Arial';
      tempCtx.textAlign = 'center';
      tempCtx.fillText('Brother Baker', tempCanvas.width / 2, tempCanvas.height / 2 - 20);
      tempCtx.fillText('Loading...', tempCanvas.width / 2, tempCanvas.height / 2 + 20);
    }
    
    // Now copy the completed image to the main canvas (only when everything is ready)
    const mainCtx = previewCanvas.getContext('2d');
    if (mainCtx) {
      mainCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
      mainCtx.drawImage(tempCanvas, 0, 0);
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

  async function downloadImage() {
    if (!previewCanvas) return;
    
    // Detect mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Mobile: Save to camera roll/photo gallery
      try {
        // Convert canvas to blob
        const blob = await new Promise<Blob>((resolve, reject) => {
          previewCanvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to create image blob'));
          }, 'image/png');
        });
        
        // Create object URL
        const imageUrl = URL.createObjectURL(blob);
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'schizodio-brother.png';
        
        // For iOS, we need to trigger a long press or use Web Share API if available
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          // iOS: Use Web Share API if available, otherwise fallback to download
          if (navigator.share) {
            try {
              const file = new File([blob], 'schizodio-brother.png', { type: 'image/png' });
              await navigator.share({
                title: 'Schizodio Brother',
                text: 'Check out my Schizodio Brother!',
                files: [file]
              });
            } catch (shareError) {
              console.log('Web Share API failed, falling back to download:', shareError);
              link.click();
            }
          } else {
            // Fallback for iOS without Web Share API
            link.click();
          }
        } else {
          // Android: Use download attribute which should save to gallery
          link.click();
        }
        
        // Clean up object URL
        setTimeout(() => URL.revokeObjectURL(imageUrl), 1000);
        
      } catch (error) {
        console.error('Error saving image on mobile:', error);
        alert('Failed to save image. Please try again.');
      }
    } else {
      // Desktop: Use traditional download
      const link = document.createElement('a');
      link.download = 'schizodio-brother.png';
      link.href = previewCanvas.toDataURL();
      link.click();
    }
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



<div class="flex flex-col gap-4 m-auto max-w-screen-xl" on:click={handlePageClick}>
    <div class="w-full max-w-screen-xl mx-auto px-4 flex justify-center">
        <img
          src={schizodio_title}
          alt="Schizodio"
          class="w-full h-auto rainbow"
          style="max-width: 500px;"
        />
      </div>
  <Window title="Schizodio Brother Baker 🤡" width="100%" height="auto">
    <div class="flex flex-col lg:flex-row gap-4 ">
      <!-- Preview Section -->
      <div class="flex-1 bg-win95">
        Preview
        <!-- <Window title="Preview" width="100%" height="400px"> -->
          <div class="flex justify-center items-center bg-win95">
            {#if isLoading}
              <div class="text-center">
                <div class="text-lg mb-2">Loading...</div>
                <div class="text-sm text-win95-dark">Preparing the Brother Baker</div>
              </div>
            {:else}
                             <div class="relative">
                                   <canvas 
                    bind:this={previewCanvas}
                    class="border-2 border-win95-darker w-[320px] h-[320px] lg:w-[600px] lg:h-[600px]"
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
        <div class="flex items-center justify-center gap-2 mt-4">
          <Button on:click={() => window.location.href = '/'} width="auto">
            ⬅️ Back
          </Button>
          <Button on:click={() => randomizeAll(true)} width="auto" disabled={isLoading}>
            🎲 Randomize
          </Button>
          <Button on:click={downloadImage} width="auto" disabled={isLoading}>
            💾 Save
          </Button>
          <Button on:click={shareToX} width="auto" disabled={isLoading}>
            🐦 Share
          </Button>
        </div>
      </div>

      <!-- Layer Controls -->
      
      <div style="height:650px; width:100%" class="flex-1 overflow-y-auto overflow-x-hidden">
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

<!-- Mute Button - Fixed Position -->
<button 
  on:click={toggleMute}
  class="fixed bottom-1 left-1 z-50 win95-button px-3 py-2 text-sm font-bold"
>
  {isMuted ? '🔇' : '🔊'}
</button>

<style>
  canvas {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
</style>
