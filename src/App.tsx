import { ArrowRight, ArrowUpRight, FileText, Github, Linkedin, Mail, MapPin, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Interests", href: "#interests" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
];

const skills = [
  ["Navigation", "ROS2 - Nav2 - SLAM - RTAB-Map - Slam-Toolbox - Fast-LIO2"],
  ["Programming", "Python - C++ - Linux - Docker - Git - Bash"],
  ["Perception", "OpenCV - YOLOv8 - Intel RealSense - Roboflow - Open3D"],
  ["Simulation", "Gazebo - Isaac Sim - COLMAP - GLOMAP - GSplat - Fusion 360"],
];

const interests = [
  {
    title: "Robust autonomy",
    text: "I am interested in why navigation stacks that look good in controlled demos degrade when the building, floor, light, or terrain changes.",
  },
  {
    title: "State estimation",
    text: "I keep coming back to odometry, mapping, and sensor fusion because small estimation failures become very real once a robot leaves the lab.",
  },
  {
    title: "Learning + SLAM",
    text: "The intersection I want to explore more deeply is classical probabilistic robotics meeting learned representations that generalize.",
  },
];

const experiences = [
  {
    role: "Associate Robotics Engineer",
    org: "Strider Robotics - ARTPARK, IISc - Bangalore",
    date: "Jun 2025 - Present",
    current: true,
    bullets: [
      "Leading multi-floor and outdoor navigation work on Unitree Go2-W using a custom ROS2 SDK.",
      "Benchmarking SLAM and LiDAR-Inertial Odometry stacks at IISc's ARTGarage and making deployment decisions from field behavior, not just benchmark scores.",
      "Designed structured log routing and real-time monitoring so deployed robots are easier to debug when something fails away from a desk.",
      "Ran 20+ successful waypoint-navigation trials across Go2, Go2-W, and Deep Robotics X30 Pro platforms.",
    ],
    tags: ["ROS2", "SLAM", "Nav2", "LiDAR", "Python", "C++"],
  },
  {
    role: "Robotics Intern",
    org: "Strider Robotics - ARTPARK, IISc - Bangalore",
    date: "Dec 2024 - May 2025",
    bullets: [
      "Built a desktop tool with customtkinter and viser for GSplat visualisation and mission planning, then Dockerized it for reliable use.",
      "Integrated Unitree Go1 into Gazebo with LiDAR, Intel RealSense, Nav2, and Slam-Toolbox to support sim-to-real experiments.",
      "Worked with GLOMAP, GSplat, SUGAR, and Isaac Sim while exploring 3D reconstruction workflows for robotics environments.",
    ],
    tags: ["ROS2", "Gazebo", "Docker", "GSplat", "GLOMAP"],
  },
  {
    role: "Industrial Trainee",
    org: "Intel Unnati Summer 2023 - Intel Corporation - Remote",
    date: "May - Jul 2023",
    bullets: [
      "Built automated road-defect detection with YOLOv8, reaching 92.7% precision and 92.8% mAP on IDD while outperforming a YOLOv5 baseline.",
    ],
    tags: ["Python", "YOLOv8", "Roboflow", "Computer Vision"],
  },
  {
    role: "Project Intern",
    org: "Unique World Robotics - UAE - Remote",
    date: "Sep 2022 - Mar 2023",
    bullets: [
      "Developed an interactive school-campus information kiosk with PyQt5, OpenWeather API, and Google Drive API, then deployed it for daily use.",
    ],
    tags: ["Python", "PyQt5", "APIs"],
  },
];

