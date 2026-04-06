import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typingText, setTypingText] = useState('');
  
  // Typewriter effect variables
  const roles = [
    "AI/ML Engineering Student",
    "Robotics Enthusiast",
    "Full Stack Developer",
    "Tech Explorer"
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Scroll handling for navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Active section highlighting
      const sections = ['home', 'education', 'skills', 'projects', 'achievements', 'contact'];
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 200)) {
          current = section;
        }
      }
      setActiveSection(current || 'home');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Typewriter effect
    const currentRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && typingText === currentRole) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    } else if (isDeleting && typingText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setTypingText((prev) => 
        isDeleting 
          ? currentRole.substring(0, prev.length - 1)
          : currentRole.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typingText, isDeleting, roleIndex]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    closeMobileMenu();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Background Ambient Shapes */}
      <div className="ambient-shape shape-1"></div>
      <div className="ambient-shape shape-2"></div>

      <nav className={`navbar glass ${isScrolled ? 'scrolled' : ''}`}>
        <a href="#home" className="logo" onClick={(e) => scrollToSection(e, 'home')}>
          Sindhuja<span className="highlight">.</span>
        </a>
        <ul className="nav-links">
          {['home', 'education', 'skills', 'projects', 'achievements', 'contact'].map((item) => (
            <li key={item}>
              <a 
                href={`#${item}`} 
                className={activeSection === item ? 'active' : ''}
                onClick={(e) => scrollToSection(e, item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <button className="hamburger" onClick={toggleMobileMenu}>
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu glass ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-links">
          {['home', 'education', 'skills', 'projects', 'achievements', 'contact'].map((item) => (
            <li key={`mobile-${item}`}>
              <a 
                href={`#${item}`}
                onClick={(e) => scrollToSection(e, item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero section">
          <div className="hero-content">
            <h2 className="greeting">Hello, I am</h2>
            <h1 className="name">Sindhuja <span className="highlight">SS</span></h1>
            <div className="dynamic-text">
              I am a <span className="typing-text">{typingText}</span><span className="cursor">&nbsp;</span>
            </div>
            <p className="hero-desc">
              An ambitious AIML Engineering student passionate about deep learning, robotics, and building impactful AI solutions. 
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary" onClick={(e) => scrollToSection(e, 'projects')}>View Projects</a>
              <a href="#contact" className="btn btn-outline" onClick={(e) => scrollToSection(e, 'contact')}>Contact Me</a>
            </div>
            <div className="social-links mt-4">
              <a href="https://linkedin.com/in/Sindhuja%20SS" target="_blank" rel="noreferrer" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://github.com/Sindhuja%20SS" target="_blank" rel="noreferrer" title="GitHub"><i className="fab fa-github"></i></a>
              <a href="mailto:sindhuja.ss2024aiml@sece.ac.in" title="Email"><i className="fas fa-envelope"></i></a>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-wrapper glass">
              <div className="profile-placeholder">
                <span>S</span>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="section">
          <h2 className="section-title">My <span className="highlight">Education</span></h2>
          <div className="timeline">
            <div className="timeline-item glass card-hover">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2024 - 2028</div>
              <div className="timeline-content">
                <h3>B.E CSE (AIML)</h3>
                <h4>Sri Eshwar College of Engineering</h4>
                <p className="grade">CGPA: <span className="highlight">8.23</span></p>
              </div>
            </div>
            <div className="timeline-item glass card-hover">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2022 - 2024</div>
              <div className="timeline-content">
                <h3>HSC</h3>
                <h4>Pushpalatha Matric Higher Secondary School</h4>
                <p className="grade">Marks: <span className="highlight">88.17%</span></p>
              </div>
            </div>
            <div className="timeline-item glass card-hover">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2021 - 2022</div>
              <div className="timeline-content">
                <h3>SSLC</h3>
                <h4>JGVV Matric Higher Secondary School</h4>
                <p className="grade">Marks: <span className="highlight">91.8%</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section">
          <h2 className="section-title">Technical <span className="highlight">Skills</span></h2>
          <div className="skills-container">
            <div className="skill-category glass card-hover">
              <h3><i className="fas fa-code highlight"></i> Programming & Web</h3>
              <div className="tags">
                <span>C</span><span>C++</span><span>Python</span><span>HTML</span><span>CSS</span><span>JavaScript</span><span>Flask</span>
              </div>
            </div>
            <div className="skill-category glass card-hover">
              <h3><i className="fas fa-brain highlight"></i> AI & Data Science</h3>
              <div className="tags">
                <span>Machine Learning</span><span>Deep Learning</span><span>CNN</span><span>ResNet-50</span><span>Transfer Learning</span><span>Scikit-learn</span>
              </div>
            </div>
            <div className="skill-category glass card-hover">
              <h3><i className="fas fa-robot highlight"></i> Robotics & Tools</h3>
              <div className="tags">
                <span>ROS 2</span><span>ROSBridge</span><span>Navigation & Sensors</span><span>VS Code</span><span>Jupyter</span><span>GitHub</span>
              </div>
            </div>
            <div className="skill-category glass card-hover">
              <h3><i className="fas fa-cogs highlight"></i> Core Concepts</h3>
              <div className="tags">
                <span>Data Structures</span><span>Algorithms</span><span>OOP</span><span>Computer Vision</span>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <h2 className="section-title">Featured <span className="highlight">Projects</span></h2>
          <div className="projects-grid">
            <div className="project-card glass card-hover">
              <div className="project-date">Feb 2026</div>
              <h3>AI-Based Microplastic Detection</h3>
              <div className="project-tags">
                <span>Raspberry Pi 5</span><span>ResNet-50</span><span>Flask</span>
              </div>
              <p>Developed an IoT-enabled platform for automated water quality analysis. Captured microscopic images and utilized a Roboflow ML model for real-time detection. Built a web dashboard for live visualization.</p>
              <div className="project-links">
                <a href="#projects" className="link-btn"><i className="fas fa-external-link-alt"></i> Details</a>
              </div>
            </div>

            <div className="project-card glass card-hover">
              <div className="project-date">Mar 2026</div>
              <h3>Mitra AI - Scheme Assistant</h3>
              <div className="project-tags">
                <span>Sarvam AI</span><span>Tesseract.js</span><span>Web Speech API</span>
              </div>
              <p>Multilingual scheme recommendations in under 1.5s utilizing Sarvam AI. Integrated Aadhaar OCR yielding 97.5% accuracy and voice-to-text pipeline for zero-friction discovery for low-literacy users.</p>
              <div className="project-links">
                <a href="#projects" className="link-btn"><i className="fas fa-external-link-alt"></i> Details</a>
              </div>
            </div>

            <div className="project-card glass card-hover">
              <div className="project-date">Dec 2025</div>
              <h3>Blood Group Detection via Fingerprint</h3>
              <div className="project-tags">
                <span>Python</span><span>OpenCV</span><span>CNN</span>
              </div>
              <p>Designed a DL-based biometric system predicting blood groups from fingerprints. Applied feature extraction and CNN models to classify patterns with automated model evaluation for healthcare.</p>
              <div className="project-links">
                <a href="#projects" className="link-btn"><i className="fas fa-external-link-alt"></i> Details</a>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements & Certifications */}
        <section id="achievements" className="section">
          <h2 className="section-title">Achievements & <span className="highlight">Certifications</span></h2>
          <div className="split-layout">
            <div className="achievements-column flex-col">
              <div className="achievement-card glass card-hover">
                <div className="icon-box"><i className="fas fa-trophy highlight"></i></div>
                <div className="content">
                  <h3>Caterpillar Autonomy Challenge 2026</h3>
                  <p>Selected as a Semi-Finalist at IIT Madras. Built a ROS-based real-time rover control system integrating WebSockets and sensor communication.</p>
                </div>
              </div>
              <div className="coding-profiles glass card-hover mt-4">
                <h3><i className="fas fa-laptop-code highlight"></i> Coding Profiles</h3>
                <ul>
                  <li><strong>Skillrack:</strong> Solved 800+ problems</li>
                  <li><strong>Leetcode:</strong> Active problem solver</li>
                </ul>
              </div>
            </div>
            
            <div className="certifications-column flex-col">
              <div className="cert-card glass card-hover">
                <h4><i className="fas fa-certificate highlight"></i> Python</h4>
                <span className="issuer">GUVI</span>
              </div>
              <div className="cert-card glass card-hover mt-4">
                <h4><i className="fas fa-certificate highlight"></i> Introduction to Gen AI</h4>
                <span className="issuer">Google</span>
              </div>
              <div className="cert-card glass card-hover mt-4">
                <h4><i className="fas fa-certificate highlight"></i> Data Structures using C & C++</h4>
                <span className="issuer">Udemy</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <h2 className="section-title">Get In <span className="highlight">Touch</span></h2>
          <div className="contact-card glass">
            <p className="contact-subtitle">I'm currently looking for new opportunities. My inbox is always open!</p>
            <div className="contact-info-grid">
              <a href="tel:+919790867500" className="contact-item">
                <div className="icon"><i className="fas fa-phone-alt"></i></div>
                <div className="info">+91 9790867500</div>
              </a>
              <a href="mailto:sindhuja.ss2024aiml@sece.ac.in" className="contact-item">
                <div className="icon"><i className="fas fa-envelope"></i></div>
                <div className="info">sindhuja.ss2024aiml@sece.ac.in</div>
              </a>
            </div>
            <a href="mailto:sindhuja.ss2024aiml@sece.ac.in" className="btn btn-primary mt-6">Say Hello</a>
          </div>
        </section>
      </main>

      <footer>
        <p>Built with <i className="fas fa-heart highlight"></i> by Sindhuja SS in React. &copy; 2026.</p>
      </footer>
    </>
  );
}

export default App;
