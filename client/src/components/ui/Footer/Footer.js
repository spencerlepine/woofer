import React from "react"
import Socials from "config/socialConstants"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="copyright">
        <p>Built by Spencer Lepine</p>
      </div>

      <div className="forkLink">
        <p>
          view <a href="https://github.com/spencerlepine/woofer">Source Code</a>
        </p>
      </div>

      <div>
        {Socials.map((social, i) => (
          <a
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            key={i}
            className="socialLink"
          >
            <p>{social.name}</p>
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
