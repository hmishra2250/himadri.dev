import React from "react";
export function ContactBlock({ email, github = "https://github.com/hmishra2250", resume = "#", x = "https://x.com/hmishra2250", linkedin = "https://linkedin.com/in/hmishra2250", showEmail = true, channels = true }) {
  return (
    <div className="hm-contact">
      {showEmail && email ? <a className="hm-contact-email" href={"mailto:" + email}>{email}<span className="hm-button-icon" aria-hidden="true">↗</span></a> : null}
      {channels ? <div className="hm-contact-actions" aria-label="Contact links">
        <a className="hm-button hm-c-github" href={github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a className="hm-button hm-c-linkedin" href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a className="hm-button hm-c-x" href={x} target="_blank" rel="noopener noreferrer">X / Twitter</a>
        <a className="hm-button hm-c-resume" href={resume}>Resume PDF</a>
      </div> : null}
    </div>
  );
}
