import React from "react";
import { VscGithubAlt } from "react-icons/vsc";
import { AiOutlineLinkedin } from "react-icons/ai";

function Footer() {
  return (
    <footer>
      
      <h2>Made by Khoi Phan©</h2>
      <p>
        <ul>
          <a href="https://github.com/khoiphan-9194">
            <li className="logo">
              <VscGithubAlt />
            </li>
          </a>
          <a href="https://profile.indeed.com/p/jasonp-0hin1ao/">
            <li className="logo">
              <AiOutlineLinkedin />
            </li>
          </a>
         
        </ul>
      </p>
    </footer>
  );
}

export default Footer;