import Header from './Header'
import Footer from './Footer'

const BaseLayout = ({children}) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)

export default BaseLayout
