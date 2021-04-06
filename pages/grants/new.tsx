import React, { Component, useState } from "react";
import { Button, Checkbox, Dropdown, Form, Grid, Message, Table } from "semantic-ui-react";
import DatePicker from 'react-datepicker';
import Layout from "../../components/Layout";
import { getRwContract } from "../../ethereum/clientContract";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "../../utils/datetimes";
import { useRouter } from "next/router";
import { getReadonlyContract } from "../../ethereum/serverContract";
import { BigNumber } from "ethers/utils";


export default function NewGrant() {
    const router = useRouter();
    const minDate = addDays(new Date(), 30);
    const [ submitting, setSubmitting ] = useState(false);
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ agreedToTerms, setAgreedToTerms ] = useState(false);
    const [ amount, setAmount ] = useState(0);
    const [ deadline, setDeadline ] = useState(minDate);
    const [ errorMessage, setErrorMessage ] = useState('');

    const _setAmount = value => {
        try{
            setAmount(Number.parseInt(value) || 0); // Thanks
        }catch(e){
            console.warn(e.message ?? 'Cannot parse number');
        }
    };
    
    const isFormValid = () => {
        return amount > 0 && title.length > 0 && description.length > 100 && agreedToTerms;
    }

    const handleSubmit = async () => {
        try{
            const contract = await getRwContract();
            setErrorMessage('');
            setSubmitting(true);
            const amountOfWeiToSend: BigNumber = await contract.usdToWei(amount);
            await contract.createGrant(title, description, amount, Math.round(deadline.valueOf() / 1000), {
                value: amountOfWeiToSend
            });
            router.replace('/user');
        }catch(e){
            setErrorMessage(e.message ?? 'Something went wrong');
            console.log(e.message);
        }finally{
            setSubmitting(false);
        }
    }

    return  <Layout>
        <Grid columns={3}>
            <Grid.Column width={4}></Grid.Column>
            <Grid.Column width={8}>
                <Form>
                    <Form.Field>
                        <label>Funding Opportunity Title</label>
                        <Form.Input placeholder='Put at least 10 words' value={title} onChange={e => setTitle(e.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Funding Opportunity Description</label>
                        <Form.TextArea placeholder='Put at least 100 words' rows={10} value={description} onChange={e => setDescription(e.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Amount</label>
                        <Form.Input value={Number.parseInt(amount.toString())} onChange={e => _setAmount(e.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Applicant Deadline</label>
                        <DatePicker 
                            selected={deadline}
                            minDate={minDate}
                            onSelect={date => setDeadline(date)}/>
                    </Form.Field>
                    <Form.Field>
                        <Checkbox 
                            checked={agreedToTerms} 
                            onChange={e => setAgreedToTerms(!agreedToTerms)}
                            label='I agree to the Terms and Conditions' 
                        />
                    </Form.Field>
                    
                    <div style={{ textAlign: 'center' }}>
                        <Button 
                            primary
                            loading={submitting} 
                            onClick={handleSubmit} 
                            disabled={!isFormValid() || submitting}  
                            type='submit'
                        >Submit</Button>
                    </div>
                    {
                        errorMessage.length > 0 && <Message error>{errorMessage}</Message>
                    }
                </Form>
            </Grid.Column>
            <Grid.Column width={4}></Grid.Column>
        </Grid>
    </Layout>
}
