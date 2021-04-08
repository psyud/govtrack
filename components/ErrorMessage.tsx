import { Message } from "semantic-ui-react";

export default function ErrorMessage({ error }){
    return <Message style={{ textAlign: 'center' }} error>{error}</Message>
}