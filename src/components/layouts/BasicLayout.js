import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import RouteLoader from '../common/RouteLoader'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const BasicLayout = () => (
    <>
        <Header />
        <main>
            <Suspense fallback={<RouteLoader />}>
                <Outlet />
            </Suspense>
        </main>
        <Footer />
    </>
)

export default BasicLayout
