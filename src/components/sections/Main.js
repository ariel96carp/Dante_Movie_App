import { Route, Routes } from 'react-router-dom'
import Home from '../Views/Home/Home'
import Details from '../Views/Details/Details'
import Catalog from '../Views/Catalog/Catalog'

const Main = () => (
    <main>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:category" element={<Catalog />} />
            <Route path="/:category/search/:keyword" element={<Catalog />} />
            <Route path="/:category/:detailsId" element={<Details />} />
        </Routes>
    </main>
)

export default Main
