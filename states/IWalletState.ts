import { Role } from "../utils/enums";

export default interface IWalletState {
    isLoading: boolean,
    isMetaMaskInstalled: boolean,
    isWalletConnected: boolean,
    isLoggedIn: boolean,
    isLoggedInAs?: Role
}
