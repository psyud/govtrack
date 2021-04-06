import Link from "next/link";
import React, { Component, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Icon, Table } from "semantic-ui-react";
import Layout from "../components/Layout";
import IEmptyProps from '../props/IEmptyProps';
import IWalletState from '../states/IWalletState';
import { useRouter } from "next/router";

import {
    selectWallet
} from '../slices/walletSlice';
import { Role } from "../utils/enums";
import Grantor from "../components/Grantor";
import Applicant from "../components/Applicant";

export default function User() {
    const wallet = useSelector(selectWallet);
    const router = useRouter();

    useEffect(()=>{
        if(!wallet.isLoggedIn){
            router.replace('/');
        }
    })

    return <Layout>
        {
            wallet.isLoggedInAs === Role.Grantor ? <Grantor/> : <Applicant/>
        }
    </Layout>
}
// export default class User extends Component<IEmptyProps, IWalletState>{
    

//     async componentDidMount() {

//     }

//     render () {
//         return <Layout>
//             <Link href="/projects/new">
//                 <Button primary>New Project</Button>
//             </Link>
//             <Table>
//                 <Table.Header>
//                     <Table.Row>
//                             <Table.Cell>Project Name</Table.Cell>
//                             <Table.Cell>Funding Opportunity</Table.Cell>
//                             <Table.Cell>Agency</Table.Cell>
//                             <Table.Cell>Approval</Table.Cell>
//                     </Table.Row>
//                 </Table.Header>
//                 <Table.Body>
//                     <Table.Row>
//                         <Table.Cell>Project Catalyst</Table.Cell>
//                         <Table.Cell>Lorem ipsum dolor sit amet	</Table.Cell>
//                         <Table.Cell>Department Of Defense</Table.Cell>
//                         <Table.Cell>
//                             <Icon color='green' name='checkmark' size='large' />
//                         </Table.Cell>
//                     </Table.Row>
//                     <Table.Row>
//                         <Table.Cell>Project Catalyst</Table.Cell>
//                         <Table.Cell>Lorem ipsum dolor sit amet	</Table.Cell>
//                         <Table.Cell>Department Of Defense</Table.Cell>
//                         <Table.Cell>
//                             <Icon color='red' name='close' size='large' />
//                         </Table.Cell>
//                     </Table.Row>
//                     <Table.Row>
//                         <Table.Cell>Project Catalyst</Table.Cell>
//                         <Table.Cell>Lorem ipsum dolor sit amet	</Table.Cell>
//                         <Table.Cell>Department Of Defense</Table.Cell>
//                         <Table.Cell>
//                             <Icon color='yellow' name='question circle' size='large' />
//                         </Table.Cell>
//                     </Table.Row>
                    
//                 </Table.Body>
//             </Table>
        

//             <Link href="/grants/new">
//                 <Button primary>New Funding Oppurtunity</Button>
//             </Link>
//             <Table>
//                 <Table.Header>
//                     <Table.Row>
//                             <Table.Cell>Project Name</Table.Cell>
//                             <Table.Cell>Funding Opportunity</Table.Cell>
//                             <Table.Cell>Funding Opportunity Number</Table.Cell>
//                             <Table.Cell>Action</Table.Cell>
//                     </Table.Row>
//                 </Table.Header>
//                 <Table.Body>
//                     <Table.Row>
//                         <Table.Cell>Project Catalyst</Table.Cell>
//                         <Table.Cell>Lorem ipsum dolor sit amet</Table.Cell>
//                         <Table.Cell>145435</Table.Cell>
//                         <Table.Cell>
//                             <Button color='green' icon='checkmark'/>
//                             <Button color='red' icon='close'/>
//                         </Table.Cell>
//                     </Table.Row>
//                     <Table.Row>
//                         <Table.Cell>Project Catalyst</Table.Cell>
//                         <Table.Cell>Lorem ipsum dolor sit amet</Table.Cell>
//                         <Table.Cell>657456</Table.Cell>
//                         <Table.Cell>
//                             <Button color='green' icon='checkmark'/>
//                             <Button color='red' icon='close'/>
//                         </Table.Cell>
//                     </Table.Row>
//                     <Table.Row>
//                         <Table.Cell>Project Catalyst</Table.Cell>
//                         <Table.Cell>Lorem ipsum dolor sit amet</Table.Cell>
//                         <Table.Cell>65464521</Table.Cell>
//                         <Table.Cell>
//                             <Button color='green' icon='checkmark'/>
//                             <Button color='red' icon='close'/>
//                         </Table.Cell>
//                     </Table.Row>
//                 </Table.Body>
//             </Table>
//         </Layout>
//     }
// }