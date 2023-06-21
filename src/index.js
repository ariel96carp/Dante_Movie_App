import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import App from './components/App'
import ScrollToTop from './components/common/ScrollToTop'
import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient({})
root.render(
    <StrictMode>
        <Router>
            <QueryClientProvider client={queryClient}>
                <ScrollToTop />
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Router>
    </StrictMode>
)
