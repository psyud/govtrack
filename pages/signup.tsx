import { useRouter } from "next/router";
import React, { Component, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, Form, Grid, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import RedirectIfLoggedIn from "../components/RedirectIfLoggedIn";
import { getRwContract } from "../ethereum/clientContract";
import { selectWallet, walletConnected } from "../slices/walletSlice";
import { getWeb3Provider } from "../utils/clientUtils";
import { Role } from "../utils/enums";

export default function SignUp() {
    const wallet = useSelector(selectWallet);
    const router = useRouter();
    const dispatch = useDispatch();
    
    const [ isConnecting, setIsConnecting ] = useState(false);

    const [ signingUp, setSigningUp ] = useState(false);
    const [ selectedRole, setSelectedRole ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState('');

    // Sign up as a grantor
    const [ agencyName, setAgencyName ] = useState('');
    const [ agencyCode, setAgencyCode ] = useState('');

    // Sign up as an applicant
    const [ applicantName, setApplicantName ] = useState('');
    const [ applicantPhoneNumber, setApplicantPhoneNumber ] = useState('');
    const [ applicantEmailAddress, setApplicantEmailAddress ] = useState('');
    const [ applicantPhysicalAddress, setApplicantPhysicalAddress ] = useState('');

    const isFormValid = () => {
        if(selectedRole == Role.Grantor){
            return agencyName.length > 0 && agencyCode.length > 0;
        }else if(selectedRole == Role.Applicant){
            return applicantName.length > 0 && applicantPhoneNumber.length > 0 && applicantEmailAddress.length > 0 && applicantPhysicalAddress.length > 0;
        }
        return false;
    } 

    const handleSignUp = async () => {
        if(selectedRole === null){
            return;
        }
        const contract = await getRwContract();
        try {
            setSigningUp(true);
            if(selectedRole === Role.Grantor){
                await contract.registerAsGrantor(agencyName, agencyCode);
            }else if(selectedRole === Role.Applicant){
                await contract.registerAsApplicant(applicantName, applicantPhoneNumber, applicantEmailAddress, applicantPhysicalAddress);
            }
            router.replace('/');
        }catch(e){
            setErrorMessage(e.message ?? 'Something wrong happened');
        }finally{
            setSigningUp(false);
        }
    }


    const connectWallet = async () => {
        try{
            setIsConnecting(true);
            const provider = await getWeb3Provider();
            await provider.enable();
            dispatch(walletConnected(true));
        }finally{
            setIsConnecting(false);
        }
    }

    const renderForm = () => {
        return <>
            <Grid.Row>
                <Dropdown 
                    onChange={(e,d) => setSelectedRole(d.value)}
                    placeholder='Sign Up as' options={[
                        {
                            'text': 'Grantor',
                            'key': Role.Grantor,
                            'value': Role.Grantor
                        },
                        {
                            'text': 'Applicant',
                            'key': Role.Applicant,
                            'value': Role.Applicant
                        }
                ]}/>
                {
                    wallet.isMetaMaskInstalled && !wallet.isWalletConnected && <Button 
                        loading={isConnecting}
                        onClick={() => connectWallet()} 
                        primary 
                        style={{ marginLeft: '1em' }}>Connect Wallet</Button>
                }
            </Grid.Row>
            <Grid.Row style={{
                paddingTop: '1em'
            }}>
                {renderRoleSpecificForm(selectedRole)}
            </Grid.Row>
        </>
    }

    const renderRoleSpecificForm = (role?: Role) => {
        const renderSubmitButton = () => {
            return <div style={{ textAlign: 'center' }}>
                <Button 
                    primary
                    loading={signingUp} 
                    onClick={handleSignUp} 
                    disabled={!isFormValid() || signingUp}  
                    type='submit'
                >Submit</Button>
            </div>
        }

        if(role == Role.Grantor){
            return <Form>
                <Form.Field>
                    <label>Agency Name</label>
                    <Form.Input value={agencyName} onChange={e => setAgencyName(e.target.value)}></Form.Input>
                </Form.Field>
                <Form.Field>
                    <label>Agency Code</label>
                    <Form.Input value={agencyCode} onChange={e => setAgencyCode(e.target.value)}></Form.Input>
                </Form.Field>
                {renderSubmitButton()}
            </Form>
        }else if(role == Role.Applicant){
            return <Form>
                <Form.Field>
                    <label>Name</label>
                    <Form.Input value={applicantName} onChange={e => setApplicantName(e.target.value)}></Form.Input>
                </Form.Field>
                <Form.Field>
                    <label>Phone Number</label>
                    <Form.Input value={applicantPhoneNumber} type='number' onChange={e => setApplicantPhoneNumber(e.target.value)}></Form.Input>
                </Form.Field>
                <Form.Field>
                    <label>Email Address</label>
                    <Form.Input value={applicantEmailAddress} onChange={e => setApplicantEmailAddress(e.target.value)}></Form.Input>
                </Form.Field>
                <Form.Field>
                    <label>Physical Address</label>
                    <Form.Input value={applicantPhysicalAddress} onChange={e => setApplicantPhysicalAddress(e.target.value)}></Form.Input>
                </Form.Field>
                {renderSubmitButton()}
            </Form>
        }
        return <></>
    }

    return <Layout>
        <RedirectIfLoggedIn>
            <Grid>
                <Grid.Column width={3}></Grid.Column>
                <Grid.Column 
                    width={10}
                    style={{ 
                        padding: '10em'
                    }}
                    textAlign='center'
                >
                    <Grid.Row>
                        {
                            !wallet.isMetaMaskInstalled && <Message warning>Please install MetaMask</Message> 
                        }
                        {
                            wallet.isMetaMaskInstalled && renderForm()
                        }
                    </Grid.Row>
                   <Grid.Row style={{ marginTop: '0.5em' }}>
                       {
                           errorMessage.length > 0 && <Message error>{errorMessage}</Message>
                       }
                   </Grid.Row>
                </Grid.Column>
                <Grid.Column width={3}></Grid.Column>
            </Grid>
        </RedirectIfLoggedIn>
        </Layout>
}