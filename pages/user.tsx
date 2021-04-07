import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";

import {
    selectWallet
} from '../slices/walletSlice';
import { Role } from "../utils/enums";
import Grantor from "../components/Grantor";
import Applicant from "../components/Applicant";

export default function User() {
    const wallet = useSelector(selectWallet);
    return <Layout>
        {
            wallet.isLoggedInAs === Role.Grantor ? <Grantor/> : <Applicant/>
        }
    </Layout>
}