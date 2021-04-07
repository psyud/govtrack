import Application from "../../components/Applicantion";
import Layout from "../../components/Layout";
import { getReadonlyContract } from "../../ethereum/serverContract";
import GrantOpportunity from "../../models/GrantOppurtunity";
import Project from "../../models/Project";



export default function ProjectDetail({ project, grant }){
    return <Layout>
        <Application project={project} grant={grant}/>
    </Layout>
}

ProjectDetail.getInitialProps = async props => {
    const { id } = props.query;
    if(typeof id === 'undefined'){
        return {};
    }

    const contract = getReadonlyContract();
    const project = Project.parse(await contract.addressToProject(id));
    let grant = null;
    const grantRequest = await contract.projectToGrantRequest(id);
    if(grantRequest.project === id){
        grant = GrantOpportunity.parse(await contract.grants(grantRequest.grantId));
    }

    return {
        project,
        grant
    }
}