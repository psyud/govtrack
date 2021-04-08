import React from "react";
import { Message } from "semantic-ui-react";

export default function ({ txHashes }) {
    return txHashes.map(txHash => <Message key={txHash} style= {{ textAlign: 'center' }}>Your request is being processed. Tx Hash: {txHash}</Message>)
}