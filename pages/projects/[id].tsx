import Application from "../../components/Applicantion";
import Layout from "../../components/Layout";
import { getReadonlyContract } from "../../ethereum/serverContract";
import Project from "../../models/Project";



export default function ProjectDetail({ project }){
    return <Layout>
        <Application project={project}/>
    </Layout>
}

ProjectDetail.getInitialProps = async props => {
    const { id } = props.query;
    if(typeof id === 'undefined'){
        return {};
    }

    const contract = getReadonlyContract();
    const project = Project.parse(await contract.addressToProject(id));

    return {
        project
    }
}