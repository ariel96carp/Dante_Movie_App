import { Routes, Route } from 'react-router-dom'
import { lazy } from 'react'
import BasicLayout from './layouts/BasicLayout'
import VideoProvider from '../context/VideoProvider'

const Home = lazy(() => import('./Views/Home/Home'))
const Details = lazy(() => import('./Views/Details/Details'))
const Catalog = lazy(() => import('./Views/Catalog/Catalog'))

const App = () => (
    <VideoProvider>
        <Routes>
            <Route path="/" element={<BasicLayout />}>
                <Route
                    index
                    element={<Home />}
                />
                <Route
                    path=":category/:detailsId"
                    element={<Details />}
                />
                <Route
                    path=":category"
                    element={<Catalog />}
                />
                <Route
                    path=":category/search/:keyword"
                    element={<Catalog />}
                />
            </Route>
        </Routes>
    </VideoProvider>
)

export default App
