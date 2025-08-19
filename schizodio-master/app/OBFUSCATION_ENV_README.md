# Obfuscation Map Environment Variables

This document explains how to use the obfuscation map data as environment variables in your application.

## Overview

The obfuscation map data has been converted from the JSON file (`obfuscation_map.json`) to TypeScript environment variables. This approach provides several benefits:

- **Type Safety**: Full TypeScript support with type checking
- **Performance**: No need to load JSON files at runtime
- **Bundling**: Data is included in the build bundle
- **Reliability**: No network requests required

## Files Created

1. **`src/lib/utils/obfuscation-env.ts`** - Sample with first 10 tokens
2. **`src/lib/utils/obfuscation-env-full.ts`** - Complete mapping with all 999 tokens
3. **`scripts/convert-obfuscation-to-env.js`** - Script to regenerate the environment file

## Usage

### Basic Usage

```typescript
import {
  getObfuscationData,
  getObfuscatedHash,
  getImageUrl,
} from '$lib/utils/obfuscation-env';

// Get complete obfuscation data for a token
const tokenData = getObfuscationData(5);
if (tokenData) {
  console.log('Original filename:', tokenData.original);
  console.log('Obfuscated filename:', tokenData.obfuscated);
  console.log('Hash:', tokenData.hash);
  console.log('File size:', tokenData.size);
}

// Get just the hash for a token
const hash = getObfuscatedHash(5);
console.log('Hash for token 5:', hash);

// Get image URL (revealed or unrevealed)
const revealedUrl = getImageUrl(5, true); // Revealed version
const unrevealedUrl = getImageUrl(5, false); // Unrevealed/pixelated version
```

### Available Functions

#### `getObfuscationData(tokenId: number)`

Returns complete obfuscation data for a token:

```typescript
{
  original: string; // Original filename (e.g., "5.png")
  obfuscated: string; // Obfuscated filename (e.g., "2afad054892d6d81786c32b1d3cc7fd3e7c8dbe700457e439245507665b18b59.png")
  hash: string; // Hash value (e.g., "2afad054892d6d81786c32b1d3cc7fd3e7c8dbe700457e439245507665b18b59")
  size: number; // File size in bytes
}
```

#### `getObfuscatedHash(tokenId: number)`

Returns just the hash for a token, or `null` if not found.

#### `getImageUrl(tokenId: number, isRevealed: boolean)`

Returns the appropriate image URL based on reveal status:

- `isRevealed: true` → Revealed image URL
- `isRevealed: false` → Unrevealed/pixelated image URL

#### `getMetadataUrl(tokenId: number, isRevealed: boolean)`

Returns the appropriate metadata URL based on reveal status.

#### `getAvailableTokenIds()`

Returns an array of all available token IDs.

#### `getAllHashes()`

Returns an array of all hash values.

## Migration from JSON-based System

### Before (JSON-based)

```typescript
import { loadObfuscationMap, getObfuscatedHash } from '$lib/utils/obfuscation';

// Had to load the map first
await loadObfuscationMap();
const hash = getObfuscatedHash(5);
```

### After (Environment-based)

```typescript
import { getObfuscatedHash } from '$lib/utils/obfuscation-env';

// Direct access, no loading required
const hash = getObfuscatedHash(5);
```

## Regenerating the Environment File

If you need to update the obfuscation map data:

1. Update the `obfuscation_map.json` file
2. Run the conversion script:
   ```bash
   node scripts/convert-obfuscation-to-env.js
   ```
3. The script will generate `src/lib/utils/obfuscation-env-full.ts` with all tokens

## Performance Considerations

- **Bundle Size**: The full environment file adds ~600KB to your bundle
- **Memory Usage**: All data is loaded into memory at startup
- **Access Speed**: O(1) lookup time for any token

## Fallback Behavior

If a token ID is not found in the environment variables, the functions will:

- Return `null` for hash lookups
- Use fallback URLs with the original token ID for image/metadata URLs

## Example Integration

```typescript
// In a Svelte component
<script lang="ts">
  import { getImageUrl } from '$lib/utils/obfuscation-env';

  export let tokenId: number;
  export let isRevealed: boolean = false;

  $: imageUrl = getImageUrl(tokenId, isRevealed);
</script>

<img src={imageUrl} alt="Token {tokenId}" />
```

## Troubleshooting

### Token not found

- Check that the token ID exists in the environment variables
- Verify the token ID is a number between 0 and 998
- Use `getAvailableTokenIds()` to see all available tokens

### Performance issues

- Consider using the sample file (`obfuscation-env.ts`) for development
- Use the full file (`obfuscation-env-full.ts`) only in production

### Type errors

- Ensure you're importing from the correct file
- Check that TypeScript is properly configured
- Verify the function signatures match your usage
