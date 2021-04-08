import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectWallet } from "../slices/walletSlice";

export default function IsGrantor(props) {
    const { isLoggedIn } = useSelector(selectWallet);
    const router = useRouter();

    useEffect(() => {
        console.log(isLoggedIn)
        if(isLoggedIn){
            router.replace('/')
        }
    })

    return <>
        {props.children}
    </>
}
