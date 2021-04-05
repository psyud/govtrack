import Link from "next/link";
import React, { Component } from "react";
import { Button, Grid, Menu } from "semantic-ui-react";
import GrantInfo from "../../../components/GrantInfo";
import Layout from "../../../components/Layout"
import IWalletState from '../../../states/IWalletState';
import { isWalletConnected } from "../../../utils/clientUtils";

export interface IProps {
    id: any
}

function GrantDetail(props: IProps, state: IWalletState) {
    return <Layout>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Button color='green' icon='checkmark'/>
                    <Button color='red' icon='close'/>
                </div>
                <div>
                    <Link href="/grants/[id]/applicants" as={`/grants/${props.id}/applicants`}>
                        <Button primary>View Applicants</Button>
                    </Link>
                    <Link href="/grants/[id]/apply" as={`/grants/${props.id}/apply`}>
                        <Button disabled={!state.isWalletConnected} color='red'>Apply</Button>
                    </Link>
                </div>
                
            </div>
            <GrantInfo/>
            
        </Layout>
}

GrantDetail.getInitialProps = async (props) => {
    const { id } = props.query;
    if(typeof id === 'undefined'){
        return {};
    }

    return {
        id
    }
}

export default GrantDetail;

// export default class GrantDetail extends Component<IProps, IWalletState>{
//     state = {
//         isWalletConnected: false
//     }

//     static async getInitialProps(props: any) {
//         const { id } = props.query;
//         if(typeof id === 'undefined'){
//             return {};
//         }

//         return {
//             id
//         }
//     }

//     async componentDidMount() {
//         this.setState({
//             isWalletConnected: await isWalletConnected()
//         })
//     }

//     render() {
//         return <Layout>
            
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <div>
//                     <Button color='green' icon='checkmark'/>
//                     <Button color='red' icon='close'/>
//                 </div>
//                 <div>
//                     <Link href="/grants/[id]/applicants" as={`/grants/${this.props.id}/applicants`}>
//                         <Button primary>View Applicants</Button>
//                     </Link>
//                     <Link href="/grants/[id]/apply" as={`/grants/${this.props.id}/apply`}>
//                         <Button disabled={!this.state.isWalletConnected} color='red'>Apply</Button>
//                     </Link>
//                 </div>
                
//             </div>
//             <GrantInfo/>
            
//         </Layout>
//     }
// }