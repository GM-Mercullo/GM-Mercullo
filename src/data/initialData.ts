import { PortfolioData } from '../types';

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: "GM Mercullo",
    headline: "Aspiring Software Developer | Network Engineer | Cybersecurity Analyst",
    introduction: "I'm a programmer in progress who believes the best way to learn is by building. I enjoy solving problems, experimenting with new technologies, and turning ideas into functional projects.",
    extendedBio: "My technical path connects software development, computer networking, and cybersecurity analysis. Rather than remaining in theory, I learn by building: from writing packet inspection tools in NetworkLabApp and integrating Android screen-mirroring utilities in scrcpy-hub-app, to building interactive web media systems. I aim to create secure, reliable, and user-friendly software that solves real problems.",
    email: "gmmercullo99@gmail.com",
    github: "https://github.com/GM-Mercullo",
    linkedin: "https://www.linkedin.com/in/gm-mercullo-160a41438/",
    resumeUrl: "#resume",
    adminPasscode: "alohomora",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
  },
  projects: [
    {
      id: "network-lab-app",
      title: "NetworkLabApp",
      subtitle: "Networking Educational Lab & Packet Simulation Engine",
      description: "A networking-focused educational application engineered to help students and aspiring engineers visualize packet encapsulation, calculate complex IPv4/IPv6 subnets, test topology routes, and understand the OSI 7-Layer model through practical software simulation.",
      mainFeatures: [
        "Interactive IPv4 and IPv6 Subnet Calculator with VLSM partitioning",
        "OSI 7-Layer packet encapsulation and protocol header inspector",
        "Visual network topology designer connecting simulated routers and host nodes",
        "Built-in diagnostic glossary and real-time networking quiz mode"
      ],
      technologies: ["Python", "Tkinter", "Socket API", "Networking", "Subnetting", "OSI Model"],
      githubUrl: "https://github.com/GM-Mercullo/NetworkLabApp",
      demoUrl: "",
      imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=900",
      isFeatured: true,
      category: "networking",
      verifiedCapabilities: "Verified standalone application running local subnetting calculations, packet structure visualizations, and topology simulations."
    },
    {
      id: "gms-kareoke",
      title: "GMs-Kareoke",
      subtitle: "Synchronized Lyrics Audio & Media Experience",
      description: "A karaoke application engineered for responsive audio playback, precision-synced lyrics timing, dynamic playlist queuing, and custom visual atmospheres. Designed to eliminate lyric desynchronization across variable audio bitrates.",
      mainFeatures: [
        "High-resolution audio timestamp synchronization with live lyric scrolling",
        "Track library management with search, queueing, and volume modulation",
        "Responsive, accessible playback controls with keyboard navigation support",
        "Custom warm atmospheric design inspired by acoustic lounge settings"
      ],
      technologies: ["JavaScript", "HTML5 Audio API", "CSS3 Animations", "Media Session", "Responsive UI"],
      githubUrl: "https://github.com/GM-Mercullo/GMs-Kareoke",
      demoUrl: "",
      imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800",
      isFeatured: false,
      category: "software",
      verifiedCapabilities: "Browser-based and desktop audio engine with millisecond precision timestamp mapping."
    },
    {
      id: "scrcpy-hub-app",
      title: "scrcpy-hub-app",
      subtitle: "Unified Management Hub for the Scrcpy Android Ecosystem",
      description: "A desktop management utility built around the open-source scrcpy ecosystem. Streamlines device discovery over USB and wireless ADB, manages preset video configurations (bitrate, resolution, buffer), and facilitates screen mirroring without terminal command memorization.",
      mainFeatures: [
        "One-click discovery and connection for wired USB and wireless TCP/IP ADB devices",
        "Presets manager for resolution scaling, bitrate limits, and 60fps locking",
        "Audio forwarding and screen orientation toggle shortcuts",
        "Automated screen recording and clipboard synchronization"
      ],
      technologies: ["Python", "Scrcpy CLI", "Android Debug Bridge (ADB)", "Shell Scripting", "Desktop UI"],
      githubUrl: "https://github.com/GM-Mercullo/scrcpy-hub-app",
      demoUrl: "",
      imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800",
      isFeatured: false,
      category: "tool",
      verifiedCapabilities: "Wrapper and preset manager executing verified ADB and scrcpy command pipelines."
    },
    {
      id: "ngl-ni-gm2",
      title: "NGLNiGM2",
      subtitle: "Anonymous Interactive Q&A Messaging Platform",
      description: "An anonymous communication web application designed to facilitate secure, engaging Q&A interactions. Features dynamic response card rendering for social media sharing, content sanitization, and mobile-first responsive layouts.",
      mainFeatures: [
        "Anonymous message dispatching with unique personal profile links",
        "Automated stylized image card generation for answering on social platforms",
        "Input sanitization and anti-spam keyword filtration",
        "Lightweight, high-speed mobile web interface with dark and warm themes"
      ],
      technologies: ["React", "JavaScript", "REST APIs", "Tailwind CSS", "Web Storage"],
      githubUrl: "https://github.com/GM-Mercullo/NGLNiGM2",
      demoUrl: "",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
      isFeatured: false,
      category: "web",
      verifiedCapabilities: "Client-side web application handling anonymous message composition and visual card exports."
    }
  ],
  experiences: [
    {
      id: "exp-grade12-intern",
      position: "Marketing Intern — Technology Marketing",
      organization: "Grade 12 On-The-Job Training",
      period: "March 4–15, 2024",
      responsibilities: [
        "Assisted with marketing electronics and technology products.",
        "Prepared certificate layouts for fellow interns.",
        "Supported promotional activities."
      ],
      notes: "An honest record of my Grade 12 on-the-job training. While concentrated in technology product marketing and digital layout preparation rather than software engineering, it built strong foundations in collaborative teamwork, deadline discipline, and professional communication."
    }
  ],
  credentials: [
    {
      id: "cred-google-ai",
      name: "Google AI Professional Certificate",
      issuingPlatform: "Coursera & Google",
      completionDate: "July 28, 2026",
      verificationUrl: "https://coursera.org/verify/professional-cert/1U4UERATKE5S",
      skillsLearned: [
        "Applied Artificial Intelligence",
        "Machine Learning Foundations",
        "Prompt Engineering & Workflows",
        "Responsible AI Governance & Ethics",
        "Python AI Frameworks"
      ],
      description: "Official credential issued through Google certifying core competencies in applied machine learning, neural architectures, ethical AI evaluation, and AI-assisted software engineering."
    }
  ],
  skills: [
    // 1. Programming & Software Development
    {
      id: "skill-python",
      name: "Python",
      category: "programming",
      description: "Building educational network tools, CLI utilities, socket applications, and automation scripts.",
      practicalApplication: "Core language utilized in NetworkLabApp and scrcpy-hub-app automation."
    },
    {
      id: "skill-javascript",
      name: "JavaScript & TypeScript",
      category: "programming",
      description: "Modern ES6+ syntax, asynchronous event handling, DOM manipulation, and typed component architecture.",
      practicalApplication: "Frontend logic in GMs-Kareoke and NGLNiGM2 web applications."
    },
    {
      id: "skill-react",
      name: "React & Modern UI",
      category: "programming",
      description: "Component-based architecture, hooks (useState, useEffect, custom hooks), and responsive layouts.",
      practicalApplication: "Interactive web portals and reusable component systems."
    },
    {
      id: "skill-html-css-tailwind",
      name: "HTML5, CSS3 & Tailwind CSS",
      category: "programming",
      description: "Semantic markup, modern flexbox/grid layout systems, responsive typography, and design tokens.",
      practicalApplication: "Crafting atmospheric, accessible light/dark theme systems."
    },
    {
      id: "skill-c-cpp",
      name: "C & C++ Fundamentals",
      category: "programming",
      description: "Fundamental memory allocation, pointers, data structures, and algorithmic logic.",
      practicalApplication: "Understanding low-level hardware communication and systems programming."
    },

    // 2. Networking
    {
      id: "skill-tcpip-osi",
      name: "TCP/IP & The OSI 7-Layer Model",
      category: "networking",
      description: "Deep understanding of packet encapsulation, transport mechanisms (TCP reliability vs UDP speed), and socket communication.",
      practicalApplication: "Simulated within NetworkLabApp's packet encapsulation visualizer."
    },
    {
      id: "skill-subnetting",
      name: "IPv4 & IPv6 Subnetting (CIDR & VLSM)",
      category: "networking",
      description: "Binary-to-decimal calculations, Variable Length Subnet Masking, network address allocation, and host sizing.",
      practicalApplication: "Engineered algorithmic subnet partitioning calculations in NetworkLabApp."
    },
    {
      id: "skill-wireshark",
      name: "Packet Analysis & Wireshark",
      category: "networking",
      description: "Capturing and dissecting live network traffic, analyzing three-way handshakes, and diagnosing packet anomalies.",
      practicalApplication: "Inspecting protocol headers (Ethernet, IP, TCP, HTTP) for debugging and traffic verification."
    },
    {
      id: "skill-routing-switching",
      name: "Routing & Switching Concepts",
      category: "networking",
      description: "Static routing principles, default gateways, VLAN segmentation, and ARP table resolution.",
      practicalApplication: "Simulating enterprise LAN layouts and packet forwarding pathways."
    },
    {
      id: "skill-network-services",
      name: "Core Network Services (DNS, DHCP, NAT)",
      category: "networking",
      description: "Infrastructure services enabling IP address leasing, domain name resolution, and private-to-public network address translation.",
      practicalApplication: "Configuring client-server connectivity in virtual lab environments."
    },

    // 3. Cybersecurity
    {
      id: "skill-network-defense",
      name: "Network Defense & Firewall Concepts",
      category: "cybersecurity",
      description: "Packet filtering rules, stateful inspection fundamentals, DMZ configuration, and attack surface reduction.",
      practicalApplication: "Designing perimeter security strategies for local and simulated networks."
    },
    {
      id: "skill-vuln-assessment",
      name: "Vulnerability Assessment & Enumeration",
      category: "cybersecurity",
      description: "Scanning host ports (Nmap), identifying exposed services, banner grabbing, and assessing misconfigurations.",
      practicalApplication: "Security auditing in isolated laboratory environments to identify entry points."
    },
    {
      id: "skill-linux-hardening",
      name: "Linux Hardening & Permissions",
      category: "cybersecurity",
      description: "POSIX permissions (chmod/chown), sudo least-privilege policies, SSH key-pair authentication, and secure shell configuration.",
      practicalApplication: "Hardening Debian and Ubuntu environments against unauthorized local access."
    },
    {
      id: "skill-web-security",
      name: "Web Security Fundamentals (OWASP)",
      category: "cybersecurity",
      description: "Recognizing and mitigating common vulnerabilities including SQL Injection, XSS, insecure headers, and CSRF.",
      practicalApplication: "Input validation and sanitization implemented in web endpoints and forms."
    },
    {
      id: "skill-crypto-basics",
      name: "Applied Cryptography Principles",
      category: "cybersecurity",
      description: "Symmetric vs asymmetric encryption, cryptographic hashing (SHA-256), and SSL/TLS certificate verification.",
      practicalApplication: "Secure credential handling and data integrity verification."
    },

    // 4. Tools & Development Environments
    {
      id: "skill-git-github",
      name: "Git & GitHub",
      category: "tools",
      description: "Version control workflows, commit discipline, branch management, merge resolution, and repository documentation.",
      practicalApplication: "Maintaining open-source projects and codebases across GM-Mercullo GitHub."
    },
    {
      id: "skill-linux-cli",
      name: "Linux & Bash CLI",
      category: "tools",
      description: "Command-line file management, pipe manipulation, process inspection, and administrative shell scripting.",
      practicalApplication: "Primary development and deployment environment for networking and utility scripts."
    },
    {
      id: "skill-adb-scrcpy",
      name: "Android Debug Bridge (ADB) & Scrcpy",
      category: "tools",
      description: "Wired and wireless device bridging, port forwarding, screen streaming, and package control.",
      practicalApplication: "Engineered desktop presets and automation wrappers in scrcpy-hub-app."
    },
    {
      id: "skill-dev-tools",
      name: "VS Code & Browser DevTools",
      category: "tools",
      description: "Code editing, breakpoint debugging, network waterfall inspection, and DOM accessibility audits.",
      practicalApplication: "Daily programming environment for responsive application engineering."
    },
    {
      id: "skill-packet-tracer",
      name: "Cisco Packet Tracer",
      category: "tools",
      description: "Virtual network topology configuration, device CLI configuration (Cisco IOS), and ICMP ping testing.",
      practicalApplication: "Designing multi-router network topologies and troubleshooting simulated packet loss."
    }
  ],
  learningEntries: [
    {
      id: "learn-1",
      type: "milestone",
      title: "Completed NetworkLabApp Subnetting & Topology Simulation Core",
      description: "Built the core algorithmic engine for calculating VLSM subnets and visually tracing packet encapsulation across layers in Python.",
      date: "August 2026",
      tags: ["Python", "Networking", "Subnetting", "Milestone"]
    },
    {
      id: "learn-2",
      type: "technology",
      title: "Explored Scrcpy Video Encoding & Wireless ADB Tunnels",
      description: "Investigated how scrcpy encodes low-latency H.264 video streams over TCP sockets, developing scrcpy-hub-app to automate connection parameters.",
      date: "September 2026",
      tags: ["ADB", "Scrcpy", "Android", "Systems"]
    },
    {
      id: "learn-3",
      type: "problem-solved",
      title: "Solved Lyric-Audio Drift in GMs-Kareoke with Microsecond Time Offsets",
      description: "Replaced setInterval polling with requestAnimationFrame and HTML5 audio currentTime binding, eliminating lyric drift on lower-spec hardware.",
      date: "October 2026",
      tags: ["JavaScript", "HTML5 Audio", "Performance", "Debugging"]
    },
    {
      id: "learn-4",
      type: "goal",
      title: "Deepening Hands-On Penetration Testing & Cisco CCNA Preparation",
      description: "Actively studying for industry-standard network engineering and cybersecurity certifications with hands-on packet capture and Linux lab challenges.",
      date: "Current Focus",
      tags: ["Cybersecurity", "CCNA", "Security+", "Goals"]
    }
  ],
  messages: [
    {
      id: "msg-welcome",
      senderName: "Enchanted Library Guide",
      senderEmail: "welcome@gm-mercullo.dev",
      subject: "Welcome to the GM Mercullo Portfolio Chamber",
      message: "This is your Owl Post message inbox. Any inquiries dispatched through the contact form at the foot of your portfolio will arrive safely right here.",
      timestamp: "Today at 08:00 AM",
      read: false
    }
  ]
};
