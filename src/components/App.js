import Header from './sections/Header'
import Main from './sections/Main'
import Footer from './sections/Footer'
import VideoProvider from './context/VideoProvider'

const App = () => (
    <VideoProvider>
        <Header />
        <Main />
        <Footer />
    </VideoProvider>
)

export default App
