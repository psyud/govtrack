import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectWallet } from "../slices/walletSlice";
import { Role } from "../utils/enums";

export default function IsApplicant(props) {
    const { isLoggedInAs } = useSelector(selectWallet);
    const router = useRouter();

    useEffect(() => {
        if(isLoggedInAs === null || isLoggedInAs !== null && isLoggedInAs !== Role.Applicant){
            router.replace('/')
        }
    },[])

    return <>
        {props.children}
    </>
}
