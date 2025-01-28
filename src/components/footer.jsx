import React from 'react';
import '../styles/theme.css';
import '../styles/footer.css';

const Footer = () => {
    return (
        <footer className="footer-container" aria-label="Footer">
            <div className="container footer">
                <div className="footer-items">
                    <h3 className="footer-title">LEGAL</h3>
                    <ul>
                        <li>
                            <a href="/privacy" className="footer-link" aria-label="Privacy Policy">
                                Terms & Privacy
                            </a>
                        </li>
                        <li>
                            <a href="/dmca" className="footer-link" aria-label="DMCA Disclaimer">
                                DMCA Disclaimer
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer-items">
                    <h3 className="footer-title">LINKS</h3>
                    <ul>
                        <li>
                            <a href="/privacy" className="footer-link" aria-label="Privacy Policy">
                                Discord
                            </a>
                        </li>
                        <li>
                            <a href="/dmca" className="footer-link" aria-label="DMCA Disclaimer">
                                GitHub
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer-items">
                    <h3 className="footer-title">MISC</h3>
                    <ul>
                        <li>
                            <a href="/privacy" className="footer-link" aria-label="Privacy Policy">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href="/dmca" className="footer-link" aria-label="DMCA Disclaimer">
                                Developers
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer-items footer-tools">
                    <div className="footer-tools">
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} .tsubaki. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;