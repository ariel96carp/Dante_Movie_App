import { Link } from 'react-router-dom'
import MainLogo from '../common/MainLogo'

const Footer = () => {
    const COLUMN_LINKS = [
        [ 'Home', 'Contact us', 'Teams of services', 'About us' ],
        [ 'Live', 'FAQ', 'Premium', 'Privacy policy' ],
        [ 'You must watch', 'Recent release', 'Top IMDB' ]
    ]
    return (
        <footer className="bg-[url('./assets/img/footer-bg.jpg')] bg-no-repeat bg-center bg-cover py-10 sm:py-16">
            <div className="page-container">
                <div className="md:w-[80%] lg:w-[60%] mx-auto">
                    <div className="mx-auto w-fit">
                        <MainLogo />
                    </div>
                    <ul className="text-white font-semibold text-sm mt-8 grid grid-cols-3 gap-1">
                        <div>
                            {
                                COLUMN_LINKS[0].map((link, index) => (
                                    <li className="py-2" key={index}>
                                        <Link to="/">
                                            {link}
                                        </Link>
                                    </li>
                                ))
                            }
                        </div>
                        <div>
                            {
                                COLUMN_LINKS[1].map((link, index) => (
                                    <li className="py-2" key={index}>
                                        <Link to="/">
                                            {link}
                                        </Link>
                                    </li>
                                ))
                            }
                        </div>
                        <div>
                            {
                                COLUMN_LINKS[2].map((link, index) => (
                                    <li className="py-2" key={index}>
                                        <Link to="/">
                                            {link}
                                        </Link>
                                    </li>
                                ))
                            }
                        </div>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer
