
<script lang="ts">
  import Window from '../components/Window.svelte';
  import Button from '../components/Button.svelte';
  import ProgressBar from '../components/ProgressBar.svelte';
  import RandomPopup from '../components/RandomPopup.svelte';
  import { currentTheme } from '../stores/theme';
  import schizodio_title from '../../assets/images/schizodio.png';
  // import starknetSymbol from '/SN-Symbol-Gradient.svg';

  import { onMount, onDestroy } from 'svelte';
  import { connect, disconnect } from 'starknetkit';
  import { Contract, Account, RpcProvider } from 'starknet';
  import { InjectedConnector } from 'starknetkit/injected';
  import { WebWalletConnector } from 'starknetkit/webwallet';
  import { loadObfuscationMap, getImageUrl } from '../utils/obfuscation';
  import {
    COLLECTION_CONFIG,
    CONTRACT_ABI,
    ERC20_ABI,
    type TokenMetadata,
  } from '../types/contract';
  let walletConnected = false;
  let account: Account | null = null;
  let walletAddress = '';
  let walletId = '';
  let walletName = '';
  let currentSupply = 0;
  let maxSupply: number = COLLECTION_CONFIG.MAX_SUPPLY;
  let isMinting = false;
  let mintStatus = '';
  let lastMintedId: number | null = null;
  let obfuscationMapLoaded = false;
  let isRevealed = false;
  let isContractPaused = false;

  // Provider and contract instances
  let provider: RpcProvider;
  let contract: Contract;

  // Initialize provider and contract with error handling
  onMount(() => {
    try {
      provider = new RpcProvider({
        nodeUrl: 'https://starknet-mainnet.public.blastapi.io',
      });
      contract = new Contract(
        CONTRACT_ABI,
        COLLECTION_CONFIG.CONTRACT_ADDRESS,
        provider
      );
      console.log('Starknet provider and contract initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Starknet provider/contract:', error);
      // Don't throw the error, just log it and continue
    }
  });

  // Simplified payment configuration - only STRK
  let selectedToken = 'STRK';
  let paymentTokens = [
    {
      symbol: 'STRK',
      address: COLLECTION_CONFIG.PAYMENT_TOKENS.STRK,
      price: '200',
      decimals: 18,
      icon: "",
    },
  ];

  // Reactive statement to calculate selected payment token for display
  $: selectedPaymentToken = paymentTokens.find(
    token => token.symbol === selectedToken
  );

  // Schizo elements
  let blinkState = true;
  let mouseTrail: Array<{ x: number; y: number; id: number }> = [];
  let trailId = 0;
  let visitorCount = Math.floor(Math.random() * 999999) + 100000;
  let currentTime = new Date().toLocaleString();
  let chaosLevel = 0;
  let glitchIntensity = 1;
  let schizoMessages = [
    "🚨 CONGRATULATIONS! YOU'VE WON A FREE NFT! (just kidding lol)",
    '⚠️ YOUR COMPUTER MAY BE INFECTED! Click OK to continue anyway',
    "💀 SECURITY ALERT: Someone is trying to hack your NFTs! (spoiler: it's me)",
    "🎰 LUCKY! You're visitor #" +
      visitorCount +
      "! You've won absolutely nothing!",
    '🛸 ALIENS ARE MONITORING THIS TRANSACTION! Wave at them! 👽',
    '🔥 HOT NFT DEALERS HATE THIS ONE TRICK!',
    '💊 YOU HAVE CHOSEN THE RED PILL! Welcome to the Matrix of NFTs',
    '🎮 ERROR 404: REALITY NOT FOUND! Please insert more tokens to continue.',
    '🌈 UNICORNS WANT TO STEAL YOUR PRIVATE KEYS! Trust no one, not even yourself!',
    '⚡ BREAKING: Local man discovers NFTs, immediately loses sanity!',
    '🍕 Your Pizza.exe has stopped working. Would you like to mint an NFT instead?',
    '🎪 STEP RIGHT UP! See the amazing blockchain circus! Witness smart contracts!',
    '🚀 NASA CONFIRMS: NFTs visible from space! Aliens are jealous!',
    '💰 BANKER HATES THIS: Local schizo makes millions with this one weird trick!',
    '🎭 SIMULATION CONFIRMED: You are in a computer. This NFT is your way out.',
    '🔥 WARNING: This NFT contains 99% pure digital chaos! Handle with care!',
    '🎪 WELCOME TO THE SCHIZO ZONE! Population: YOU!',
    '💀 THE VOID IS CALLING! Answer with your wallet!',
    '🌈 RAINBOW UNICORNS ARE REAL! (in the metaverse)',
    '⚡ LIGHTNING STRIKES TWICE! But NFTs last forever!',
    '🎰 JACKPOT! You found the secret NFT formula!',
    '🛸 UFO SIGHTING: Aliens are buying your NFTs!',
    '🔥 HOT TIP: The best time to buy NFTs was yesterday!',
    '💊 MATRIX GLITCH: Reality is just a simulation of NFTs!',
    '🎮 GAME OVER: You win! (but you still need to mint)',
    '🌈 DOUBLE RAINBOW! What does it mean? NFTs!',
    '⚡ ELECTRIC BOOGALOO: NFT edition!',
    '🎪 CIRCUS MAXIMUS: The greatest NFT show on Earth!',
    '🚀 TO INFINITY AND BEYOND! (the NFT collection)',
  ];

  // Random popup system
  let popups: Array<{
    id: number;
    message: string;
    x: number;
    y: number;
    visible: boolean;
  }> = [];
  let popupId = 0;

  let intervals: any[] = [];

  const NFT_CONTRACT_ADDRESS = COLLECTION_CONFIG.CONTRACT_ADDRESS;

  // StarknetKit connectors - Updated with proper URLs from docs
  const connectors = [
    new InjectedConnector({
      options: { id: 'argentX', name: 'Argent X' },
    }),
    new InjectedConnector({
      options: { id: 'braavos', name: 'Braavos' },
    }),
    new WebWalletConnector({
      url: 'https://web.argent.xyz', // Argent Web Wallet
    }),
  ];

  $: ({
    colors: { background, window, text, highlight, highlightText },
  } = $currentTheme);

  $: progress = maxSupply > 0 ? (currentSupply / maxSupply) * 100 : 0;

  onMount(async () => {
    try {
      console.log('Loading obfuscation map...');
      await loadObfuscationMap();
      obfuscationMapLoaded = true;
      mintStatus = '🎉 READY TO ENTER THE SCHIZO ZONE! 🎉';
      console.log('Obfuscation map loaded successfully');
    } catch (error) {
      console.error('Failed to load obfuscation map:', error);
      mintStatus = '⚠️ CHAOS MODE: Using backup reality!';
    }
    try {
      await loadSupplyInfo();
    } catch (error) {
      console.error('Failed to load supply info:', error);
    }
    try {
      await checkContractPaused();
    } catch (error) {
      console.error('Failed to check contract paused status:', error);
    }
    startSchizoMode();
  });

  onDestroy(() => {
    intervals.forEach(clearInterval);
  });

  function startSchizoMode() {
    // Blinking text animation
    intervals.push(
      setInterval(() => {
        blinkState = !blinkState;
      }, 500)
    );

    // Random popup messages with random locations
    intervals.push(
      setInterval(() => {
        if (Math.random() < 0.3) {
          // 30% chance every 5 seconds
          showRandomPopup();
        }
      }, 5000)
    );

    // Update visitor counter
    intervals.push(
      setInterval(() => {
        visitorCount += Math.floor(Math.random() * 10) + 1;
        currentTime = new Date().toLocaleString();
      }, 3000)
    );

    // Increase chaos level over time
    intervals.push(
      setInterval(() => {
        chaosLevel = Math.min(chaosLevel + 0.1, 10);
        glitchIntensity = 1 + chaosLevel / 10;
      }, 10000)
    );

    // Check contract paused status periodically
    intervals.push(
      setInterval(() => {
        checkContractPaused();
      }, 30000) // Check every 30 seconds
    );

    // Random glitch effects
    intervals.push(
      setInterval(() => {
        if (Math.random() < 0.2) {
          document.body.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
          setTimeout(() => {
            document.body.style.filter = '';
          }, 200);
        }
      }, 3000)
    );

    // Mouse trail effect
    document.addEventListener('mousemove', handleMouseMove);
  }

  function handleMouseMove(e: MouseEvent) {
    trailId++;
    mouseTrail = [
      ...mouseTrail,
      { x: e.clientX, y: e.clientY, id: trailId },
    ].slice(-10);

    setTimeout(() => {
      mouseTrail = mouseTrail.filter(point => point.id !== trailId);
    }, 1000);
  }

  function showRandomPopup() {
    const message =
      schizoMessages[Math.floor(Math.random() * schizoMessages.length)];
    const x = Math.random() * 800; // Fixed width for safety
    const y = Math.random() * 600; // Fixed height for safety

    const popup = {
      id: popupId++,
      message,
      x,
      y,
      visible: true,
    };

    popups = [...popups, popup];

    // Auto-remove popup after 8 seconds
    setTimeout(() => {
      popups = popups.filter(p => p.id !== popup.id);
    }, 8000);
  }

  function closePopup(popupId: number) {
    popups = popups.filter(p => p.id !== popupId);

    // Sometimes spawn another popup just to be annoying
    if (Math.random() < 0.4) {
      setTimeout(() => {
        showRandomPopup();
      }, 2000);
    }
  }

  function showMintingSuccessPopup(
    walletAddress: string,
    tokenId: number,
    price: string,
    token: string
  ) {
    const message = `🎊 BREAKING: ${walletAddress.slice(0, 6)}... just minted NFT #${tokenId} for ${price} ${token}! The blockchain is trembling! 🎊`;
    const x = Math.random() * 800;
    const y = Math.random() * 600;

    const popup = {
      id: popupId++,
      message,
      x,
      y,
      visible: true,
    };

    popups = [...popups, popup];

    // Auto-remove popup after 8 seconds
    setTimeout(() => {
      popups = popups.filter(p => p.id !== popup.id);
    }, 8000);
  }

  function showTransactionHashPopup(transactionHash: string) {
    const message = `🔍 TRANSACTION SENT! Hash: ${transactionHash.slice(0, 20)}... Check your wallet or block explorer to confirm!`;
    const x = Math.random() * 800;
    const y = Math.random() * 600;

    const popup = {
      id: popupId++,
      message,
      x,
      y,
      visible: true,
    };

    popups = [...popups, popup];

    // Auto-remove popup after 8 seconds
    setTimeout(() => {
      popups = popups.filter(p => p.id !== popup.id);
    }, 8000);
  }

  async function connectWallet() {
    try {
      mintStatus = '🔄 INITIATING SOUL LINK PROTOCOL...';

      const { wallet } = await connect({
        connectors,
        modalMode: 'alwaysAsk',
        modalTheme: 'dark',
        dappName: 'Schizodio NFT',
      });

      console.log('StarknetKit connect result:', wallet);

      if (wallet) {
        const walletAny = wallet as any;
        console.log('Wallet object structure:', {
          id: wallet.id,
          account: walletAny.account,
          provider: walletAny.provider,
          isConnected: walletAny.isConnected,
          selectedAddress: walletAny.selectedAddress,
        });

        // Try multiple ways to extract account and address (different wallet structures)
        let extractedAccount = null;
        let extractedAddress = '';

        console.log('🔍 Attempting to extract address from wallet:', {
          walletId: wallet.id,
          hasAccount: !!walletAny.account,
          hasSelectedAddress: !!walletAny.selectedAddress,
          hasAddress: !!walletAny.address,
          accountStructure: walletAny.account,
          isConnected: walletAny.isConnected,
          enable: typeof walletAny.enable === 'function',
        });

        // Method 1: Direct account property
        if (walletAny.account?.address) {
          extractedAccount = walletAny.account;
          extractedAddress = walletAny.account.address;
          console.log('✅ Method 1: Found address via account.address');
        }
        // Method 2: selectedAddress property (some wallets use this)
        else if (walletAny.selectedAddress) {
          extractedAddress = walletAny.selectedAddress;
          extractedAccount = { address: walletAny.selectedAddress };
          console.log('✅ Method 2: Found address via selectedAddress');
        }
        // Method 3: address property directly
        else if (walletAny.address) {
          extractedAddress = walletAny.address;
          extractedAccount = { address: walletAny.address };
          console.log('✅ Method 3: Found address via direct address property');
        }
        // Method 4: Try to enable/connect first (for wallets that need activation)
        else if (
          typeof walletAny.enable === 'function' &&
          !walletAny.isConnected
        ) {
          console.log('🔄 Wallet not fully connected, attempting to enable...');
          try {
            const enableResult = await walletAny.enable();
            console.log('Enable result:', enableResult);

            // Try again after enabling
            if (walletAny.account?.address) {
              extractedAccount = walletAny.account;
              extractedAddress = walletAny.account.address;
              console.log('✅ Method 4: Found address after enable');
            } else if (walletAny.selectedAddress) {
              extractedAddress = walletAny.selectedAddress;
              extractedAccount = { address: walletAny.selectedAddress };
              console.log('✅ Method 4: Found selectedAddress after enable');
            }
          } catch (enableError) {
            console.warn('Failed to enable wallet:', enableError);
          }
        }

        if (extractedAddress) {
          // Successfully extracted account and address
          account = extractedAccount;
          walletAddress = extractedAddress;
          walletId = wallet.id || '';
          walletName = getWalletName(wallet.id);
          walletConnected = true;
          mintStatus = `🎉 SOUL LINKED VIA ${walletName.toUpperCase()}! MATRIX ACCESS GRANTED! 🎉`;

          console.log('✅ Wallet successfully connected:', {
            id: wallet.id,
            name: walletName,
            address: walletAddress,
            account: extractedAccount,
            walletStructure: walletAny,
          });
        } else {
          console.warn(
            '❌ Wallet connected but no account/address found. Wallet structure:',
            {
              id: wallet.id,
              hasAccount: !!walletAny.account,
              hasSelectedAddress: !!walletAny.selectedAddress,
              hasAddress: !!walletAny.address,
              fullWallet: walletAny,
            }
          );
          mintStatus =
            '⚠️ WALLET LINKED BUT SOUL INCOMPLETE! No address found. Try reconnecting or check wallet unlock status.';
        }
      } else {
        console.warn('❌ No wallet returned from connect');
        mintStatus =
          '❌ NO WALLET DETECTED! Install Argent X, Braavos, or use Argent Web.';
      }
    } catch (error: any) {
      console.error('❌ Failed to connect wallet:', error);
      if (error?.message?.includes('User rejected')) {
        mintStatus = '👻 SOUL LINKING CANCELLED! User fled from the matrix.';
      } else if (error?.message?.includes('No wallet found')) {
        mintStatus =
          '💀 NO WALLETS DETECTED! Install Argent X or Braavos first.';
      } else {
        mintStatus = `💥 SOUL LINKING FAILED! Error: ${error?.message || 'Unknown error'}`;
      }
    }
  }

  async function disconnectWallet() {
    try {
      await disconnect();
      walletConnected = false;
      account = null;
      walletAddress = '';
      walletId = '';
      walletName = '';
      mintStatus = '👻 SOUL DISCONNECTED FROM THE MATRIX! Reality restored.';
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      mintStatus = '💥 DISCONNECTION FAILED! You are trapped in the matrix!';
    }
  }

  async function loadSupplyInfo() {
    try {
      console.log('📊 Loading supply information...');

      // Fetch current supply from the deployed contract
      const totalSupplyResult = await contract.get_total_minted();
      currentSupply = Number(totalSupplyResult);

      // Use the configured max supply since max_supply is not a standard ERC721 function
      maxSupply = COLLECTION_CONFIG.MAX_SUPPLY;

      // Set lastMintedId to the last token ID if there are any tokens minted
      if (currentSupply > 0) {
        lastMintedId = currentSupply - 1; // Token IDs are 0-based
        isRevealed = shouldRevealNFT(lastMintedId);
        console.log(`✅ Last minted token ID set to: ${lastMintedId}`);
      }

      console.log('✅ Supply info loaded:', {
        currentSupply,
        maxSupply,
        lastMintedId,
      });
    } catch (error) {
      console.error('❌ Failed to load supply info:', error);
      // Fallback to default values
      currentSupply = 0;
      maxSupply = COLLECTION_CONFIG.MAX_SUPPLY;
    }
  }

  async function checkContractPaused() {
    try {
      console.log('🔍 Checking contract mint status...');
      const mintActiveResult = await contract.is_mint_active();
      isContractPaused = !Boolean(mintActiveResult);
      console.log(
        '✅ Contract mint status:',
        isContractPaused ? 'PAUSED' : 'ACTIVE'
      );
    } catch (error) {
      console.error('❌ Failed to check contract mint status:', error);
      isContractPaused = false; // Default to not paused if we can't check
    }
  }

  async function mintNFT() {
    if (!account || !walletConnected) {
      mintStatus = '💀 CONNECT YOUR SOUL TO THE BLOCKCHAIN FIRST! 💀';
      return;
    }

    if (currentSupply >= maxSupply) {
      mintStatus = '🚨 ALL SCHIZO BROTHERS HAVE BEEN ADOPTED! 🚨';
      return;
    }

    const selectedPaymentToken = paymentTokens.find(
      token => token.symbol === selectedToken
    );
    if (!selectedPaymentToken) {
      mintStatus = '🤖 ERROR: PAYMENT METHOD FROM ANOTHER DIMENSION!';
      return;
    }

    // Debug logging to confirm the correct address is being used
    console.log('🔍 Payment Token Debug:', {
      selectedToken,
      selectedPaymentToken,
      address: selectedPaymentToken.address,
      price: selectedPaymentToken.price,
    });

    try {
      isMinting = true;
      mintStatus = `🛸 INITIATING ${selectedToken} SACRIFICE RITUAL... 🛸`;

      // Connect the contract to the account
      contract.connect(account);

      // Check if we need to approve the token first
      if (selectedToken !== 'ETH') {
        mintStatus = `🔐 CHECKING ${selectedToken} PERMISSIONS...`;

        try {
          // Create ERC20 contract instance for the payment token
          const erc20Contract = new Contract(
            ERC20_ABI,
            selectedPaymentToken.address,
            provider
          );

          // Check user's balance first
          const balance = await erc20Contract.balance_of(walletAddress);
          console.log('Raw balance response:', balance);

          // Handle different balance response structures
          let balanceValue: number;
          if (balance.balance?.value) {
            balanceValue = Number(balance.balance.value);
          } else if (balance.balance) {
            balanceValue = Number(balance.balance);
          } else if (balance.value) {
            balanceValue = Number(balance.value);
          } else {
            balanceValue = Number(balance);
          }

          console.log('User balance:', balanceValue);
          console.log(
            'User balance (human readable):',
            balanceValue / Math.pow(10, selectedPaymentToken.decimals)
          );

          // Check current allowance
          const allowance = await erc20Contract.allowance(
            walletAddress,
            COLLECTION_CONFIG.CONTRACT_ADDRESS
          );
          console.log('Raw allowance response:', allowance);

          // Convert price to proper decimals
          const priceAmount =
            parseFloat(selectedPaymentToken.price) *
            Math.pow(10, selectedPaymentToken.decimals);

          // Check if user has enough balance
          if (balanceValue < priceAmount) {
            throw new Error(
              `Insufficient balance: ${balanceValue / Math.pow(10, selectedPaymentToken.decimals)} ${selectedToken} available, ${selectedPaymentToken.price} ${selectedToken} required`
            );
          }

          // Handle u256 allowance value correctly
          let currentAllowance: number;
          if (allowance.allowance?.value) {
            currentAllowance = Number(allowance.allowance.value);
          } else if (allowance.allowance) {
            currentAllowance = Number(allowance.allowance);
          } else if (allowance.value) {
            currentAllowance = Number(allowance.value);
          } else {
            currentAllowance = Number(allowance);
          }

          console.log('Current allowance (parsed):', currentAllowance);
          console.log('Required amount:', priceAmount);

          if (currentAllowance < priceAmount) {
            mintStatus = `🔓 APPROVING ${selectedToken} SPENDING PERMISSIONS...`;

            // Approve the NFT contract to spend tokens
            console.log('Approving amount:', priceAmount.toString());
            const approveCall = erc20Contract.populate('approve', [
              COLLECTION_CONFIG.CONTRACT_ADDRESS,
              priceAmount.toString(),
            ]);

            const approveTx = await account.execute(approveCall);
            console.log(
              'Approve transaction hash:',
              approveTx.transaction_hash
            );

            // Wait for approval transaction
            await provider.waitForTransaction(approveTx.transaction_hash, {
              retryInterval: 2000,
              successStates: ['ACCEPTED_ON_L1', 'ACCEPTED_ON_L2'],
            });

            // Verify the approval was successful
            const newAllowance = await erc20Contract.allowance(
              walletAddress,
              COLLECTION_CONFIG.CONTRACT_ADDRESS
            );
            console.log('Raw new allowance response:', newAllowance);

            let newAllowanceValue: number;
            if (newAllowance.allowance?.value) {
              newAllowanceValue = Number(newAllowance.allowance.value);
            } else if (newAllowance.allowance) {
              newAllowanceValue = Number(newAllowance.allowance);
            } else if (newAllowance.value) {
              newAllowanceValue = Number(newAllowance.value);
            } else {
              newAllowanceValue = Number(newAllowance);
            }

            console.log('New allowance after approval:', newAllowanceValue);

            if (newAllowanceValue >= priceAmount) {
              mintStatus = `✅ ${selectedToken} PERMISSIONS GRANTED! PROCEEDING WITH MINT...`;
            } else {
              throw new Error(
                `Approval failed: new allowance (${newAllowanceValue}) is less than required (${priceAmount})`
              );
            }
          }
        } catch (approvalError: any) {
          console.error('Approval failed:', approvalError);
          console.error('Approval error details:', {
            message: approvalError.message,
            code: approvalError.code,
            data: approvalError.data,
            fullError: approvalError,
          });
          mintStatus = `⚠️ APPROVAL FAILED: ${approvalError.message || 'Unknown error'}`;
          return;
        }
      }

      mintStatus = `💸 TRANSFERRING ${selectedPaymentToken.price} ${selectedToken} TO THE VOID...`;

      let mintCall;

      // Call the mint function with quantity and payment token
      mintCall = contract.populate('mint', [
        1, // quantity - mint 1 NFT
        selectedPaymentToken.address, // payment token address
      ]);
      mintStatus = '🎭 SUMMONING YOUR SCHIZO BROTHER FROM THE ABYSS...';

      const tx = await account.execute(mintCall);

      mintStatus = '⚡ TRANSACTION LAUNCHED INTO THE BLOCKCHAIN MATRIX! ⚡';
      console.log('Transaction hash:', tx.transaction_hash);

      // Wait for transaction with timeout and better error handling
      try {
        await provider.waitForTransaction(tx.transaction_hash, {
          retryInterval: 2000, // Check every 2 seconds
          successStates: ['ACCEPTED_ON_L1', 'ACCEPTED_ON_L2'],
        });

        // Set the correct token ID (the one that was just minted)
        lastMintedId = currentSupply;
        // Update reveal status based on the token ID
        isRevealed = shouldRevealNFT(lastMintedId);

        // Increment supply after setting the token ID
        currentSupply += 1;

        console.log(
          `🎉 NFT minted successfully! Token ID: ${lastMintedId}, Revealed: ${isRevealed}`
        );
        console.log(`Image URL will be: ${getIPFSImageUrl(lastMintedId)}`);
        console.log(
          `lastMintedId set to: ${lastMintedId}, should show Freshly Adopted section: ${lastMintedId !== null}`
        );

        mintStatus = `🎉 SCHIZO BROTHER #${lastMintedId} HAS BEEN BORN! WELCOME TO THE FAMILY! 🎉`;

        // Random celebration popup
        setTimeout(() => {
          if (lastMintedId !== null) {
            showMintingSuccessPopup(
              walletAddress,
              lastMintedId,
              selectedPaymentToken.price,
              selectedToken
            );
          }
        }, 1000);
      } catch (waitError: any) {
        console.error('Transaction wait failed:', waitError);

        if (waitError.message?.includes('TimedOut')) {
          mintStatus = `⏰ TRANSACTION TIMEOUT! Your NFT might still be processing. Check your wallet for transaction: ${tx.transaction_hash.slice(0, 10)}...`;

          // Show transaction hash for manual checking
          showTransactionHashPopup(tx.transaction_hash);
        } else {
          mintStatus = `⚠️ TRANSACTION UNCERTAIN! Error: ${waitError.message || 'Unknown error'}. Check your wallet for transaction status.`;
        }
      }
    } catch (error: any) {
      console.error('Minting failed:', error);

      // Provide more specific error messages
      if (error.message?.includes('ENTRYPOINT_NOT_FOUND')) {
        mintStatus =
          '💥 FUNCTION NOT FOUND! The contract might be different than expected.';
      } else if (error.message?.includes('insufficient funds')) {
        mintStatus = '💰 INSUFFICIENT FUNDS! Make sure you have enough tokens.';
      } else if (error.message?.includes('user rejected')) {
        mintStatus = '👻 USER REJECTED! The ritual was cancelled.';
      } else if (error.message?.includes('Insufficient token allowance')) {
        mintStatus = `🔐 INSUFFICIENT ${selectedToken} ALLOWANCE! The approval process may have failed. Try again.`;
      } else if (
        error.message?.includes('timeout') ||
        error.message?.includes('TimedOut')
      ) {
        mintStatus =
          '⏰ NETWORK TIMEOUT! The blockchain is slow today. Try again in a few minutes.';
      } else if (
        error.message?.includes('network') ||
        error.message?.includes('connection')
      ) {
        mintStatus =
          '🌐 NETWORK ERROR! Check your internet connection and try again.';
      } else {
        mintStatus = `💥 THE SIMULATION GLITCHED! Error: ${error.message || 'Unknown error'}`;
      }
    } finally {
      isMinting = false;
    }
  }

  function formatAddress(address: string): string {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  function getWalletName(walletId: string): string {
    switch (walletId) {
      case 'argentX':
        return 'Argent X';
      case 'braavos':
        return 'Braavos';
      case 'argentWebWallet':
      case 'webWallet':
        return 'Argent Web';
      case 'argentMobile':
        return 'Argent Mobile';
      default:
        return walletId || 'Unknown';
    }
  }

  function getWalletEmoji(walletId: string): string {
    switch (walletId) {
      case 'argentX':
        return '🔵';
      case 'braavos':
        return '🦆';
      case 'argentWebWallet':
      case 'webWallet':
        return '🌐';
      case 'argentMobile':
        return '📱';
      default:
        return '👛';
    }
  }

  function getIPFSImageUrl(tokenId: number): string {
    const imageUrl = getImageUrl(tokenId, isRevealed);
    console.log(
      `Getting image for token ${tokenId}, revealed: ${isRevealed}, URL: ${imageUrl}`
    );
    return imageUrl;
  }

  // Function to determine if NFT should be revealed
  function shouldRevealNFT(tokenId: number): boolean {
    // Contract has been revealed, so all NFTs should be revealed
    return true;
  }

  // Audio mute state
  let audioMuted = false;

  // Sound effects array - simplified to just the original 5 working URLs
  const soundEffects = [
    'https://www.myinstants.com/media/sounds/mktoasty.mp3',
    'https://www.myinstants.com/media/sounds/schizolobotomy.mp3',
    'https://www.myinstants.com/media/sounds/stfu-schizo_pVwYUih.mp3',
    'https://www.myinstants.com/media/sounds/perfect-street-fighter-sound-effect.mp3',
    'https://www.myinstants.com/media/sounds/lose-street-fighter.mp3',
    'https://www.myinstants.com/media/sounds/shoryureppa-02-ken.mp3',
    'https://www.myinstants.com/media/sounds/street-fighter-the-movie-arcade-insert-coin-sound-effect.mp3',
    'https://www.myinstants.com/media/sounds/tiger-uppercut-sagat.mp3',
    'https://www.myinstants.com/media/sounds/groan-tube-1_kdDdtlv.mp3',
    'https://www.myinstants.com/media/sounds/groan-tube-2_xK05nvu.mp3',
    'https://www.myinstants.com/media/sounds/hitmarker_1.mp3',
    'https://www.myinstants.com/media/sounds/hit-marker.mp3',
    'https://www.myinstants.com/media/sounds/zvuk-litvina.mp3',
    'https://www.myinstants.com/media/sounds/wait-wait-wait-what-the-hell-legend-sound.mp3',
    'https://www.myinstants.com/media/sounds/take-off_2YqCEjc.mp3',
    'https://www.myinstants.com/media/sounds/man-screaming-aaaah.mp3',
  ];

  // Simple audio playback - create audio on demand
  function playRandomSound() {
    // Don't play if audio is muted
    if (audioMuted) {
      console.log('Audio is muted, skipping sound effect');
      return;
    }

    console.log('playRandomSound called');

    const randomIndex = Math.floor(Math.random() * soundEffects.length);
    const audioUrl = soundEffects[randomIndex];

    console.log('Playing audio at index:', randomIndex, 'URL:', audioUrl);

    // Create a new audio element each time
    const audio = new Audio(audioUrl);
    audio.volume = 0.3;

    // Add event listeners for debugging
    audio.addEventListener('loadstart', () => console.log('Audio loadstart'));
    audio.addEventListener('canplay', () => console.log('Audio canplay'));
    audio.addEventListener('error', e => console.log('Audio error:', e));
    audio.addEventListener('play', () => console.log('Audio started playing'));
    audio.addEventListener('pause', () => console.log('Audio paused'));

    // Try to play
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Audio started playing successfully');
        })
        .catch(error => {
          console.log('Audio play failed:', error);
          console.log('Error name:', error.name);
          console.log('Error message:', error.message);
        });
    }
  }

  // Toggle audio mute state
  function toggleGheiboiMode() {
    audioMuted = !audioMuted;
    console.log('Gheiboi mode toggled:', audioMuted ? 'MUTED' : 'UNMUTED');
  }

  // Function to handle mint page clicks
  function handleMintPageClick() {
    console.log('Mint page clicked, triggering sound...');
    playRandomSound();
  }

  // Function to test audio (for debugging)
  function testAudio() {
    console.log('Testing audio...');
    playRandomSound();
  }
