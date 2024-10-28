// Store.js

import { create } from 'zustand'; // Use named import for 'create'

export const useStore = create((set) => ({
  homepageValues: '',
  sethomepageValue: (value) => set(() => ({ homepageValues: value })),
  searchData: [],
  sethomepageData: (data) => set(() => ({ searchData: data })),
}));
