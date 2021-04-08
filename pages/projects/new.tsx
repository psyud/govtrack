import { useRouter } from "next/router";
import React, { Component, useState } from "react";
import { Button, Checkbox, Dropdown, Form, Grid, Message, Table } from "semantic-ui-react";
import IsApplicant from "../../components/IsApplicant";
import Layout from "../../components/Layout";
import TransactionMessages from "../../components/TransactionMessages";
import { getRwContract } from "../../ethereum/clientContract";

export default function NewProject(){
    const [ agreedToTerms, setAgreedToTerms ] = useState(false);
    const [ address, setAddress ] = useState('');
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');

    const [ txHashes, setTxHashes ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    const resetForm = () => {
        setAgreedToTerms(false);
        setAddress('');
        setName('');
        setDescription('');
    }

    const handleSubmit = async () => {
        const contract = await getRwContract();
        try{
            setIsLoading(true);
            const res = await contract.createProject(address, name, description);
            setTxHashes(txHashes.concat(res.hash));
            resetForm();
        }catch(e){

        }finally{
            setIsLoading(false);
        }
    }

    const isFormValid = () => agreedToTerms && name.length > 0 && description.length > 0 && address.length > 0;

    return <Layout>
        <IsApplicant>
        <Grid columns={3}>
            <Grid.Column width={4}></Grid.Column>
            <Grid.Column width={8}>
                <Form>
                    <Form.Field>
                        <label>Project Address</label>
                        <Form.Input value={address} onChange={e => setAddress(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Project Name</label>
                        <Form.Input placecholder='Put at least 10 characters' value={name} onChange={e => setName(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Project Description</label>
                        <Form.Input placecholder='Put at least 100 characters' value={description} onChange={e => setDescription(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    <div style={{ textAlign: 'center' }}>
                        <Button loading={isLoading} disabled={!isFormValid() || isLoading} onClick={() => handleSubmit()} type='submit'>Submit</Button>
                    </div>
                </Form>
            </Grid.Column>
            <Grid.Column width={4}></Grid.Column>
        </Grid>
        <TransactionMessages txHashes={txHashes}/>
        </IsApplicant>
    </Layout>
}

