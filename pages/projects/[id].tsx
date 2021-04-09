import { GetServerSideProps } from "next";
import Application from "../../components/Applicantion";
import Layout from "../../components/Layout";
import { getReadonlyContract } from "../../ethereum/serverContract";
import client from '../../graphql/client';
import { BigNumber } from "@ethersproject/bignumber";
import { GET_PROJECT_BY_ID } from "../../graphql/queries";
import Project from "../../models/Project";
import Grant from "../../models/Grant";
import { GrantStatus, Role } from "../../utils/enums";
import React, { useEffect, useState } from "react";
import { getSelectedAddress, getWeb3Provider } from "../../utils/clientUtils";
import { Button, Header, Message } from "semantic-ui-react";
import { getRwContract } from "../../ethereum/clientContract";
import IsApplicant from "../../components/IsApplicant";
import TransactionMessages from "../../components/TransactionMessages";

export default function ProjectDetail({ data, usdPerEth }){
  const project = Project.parse(data);
  const [ isGrantOwner, setIsGrantOwner ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ txHash, setTxHash ] = useState(null);
  const [ grant, setGrant ] = useState(data.grantRequest ? Grant.parse(data.grantRequest.grant, usdPerEth) : null);

  useEffect(() => {
    (async () => {
      setIsGrantOwner(grant && await getSelectedAddress() == grant.grantor?.id);
    })()
  }, [])

  const handleApproval = async () => {
    try {
      setIsLoading(true);
      const contract = await getRwContract();
      await contract.approveRequest(project.grantRequest?.id);
      setTxHash(txHash);
      grant.status = GrantStatus.Closed;
      setGrant(grant);
    }catch(e){
      console.error(e);
    }finally{
      setIsLoading(false);
    }
  }


  return <Layout>
      <IsApplicant>
        <div style={{ textAlign: 'center'}}>
          <Header>Project Detail</Header>
        </div>
      <Application project={project} grant={grant}/>
      {
        isGrantOwner && <div style={{ display: 'flex', justifyContent: 'center '}}>
          <Button onClick={() => handleApproval()} disabled={isLoading || grant.status == GrantStatus.Closed } color='red'>APPROVE</Button>
      </div>
      }
      {
        txHash && <TransactionMessages txHashes={[txHash]}/>
      }
      {
        grant && grant.status == GrantStatus.Closed && <div style={{ marginTop: '1em', display: 'flex', justifyContent: 'center '}}>
          <Message>Grant has closed</Message>
        </div> 
      }
      </IsApplicant>
  </Layout>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const contract = getReadonlyContract();
    const usdPerEth = await contract.getUsdPerEth() as BigNumber;
    const { data } = await client.query({ 
        query: GET_PROJECT_BY_ID,
        variables: {
            projectId: ctx.query.id
        }
    });
    return {
      props: {
        data: data.project,
        usdPerEth: usdPerEth.toNumber()
      }
    }
  }