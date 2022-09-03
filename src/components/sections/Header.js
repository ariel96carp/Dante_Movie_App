import { NavLink } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import MainLogo from '../common/MainLogo'
import OffCanvas from '../common/OffCanvas'

const Header = () => {
    const headerRef = useRef()
    const offCanvasRef = useRef()
    const menuItems = [ 'home', 'movies', 'series' ]
    const openOffCanvas = () => {
        offCanvasRef.current.classList.toggle('open')
        const isOpen = offCanvasRef.current.classList.contains('open')
        if (isOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'auto'
    }
    useEffect(() => {
        const setHeaderBackground = () => {
            if (window.scrollY > 0) {
                if (!headerRef.current.classList.contains('scrolled')) {
                    headerRef.current.classList.add('scrolled')
                }
            } else {
                headerRef.current.classList.remove('scrolled')
            }
        }

        setHeaderBackground()
        window.addEventListener('scroll', setHeaderBackground)
        return () => window.removeEventListener('scroll', setHeaderBackground)
    }, [])
    useEffect(() => {
        const closeOffCanvasOnResize = () => {
            const smallBp = matchMedia('(min-width: 640px)')
            if (smallBp.matches) {
                if (offCanvasRef.current.classList.contains('open')) {
                    offCanvasRef.current.classList.remove('open')
                    document.body.style.overflow = 'auto'
                }
            }
        }

        window.addEventListener('resize', closeOffCanvasOnResize)
        return () => window.removeEventListener('resize', closeOffCanvasOnResize)
    }, [])
    return (
        <header className="fixed top-0 left-0 w-full h-[var(--header-size)] z-40 transition-colors" ref={headerRef}>
            <div className="page-container h-full">
                <div className="flex justify-between items-center h-full">
                    <MainLogo />
                    <button
                        type="button"
                        className="text-white border border-solid p-[0.2em] rounded-md sm:hidden"
                        onClick={openOffCanvas}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </button>
                    <nav className="hidden sm:block">
                        <ul className="flex gap-4 font-medium text-white">
                            {
                                menuItems.map((link, index) => (
                                    <li key={index}>
                                        <NavLink
                                            to={link !== 'home' ? `/${link}` : '/'}
                                            className={({ isActive }) => (
                                                isActive
                                                    ? 'relative after:absolute after:left-0 after:top-[115%] after:block after:w-full after:h-[2px] after:bg-error-color'
                                                    : undefined
                                            )}
                                        >
                                            {
                                                link !== 'series'
                                                    ? `${link.charAt(0).toLocaleUpperCase()}${link.slice(1)}`
                                                    : 'TV Series'
                                            }
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                    <OffCanvas
                        ref={offCanvasRef}
                        closeMenu={openOffCanvas}
                        menuItems={menuItems}
                    />
                </div>
            </div>
        </header>
    )
}

export default Header
