import { Link } from 'react-router-dom'
import MainLogo from '../common/MainLogo'

const Footer = () => {
    const firstColumnLinks = [ 'Home', 'Contact us', 'Teams of services', 'About us' ]
    const secondColumnLinks = [ 'Live', 'FAQ', 'Premium', 'Privacy policy' ]
    const thirdColumnLinks = [ 'You must watch', 'Recent release', 'Top IMDB' ]
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
                                firstColumnLinks.map((link, index) => (
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
                                secondColumnLinks.map((link, index) => (
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
                                thirdColumnLinks.map((link, index) => (
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
