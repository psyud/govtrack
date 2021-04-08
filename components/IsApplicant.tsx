import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectWallet } from "../slices/walletSlice";
import { Role } from "../utils/enums";

export default function IsApplicant(props) {
    const { isLoading, isLoggedIn, isLoggedInAs } = useSelector(selectWallet);
    const router = useRouter();

    useEffect(() => {
        if(isLoading === false){
            return;
        }
        if(!isLoggedIn || isLoggedInAs !== null && isLoggedInAs !== Role.Applicant){
            router.replace('/')
        }
    })

    return <>
        {props.children}
    </>
}