const projects = [
  {
    title: "unitree_go2w_ros2",
    href: "https://github.com/jj7258/unitree_go2w_ros2",
    desc: "A ROS2 integration for the Unitree Go2-W that grew out of my day-to-day need for reliable low-level control, state estimation hooks, and URDF configuration.",
    tags: ["ROS2", "C++", "SLAM", "Nav2", "URDF"],
    meta: "Open Source - 2025",
  },
  {
    title: "NavRover",
    href: "https://github.com/jj7258/NavRover",
    desc: "An autonomous rover project where I explored ROS navigation, DWA planning, rocker-mechanism mobility, and 2D/3D mapping with Octomap and RTABMap.",
    tags: ["ROS Noetic", "Python", "Gazebo", "Docker"],
    meta: "Aug 2024",
  },
  {
    title: "Autonomous Exploration Rover",
    href: "https://drive.google.com/file/d/1H4sHGYRPGfMQBwuxDTiyrNKeRgvNtVIF/view",
    desc: "My B.Tech thesis project: an exploration rover with IMU, encoders, depth sensing, Jetson Nano, a 6-DOF manipulator, GMapping, RTABMap, and ROS Nav Stack.",
    tags: ["ROS Noetic", "Jetson Nano", "RTABMap"],
    meta: "B.Tech Thesis - Apr 2024",
  },
  {
    title: "Pothole Detection - Deep Learning",
    href: "https://github.com/jj7258/intelunnati_Byte-Brigade",
    desc: "A computer-vision project for road-defect detection that helped me connect perception work to infrastructure problems in Indian road environments.",
    tags: ["YOLOv8", "Python", "Roboflow"],
    meta: "Intel Unnati - Jul 2023",
  },
  {
    title: "ROS 3D Mapping Rover + React UI",
    href: "https://github.com/jj7258/ROS-Based-Rover-With-3DMapping-and-User-Interface",
    desc: "A teleoperated rover and React interface for 3D mapping, built as an early bridge between robotics systems and usable operator-facing tools.",
    tags: ["ROS1", "React", "RTABMap"],
    meta: "Jun 2023",
  },
  {
    title: "Information Kiosk - School Campus",
    href: "https://github.com/jj7258/expert-guide",
    desc: "A deployed campus kiosk that taught me the practical side of building software people use every day: reliability, APIs, and UI clarity.",
    tags: ["Python", "PyQt5", "OpenWeather API"],
    meta: "Mar 2023",
  },
];

const education = [
  {
    badge: "B.Sc. - Data Science & Applications",
    school: "IIT Madras",
    period: "Sep 2021 - Present - Chennai, Tamil Nadu",
    stats: ["GPA 7.0 / 10", "Online + Hybrid"],
    notes: ["Pursued in parallel with B.Tech", "IIT Madras Robotics Club"],
  },
  {
    badge: "B.Tech - Robotics & Automation",
    school: "Saintgits College of Engineering",
    period: "Dec 2020 - Jul 2024 - Kottayam, Kerala",
    stats: ["CGPA 8.31 / 10", "Rank 6th / 68"],
    notes: ["Thesis: Autonomous Exploration Rover", "2nd Place - Final Year Project"],
  },
];

