// store.ts
import { writable, type Writable } from 'svelte/store';

export interface Coin {
    rank: number;
    name: string;
    symbol: string;
    contractAddress: string;
    totalSupply: number;
    totalHolder: number;
    totalSupplyPercentage: number;
    price: number;
  }

export const selectedCoin: Writable<Coin> = writable({
    rank: 0,
    symbol: '',
    name: '',
    contractAddress: '',
    totalHolder: 0,
    totalSupply: 0,
    totalSupplyPercentage: 0,
    price: 0.00,
  });

  export const coinData: Writable<Coin[]> = writable([]);