import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import MainLogo from './MainLogo'

const OffCanvas = forwardRef(({ closeMenu, menuItems }, ref) => (
    <div
        className="fixed top-0 left-0 w-full h-[100vh] bg-black/50 z-50 opacity-0 pointer-events-none offcanvas transition-opacity"
        ref={ref}
    >
        <nav className="fixed top-0 right-0 h-[100vh] w-[70%] xs:w-[60%] bg-white pt-6 px-8">
            <div className="flex items-center justify-between mb-10">
                <MainLogo isLink={false} />
                <button
                    type="button"
                    className="border border-solid p-[0.2em] rounded-md sm:hidden"
                    onClick={closeMenu}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <ul className="font-medium">
                {
                    menuItems.map((link, index) => (
                        <li key={index}>
                            <Link
                                to={link !== 'home' ? `/${link}` : '/'}
                                className="py-3 inline-block border-b border-solid w-full"
                                onClick={closeMenu}
                            >
                                {
                                    link !== 'series'
                                        ? `${link.charAt(0).toLocaleUpperCase()}${link.slice(1)}`
                                        : 'TV Series'
                                }
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    </div>
))

OffCanvas.propTypes = {
    closeMenu: PropTypes.func.isRequired,
    menuItems: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default OffCanvas
