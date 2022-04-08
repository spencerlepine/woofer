import React from "react"
import Socials from "config/socialConstants"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="columns pr-4 pr-4">
        <div className="column has-text-left">
          <p>Built by Spencer Lepine</p>

          <p>
            view <a href="https://github.com/spencerlepine/woofer">Source Code</a>
          </p>
        </div>

        <div className="column has-text-right">
          <h4>Find me here</h4>
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
      </div>
    </footer>
  )
}

export default Footer