</script>

<!-- ENHANCED MATRIX RAIN BACKGROUND - MORE PREVALENT -->
<div class="matrix-rain"></div>
<div class="matrix-stream matrix-stream-1">
  01101100011010010111011001100101
</div>
<div class="matrix-stream matrix-stream-2">
  01001000011010010111011001100101
</div>
<div class="matrix-stream matrix-stream-3">
  01101100011010010111011001100101
</div>
<div class="matrix-stream matrix-stream-4">
  01001000011010010111011001100101
</div>
<div class="matrix-stream matrix-stream-5">
  01101100011010010111011001100101
</div>
<div class="matrix-stream matrix-stream-6">
  01001000011010010111011001100101
</div>
<div class="matrix-stream matrix-stream-7">
  01101100011010010111011001100101
</div>
<div class="matrix-stream matrix-stream-8">
  01001000011010010111011001100101
</div>
<div class="matrix-stream matrix-stream-9">
  01101100011010010111011001100101
</div>
<div class="matrix-stream matrix-stream-10">
  01001000011010010111011001100101
</div>

<!-- FLOATING EMOJIS -->
<div class="floating-emojis">
  <div class="emoji emoji-1">🎰</div>
  <div class="emoji emoji-2">💊</div>
  <div class="emoji emoji-3">🛸</div>
  <div class="emoji emoji-4">🎭</div>
  <div class="emoji emoji-5">🌈</div>
  <div class="emoji emoji-6">⚡</div>
  <div class="emoji emoji-7">🎪</div>
  <div class="emoji emoji-8">🚀</div>
