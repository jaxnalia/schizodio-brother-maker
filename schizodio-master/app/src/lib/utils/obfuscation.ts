export interface ObfuscationEntry {
	original: string;
	obfuscated: string;
	hash: string;
	size: number;
}

export interface ObfuscationMap {
	[tokenId: string]: ObfuscationEntry;
}

let obfuscationMap: ObfuscationMap | null = null;

export async function loadObfuscationMap(): Promise<ObfuscationMap> {
	if (obfuscationMap) {
		return obfuscationMap;
	}

	try {
		// Import the JSON file directly
		const map = await import('./obfuscation-map.json');
		console.log('Obfuscation map loaded from JSON file:', Object.keys(map.default).length, 'entries');
		obfuscationMap = map.default;
		return obfuscationMap;
	} catch (error) {
		console.error('Error loading obfuscation map from JSON file:', error);
		// Return empty map instead of throwing to prevent app crash
		return {};
	}
}

export function getObfuscatedHash(tokenId: number): string | null {
	if (!obfuscationMap) {
		console.warn('Obfuscation map not loaded');
		return null;
	}

	const entry = obfuscationMap[tokenId.toString()];
	console.log(`Looking up tokenId ${tokenId} in obfuscation map:`, entry);
	return entry?.hash || null;
}

export function getImageUrl(tokenId: number, isRevealed: boolean = false): string {
	const hash = getObfuscatedHash(tokenId);
	console.log(`getImageUrl called with tokenId: ${tokenId}, isRevealed: ${isRevealed}, hash: ${hash}`);

	if (!hash) {
		// Fallback to original naming if obfuscation map isn't available
		const fallbackUrl = `https://techshaman.42024769.xyz/schizodio/images/revealed/${tokenId}.png`;
		console.log(`No hash found, using fallback URL: ${fallbackUrl}`);
		return fallbackUrl;
	}

	if (isRevealed) {
		// Return revealed version
		const revealedUrl = `https://techshaman.42024769.xyz/schizodio/images/revealed/${hash}.png`;
		console.log(`Returning revealed URL: ${revealedUrl}`);
		return revealedUrl;
	} else {
		// Return pixelated version
		const pixelatedUrl = `https://techshaman.42024769.xyz/schizodio/images/unrevealed/${hash}.png`;
		console.log(`Returning pixelated URL: ${pixelatedUrl}`);
		return pixelatedUrl;
	}
}

export function getMetadataUrl(tokenId: number, isRevealed: boolean = false): string {
	const hash = getObfuscatedHash(tokenId);
	if (!hash) {
		// Fallback to original naming if obfuscation map isn't available
		return `https://techshaman.42024769.xyz/schizodio/images/revealed/${tokenId}.json`;
	}

	if (isRevealed) {
		// Return revealed metadata
		return `https://techshaman.42024769.xyz/schizodio/images/revealed/${hash}.json`;
	} else {
		// Return unrevealed metadata
		return `https://techshaman.42024769.xyz/schizodio/images/unrevealed/${hash}.json`;
	}
}

export function getAllHashes(): string[] {
	if (!obfuscationMap) {
		console.warn('Obfuscation map not loaded');
		return [];
	}

	return Object.keys(obfuscationMap)
		.sort((a, b) => parseInt(a) - parseInt(b))
		.map(key => obfuscationMap![key].hash);
}