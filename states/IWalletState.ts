import { Role } from "../utils/enums";

export default interface IWalletState {
    isMetaMaskInstalled: boolean,
    isWalletConnected: boolean,
    isWalletConnecting: boolean,
    isLoggedIn: boolean,
    isLoggedInAs?: Role
}
