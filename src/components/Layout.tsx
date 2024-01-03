import { Container } from 'semantic-ui-react'
import Home from './Home'

const LayoutContent = () => (
  <div style={{ height: 'auto', padding: '8rem' }}>

    <Container textAlign='justified' text>
      <Home />
    </Container>
  </div>
)

export default LayoutContent