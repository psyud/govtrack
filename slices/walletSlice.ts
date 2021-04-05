import { createSlice } from '@reduxjs/toolkit';
import { Role } from '../utils/enums';
import IWalletState from '../states/IWalletState';

export const slice = createSlice({
  name: 'wallet',
  initialState: {
    isMetaMaskInstalled: false,
    isWalletConnected: false,
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
    loggedIn: (state, action) => {
        state.isLoggedIn = true;
        state.isLoggedInAs = action.payload as Role;
    }
  },
});

export const { metaMaskInstalled, walletConnected, loggedIn } = slice.actions;

export const selectWallet = state => state.wallet as IWalletState;

export default slice.reducer;
