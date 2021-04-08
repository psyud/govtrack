import { GetServerSideProps } from "next";
import Application from "../../components/Applicantion";
import Layout from "../../components/Layout";
import { getReadonlyContract } from "../../ethereum/serverContract";
import client from '../../graphql/client';
import { BigNumber } from "@ethersproject/bignumber";
import { GET_PROJECT_BY_ID } from "../../graphql/queries";
import Project from "../../models/Project";
import Grant from "../../models/Grant";
import { selectWallet } from "../../slices/walletSlice";
import { useSelector } from "react-redux";
import { GrantStatus, Role } from "../../utils/enums";
import React, { useEffect, useState } from "react";
import { getWeb3Provider } from "../../utils/clientUtils";
import { Button, Message } from "semantic-ui-react";
import { getRwContract } from "../../ethereum/clientContract";
import { useRouter } from "next/router";

export default function ProjectDetail({ data, usdPerEth }){
  const project = Project.parse(data);
  const grant = Grant.parse(data.grantRequest.grant, usdPerEth);
  const [ isGrantOwner, setIsGrantOwner ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const provider = await getWeb3Provider();
      setIsGrantOwner(provider.selectedAddress == grant.grantor?.id);
    })()
  }, [])

  const handleApproval = async () => {
    try {
      setIsLoading(true);
      const contract = await getRwContract();
      console.log(project);
      await contract.approveRequest(project.grantRequest?.id);
      router.back();
    }catch(e){
      console.error(e);
    }finally{
      setIsLoading(false);
    }
  }


  return <Layout>
      <Application project={project} grant={grant}/>
      {
        isGrantOwner && <div style={{ display: 'flex', justifyContent: 'center '}}>
          <Button onClick={() => handleApproval()} disabled={isLoading || grant.status == GrantStatus.Closed } color='red'>APPROVE</Button>
        </div>
      }
      {
        grant.status == GrantStatus.Closed && <div style={{ marginTop: '1em', display: 'flex', justifyContent: 'center '}}>
          <Message>Grant has closed</Message>
        </div> 
      }
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