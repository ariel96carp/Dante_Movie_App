import { useParams, useNavigate } from 'react-router-dom'
import { useRef, useEffect } from 'react'

const CatalogSearch = () => {
    const { category, keyword } = useParams()
    const navigate = useNavigate()
    const searchRef = useRef()
    const goToSearch = () => {
        if (searchRef.current.value.trim() !== '') {
            navigate(`/${category}/search/${searchRef.current.value.trim()}`)
        }
    }
    useEffect(() => {
        if (searchRef.current.value.trim() !== '' && !keyword) {
            searchRef.current.value = ''
        }
    }, [ category, keyword ])
    return (
        <div className="mb-8 w-[80%] md:w-1/2 lg:w-[30%] bg-black rounded-full pl-4 text-sm font-medium text-gray-200 flex gap-1 items-center">
            <input
                type="text"
                placeholder="Enter password"
                ref={searchRef}
                className="outline-none flex-grow bg-transparent"
            />
            <button
                type="button"
                className="btn alt"
                onClick={goToSearch}
            >
                Search
            </button>
        </div>
    )
}

export default CatalogSearch
