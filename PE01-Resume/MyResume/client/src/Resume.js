import React from "react";
import "./Resume.css";

const Resume = () => {
  return (
    <div className="resume">
      <header className="header">
        <h1>Jiayi Sun</h1>
        <p>
          123 Main Street, Anytown USA, 12345 | (123) 456-7890 | studentname@email.com
        </p>
      </header>

      <section className="section">
        <h2>Education</h2>
        <div className="education">
          <h3>Master of Science in Computer Science</h3>
          <p>City University of Seattle, Seattle USA | May 2023</p>
          <p>GPA: 4.0/4.0</p>
          <h3>Bachelor of Science in Computer Science</h3>
          <p>City University of Seattle, Seattle USA | May 2021</p>
          <p>GPA: 4.0/4.0</p>
        </div>
      </section>

      <section className="section">
        <h2>Projects</h2>
        <div className="projects">
          <h3>Personal Website</h3>
          <p>
            Built a personal website using React and deployed it on GitHub Pages
          </p>
          <p>
            Source code:{" "}
            <a
              href="https://github.com/studentname/personal-website"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/studentname/personal-website
            </a>
          </p>
          <h3>Online Bookstore</h3>
          <p>
            Developed a web application for an online bookstore using Spring Boot and MySQL
          </p>
          <p>
            Source code:{" "}
            <a
              href="https://github.com/studentname/online-bookstore"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/studentname/online-bookstore
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Resume;
