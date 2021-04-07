import { GetServerSideProps } from "next";
import Application from "../../components/Applicantion";
import Layout from "../../components/Layout";
import { getReadonlyContract } from "../../ethereum/serverContract";
import client from '../../graphql/client';
import { BigNumber } from "@ethersproject/bignumber";
import { GET_GRANT_REQUESTS_FOR_PROJECT } from "../../graphql/queries";


export default function ProjectDetail({ data, usdPerEth }){
    return <Layout>
        {/* <Application project={project} grant={grant}/> */}
    </Layout>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const contract = getReadonlyContract();
    const usdPerEth = await contract.getUsdPerEth() as BigNumber;
    const { data } = await client.query({ 
        query: GET_GRANT_REQUESTS_FOR_PROJECT,
        variables: {
            projectId: ctx.query.id
        }
    });
    console.log(data);
    return {
      props: {
        data: data.grantRequests,
        usdPerEth: usdPerEth.toNumber()
      }
    }
  }