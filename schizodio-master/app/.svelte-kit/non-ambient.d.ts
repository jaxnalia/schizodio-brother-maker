
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/mint";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/mint": Record<string, never>
		};
		Pathname(): "/" | "/mint";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/canttakemyeyesoffyou_1.mp3" | "/datamosh1.webp" | "/fonts/W95FA.otf" | "/glitchloop.webp" | "/glitchloop2.webp" | "/obfuscation_map.json" | "/placeholder.webp" | "/schizo.glb" | "/schizodio.png" | "/schizodio_200x200.png" | "/schizodio_sq.jpg" | "/SN-Symbol-Gradient.svg" | "/vite.svg" | string & {};
	}
}