const awards = [
  ["Rank Holder - 6th / 68", "B.Tech Robotics & Automation - Saintgits 2024"],
  ["2nd Place - Final Year Project", "Autonomous Exploration Rover - RB-B 2020-24"],
  ["Google Cloud Foundations", "Google Cloud - Oct 2023"],
  ["Foundation in Programming & Data Science", "IIT Madras - May 2023"],
];

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function useReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach((node) => {
        (node as HTMLElement).style.transitionDelay = "0ms";
        node.classList.add("is-in");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("is-in");
            const staggerMs = parseFloat(el.style.transitionDelay) || 0;
            if (staggerMs > 0) {
              setTimeout(() => { el.style.transitionDelay = "0ms"; }, staggerMs + 800);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );

    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = ["about", "skills", "interests", "experience", "projects", "education"];
    const handler = () => {
      const offset = 140;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActive(ids[i]);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="section-head reveal">
      <div>
        <span className="eyebrow"><span className="status-dot" />{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {body && <p>{body}</p>}
    </div>
  );
}

function PillCta({ href, children, variant = "dark" }: { href: string; children: string; variant?: "dark" | "light" }) {
  return (
    <Button asChild variant={variant === "dark" ? "default" : "glass"} className={`btn-pill ${variant === "light" ? "btn-pill-light" : ""}`}>
      <a href={href}>
        <span>{children}</span>
        <span className="icon-wrap"><ArrowRight size={13} strokeWidth={1.8} /></span>
      </a>
    </Button>
  );
}

function DoubleBezel({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`bezel ${className}`} style={style}>
      <div className="bezel-core">{children}</div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const activeSection = useActiveSection();
  useReveal();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <div className="ambient-mesh" aria-hidden="true" />

      <div className="nav-shell">
        <header className="nav-wrap">
          <a href="#hero" className="brand" aria-label="Joel Georgie Jacob home">
            <span className="brand-mark">JG</span>
            <span>Joel</span>
          </a>
          <nav className="nav-links" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={activeSection === link.href.slice(1) ? "page" : undefined}
              >{link.label}</a>
            ))}
          </nav>
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? <Sun size={15} strokeWidth={1.8} /> : <Moon size={15} strokeWidth={1.8} />}
          </button>
          <PillCta href="#contact">Contact</PillCta>
        </header>
      </div>

      <main>
        <section id="hero" className="wrap hero reveal">
          <div className="hero-copy">
            <h1>Joel Georgie Jacob</h1>
            <p className="hero-kicker">I build robots toward the messy real world.</p>
            <p className="lede">
              I work on SLAM, LiDAR navigation, and field deployment for legged platforms. I care about the gap between a clean demo and a robot that still works when the environment stops being convenient.
            </p>
            <div className="actions">
              <PillCta href="#about">About me</PillCta>
              <a href="#interests" className="ghost-link">What I am thinking about</a>
            </div>
          </div>

          <DoubleBezel className="portrait-card">
            <div className="portrait-frame">
              <img src="/assets/img/profile-img.jpg" alt="Joel Georgie Jacob" />
            </div>
            <div className="portrait-caption">
              <span className="meta">current focus</span>
              <p>Autonomous navigation, SLAM robustness, and field robotics systems that survive real deployment conditions.</p>
            </div>
          </DoubleBezel>
        </section>

        <section id="about" className="block wrap">
          <div className="about-layout reveal">
            <div className="about-copy">
              <span className="eyebrow"><span className="status-dot" />01 - About</span>
              <h2>Who I am</h2>
              <p>
                I am currently an Associate Robotics Engineer at <strong>Strider Robotics, ARTPARK, IISc</strong>. Most of my work sits close to real deployment: evaluating SLAM and odometry stacks, bringing up robots, watching logs, and figuring out why a system behaves differently outside a controlled setup.
              </p>
              <p>
                My path has been a mix of robotics, automation, and data science. I studied Robotics & Automation at Saintgits and I am also pursuing Data Science through IIT Madras. That combination has shaped the way I think: I like classical robotics, but I am increasingly interested in where learned representations can make systems more adaptable.
              </p>
              <p>
                Outside the bullet points, I am the kind of person who enjoys taking apart a failure mode until it becomes understandable. The questions that hold my attention are usually about robustness, generalization, and the difference between a result that looks good once and a system that can be trusted repeatedly.
              </p>
            </div>
            <DoubleBezel className="contact-card">
              <span className="meta">contact</span>
              <a className="info-link" href="mailto:joelgj02@gmail.com"><Mail size={16} /> joelgj02@gmail.com</a>
              <a className="info-link" href="https://linkedin.com/in/joelj7258" target="_blank" rel="noreferrer"><Linkedin size={16} /> linkedin.com/in/joelj7258</a>
              <a className="info-link" href="https://github.com/jj7258" target="_blank" rel="noreferrer"><Github size={16} /> github.com/jj7258</a>
              <div className="info-link"><MapPin size={16} /> Bangalore, Karnataka, India</div>
              <a className="info-link resume-link" href="#" target="_blank" rel="noreferrer"><FileText size={16} /> Resume / CV</a>
            </DoubleBezel>
          </div>
        </section>

        <section id="skills" className="block wrap">
          <SectionHeading eyebrow="02 - Tools" title="What I work with" />
          <div className="skill-table reveal">
            {skills.map(([label, items]) => (
              <div key={label} className="skill-row">
                <span>{label}</span>
                <p>{items}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="interests" className="block wrap">
          <SectionHeading
            eyebrow="03 - Interests"
            title="What I'm working toward"
            body="This is the part of robotics I want to keep moving toward: systems that adapt better when the world refuses to match the test setup."
          />
          <div className="interest-grid">
            {interests.map((interest, i) => (
              <DoubleBezel key={interest.title} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="meta">interest</span>
                <h3>{interest.title}</h3>
                <p>{interest.text}</p>
              </DoubleBezel>
            ))}
          </div>
          <DoubleBezel className="research-card reveal">
            <p>
              The research question I keep circling is simple to state and hard to solve: why do autonomous systems that perform well in structured environments degrade predictably when conditions change?
            </p>
            <p>
              Benchmarking odometry and mapping stacks across multi-floor facilities and outdoor environments has made that question feel concrete. State-estimation accuracy matters, but field performance also depends on assumptions about surfaces, lighting, sensor placement, compute, recovery behavior, and how the whole stack fails.
            </p>
            <p>
              Long term, I want to work on adaptable state estimation and scene understanding by combining probabilistic robotics with learned representations that generalize beyond a narrow training environment.
            </p>
          </DoubleBezel>
        </section>

        <section id="experience" className="block wrap">
          <SectionHeading eyebrow="04 - Experience" title="Where I've worked" />
          <div className="timeline">
            {experiences.map((item, i) => (
              <DoubleBezel key={`${item.role}-${item.date}`} className="timeline-card reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="timeline-head">
                  <div>
                    <h3>{item.role}</h3>
                    <p>{item.org}</p>
                  </div>
                  <div className="date-wrap">
                    <span>{item.date}</span>
                    {item.current && <strong>Current</strong>}
                  </div>
                </div>
                <ul>
                  {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
                <div className="tag-row">
                  {item.tags.map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
                </div>
              </DoubleBezel>
            ))}
          </div>
        </section>

        <section id="projects" className="block wrap">
          <SectionHeading eyebrow="05 - Projects" title="Things I've built" body="Some were research-adjacent, some were practical tools, and some were early attempts that taught me what breaks first." />
          <div className="project-grid">
            {projects.map((project, index) => (
              <a key={project.title} href={project.href} target="_blank" rel="noreferrer" className="project-card bezel reveal" style={{ transitionDelay: `${index * 55}ms` }}>
                <div className="bezel-core">
                  <div className="project-top">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <ArrowUpRight size={18} strokeWidth={1.7} />
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
                  </div>
                  <div className="project-meta">{project.meta}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="education" className="block wrap">
          <SectionHeading eyebrow="06 - Education" title="Where I studied" />
          <div className="education-grid">
            {education.map((item, i) => (
              <DoubleBezel key={item.school} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <span className="meta">{item.badge}</span>
                <h3>{item.school}</h3>
                <p>{item.period}</p>
                <div className="stat-row">
                  {item.stats.map((stat) => <span key={stat}>{stat}</span>)}
                </div>
                <ul className="note-list">
                  {item.notes.map((note) => <li key={note}>{note}</li>)}
                </ul>
              </DoubleBezel>
            ))}
          </div>
          <DoubleBezel className="awards-card reveal">
            <span className="meta">// Awards & Certifications</span>
            <div className="awards-list">
              {awards.map(([title, detail]) => (
                <div key={title} className="award-row">
                  <span className="award-mark" aria-hidden="true" />
                  <div>
                    <strong>{title}</strong>
                    <span>{detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </DoubleBezel>
        </section>

        <section id="contact" className="closing reveal">
          <div className="closing-inner">
            <span className="eyebrow"><span className="status-dot" />Contact</span>
            <h2>Always happy to talk about robots and research ideas.</h2>
            <p>If you are working on autonomous navigation, SLAM, field robotics, or research that sits between learning and robotics, I would like to hear from you.</p>
            <PillCta href="mailto:joelgj02@gmail.com" variant="light">Send a message</PillCta>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-row">
          <span>Joel Georgie Jacob - Bangalore, India - 2026</span>
          <span><a href="#about">About</a> - <a href="#projects">Projects</a> - <a href="#contact">Contact</a> - <a href="https://linkedin.com/in/joelj7258" target="_blank" rel="noreferrer">LinkedIn</a> - <a href="https://github.com/jj7258" target="_blank" rel="noreferrer">GitHub</a></span>
        </div>
      </footer>
    </div>
  );
}

export default App;
