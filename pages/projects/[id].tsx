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
import { Role } from "../../utils/enums";
import React, { useEffect, useState } from "react";
import { getWeb3Provider } from "../../utils/clientUtils";
import { Button } from "semantic-ui-react";

export default function ProjectDetail({ data, usdPerEth }){
  const wallet = useSelector(selectWallet);
  const project = Project.parse(data);
  const grant = Grant.parse(data.grantRequest.grant, usdPerEth);
  const [ isGrantOwner, setIsGrantOwner ] = useState(false);
  
  useEffect(() => {
    (async () => {
      const provider = await getWeb3Provider();
      setIsGrantOwner(provider.selectedAddress == grant.grantor?.id);
    })()
  }, [])


  return <Layout>
      <Application project={project} grant={grant}/>
      {
        isGrantOwner && <div style={{ display: 'flex', justifyContent: 'center '}}>
          <Button color='red'>APPROVE</Button>
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