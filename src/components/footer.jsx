import React from 'react';

import '../styles/theme.css';
import '../styles/footer.css';

const Footer = () => {
    return(
        <div className='footer-container'>
            <div className='container footer'>
                <div className='footer-items'>
                    <h3 className='footer-title'>LEGAL</h3>
                    <ul>
                        <li>
                            <a class="footer-link">
                                Privacy
                            </a>
                        </li>
                        <li>
                            <a class="footer-link">
                                DMCA Disclaimer
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;