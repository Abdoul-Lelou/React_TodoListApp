import { Button, Header, Icon, Segment, Divider, Grid, GridColumn, GridRow } from 'semantic-ui-react'

const Home = () => {

  return (
    <Segment placeholder className="ui black segment">
      <Grid columns={2} stackable textAlign='center'>
        <Divider vertical></Divider>

        <GridRow verticalAlign='middle'>
          <GridColumn>
            <Header icon>
              <Icon name='sign-in' />
              Login
            </Header>

            <Button className="ui green button" size='small' onClick={e => window.location.pathname = "signin"}>Sign In</Button>
          </GridColumn>

          <GridColumn>
            <Header icon>
              <Icon name='signup' />
              Create account
            </Header>
            <Button primary size='small' onClick={e => window.location.pathname = "signup"}>Sign Up</Button>
          </GridColumn>
        </GridRow>
      </Grid>
    </Segment>

  )
}

export default Home




