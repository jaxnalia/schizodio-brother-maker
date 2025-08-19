import { writable } from 'svelte/store';

export interface Theme {
  name: string;
  colors: {
    background: string;
    window: string;
    text: string;
    highlight: string;
    highlightText: string;
  }
}

export const themes: Theme[] = [
  {
    name: 'Windows Standard',
    colors: {
      background: '#008080',
      window: '#c0c0c0',
      text: '#000000',
      highlight: '#000080',
      highlightText: '#ffffff'
    }
  },
  {
    name: 'Desert',
    colors: {
      background: '#c0a080',
      window: '#d4b484',
      text: '#000000',
      highlight: '#804000',
      highlightText: '#ffffff'
    }
  },
  {
    name: 'Rose',
    colors: {
      background: '#c08080',
      window: '#d4b4b4',
      text: '#000000',
      highlight: '#800040',
      highlightText: '#ffffff'
    }
  },
  {
    name: 'Lilac',
    colors: {
      background: '#c080c0',
      window: '#d4b4d4',
      text: '#000000',
      highlight: '#400080',
      highlightText: '#ffffff'
    }
  }
];

export const currentTheme = writable<Theme>(themes[0]);