</div>

<!-- RETRO COMPUTER MONITORS -->
<div class="retro-monitors">
  <div class="monitor monitor-1">
    <div class="screen">LOADING...</div>
  </div>
  <div class="monitor monitor-2">
    <div class="screen">YOU'VE GOT MAIL!</div>
  </div>
</div>

<!-- Mouse Trail -->
{#each mouseTrail as point (point.id)}
  <div
    class="mouse-trail spinning"
    style="left: {point.x - 5}px; top: {point.y - 5}px;"
  ></div>
{/each}

<!-- Visitor Counter -->
<div class="visitor-counter blink">
  👁️ Visitor #{visitorCount} 👁️
  <br />
  {currentTime}
</div>

<!-- Random Popups -->
{#each popups as popup (popup.id)}
  <RandomPopup
    message={popup.message}
    x={popup.x}
    y={popup.y}
    visible={popup.visible}
    on:close={() => closePopup(popup.id)}
  />
{/each}

<!-- MAIN SCHIZO CONTENT -->
<div
  class="gap-4 flex flex-col justify-center items-center w-full min-h-screen overflow-x-hidden"
>
  <!-- TOP NAVIGATION -->
  <div class="w-full max-w-screen-xl mx-auto px-4">
    <Window title="🚀 DIMENSIONAL TRAVEL 🚀" width="full">
      <div class="flex gap-4 justify-center p-2">
        <a href="/">
          <Button>
            <span class="mega-text glitch shake intense-blink">
              🏠 ESCAPE TO HOME DIMENSION 🏠
            </span>
          </Button>
        </a>
      </div>
    </Window>
  </div>

  <!-- TITLE -->
  <div class="w-full max-w-screen-xl mx-auto px-4 flex justify-center">
    <img
      src={schizodio_title}
      alt="Schizodio"
      class="w-full h-auto rainbow"
      style="max-width: 500px;"
    />
  </div>

  <!-- SCHIZO ANNOUNCEMENT BAR -->
  <div class="w-full max-w-screen-xl mx-auto px-4">
    <Window title="📢 SCHIZO NEWS NETWORK 📢" width="full">
      <div
        class="p-2 sm:p-4 matrix text-center mega-text {blinkState
          ? 'blink'
          : ''}"
      >
        🔥 EXCLUSIVE NFT DROP! SCHIZODIO BROTHERS ARE TAKING OVER THE STARKNET!
        🔥
      </div>
      <div class="p-2 text-center">
        <div class="text-xs flex gap-2 justify-center">
          <Button on:click={testAudio}>CLICK HERE</Button>
          <div class="gheiboi-mode-btn">
            <Button on:click={toggleGheiboiMode}>
              {audioMuted ? 'GHEIBOI MODE' : 'SCHIZO MODE'}
            </Button>
          </div>
        </div>
      </div>
    </Window>
  </div>

  <!-- MAIN INTERFACE -->

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="w-full max-w-screen-xl mx-auto px-4"
    on:click={handleMintPageClick}
  >
    <div class="flex flex-col xl:flex-row gap-4 justify-center">
      <!-- PAYMENT & MINT SECTION -->
      <div class="flex flex-col gap-4 flex-1 max-w-2xl">
        <!-- WALLET CONNECTION -->
        <Window title="💀 SOUL CONNECTION PORTAL 💀" width="full">
          <div class="p-4 flex flex-col gap-3">
            <h3 class="mega-text rainbow text-center">WALLET STATUS</h3>
            {#if walletConnected}
              <div class="matrix text-center p-3 shake">
                <div class="mega-text blink">
                  {getWalletEmoji(walletId)} SOUL LINKED {getWalletEmoji(
                    walletId
                  )}
                </div>
                <div class="schizo-text rainbow mt-2">
                  🔗 WALLET: {walletName}
                </div>
                <div class="schizo-text mt-1">
                  📍 ADDRESS: {formatAddress(walletAddress)}
                </div>
                {#if walletAddress}
                  <div class="text-xs mt-2 opacity-80">
                    Full Address: {walletAddress}
                  </div>
                {/if}
                <div class="mt-3 flex flex-col gap-2">
                  <Button on:click={disconnectWallet}>
                    💀 DISCONNECT FROM MATRIX 💀
                  </Button>
                  {#if walletId === 'webWallet' || walletId === 'argentWebWallet'}
                    <a
                      href="https://web.argent.xyz"
                      target="_blank"
                      rel="noopener"
                    >
                      <Button>🌐 OPEN WALLET DASHBOARD</Button>
                    </a>
                  {/if}
                </div>
              </div>
            {:else}
              <div class="text-center">
                <div class="mega-text blink intense-blink">
                  ⚠️ UNLINKED SOUL DETECTED ⚠️
                </div>
                <div class="schizo-text mt-2">
                  🔌 SUPPORTED WALLETS: Argent X, Braavos, Argent Web
                </div>
                <Button on:click={connectWallet}>
                  🔗 LINK YOUR SOUL TO THE BLOCKCHAIN 🔗
                </Button>
                <div class="text-xs mt-2 opacity-60">
                  💡 Make sure your wallet is installed and unlocked
                </div>
                {#if mintStatus}
                  <div class="mt-3 p-2 matrix text-xs">
                    🔍 DEBUG: {mintStatus}
                  </div>
                {/if}
              </div>
            {/if}
          </div>
        </Window>

        <!-- PAYMENT TOKEN SELECTOR -->
        <Window title="💰 STRK SACRIFICE CHAMBER 💰" width="full">
          <div class="p-4">
            <h3 class="mega-text text-center rainbow mb-3">
              STRK TRIBUTE REQUIRED
            </h3>
            <div class="token-selector">
              {#each paymentTokens as token}
                <div
                  class="token-option float chaotic-hover selected"
                  role="button"
                  tabindex="0"
                >
                  <div class="mega-text">
                    <img
                      src={token.icon}
                      alt="STRK"
                      class="inline-block w-6 h-6 mr-2"
                    />
                    {token.symbol}
                  </div>
                  <div class="schizo-text price-text-large">
                    {token.price}
                    {token.symbol}
                  </div>
                  <div class="text-sm">~200 USD</div>
                </div>
              {/each}
            </div>

            <div class="text-center mt-3 matrix p-2">
              <div class="mega-text">SELECTED: {selectedToken}</div>
              <div class="schizo-text">
                PRICE: {paymentTokens.find(t => t.symbol === selectedToken)
                  ?.price}
                {selectedToken}
              </div>
              <div class="text-xs mt-1 opacity-80">
                ADDRESS: {paymentTokens
                  .find(t => t.symbol === selectedToken)
                  ?.address.slice(0, 10)}...
              </div>
            </div>
          </div>
        </Window>

        <!-- MINT BUTTON -->
        <Window title="🎭 SUMMONING CHAMBER 🎭" width="full">
          <div class="p-4 text-center">
            {#if walletConnected}
              <Button
                on:click={mintNFT}
                disabled={isMinting ||
                  currentSupply >= maxSupply ||
                  isContractPaused}
              >
                <div class="huge-mint-text">
                  {#if isMinting}
                    🌀 RITUAL IN PROGRESS... 🌀
                  {:else if currentSupply >= maxSupply}
                    💀 ALL BROTHERS ADOPTED 💀
                  {:else if isContractPaused}
                    🚨 CONTRACT PAUSED 🚨
                  {:else}
                    🎯 SUMMON SCHIZO BROTHER ({selectedPaymentToken?.price ||
                      '0'}
                    {selectedToken})
                  {/if}
                </div>
              </Button>
            {:else}
              <div class="p-6 text-center">
                <div class="mega-text rainbow mb-4">
                  🔗 CONNECT YOUR SOUL TO BEGIN 🔗
                </div>
                <div class="schizo-text glitch-text">
                  The mint button will appear once you connect your wallet to
                  the blockchain matrix.
                </div>
              </div>
            {/if}

            {#if mintStatus}
              <div class="mt-3 p-3 matrix shake">
                <div
                  class="schizo-text glitch-text {blinkState ? 'blink' : ''}"
                >
                  {mintStatus}
                </div>
              </div>
            {/if}
          </div>
        </Window>
        <!-- <Window title="📉 SCHIZODIO CHART 📈" width="full">
          <style>#dexscreener-embed{position:relative;width:100%;padding-bottom:125%;}#dexscreener-embed iframe{position:absolute;width:100%;height:100%;top:0;left:0;border:0;}</style><div id="dexscreener-embed"><iframe title="SCHIZODIO/USD" src="https://dexscreener.com/starknet/0x00acc2fa3bb7f6a6726c14d9e142d51fe3984dbfa32b5907e1e76425177875e2-0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d-2347948331754475397897284791279200659-5982-0x0?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartDefaultOnMobile=1&chartTheme=dark&theme=dark&chartStyle=1&chartType=strk&interval=240"></iframe></div>
        </Window> -->
      </div>

      <!-- PREVIEW & INFO SECTION -->
      <div class="flex flex-col gap-4 flex-1 max-w-2xl">
        <!-- NFT PREVIEW -->
        <Window title="🖼️ SCHIZO PORTAL PREVIEW 🖼️" width="full">
          <div class="p-4 pb-4">
            <div
              class="border-4 border-black mb-3 bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <img
                src="placeholder.webp"
                alt="Schizo NFT Preview"
                class="w-full"
                loading="lazy"
              />
            </div>
            <div class="text-center">
              <div class="mega-text rainbow">
                NEXT BROTHER: #{currentSupply}
              </div>
              <div class="schizo-text">
                Status: {isRevealed ? '🎉 REVEALED! 🎉' : '🎭 BROTHER READY 🎭'}
              </div>
            </div>
          </div>
        </Window>

        <!-- COLLECTION STATS -->
        <Window title="📊 SCHIZO STATISTICS 📊" width="full">
          <div class="p-4">
            <h3 class="mega-text text-center rainbow mb-3">
              ADOPTION PROGRESS
            </h3>
            <ProgressBar value={progress} max={100} />

            <div class="grid grid-cols-2 gap-2 text-center">
              <div class="matrix p-2">
                <div class="mega-text">{currentSupply}</div>
                <div class="schizo-text">ADOPTED</div>
              </div>
              <div class="matrix p-2">
                <div class="mega-text">{maxSupply - currentSupply}</div>
                <div class="schizo-text">WAITING</div>
              </div>
              <div class="matrix p-2">
                <div class="mega-text">999</div>
                <div class="schizo-text">TOTAL</div>
              </div>
              <div class="matrix p-2">
                <div class="mega-text">STARKNET</div>
                <div class="schizo-text">BLOCKCHAIN</div>
              </div>
            </div>
          </div>
        </Window>

        <!-- LAST MINTED -->
        <!-- DEBUG: lastMintedId = {lastMintedId} -->
        {#if lastMintedId !== null}
          <Window title="🎉 FRESH ADOPTION 🎉" width="full">
            <div class="p-4">
              <h3 class="mega-text text-center rainbow">YOUR NEWEST BROTHER</h3>
              <div
                class="border-4 border-green-500 p-2 mb-2 bg-gradient-to-r from-green-400 to-blue-500"
              >
                <img
                  src={getIPFSImageUrl(lastMintedId)}
                  alt="Schizo NFT #{lastMintedId}"
                  class="w-full"
                  loading="lazy"
                />
              </div>
              <div class="text-center matrix p-2">
                <div class="mega-text">BROTHER #{lastMintedId}</div>
                <div class="schizo-text blink">🎊 SUCCESSFULLY ADOPTED! 🎊</div>
              </div>
            </div>
          </Window>
        {/if}
      </div>
    </div>
  </div>

  <!-- SEIZURE WARNING (SCHIZO JOKE) -->
  <div class="w-full max-w-screen-xl mx-auto px-4 mt-4">
    <Window title="⚠️ MEDICAL DISCLAIMER ⚠️" width="full">
      <div
        class="p-3 matrix text-center schizo-text epilepsy-warning {blinkState
          ? 'blink'
          : ''}"
      >
        🚨 WARNING: This website may cause extreme enlightenment, spontaneous
        NFT addiction, and uncontrollable urges to buy more tokens! 🚨
      </div>
    </Window>
  </div>

  <!-- CRAZY PAUSED OVERLAY -->
  {#if isContractPaused}
    <div class="paused-overlay">
      <div class="paused-content">
        <div class="paused-title">🚨 CONTRACT PAUSED 🚨</div>
        <div class="paused-message">
          THE SCHIZO BROTHERS ARE TAKING A BREAK FROM REALITY!
          <br />
          THE MATRIX IS TEMPORARILY OFFLINE!
          <br />
          PLEASE WAIT WHILE WE RESTORE SANITY...
        </div>
        <div class="paused-effects">
          <div class="spinning-skull">💀</div>
          <div class="floating-warning">⚠️</div>
          <div class="chaos-text">CHAOS MODE ACTIVATED</div>
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- SCHIZO 90s STYLES -->
<style>
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

  .blink {
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
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

  .matrix {
    background: #000;
    color: #00ff00;
    font-family: 'Courier New', monospace;
    padding: 10px;
    border: 2px solid #00ff00;
  }

  .popup {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    background: #c0c0c0;
    border: 2px solid #000;
    padding: 20px;
    box-shadow: 5px 5px 0px #000;
    max-width: 400px;
    animation: popup-bounce 0.5s ease-out;
  }

  @keyframes popup-bounce {
    0% {
      transform: translateX(-50%) scale(0.3);
    }
    50% {
      transform: translateX(-50%) scale(1.1);
    }
    100% {
      transform: translateX(-50%) scale(1);
    }
  }

  .visitor-counter {
    position: fixed;
    bottom: 10px;
    right: 10px;
    background: linear-gradient(45deg, #ff0000, #ffff00, #00ff00);
    color: #000;
    padding: 8px 12px;
    font-size: 0.9rem;
    font-weight: bold;
    border: 3px solid #000;
    box-shadow: 4px 4px 0px #000;
    animation: counter-pulse 2s ease-in-out infinite;
    z-index: 1000;
  }

  @keyframes counter-pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  .mouse-trail {
    position: fixed;
    width: 15px;
    height: 15px;
    background: radial-gradient(circle, #ff00ff, #00ffff, transparent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1000;
    box-shadow: 0 0 10px #ff00ff;
    animation: trail-fade 1s ease-out forwards;
  }

  @keyframes trail-fade {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.5);
    }
  }

  .token-selector {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 10px 0;
  }

  .token-option {
    border: 3px solid #000;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    background: #c0c0c0;
    transition: all 0.2s;
  }

  .token-option:hover {
    background: #ffff00;
    transform: rotate(-2deg);
  }

  .token-option.selected {
    background: #00ff00;
    border-color: #ff0000;
    transform: scale(1.1) rotate(2deg);
    animation: selected-pulse 1s infinite;
  }

  @keyframes selected-pulse {
    0%,
    100% {
      transform: scale(1.1) rotate(2deg);
    }
    50% {
      transform: scale(1.15) rotate(-2deg);
    }
  }

  /* MAXIMUM SCHIZO EFFECTS */
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

  .spinning {
    animation: spin 10s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .shake {
    animation: shake 0.5s infinite;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
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

  .epilepsy-warning {
    background: linear-gradient(45deg, #ff0000, #ffff00, #ff0000, #ffff00);
    background-size: 400% 400%;
    animation:
      epilepsy-flash 0.1s infinite,
      rainbow 0.5s ease-in-out infinite;
    border: 3px solid #ff0000;
  }

  @keyframes epilepsy-flash {
    0%,
    50% {
      background-position: 0% 50%;
    }
    51%,
    100% {
      background-position: 100% 50%;
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

  /* ENHANCED MATRIX RAIN EFFECT - MORE PREVALENT */
  .matrix-rain {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  }

  .matrix-rain::before {
    content: '01101100011010010111011001100101';
    position: absolute;
    top: -100%;
    left: 0;
    color: #00ff00;
    font-family: 'Courier New', monospace;
    font-size: 18px;
    font-weight: bold;
    animation: matrix-fall 4s linear infinite;
    opacity: 0.7;
    text-shadow:
      0 0 20px #00ff00,
      0 0 40px #00ff00;
  }

  .matrix-rain::after {
    content: '01001000011010010111011001100101';
    position: absolute;
    top: -100%;
    right: 0;
    color: #ff00ff;
    font-family: 'Courier New', monospace;
    font-size: 16px;
    font-weight: bold;
    animation: matrix-fall 6s linear infinite;
    opacity: 0.6;
    text-shadow:
      0 0 20px #ff00ff,
      0 0 40px #ff00ff;
  }

  /* Additional matrix rain streams */
  .matrix-rain::before {
    content: '01101100011010010111011001100101';
    position: absolute;
    top: -100%;
    left: 25%;
    color: #00ffff;
    font-family: 'Courier New', monospace;
    font-size: 20px;
    font-weight: bold;
    animation: matrix-fall-fast 2.5s linear infinite;
    opacity: 0.8;
    text-shadow:
      0 0 25px #00ffff,
      0 0 50px #00ffff;
  }

  .matrix-rain::after {
    content: '01001000011010010111011001100101';
    position: absolute;
    top: -100%;
    right: 25%;
    color: #ffff00;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    font-weight: bold;
    animation: matrix-fall-slow 8s linear infinite;
    opacity: 0.6;
    text-shadow:
      0 0 15px #ffff00,
      0 0 30px #ffff00;
  }

  @keyframes matrix-fall {
    to {
      top: 100%;
    }
  }

  /* Additional matrix rain animations */
  @keyframes matrix-fall-fast {
    to {
      top: 100%;
    }
  }

  @keyframes matrix-fall-slow {
    to {
      top: 100%;
    }
  }

  @keyframes matrix-fall-diagonal {
    to {
      top: 100%;
      left: 100%;
    }
  }

  /* Additional matrix stream elements - MORE PREVALENT */
  .matrix-stream {
    position: fixed;
    top: -100%;
    color: #00ff00;
    font-family: 'Courier New', monospace;
    font-size: 16px;
    font-weight: bold;
    pointer-events: none;
    z-index: 1;
    opacity: 0.7;
    text-shadow:
      0 0 20px currentColor,
      0 0 40px currentColor;
    animation: matrix-fall 6s linear infinite;
  }

  .matrix-stream-1 {
    left: 10%;
    color: #00ff00;
    font-size: 18px;
    opacity: 0.8;
    animation-duration: 3.5s;
    animation-delay: 0s;
    text-shadow:
      0 0 25px #00ff00,
      0 0 50px #00ff00;
  }

  .matrix-stream-2 {
    left: 30%;
    color: #ff00ff;
    font-size: 20px;
    opacity: 0.9;
    animation-duration: 7s;
    animation-delay: 1s;
    text-shadow:
      0 0 30px #ff00ff,
      0 0 60px #ff00ff;
  }

  .matrix-stream-3 {
    left: 50%;
    color: #00ffff;
    font-size: 22px;
    opacity: 0.8;
    animation-duration: 5s;
    animation-delay: 2s;
    text-shadow:
      0 0 25px #00ffff,
      0 0 50px #00ffff;
  }

  .matrix-stream-4 {
    left: 70%;
    color: #ffff00;
    font-size: 16px;
    opacity: 0.7;
    animation-duration: 4s;
    animation-delay: 3s;
    text-shadow:
      0 0 20px #ffff00,
      0 0 40px #ffff00;
  }

  .matrix-stream-5 {
    left: 90%;
    color: #ff0080;
    font-size: 18px;
    opacity: 0.8;
    animation-duration: 6s;
    animation-delay: 4s;
    text-shadow:
      0 0 25px #ff0080,
      0 0 50px #ff0080;
  }

  .matrix-stream-6 {
    left: 15%;
    color: #ff6600;
    font-size: 16px;
    opacity: 0.7;
    animation-duration: 4.5s;
    animation-delay: 0.5s;
    text-shadow:
      0 0 20px #ff6600,
      0 0 40px #ff6600;
  }

  .matrix-stream-7 {
    left: 45%;
    color: #00ff80;
    font-size: 19px;
    opacity: 0.8;
    animation-duration: 5.5s;
    animation-delay: 1.5s;
    text-shadow:
      0 0 25px #00ff80,
      0 0 50px #00ff80;
  }

  .matrix-stream-8 {
    left: 75%;
    color: #ff0080;
    font-size: 17px;
    opacity: 0.7;
    animation-duration: 6.5s;
    animation-delay: 2.5s;
    text-shadow:
      0 0 22px #ff0080,
      0 0 44px #ff0080;
  }

  .matrix-stream-9 {
    left: 85%;
    color: #ffff00;
    font-size: 15px;
    opacity: 0.6;
    animation-duration: 3.5s;
    animation-delay: 3.5s;
    text-shadow:
      0 0 18px #ffff00,
      0 0 36px #ffff00;
  }

  .matrix-stream-10 {
    left: 5%;
    color: #00ffff;
    font-size: 21px;
    opacity: 0.9;
    animation-duration: 7.5s;
    animation-delay: 0.8s;
    text-shadow:
      0 0 30px #00ffff,
      0 0 60px #00ffff;
  }

  /* PSYCHEDELIC BACKGROUND */
  body {
    background: linear-gradient(
      45deg,
      #ff0000,
      #00ff00,
      #0000ff,
      #ffff00,
      #ff00ff,
      #00ffff
    );
    background-size: 400% 400%;
    animation: psychedelic 10s ease-in-out infinite;
  }

  @keyframes psychedelic {
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

  /* PSYCHEDELIC BACKGROUND */
  @keyframes psychedelic {
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

  /* FLOATING ELEMENTS */
  .float {
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  /* INTENSE BLINK */
  .intense-blink {
    animation: intense-blink 0.3s infinite;
  }

  @keyframes intense-blink {
    0%,
    50% {
      opacity: 1;
      color: #ff0000;
    }
    51%,
    100% {
      opacity: 0;
      color: #00ff00;
    }
  }

  /* FLOATING EMOJIS */
  .floating-emojis {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 15;
  }

  .emoji {
    position: absolute;
    font-size: 2rem;
    animation: emoji-bounce 6s ease-in-out infinite;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
  }

  /* MOBILE RESPONSIVE - HIDE OVERLAYED ELEMENTS AND IMPROVE ALIGNMENT */
  @media (max-width: 768px) {
    .floating-emojis {
      display: none;
    }

    .retro-monitors {
      display: none;
    }

    .matrix-stream {
      display: none;
    }

    .matrix-rain::before,
    .matrix-rain::after {
      display: none;
    }

    .visitor-counter {
      display: none;
    }

    .mouse-trail {
      display: none;
    }

    /* IMPROVED MOBILE LAYOUT - STRETCH TO FILL BOXES PROPERLY */
    .w-full {
      width: 100% !important;
    }

    .max-w-screen-xl {
      max-width: 100% !important;
    }

    /* Main container stretching */
    .flex-1 {
      flex: 1 1 100% !important;
      width: 100% !important;
      min-width: 100% !important;
    }

    .max-w-2xl {
      max-width: 100% !important;
      width: 100% !important;
    }

    /* Better spacing for mobile */
    .px-4 {
      padding-left: 0.5rem !important;
      padding-right: 0.5rem !important;
    }

    .p-4 {
      padding: 0.75rem !important;
    }

    .gap-4 {
      gap: 0.75rem !important;
    }

    /* Improved margins for better alignment */
    .mb-3 {
      margin-bottom: 0.75rem !important;
    }

    .mt-3 {
      margin-top: 0.75rem !important;
    }

    .mt-4 {
      margin-top: 1rem !important;
    }

    /* Better text sizing for mobile readability */
    .text-2xl {
      font-size: 1.75rem !important;
    }

    .text-xl {
      font-size: 1.4rem !important;
    }

    .text-lg {
      font-size: 1.2rem !important;
    }

    .text-base {
      font-size: 1rem !important;
    }

    .text-sm {
      font-size: 0.875rem !important;
    }

    .text-xs {
      font-size: 0.75rem !important;
    }

    /* Improved button and window sizes */
    .mega-text {
      font-size: 1.7rem !important;
    }

    .schizo-text {
      font-size: 1.15rem !important;
    }

    .huge-mint-text {
      font-size: 2.4rem !important;
    }

    .price-text-large {
      font-size: 1.45rem !important;
    }

    /* Better flex layout for mobile */
    .flex-col {
      flex-direction: column !important;
    }

    .xl\:flex-row {
      flex-direction: column !important;
    }

    /* Improve button alignment */
    .justify-center {
      justify-content: center !important;
    }

    .items-center {
      align-items: center !important;
    }

    /* Better spacing for token selector */
    .token-selector {
      gap: 0.75rem !important;
      width: 100% !important;
    }

    .token-option {
      padding: 0.75rem !important;
      margin: 0.25rem !important;
      width: 100% !important;
      flex: 1 1 100% !important;
    }

    /* Improve grid layout */
    .grid-cols-2 {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 0.75rem !important;
      width: 100% !important;
    }

    /* Better image sizing */
    img {
      max-width: 100% !important;
      width: 100% !important;
      height: auto !important;
    }

    /* Improve window padding */
    :global(.window) {
      margin-bottom: 1rem !important;
      width: 100% !important;
    }

    /* Better text alignment */
    .text-center {
      text-align: center !important;
    }

    /* Ensure buttons stretch properly */
    :global(button) {
      width: 100% !important;
      max-width: 100% !important;
    }

    /* Make sure content areas stretch */
    .p-4 {
      width: 100% !important;
      box-sizing: border-box !important;
    }

    /* Ensure flex containers use full width */
    .flex {
      width: 100% !important;
    }

    /* Make sure the main interface container stretches */
    .w-full.max-w-screen-xl {
      width: 100% !important;
      max-width: 100% !important;
      padding-left: 0.5rem !important;
      padding-right: 0.5rem !important;
    }
  }

  .emoji-1 {
    top: 20%;
    left: 20%;
    animation-delay: 0s;
  }
  .emoji-2 {
    top: 30%;
    right: 25%;
    animation-delay: 1s;
  }
  .emoji-3 {
    top: 40%;
    left: 30%;
    animation-delay: 2s;
  }
  .emoji-4 {
    top: 50%;
    right: 35%;
    animation-delay: 3s;
  }
  .emoji-5 {
    top: 60%;
    left: 40%;
    animation-delay: 4s;
  }
  .emoji-6 {
    top: 70%;
    right: 45%;
    animation-delay: 5s;
  }
  .emoji-7 {
    top: 80%;
    left: 50%;
    animation-delay: 6s;
  }
  .emoji-8 {
    top: 90%;
    right: 55%;
    animation-delay: 7s;
  }

  @keyframes emoji-bounce {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    25% {
      transform: translateY(-30px) rotate(90deg);
    }
    50% {
      transform: translateY(-60px) rotate(180deg);
    }
    75% {
      transform: translateY(-30px) rotate(270deg);
    }
  }

  /* RETRO COMPUTER MONITORS */
  .retro-monitors {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 20;
  }

  .monitor {
    position: absolute;
    width: 120px;
    height: 100px;
    background: #333;
    border: 3px solid #000;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: monitor-glow 4s ease-in-out infinite;
  }

  .monitor-1 {
    top: 10%;
    right: 10%;
    animation-delay: 0s;
  }
  .monitor-2 {
    top: 20%;
    left: 10%;
    animation-delay: 2s;
  }

  .screen {
    background: #000;
    color: #00ff00;
    font-family: 'Courier New', monospace;
    font-size: 0.8rem;
    padding: 10px;
    width: 90%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    animation: screen-flicker 2s infinite;
  }

  @keyframes monitor-glow {
    0%,
    100% {
      box-shadow: 0 0 10px #00ff00;
    }
    50% {
      box-shadow:
        0 0 30px #00ff00,
        0 0 50px #00ff00;
    }
  }

  @keyframes screen-flicker {
    0%,
    90%,
    100% {
      opacity: 1;
    }
    5% {
      opacity: 0.8;
    }
    10% {
      opacity: 1;
    }
    15% {
      opacity: 0.9;
    }
    20% {
      opacity: 1;
    }
  }

  /* HUGE MINT BUTTON TEXT */
  .huge-mint-text {
    font-size: 2.5rem !important;
    font-weight: bold !important;
    text-transform: uppercase !important;
    letter-spacing: 2px !important;
    line-height: 1.2 !important;
    text-shadow:
      3px 3px 0px #000,
      6px 6px 0px #ff00ff !important;
    animation: text-glitch 2s infinite !important;
  }

  @keyframes text-glitch {
    0%,
    90%,
    100% {
      transform: translate(0);
      text-shadow:
        3px 3px 0px #000,
        6px 6px 0px #ff00ff;
    }
    10% {
      transform: translate(-2px, 2px);
      text-shadow:
        -3px 3px 0px #ff0000,
        6px -6px 0px #00ff00;
    }
    20% {
      transform: translate(2px, -2px);
      text-shadow:
        3px -3px 0px #0000ff,
        -6px 6px 0px #ffff00;
    }
    30% {
      transform: translate(-2px, -2px);
      text-shadow:
        -3px -3px 0px #ff00ff,
        6px 6px 0px #00ffff;
    }
  }

  /* LARGER PRICE TEXT */
  .price-text-large {
    font-size: 1.5rem !important;
    font-weight: bold !important;
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
    text-shadow:
      2px 2px 0px #000,
      4px 4px 0px #ff00ff !important;
    animation: price-glitch 3s infinite !important;
  }

  @keyframes price-glitch {
    0%,
    85%,
    100% {
      transform: translate(0);
      text-shadow:
        2px 2px 0px #000,
        4px 4px 0px #ff00ff;
    }
    5% {
      transform: translate(-1px, 1px);
      text-shadow:
        -2px 2px 0px #ff0000,
        4px -4px 0px #00ff00;
    }
    15% {
      transform: translate(1px, -1px);
      text-shadow:
        2px -2px 0px #0000ff,
        -4px 4px 0px #ffff00;
    }
    25% {
      transform: translate(-1px, -1px);
      text-shadow:
        -2px -2px 0px #ff00ff,
        4px 4px 0px #00ffff;
    }
  }

  /* GHEIBOI MODE BUTTON - BIG AND OBVIOUS */
  .gheiboi-mode-btn {
    transform: scale(1.2);
    transition: all 0.3s ease;
  }

  .gheiboi-mode-btn:hover {
    transform: scale(1.4);
    filter: brightness(1.3) hue-rotate(180deg);
  }

  .gheiboi-mode-btn :global(button) {
    font-size: 1.2rem !important;
    font-weight: bold !important;
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
    padding: 12px 20px !important;
    border: 3px solid #ff0000 !important;
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff6600,
      #ffff00,
      #00ff00,
      #0066ff,
      #ff00ff
    ) !important;
    background-size: 400% 400% !important;
    animation: psychedelic 2s ease infinite !important;
    text-shadow: 2px 2px 0px #000 !important;
    box-shadow:
      0 0 20px #ff0000,
      0 0 40px #ff6600,
      0 0 60px #ffff00 !important;
  }

  .gheiboi-mode-btn :global(button):hover {
    animation: shake 0.5s ease infinite !important;
    box-shadow:
      0 0 30px #ff0000,
      0 0 60px #ff6600,
      0 0 90px #ffff00 !important;
  }

  /* CRAZY PAUSED OVERLAY STYLES */
  .paused-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff6600,
      #ffff00,
      #00ff00,
      #0066ff,
      #ff00ff,
      #ff0080
    );
    background-size: 400% 400%;
    animation: paused-rainbow 0.5s ease infinite;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .paused-content {
    background: rgba(0, 0, 0, 0.9);
    border: 5px solid #ff0000;
    padding: 40px;
    text-align: center;
    max-width: 600px;
    animation: paused-bounce 0.3s ease infinite;
    box-shadow:
      0 0 50px #ff0000,
      0 0 100px #ff6600,
      0 0 150px #ffff00;
  }

  .paused-title {
    font-size: 3rem;
    font-weight: bold;
    color: #ff0000;
    text-shadow:
      0 0 20px #ff0000,
      0 0 40px #ff6600,
      0 0 60px #ffff00;
    animation: paused-title-glitch 0.2s ease infinite;
    margin-bottom: 20px;
  }

  .paused-message {
    font-size: 1.5rem;
    color: #ffff00;
    text-shadow:
      0 0 15px #ffff00,
      0 0 30px #00ff00;
    animation: paused-text-shake 0.1s ease infinite;
    margin-bottom: 30px;
    line-height: 1.5;
  }

  .paused-effects {
    position: relative;
    height: 100px;
  }

  .spinning-skull {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 4rem;
    animation: paused-skull-spin 1s linear infinite;
  }

  .floating-warning {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 3rem;
    animation: paused-warning-float 2s ease-in-out infinite;
  }

  .chaos-text {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.2rem;
    color: #00ffff;
    text-shadow: 0 0 10px #00ffff;
    animation: paused-chaos-text 0.5s ease infinite;
  }

  @keyframes paused-rainbow {
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

  @keyframes paused-bounce {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes paused-title-glitch {
    0%,
    90%,
    100% {
      transform: translate(0);
      text-shadow:
        0 0 20px #ff0000,
        0 0 40px #ff6600,
        0 0 60px #ffff00;
    }
    10% {
      transform: translate(-3px, 3px);
      text-shadow:
        0 0 20px #00ff00,
        0 0 40px #0066ff,
        0 0 60px #ff00ff;
    }
    20% {
      transform: translate(3px, -3px);
      text-shadow:
        0 0 20px #ffff00,
        0 0 40px #ff0080,
        0 0 60px #00ffff;
    }
  }

  @keyframes paused-text-shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-2px);
    }
    75% {
      transform: translateX(2px);
    }
  }

  @keyframes paused-skull-spin {
    from {
      transform: translateX(-50%) rotate(0deg);
    }
    to {
      transform: translateX(-50%) rotate(360deg);
    }
  }

  @keyframes paused-warning-float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes paused-chaos-text {
    0%,
    100% {
      opacity: 1;
      color: #00ffff;
    }
    50% {
      opacity: 0.5;
      color: #ff00ff;
    }
  }

  /* Mobile responsive for paused overlay */
  @media (max-width: 768px) {
    .paused-content {
      padding: 20px;
      max-width: 90%;
    }

    .paused-title {
      font-size: 2rem;
    }

    .paused-message {
      font-size: 1.2rem;
    }

    .spinning-skull {
      font-size: 3rem;
    }

    .floating-warning {
      font-size: 2rem;
    }
  }
</style>
