import React from 'react'

export default function Footer() {
    return (
        <div className="site-footer">
            <h4 className="text-center">Ben's blog</h4>
            <p className="text-center">Follow us on social media</p>
            <div className="footer-social-links">
                <ul className="social-links-list">
                    <li><a href="https://www.facebook.com" target="_blank"rel="noopener noreferrer" className="facebook fa-2x"><i className="fa fa-facebook-f"></i></a></li>
                    <li><a href="https://www.twitter.com" target="_blank"rel="noopener noreferrer" className="twitter fa-2x"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="https://www.instagram.com" target="_blank"rel="noopener noreferrer" className="instagram fa-2x"><i className="fa fa-instagram"></i></a></li>
                    <li><a href="https://www.google.com" target="_blank"rel="noopener noreferrer" className="google fa-2x"><i className="fa fa-google"></i></a></li>
                    <li><a href="https://www.linkedin.com" target="_blank"rel="noopener noreferrer" className="linkedin fa-2x"><i className="fa fa-linkedin"></i></a></li>
                </ul>
            </div>
        </div>
    )
}
