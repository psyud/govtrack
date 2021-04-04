import { Grid, Segment } from "semantic-ui-react"

export default () => {
    return <Grid style={{ marginTop: '0.5em' }}>
            <Grid.Row color='blue' style={{ padding: '3em 0em', marginTop: '1em' }}>
                <Grid.Column width={5}></Grid.Column>
                <Grid.Column width={6} textAlign='center'>Powered By Ethereum</Grid.Column>
                <Grid.Column width={5}></Grid.Column>
            </Grid.Row>
        </Grid>
    
}