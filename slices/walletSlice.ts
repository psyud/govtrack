import { createSlice } from '@reduxjs/toolkit';
import { Role } from '../utils/enums';

export const slice = createSlice({
  name: 'wallet',
  initialState: {
    isMetaMaskInstalled: false,
    isWalletConnected: false,
    isWalletConnecting: false,
    isLoggedIn: false,
    isLoggedInAs: null
  },
  reducers: {
    metaMaskInstalled: (state, action) => {
        state.isMetaMaskInstalled = action.payload as boolean;
    },
    walletConnected: (state, action) => {
        state.isWalletConnected = action.payload as boolean;
    },
    walletConnecting: (state, action) => {
        state.isWalletConnecting = action.payload as boolean;
    },
    loggedIn: (state, action) => {
        state.isLoggedIn = true;
        state.isLoggedInAs = action.payload as Role;
    }
  },
});

export const { metaMaskInstalled, walletConnected, walletConnecting, loggedIn } = slice.actions;

export const selectWallet = state => state.wallet;

export default slice.reducer;
