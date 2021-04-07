import Link from "next/link";
import React, { Component } from "react";
import { Button, Grid, Menu } from "semantic-ui-react";
import GrantInfo from "../../../components/GrantInfo";
import Layout from "../../../components/Layout"
import { getReadonlyContract } from "../../../ethereum/serverContract";
import GrantOpportunity from "../../../models/GrantOppurtunity";

import {
    selectWallet
} from '../../../slices/walletSlice';
import { useSelector } from "react-redux";
import { Role } from "../../../utils/enums";

export interface IProps {
    id: any,
    grant: GrantOpportunity
}

function GrantDetail(props: IProps) {
    const { isLoggedInAs, isLoggedIn } = useSelector(selectWallet);
    return <Layout>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div>
                    <Link href="/grants/[id]/applicants" as={`/grants/${props.id}/applicants`}>
                        <Button primary>View Applicants</Button>
                    </Link>
                    {
                        isLoggedInAs !== Role.Grantor && <Link href="/grants/[id]/apply" as={`/grants/${props.id}/apply`}>
                            <Button disabled={!isLoggedIn} color='red'>Apply</Button>
                        </Link>
                    }
                </div>
                
            </div>
            <GrantInfo grant={props.grant}/>
        </Layout>
}

GrantDetail.getInitialProps = async (props) => {
    const { id } = props.query;
    if(typeof id === 'undefined'){
        return {};
    }

    const contract = getReadonlyContract();
    const grant = GrantOpportunity.parse(await contract.grants(id));
    grant.agencyName = (await contract.addressToGrantor(grant.agencyAddress)).agencyName;

    return {
        id,
        grant
    }
}

export default GrantDetail;