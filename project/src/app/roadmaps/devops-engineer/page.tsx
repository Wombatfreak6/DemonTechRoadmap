"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type Stage = "Beginner" | "Intermediate" | "Advanced" | "Expert";
type Difficulty = "Starter" | "Core" | "Applied" | "Advanced" | "Expert";
type ResourceCategory = "Official Docs" | "Certification Resources" | "Labs & Sandboxes" | "Community Resources" | "Open Source Projects";

type Resource = {
  label: string;
  href: string;
  category: ResourceCategory;
};

type RoadmapNode = {
  id: string;
  title: string;
  stage: Stage;
  difficulty: Difficulty;
  duration: string;
  description: string;
  prerequisites: string[];
  topics: string[];
  skillsGained: string[];
  learningOutcomes: string[];
  resources: Resource[];
  practiceExercises: string[];
  miniProject: string;
  realWorldApplications: string[];
  quiz: string;
};

type StageSummary = {
  stage: Stage;
  duration: string;
  outcome: string;
};

type ProjectTrack = {
  stage: Stage;
  projects: string[];
};

const storageKeys = {
  completed: "demontech-devops-roadmap-completed",
  bookmarked: "demontech-devops-roadmap-bookmarked",
  notes: "demontech-devops-roadmap-notes",
};

const stageSummaries: StageSummary[] = [
  {
    stage: "Beginner",
    duration: "15-18 weeks",
    outcome: "Operate Linux systems, understand networking, automate with shell scripts, and collaborate through Git.",
  },
  {
    stage: "Intermediate",
    duration: "28-32 weeks",
    outcome: "Build CI/CD pipelines, run containers, deploy cloud infrastructure, and manage repeatable configuration.",
  },
  {
    stage: "Advanced",
    duration: "32-38 weeks",
    outcome: "Operate Kubernetes platforms, observability stacks, secure delivery flows, SRE practices, and platform engineering systems.",
  },
  {
    stage: "Expert",
    duration: "18-26 weeks",
    outcome: "Design advanced cloud architecture, DR plans, distributed infrastructure, incident systems, and DevOps leadership practices.",
  },
];

const roadmapNodes: RoadmapNode[] = [
  {
    "id": "internet-and-networking-fundamentals",
    "title": "Internet & Networking Fundamentals",
    "stage": "Beginner",
    "difficulty": "Starter",
    "duration": "2 weeks",
    "description": "Internet & Networking Fundamentals turns How the Internet Works, DNS, HTTP/HTTPS into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Basic command-line comfort"
    ],
    "topics": [
      "How the Internet Works",
      "DNS",
      "HTTP/HTTPS",
      "TCP/IP",
      "UDP",
      "Ports",
      "Firewalls",
      "Load Balancers",
      "Reverse Proxies"
    ],
    "skillsGained": [
      "Operate How the Internet Works in production-like environments",
      "Connect DNS to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Internet & Networking Fundamentals impacts reliability and delivery",
      "Build or configure a lab around How the Internet Works",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Cloudflare Learning Center",
        "href": "https://www.cloudflare.com/learning/",
        "category": "Official Docs"
      },
      {
        "label": "MDN HTTP overview",
        "href": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
        "category": "Official Docs"
      },
      {
        "label": "Networking labs",
        "href": "https://labs.iximiuz.com/",
        "category": "Labs & Sandboxes"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for How the Internet Works.",
      "Write a troubleshooting checklist for How the Internet Works and DNS.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a internet & networking fundamentals lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Internet & Networking Fundamentals, and how would you detect it?"
  },
  {
    "id": "linux-fundamentals",
    "title": "Linux Fundamentals",
    "stage": "Beginner",
    "difficulty": "Starter",
    "duration": "3 weeks",
    "description": "Linux Fundamentals turns Linux File System, Shell Commands, Permissions into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Internet & Networking Fundamentals"
    ],
    "topics": [
      "Linux File System",
      "Shell Commands",
      "Permissions",
      "Processes",
      "System Services",
      "Package Management"
    ],
    "skillsGained": [
      "Operate Linux File System in production-like environments",
      "Connect Shell Commands to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Linux Fundamentals impacts reliability and delivery",
      "Build or configure a lab around Linux File System",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Linux Journey",
        "href": "https://linuxjourney.com/",
        "category": "Labs & Sandboxes"
      },
      {
        "label": "Ubuntu Server docs",
        "href": "https://ubuntu.com/server/docs",
        "category": "Official Docs"
      },
      {
        "label": "The Linux Documentation Project",
        "href": "https://tldp.org/",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Linux File System.",
      "Write a troubleshooting checklist for Linux File System and Shell Commands.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a linux fundamentals lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Linux Fundamentals, and how would you detect it?"
  },
  {
    "id": "bash-and-shell-scripting",
    "title": "Bash & Shell Scripting",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "3 weeks",
    "description": "Bash & Shell Scripting turns Variables, Loops, Functions into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Linux Fundamentals"
    ],
    "topics": [
      "Variables",
      "Loops",
      "Functions",
      "Automation Scripts",
      "Cron Jobs"
    ],
    "skillsGained": [
      "Operate Variables in production-like environments",
      "Connect Loops to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Bash & Shell Scripting impacts reliability and delivery",
      "Build or configure a lab around Variables",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Bash manual",
        "href": "https://www.gnu.org/software/bash/manual/",
        "category": "Official Docs"
      },
      {
        "label": "ShellCheck",
        "href": "https://www.shellcheck.net/",
        "category": "Labs & Sandboxes"
      },
      {
        "label": "Bash Guide",
        "href": "https://mywiki.wooledge.org/BashGuide",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Variables.",
      "Write a troubleshooting checklist for Variables and Loops.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a bash & shell scripting lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Bash & Shell Scripting, and how would you detect it?"
  },
  {
    "id": "version-control",
    "title": "Version Control",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "1 week",
    "description": "Version Control turns Git, GitHub, Branching into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Bash & Shell Scripting"
    ],
    "topics": [
      "Git",
      "GitHub",
      "Branching",
      "Pull Requests",
      "Merge Strategies"
    ],
    "skillsGained": [
      "Operate Git in production-like environments",
      "Connect GitHub to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Version Control impacts reliability and delivery",
      "Build or configure a lab around Git",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Git docs",
        "href": "https://git-scm.com/doc",
        "category": "Official Docs"
      },
      {
        "label": "GitHub Skills",
        "href": "https://skills.github.com/",
        "category": "Labs & Sandboxes"
      },
      {
        "label": "DemonTech Git roadmap",
        "href": "/roadmaps/git",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Git.",
      "Write a troubleshooting checklist for Git and GitHub.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a version control lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Version Control, and how would you detect it?"
  },
  {
    "id": "programming-basics",
    "title": "Programming Basics",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "3 weeks",
    "description": "Programming Basics turns Python, Go, JavaScript into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Version Control"
    ],
    "topics": [
      "Python",
      "Go",
      "JavaScript",
      "Automation Scripts"
    ],
    "skillsGained": [
      "Operate Python in production-like environments",
      "Connect Go to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Programming Basics impacts reliability and delivery",
      "Build or configure a lab around Python",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Python docs",
        "href": "https://docs.python.org/3/",
        "category": "Official Docs"
      },
      {
        "label": "Go docs",
        "href": "https://go.dev/doc/",
        "category": "Official Docs"
      },
      {
        "label": "Exercism",
        "href": "https://exercism.org/",
        "category": "Labs & Sandboxes"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Python.",
      "Write a troubleshooting checklist for Python and Go.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a programming basics lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Programming Basics, and how would you detect it?"
  },
  {
    "id": "operating-systems",
    "title": "Operating Systems",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "3 weeks",
    "description": "Operating Systems turns Linux Internals, Memory Management, CPU Scheduling into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Programming Basics"
    ],
    "topics": [
      "Linux Internals",
      "Memory Management",
      "CPU Scheduling",
      "Process Management"
    ],
    "skillsGained": [
      "Operate Linux Internals in production-like environments",
      "Connect Memory Management to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Operating Systems impacts reliability and delivery",
      "Build or configure a lab around Linux Internals",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Operating Systems: Three Easy Pieces",
        "href": "https://pages.cs.wisc.edu/~remzi/OSTEP/",
        "category": "Community Resources"
      },
      {
        "label": "Linux kernel docs",
        "href": "https://docs.kernel.org/",
        "category": "Official Docs"
      },
      {
        "label": "Brendan Gregg systems performance",
        "href": "https://www.brendangregg.com/systems-performance-2nd-edition-book.html",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Linux Internals.",
      "Write a troubleshooting checklist for Linux Internals and Memory Management.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a operating systems lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Operating Systems, and how would you detect it?"
  },
  {
    "id": "web-servers-and-reverse-proxies",
    "title": "Web Servers & Reverse Proxies",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "Web Servers & Reverse Proxies turns Nginx, Apache, Caddy into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Operating Systems"
    ],
    "topics": [
      "Nginx",
      "Apache",
      "Caddy",
      "Load Balancing"
    ],
    "skillsGained": [
      "Operate Nginx in production-like environments",
      "Connect Apache to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Web Servers & Reverse Proxies impacts reliability and delivery",
      "Build or configure a lab around Nginx",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Nginx docs",
        "href": "https://nginx.org/en/docs/",
        "category": "Official Docs"
      },
      {
        "label": "Apache docs",
        "href": "https://httpd.apache.org/docs/",
        "category": "Official Docs"
      },
      {
        "label": "Caddy docs",
        "href": "https://caddyserver.com/docs/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Nginx.",
      "Write a troubleshooting checklist for Nginx and Apache.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a web servers & reverse proxies lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Web Servers & Reverse Proxies, and how would you detect it?"
  },
  {
    "id": "databases-for-devops",
    "title": "Databases for DevOps",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "Databases for DevOps turns PostgreSQL, MySQL, MongoDB into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Web Servers & Reverse Proxies"
    ],
    "topics": [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Backups & Recovery"
    ],
    "skillsGained": [
      "Operate PostgreSQL in production-like environments",
      "Connect MySQL to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Databases for DevOps impacts reliability and delivery",
      "Build or configure a lab around PostgreSQL",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "PostgreSQL docs",
        "href": "https://www.postgresql.org/docs/",
        "category": "Official Docs"
      },
      {
        "label": "Redis docs",
        "href": "https://redis.io/docs/latest/",
        "category": "Official Docs"
      },
      {
        "label": "Percona backup resources",
        "href": "https://www.percona.com/resources",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for PostgreSQL.",
      "Write a troubleshooting checklist for PostgreSQL and MySQL.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a databases for devops lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Databases for DevOps, and how would you detect it?"
  },
  {
    "id": "ci-cd-fundamentals",
    "title": "CI/CD Fundamentals",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "CI/CD Fundamentals turns Continuous Integration, Continuous Deployment, Continuous Delivery into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Databases for DevOps"
    ],
    "topics": [
      "Continuous Integration",
      "Continuous Deployment",
      "Continuous Delivery",
      "Pipeline Design"
    ],
    "skillsGained": [
      "Operate Continuous Integration in production-like environments",
      "Connect Continuous Deployment to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how CI/CD Fundamentals impacts reliability and delivery",
      "Build or configure a lab around Continuous Integration",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "GitHub Actions docs",
        "href": "https://docs.github.com/en/actions",
        "category": "Official Docs"
      },
      {
        "label": "Continuous Delivery Foundation",
        "href": "https://cd.foundation/",
        "category": "Community Resources"
      },
      {
        "label": "Google SRE release engineering",
        "href": "https://sre.google/sre-book/release-engineering/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Continuous Integration.",
      "Write a troubleshooting checklist for Continuous Integration and Continuous Deployment.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a ci/cd fundamentals lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in CI/CD Fundamentals, and how would you detect it?"
  },
  {
    "id": "ci-cd-tools",
    "title": "CI/CD Tools",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "CI/CD Tools turns GitHub Actions, GitLab CI/CD, Jenkins into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "CI/CD Fundamentals"
    ],
    "topics": [
      "GitHub Actions",
      "GitLab CI/CD",
      "Jenkins",
      "CircleCI"
    ],
    "skillsGained": [
      "Operate GitHub Actions in production-like environments",
      "Connect GitLab CI/CD to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how CI/CD Tools impacts reliability and delivery",
      "Build or configure a lab around GitHub Actions",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "GitLab CI docs",
        "href": "https://docs.gitlab.com/ee/ci/",
        "category": "Official Docs"
      },
      {
        "label": "Jenkins docs",
        "href": "https://www.jenkins.io/doc/",
        "category": "Official Docs"
      },
      {
        "label": "CircleCI docs",
        "href": "https://circleci.com/docs/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for GitHub Actions.",
      "Write a troubleshooting checklist for GitHub Actions and GitLab CI/CD.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a ci/cd tools lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in CI/CD Tools, and how would you detect it?"
  },
  {
    "id": "containerization",
    "title": "Containerization",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "4 weeks",
    "description": "Containerization turns Docker, Images, Containers into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "CI/CD Tools"
    ],
    "topics": [
      "Docker",
      "Images",
      "Containers",
      "Docker Compose",
      "Registries"
    ],
    "skillsGained": [
      "Operate Docker in production-like environments",
      "Connect Images to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Containerization impacts reliability and delivery",
      "Build or configure a lab around Docker",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Docker docs",
        "href": "https://docs.docker.com/",
        "category": "Official Docs"
      },
      {
        "label": "Play with Docker",
        "href": "https://labs.play-with-docker.com/",
        "category": "Labs & Sandboxes"
      },
      {
        "label": "Docker curriculum",
        "href": "https://docker-curriculum.com/",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Docker.",
      "Write a troubleshooting checklist for Docker and Images.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a containerization lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Containerization, and how would you detect it?"
  },
  {
    "id": "cloud-fundamentals",
    "title": "Cloud Fundamentals",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "5 weeks",
    "description": "Cloud Fundamentals turns AWS, Azure, Google Cloud into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Containerization"
    ],
    "topics": [
      "AWS",
      "Azure",
      "Google Cloud",
      "Cloud Concepts"
    ],
    "skillsGained": [
      "Operate AWS in production-like environments",
      "Connect Azure to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Cloud Fundamentals impacts reliability and delivery",
      "Build or configure a lab around AWS",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "AWS docs",
        "href": "https://docs.aws.amazon.com/",
        "category": "Official Docs"
      },
      {
        "label": "Azure docs",
        "href": "https://learn.microsoft.com/en-us/azure/",
        "category": "Official Docs"
      },
      {
        "label": "Google Cloud docs",
        "href": "https://cloud.google.com/docs",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for AWS.",
      "Write a troubleshooting checklist for AWS and Azure.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a cloud fundamentals lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Cloud Fundamentals, and how would you detect it?"
  },
  {
    "id": "infrastructure-as-code",
    "title": "Infrastructure as Code",
    "stage": "Intermediate",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Infrastructure as Code turns Terraform, OpenTofu, Pulumi into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Cloud Fundamentals"
    ],
    "topics": [
      "Terraform",
      "OpenTofu",
      "Pulumi"
    ],
    "skillsGained": [
      "Operate Terraform in production-like environments",
      "Connect OpenTofu to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Infrastructure as Code impacts reliability and delivery",
      "Build or configure a lab around Terraform",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Terraform docs",
        "href": "https://developer.hashicorp.com/terraform/docs",
        "category": "Official Docs"
      },
      {
        "label": "OpenTofu docs",
        "href": "https://opentofu.org/docs/",
        "category": "Official Docs"
      },
      {
        "label": "Pulumi docs",
        "href": "https://www.pulumi.com/docs/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Terraform.",
      "Write a troubleshooting checklist for Terraform and OpenTofu.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a infrastructure as code lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Infrastructure as Code, and how would you detect it?"
  },
  {
    "id": "configuration-management",
    "title": "Configuration Management",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "Configuration Management turns Ansible, Chef, Puppet into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Infrastructure as Code"
    ],
    "topics": [
      "Ansible",
      "Chef",
      "Puppet"
    ],
    "skillsGained": [
      "Operate Ansible in production-like environments",
      "Connect Chef to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Configuration Management impacts reliability and delivery",
      "Build or configure a lab around Ansible",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Ansible docs",
        "href": "https://docs.ansible.com/",
        "category": "Official Docs"
      },
      {
        "label": "Chef docs",
        "href": "https://docs.chef.io/",
        "category": "Official Docs"
      },
      {
        "label": "Puppet docs",
        "href": "https://www.puppet.com/docs",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Ansible.",
      "Write a troubleshooting checklist for Ansible and Chef.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a configuration management lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Configuration Management, and how would you detect it?"
  },
  {
    "id": "kubernetes-fundamentals",
    "title": "Kubernetes Fundamentals",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "5 weeks",
    "description": "Kubernetes Fundamentals turns Pods, Services, Deployments into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Configuration Management"
    ],
    "topics": [
      "Pods",
      "Services",
      "Deployments",
      "StatefulSets",
      "Namespaces"
    ],
    "skillsGained": [
      "Operate Pods in production-like environments",
      "Connect Services to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Kubernetes Fundamentals impacts reliability and delivery",
      "Build or configure a lab around Pods",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Kubernetes docs",
        "href": "https://kubernetes.io/docs/home/",
        "category": "Official Docs"
      },
      {
        "label": "Kubernetes tutorials",
        "href": "https://kubernetes.io/docs/tutorials/",
        "category": "Labs & Sandboxes"
      },
      {
        "label": "KodeKloud Kubernetes labs",
        "href": "https://kodekloud.com/",
        "category": "Certification Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Pods.",
      "Write a troubleshooting checklist for Pods and Services.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a kubernetes fundamentals lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Kubernetes Fundamentals, and how would you detect it?"
  },
  {
    "id": "advanced-kubernetes",
    "title": "Advanced Kubernetes",
    "stage": "Advanced",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "Advanced Kubernetes turns Helm, Ingress, Operators into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Kubernetes Fundamentals"
    ],
    "topics": [
      "Helm",
      "Ingress",
      "Operators",
      "Service Mesh",
      "Autoscaling"
    ],
    "skillsGained": [
      "Operate Helm in production-like environments",
      "Connect Ingress to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Advanced Kubernetes impacts reliability and delivery",
      "Build or configure a lab around Helm",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Helm docs",
        "href": "https://helm.sh/docs/",
        "category": "Official Docs"
      },
      {
        "label": "Istio docs",
        "href": "https://istio.io/latest/docs/",
        "category": "Official Docs"
      },
      {
        "label": "Kubernetes autoscaling",
        "href": "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Helm.",
      "Write a troubleshooting checklist for Helm and Ingress.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a advanced kubernetes lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Advanced Kubernetes, and how would you detect it?"
  },
  {
    "id": "monitoring-and-observability",
    "title": "Monitoring & Observability",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Monitoring & Observability turns Prometheus, Grafana, Loki into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Advanced Kubernetes"
    ],
    "topics": [
      "Prometheus",
      "Grafana",
      "Loki",
      "OpenTelemetry"
    ],
    "skillsGained": [
      "Operate Prometheus in production-like environments",
      "Connect Grafana to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Monitoring & Observability impacts reliability and delivery",
      "Build or configure a lab around Prometheus",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Prometheus docs",
        "href": "https://prometheus.io/docs/introduction/overview/",
        "category": "Official Docs"
      },
      {
        "label": "Grafana docs",
        "href": "https://grafana.com/docs/",
        "category": "Official Docs"
      },
      {
        "label": "OpenTelemetry docs",
        "href": "https://opentelemetry.io/docs/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Prometheus.",
      "Write a troubleshooting checklist for Prometheus and Grafana.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a monitoring & observability lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Monitoring & Observability, and how would you detect it?"
  },
  {
    "id": "logging-systems",
    "title": "Logging Systems",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "3 weeks",
    "description": "Logging Systems turns ELK Stack, EFK Stack, Centralized Logging into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Monitoring & Observability"
    ],
    "topics": [
      "ELK Stack",
      "EFK Stack",
      "Centralized Logging"
    ],
    "skillsGained": [
      "Operate ELK Stack in production-like environments",
      "Connect EFK Stack to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Logging Systems impacts reliability and delivery",
      "Build or configure a lab around ELK Stack",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Elastic docs",
        "href": "https://www.elastic.co/docs",
        "category": "Official Docs"
      },
      {
        "label": "Fluentd docs",
        "href": "https://docs.fluentd.org/",
        "category": "Official Docs"
      },
      {
        "label": "Loki docs",
        "href": "https://grafana.com/docs/loki/latest/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for ELK Stack.",
      "Write a troubleshooting checklist for ELK Stack and EFK Stack.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a logging systems lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Logging Systems, and how would you detect it?"
  },
  {
    "id": "security-and-devsecops",
    "title": "Security & DevSecOps",
    "stage": "Advanced",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "Security & DevSecOps turns Secrets Management, IAM, Vulnerability Scanning into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Logging Systems"
    ],
    "topics": [
      "Secrets Management",
      "IAM",
      "Vulnerability Scanning",
      "Security Automation",
      "Compliance"
    ],
    "skillsGained": [
      "Operate Secrets Management in production-like environments",
      "Connect IAM to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Security & DevSecOps impacts reliability and delivery",
      "Build or configure a lab around Secrets Management",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "OWASP DevSecOps guideline",
        "href": "https://owasp.org/www-project-devsecops-guideline/",
        "category": "Official Docs"
      },
      {
        "label": "HashiCorp Vault docs",
        "href": "https://developer.hashicorp.com/vault/docs",
        "category": "Official Docs"
      },
      {
        "label": "Trivy docs",
        "href": "https://aquasecurity.github.io/trivy/",
        "category": "Open Source Projects"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Secrets Management.",
      "Write a troubleshooting checklist for Secrets Management and IAM.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a security & devsecops lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Security & DevSecOps, and how would you detect it?"
  },
  {
    "id": "networking-for-devops",
    "title": "Networking for DevOps",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Networking for DevOps turns VPC, VPN, Subnets into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Security & DevSecOps"
    ],
    "topics": [
      "VPC",
      "VPN",
      "Subnets",
      "Routing",
      "NAT",
      "CDN"
    ],
    "skillsGained": [
      "Operate VPC in production-like environments",
      "Connect VPN to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Networking for DevOps impacts reliability and delivery",
      "Build or configure a lab around VPC",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "AWS VPC docs",
        "href": "https://docs.aws.amazon.com/vpc/",
        "category": "Official Docs"
      },
      {
        "label": "Cloudflare CDN learning",
        "href": "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/",
        "category": "Official Docs"
      },
      {
        "label": "Kubernetes networking",
        "href": "https://kubernetes.io/docs/concepts/services-networking/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for VPC.",
      "Write a troubleshooting checklist for VPC and VPN.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a networking for devops lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Networking for DevOps, and how would you detect it?"
  },
  {
    "id": "platform-engineering",
    "title": "Platform Engineering",
    "stage": "Advanced",
    "difficulty": "Expert",
    "duration": "4 weeks",
    "description": "Platform Engineering turns Internal Developer Platforms, Self-Service Infrastructure, Golden Paths into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Networking for DevOps"
    ],
    "topics": [
      "Internal Developer Platforms",
      "Self-Service Infrastructure",
      "Golden Paths"
    ],
    "skillsGained": [
      "Operate Internal Developer Platforms in production-like environments",
      "Connect Self-Service Infrastructure to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Platform Engineering impacts reliability and delivery",
      "Build or configure a lab around Internal Developer Platforms",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Platform Engineering guide",
        "href": "https://platformengineering.org/",
        "category": "Community Resources"
      },
      {
        "label": "Backstage docs",
        "href": "https://backstage.io/docs/overview/what-is-backstage",
        "category": "Open Source Projects"
      },
      {
        "label": "Humanitec platform engineering",
        "href": "https://humanitec.com/blog",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Internal Developer Platforms.",
      "Write a troubleshooting checklist for Internal Developer Platforms and Self-Service Infrastructure.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a platform engineering lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Platform Engineering, and how would you detect it?"
  },
  {
    "id": "site-reliability-engineering-sre",
    "title": "Site Reliability Engineering (SRE)",
    "stage": "Advanced",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "Site Reliability Engineering (SRE) turns SLI, SLO, SLA into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Platform Engineering"
    ],
    "topics": [
      "SLI",
      "SLO",
      "SLA",
      "Error Budgets",
      "Reliability Engineering"
    ],
    "skillsGained": [
      "Operate SLI in production-like environments",
      "Connect SLO to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Site Reliability Engineering (SRE) impacts reliability and delivery",
      "Build or configure a lab around SLI",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Google SRE books",
        "href": "https://sre.google/books/",
        "category": "Official Docs"
      },
      {
        "label": "SLO workbook",
        "href": "https://sre.google/workbook/table-of-contents/",
        "category": "Official Docs"
      },
      {
        "label": "OpenSLO",
        "href": "https://openslo.com/",
        "category": "Open Source Projects"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for SLI.",
      "Write a troubleshooting checklist for SLI and SLO.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a site reliability engineering (sre) lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Site Reliability Engineering (SRE), and how would you detect it?"
  },
  {
    "id": "advanced-cloud-architecture",
    "title": "Advanced Cloud Architecture",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "Advanced Cloud Architecture turns Multi-Cloud, Hybrid Cloud, Cloud Cost Optimization into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Site Reliability Engineering (SRE)"
    ],
    "topics": [
      "Multi-Cloud",
      "Hybrid Cloud",
      "Cloud Cost Optimization"
    ],
    "skillsGained": [
      "Operate Multi-Cloud in production-like environments",
      "Connect Hybrid Cloud to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Advanced Cloud Architecture impacts reliability and delivery",
      "Build or configure a lab around Multi-Cloud",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "AWS Well-Architected",
        "href": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
        "category": "Official Docs"
      },
      {
        "label": "Azure Architecture Center",
        "href": "https://learn.microsoft.com/en-us/azure/architecture/",
        "category": "Official Docs"
      },
      {
        "label": "Google Cloud Architecture Framework",
        "href": "https://cloud.google.com/architecture/framework",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Multi-Cloud.",
      "Write a troubleshooting checklist for Multi-Cloud and Hybrid Cloud.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a advanced cloud architecture lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Advanced Cloud Architecture, and how would you detect it?"
  },
  {
    "id": "distributed-systems",
    "title": "Distributed Systems",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "Distributed Systems turns Scalability, CAP Theorem, Distributed Databases into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Advanced Cloud Architecture"
    ],
    "topics": [
      "Scalability",
      "CAP Theorem",
      "Distributed Databases",
      "Event-Driven Systems"
    ],
    "skillsGained": [
      "Operate Scalability in production-like environments",
      "Connect CAP Theorem to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Distributed Systems impacts reliability and delivery",
      "Build or configure a lab around Scalability",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Designing Data-Intensive Applications",
        "href": "https://dataintensive.net/",
        "category": "Community Resources"
      },
      {
        "label": "System Design Primer",
        "href": "https://github.com/donnemartin/system-design-primer",
        "category": "Open Source Projects"
      },
      {
        "label": "Jepsen analyses",
        "href": "https://jepsen.io/analyses",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Scalability.",
      "Write a troubleshooting checklist for Scalability and CAP Theorem.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a distributed systems lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Distributed Systems, and how would you detect it?"
  },
  {
    "id": "message-queues-and-streaming",
    "title": "Message Queues & Streaming",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "4 weeks",
    "description": "Message Queues & Streaming turns Kafka, RabbitMQ, Amazon SQS into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Distributed Systems"
    ],
    "topics": [
      "Kafka",
      "RabbitMQ",
      "Amazon SQS",
      "Apache Pulsar"
    ],
    "skillsGained": [
      "Operate Kafka in production-like environments",
      "Connect RabbitMQ to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Message Queues & Streaming impacts reliability and delivery",
      "Build or configure a lab around Kafka",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Kafka docs",
        "href": "https://kafka.apache.org/documentation/",
        "category": "Official Docs"
      },
      {
        "label": "RabbitMQ tutorials",
        "href": "https://www.rabbitmq.com/tutorials",
        "category": "Official Docs"
      },
      {
        "label": "Amazon SQS docs",
        "href": "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Kafka.",
      "Write a troubleshooting checklist for Kafka and RabbitMQ.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a message queues & streaming lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Message Queues & Streaming, and how would you detect it?"
  },
  {
    "id": "advanced-infrastructure",
    "title": "Advanced Infrastructure",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "4 weeks",
    "description": "Advanced Infrastructure turns Service Mesh, Istio, Envoy into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Message Queues & Streaming"
    ],
    "topics": [
      "Service Mesh",
      "Istio",
      "Envoy",
      "API Gateways"
    ],
    "skillsGained": [
      "Operate Service Mesh in production-like environments",
      "Connect Istio to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Advanced Infrastructure impacts reliability and delivery",
      "Build or configure a lab around Service Mesh",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Istio docs",
        "href": "https://istio.io/latest/docs/",
        "category": "Official Docs"
      },
      {
        "label": "Envoy docs",
        "href": "https://www.envoyproxy.io/docs",
        "category": "Official Docs"
      },
      {
        "label": "Kong API gateway docs",
        "href": "https://docs.konghq.com/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Service Mesh.",
      "Write a troubleshooting checklist for Service Mesh and Istio.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a advanced infrastructure lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Advanced Infrastructure, and how would you detect it?"
  },
  {
    "id": "disaster-recovery",
    "title": "Disaster Recovery",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "4 weeks",
    "description": "Disaster Recovery turns Backup Strategies, Failover Systems, High Availability into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Advanced Infrastructure"
    ],
    "topics": [
      "Backup Strategies",
      "Failover Systems",
      "High Availability",
      "Business Continuity"
    ],
    "skillsGained": [
      "Operate Backup Strategies in production-like environments",
      "Connect Failover Systems to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Disaster Recovery impacts reliability and delivery",
      "Build or configure a lab around Backup Strategies",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "AWS disaster recovery",
        "href": "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html",
        "category": "Official Docs"
      },
      {
        "label": "Azure business continuity",
        "href": "https://learn.microsoft.com/en-us/azure/architecture/framework/resiliency/backup-and-recovery",
        "category": "Official Docs"
      },
      {
        "label": "Google DR planning",
        "href": "https://cloud.google.com/architecture/dr-scenarios-planning-guide",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Backup Strategies.",
      "Write a troubleshooting checklist for Backup Strategies and Failover Systems.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a disaster recovery lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Disaster Recovery, and how would you detect it?"
  },
  {
    "id": "production-engineering",
    "title": "Production Engineering",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "Production Engineering turns Capacity Planning, Reliability, Incident Management into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Disaster Recovery"
    ],
    "topics": [
      "Capacity Planning",
      "Reliability",
      "Incident Management",
      "Root Cause Analysis"
    ],
    "skillsGained": [
      "Operate Capacity Planning in production-like environments",
      "Connect Reliability to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Production Engineering impacts reliability and delivery",
      "Build or configure a lab around Capacity Planning",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Google SRE incident response",
        "href": "https://sre.google/sre-book/managing-incidents/",
        "category": "Official Docs"
      },
      {
        "label": "PagerDuty incident response",
        "href": "https://response.pagerduty.com/",
        "category": "Community Resources"
      },
      {
        "label": "Grafana incident docs",
        "href": "https://grafana.com/docs/grafana-cloud/alerting-and-irm/irm/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Capacity Planning.",
      "Write a troubleshooting checklist for Capacity Planning and Reliability.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a production engineering lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Production Engineering, and how would you detect it?"
  },
  {
    "id": "devops-leadership",
    "title": "DevOps Leadership",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "3 weeks",
    "description": "DevOps Leadership turns Team Collaboration, Documentation, Incident Response into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Production Engineering"
    ],
    "topics": [
      "Team Collaboration",
      "Documentation",
      "Incident Response",
      "Architecture Decisions"
    ],
    "skillsGained": [
      "Operate Team Collaboration in production-like environments",
      "Connect Documentation to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how DevOps Leadership impacts reliability and delivery",
      "Build or configure a lab around Team Collaboration",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Google engineering practices",
        "href": "https://google.github.io/eng-practices/",
        "category": "Community Resources"
      },
      {
        "label": "Architecture decision records",
        "href": "https://adr.github.io/",
        "category": "Community Resources"
      },
      {
        "label": "Staff Engineer",
        "href": "https://staffeng.com/",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Team Collaboration.",
      "Write a troubleshooting checklist for Team Collaboration and Documentation.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a devops leadership lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in DevOps Leadership, and how would you detect it?"
  }
];

const projectTracks: ProjectTrack[] = [
  {
    "stage": "Beginner",
    "projects": [
      "Linux Server Setup",
      "Personal VPS Hosting",
      "Nginx Reverse Proxy Setup",
      "Automated Backup Script"
    ]
  },
  {
    "stage": "Intermediate",
    "projects": [
      "CI/CD Pipeline",
      "Dockerized Application",
      "Terraform Infrastructure Deployment",
      "Cloud Hosting Platform"
    ]
  },
  {
    "stage": "Advanced",
    "projects": [
      "Kubernetes Cluster Deployment",
      "Monitoring Stack Setup",
      "GitOps Platform",
      "Multi-Service Infrastructure"
    ]
  },
  {
    "stage": "Expert",
    "projects": [
      "Production-Grade Kubernetes Platform",
      "Multi-Cloud Infrastructure",
      "Enterprise Observability Platform",
      "Large-Scale Platform Engineering System"
    ]
  }
];

const missingTopics = [
  "GitOps and Argo CD",
  "Progressive delivery",
  "Policy as code",
  "Secrets rotation",
  "Supply-chain security",
  "FinOps and cost governance",
  "Chaos engineering",
  "Runbook automation",
  "SLO governance",
  "Developer portals",
  "Blue-green and canary deployments",
  "Capacity forecasting"
];

const careerPaths = [
  {
    "title": "Junior DevOps Engineer",
    "focus": "Operate Linux servers, write scripts, support CI/CD, and document incidents with supervision.",
    "milestones": [
      "Server setup",
      "Backup script",
      "Nginx reverse proxy"
    ]
  },
  {
    "title": "DevOps Engineer",
    "focus": "Own pipelines, containers, cloud deployments, IaC changes, and production release workflows.",
    "milestones": [
      "CI/CD pipeline",
      "Dockerized app",
      "Terraform deploy"
    ]
  },
  {
    "title": "Senior DevOps Engineer",
    "focus": "Design resilient platforms, review infrastructure changes, lead incidents, and mentor teams.",
    "milestones": [
      "Kubernetes platform",
      "Observability stack",
      "Incident review"
    ]
  },
  {
    "title": "Site Reliability Engineer",
    "focus": "Define SLOs, manage error budgets, automate toil, and improve reliability with data.",
    "milestones": [
      "SLO dashboard",
      "Runbooks",
      "Error budget policy"
    ]
  },
  {
    "title": "Platform Engineer",
    "focus": "Build internal developer platforms, golden paths, self-service infrastructure, and paved-road tooling.",
    "milestones": [
      "Developer portal",
      "Golden path templates",
      "Self-service envs"
    ]
  },
  {
    "title": "Cloud Architect",
    "focus": "Design secure, cost-aware cloud architecture across networking, identity, compute, data, and DR.",
    "milestones": [
      "Architecture diagrams",
      "Cost model",
      "DR strategy"
    ]
  }
];

const certificationPaths = [
  {
    "title": "AWS Certified Solutions Architect",
    "focus": "Cloud architecture, networking, compute, databases, reliability, and cost controls.",
    "milestones": [
      "AWS fundamentals",
      "Well-Architected review",
      "Resilient reference architecture"
    ]
  },
  {
    "title": "AWS DevOps Engineer",
    "focus": "CI/CD, automation, monitoring, security, deployment operations, and incident readiness.",
    "milestones": [
      "Pipeline design",
      "CloudWatch operations",
      "Deployment automation"
    ]
  },
  {
    "title": "Azure Administrator",
    "focus": "Azure identities, networking, compute, storage, monitoring, and governance.",
    "milestones": [
      "Resource groups",
      "Azure networking",
      "Backup and monitor"
    ]
  },
  {
    "title": "Azure DevOps Engineer",
    "focus": "Azure pipelines, GitOps, release practices, infrastructure automation, and test strategy.",
    "milestones": [
      "Azure Pipelines",
      "IaC deployment",
      "Release gates"
    ]
  },
  {
    "title": "Google Professional Cloud Engineer",
    "focus": "Google Cloud architecture, operations, networking, IAM, and reliability engineering.",
    "milestones": [
      "GCP services",
      "Operations suite",
      "Cloud architecture"
    ]
  },
  {
    "title": "Certified Kubernetes Administrator (CKA)",
    "focus": "Cluster administration, workloads, networking, storage, troubleshooting, and security.",
    "milestones": [
      "Cluster ops",
      "kubectl fluency",
      "Troubleshooting drills"
    ]
  },
  {
    "title": "Certified Kubernetes Application Developer (CKAD)",
    "focus": "Kubernetes app design, configuration, observability, probes, and resource management.",
    "milestones": [
      "Pod specs",
      "ConfigMaps and secrets",
      "Probes and rollouts"
    ]
  },
  {
    "title": "Terraform Associate",
    "focus": "Terraform workflow, state, modules, providers, planning, and infrastructure review.",
    "milestones": [
      "Plan/apply workflow",
      "Modules",
      "Remote state"
    ]
  }
];

const achievementBadges = [
  "Linux Operator",
  "Pipeline Builder",
  "Container Captain",
  "Cloud Ready",
  "Terraform Engineer",
  "Kubernetes Operator",
  "SRE Guardian",
  "Platform Architect"
];

const progressSchema = [
  [
    "users",
    "id, name, email, role, created_at"
  ],
  [
    "devops_progress",
    "user_id, roadmap_id, completed_node_ids, xp, streak_days, maturity_level"
  ],
  [
    "lab_runs",
    "user_id, topic_id, sandbox_url, status, started_at, completed_at"
  ],
  [
    "incident_simulations",
    "user_id, scenario_id, mttr, notes, completed_at"
  ],
  [
    "certification_tracking",
    "user_id, certification_id, target_date, status, score"
  ],
  [
    "infra_notes",
    "user_id, topic_id, note, updated_at"
  ]
];

const icons: Record<string, ReactNode> = {
  arrow: <path d="m9 18 6-6-6-6" />,
  badge: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2 6.4 20.2 7.5 14 3 9.6l6.2-.9L12 3Z" />,
  bookmark: <path d="M6 4h12v18l-6-4-6 4V4Z" />,
  check: <path d="m5 12 4 4L19 6" />,
  clock: <path d="M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  code: <path d="m8 8-4 4 4 4m8-8 4 4-4 4M14 4l-4 16" />,
  database: <path d="M4 6c0-2 16-2 16 0v12c0 2-16 2-16 0V6Zm0 0c0 2 16 2 16 0M4 12c0 2 16 2 16 0" />,
  flame: <path d="M12 22c4 0 7-3 7-7 0-3-2-5-4-7 .2 2-.8 3.4-2 4-1-4-4-6-4-9-3 2-5 6-5 10 0 5 4 9 8 9Z" />,
  layers: <path d="m12 2 9 5-9 5-9-5 9-5Zm9 10-9 5-9-5m18 5-9 5-9-5" />,
  lock: <path d="M6 11V8a6 6 0 0 1 12 0v3m-1 0H7a1 1 0 0 0-1 1v8h12v-8a1 1 0 0 0-1-1Z" />,
  note: <path d="M6 3h10l3 3v18H6V3Zm10 0v6h6M9 13h8M9 17h8" />,
  quiz: <path d="M10 9a3 3 0 1 1 4 2.83c-1.1.47-2 1.03-2 2.17m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  server: <path d="M4 4h16v7H4V4Zm0 11h16v7H4v-7Zm3-7h.01M7 19h.01" />,
  shield: <path d="M12 3 20 6v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />,
  target: <path d="M21 12a9 9 0 1 1-9-9m6 3 3-3m0 0v5m0-5h-5M15 9l-3 3m3 0a3 3 0 1 1-3-3" />,
};

const resourceCategories: ResourceCategory[] = ["Official Docs", "Certification Resources", "Labs & Sandboxes", "Community Resources", "Open Source Projects"];

function Icon({ name, className = "" }: { name: keyof typeof icons; className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
}

function loadSet(key: string) {
  if (typeof window === "undefined") {
    return new Set<string>();
  }

  const stored = window.localStorage.getItem(key);
  return stored ? new Set(JSON.parse(stored) as string[]) : new Set<string>();
}

function loadNotes() {
  if (typeof window === "undefined") {
    return {};
  }

  const stored = window.localStorage.getItem(storageKeys.notes);
  return stored ? (JSON.parse(stored) as Record<string, string>) : {};
}

function difficultyClass(difficulty: Difficulty) {
  const classes: Record<Difficulty, string> = {
    Starter: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    Core: "border-sky-500/30 bg-sky-500/10 text-sky-300",
    Applied: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    Advanced: "border-red-500/35 bg-red-500/10 text-red-300",
    Expert: "border-red-400/50 bg-red-500/15 text-red-200",
  };

  return classes[difficulty];
}

function stageClass(stage: Stage) {
  const classes: Record<Stage, string> = {
    Beginner: "border-zinc-700 bg-zinc-950 text-zinc-200",
    Intermediate: "border-red-950 bg-red-950/30 text-red-200",
    Advanced: "border-red-800 bg-red-950/50 text-red-100",
    Expert: "border-red-600 bg-red-600/15 text-white",
  };

  return classes[stage];
}

function DemonTechLogo() {
  return (
    <Link className="flex min-w-fit items-center gap-3" href="/">
      <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-md border border-red-500/30 bg-black">
        <Image alt="DemonTech logo" className="h-full w-full object-cover" height={48} src="/demontech-logo.png" width={48} />
      </span>
      <span>
        <span className="block text-lg font-black leading-6 text-white">
          Demon<span className="text-red-500">Tech</span>
        </span>
        <span className="mt-1 block text-[11px] font-bold uppercase text-zinc-500">Roadmap</span>
      </span>
    </Link>
  );
}

function ProgressRing({ percentage }: { percentage: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative grid h-28 w-28 place-items-center">
      <svg aria-hidden="true" className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
        <circle className="stroke-zinc-900" cx="50" cy="50" fill="none" r={radius} strokeWidth="8" />
        <circle className="stroke-red-500" cx="50" cy="50" fill="none" r={radius} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" strokeWidth="8" />
      </svg>
      <span className="absolute text-2xl font-black text-white">{percentage}%</span>
    </div>
  );
}

function SidebarPanel({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="rounded-md border border-zinc-800 bg-zinc-950/90 p-5">
      <h2 className="text-sm font-black text-white">{title}</h2>
      {children}
    </section>
  );
}

function RoadmapNodeCard({
  bookmarked,
  completed,
  expanded,
  index,
  node,
  note,
  onExpand,
  onNoteChange,
  onToggleBookmark,
  onToggleComplete,
}: {
  bookmarked: boolean;
  completed: boolean;
  expanded: boolean;
  index: number;
  node: RoadmapNode;
  note: string;
  onExpand: () => void;
  onNoteChange: (value: string) => void;
  onToggleBookmark: () => void;
  onToggleComplete: () => void;
}) {
  return (
    <article className="relative">
      <span className={`absolute left-0 top-7 z-10 grid h-12 w-12 place-items-center rounded-md border text-sm font-black ${completed ? "border-red-500 bg-red-500 text-white" : "border-zinc-800 bg-[#050505] text-zinc-300"}`}>
        {completed ? <Icon className="h-5 w-5" name="check" /> : String(index + 1).padStart(2, "0")}
      </span>

      <div className={`ml-7 rounded-md border bg-zinc-950/80 transition ${expanded ? "border-red-500/70" : "border-zinc-800 hover:border-red-500/40"}`}>
        <button aria-expanded={expanded} className="grid w-full gap-5 p-5 pl-10 text-left md:grid-cols-[minmax(0,1fr)_auto]" onClick={onExpand} type="button">
          <span>
            <span className="flex flex-wrap items-center gap-2">
              <span className={`rounded-md border px-2.5 py-1 text-xs font-bold ${stageClass(node.stage)}`}>{node.stage}</span>
              <span className={`rounded-md border px-2.5 py-1 text-xs font-bold ${difficultyClass(node.difficulty)}`}>{node.difficulty}</span>
              <span className="inline-flex items-center gap-1 rounded-md border border-zinc-800 bg-black px-2.5 py-1 text-xs font-bold text-zinc-400">
                <Icon className="h-3.5 w-3.5 text-red-400" name="clock" />
                {node.duration}
              </span>
            </span>
            <span className="mt-3 block text-lg font-black text-white">{node.title}</span>
            <span className="mt-2 block max-w-3xl text-sm leading-6 text-zinc-400">{node.description}</span>
          </span>
          <span className="flex items-center gap-3 md:justify-end">
            <span className={completed ? "text-sm font-bold text-red-300" : "text-sm font-bold text-zinc-500"}>{completed ? "Complete" : "In progress"}</span>
            <Icon className={`h-5 w-5 text-zinc-500 transition ${expanded ? "rotate-90 text-red-400" : ""}`} name="arrow" />
          </span>
        </button>

        {expanded ? (
          <div className="border-t border-zinc-800 px-5 pb-5 pl-10">
            <div className="grid gap-5 pt-5 xl:grid-cols-[minmax(0,1fr)_270px]">
              <div className="space-y-6">
                <section>
                  <h3 className="text-sm font-black text-white">Core Topics</h3>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {node.topics.map((topic) => (
                      <span className="rounded-md border border-zinc-800 bg-[#050505] px-3 py-2 text-sm text-zinc-300" key={topic}>{topic}</span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-black text-white">Skills Gained</h3>
                  <ul className="mt-3 grid gap-3 md:grid-cols-2">
                    {node.skillsGained.map((skill) => (
                      <li className="flex gap-3 text-sm text-zinc-300" key={skill}>
                        <Icon className="h-4 w-4 shrink-0 text-red-400" name="check" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-sm font-black text-white">Learning Outcomes</h3>
                  <ul className="mt-3 grid gap-3 md:grid-cols-2">
                    {node.learningOutcomes.map((outcome) => (
                      <li className="flex gap-3 text-sm leading-6 text-zinc-300" key={outcome}>
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" name="badge" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-sm font-black text-white">Practice Exercises</h3>
                  <ul className="mt-3 grid gap-3">
                    {node.practiceExercises.map((exercise) => (
                      <li className="flex gap-3 text-sm leading-6 text-zinc-300" key={exercise}>
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" name="target" />
                        {exercise}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-md border border-zinc-800 bg-[#050505] p-4">
                  <label className="flex items-center gap-2 text-sm font-black text-white" htmlFor={`${node.id}-notes`}>
                    <Icon className="h-4 w-4 text-red-400" name="note" />
                    Notes
                  </label>
                  <textarea
                    className="mt-3 min-h-28 w-full resize-y rounded-md border border-zinc-800 bg-black p-3 text-sm leading-6 text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-red-500/70"
                    id={`${node.id}-notes`}
                    onChange={(event) => onNoteChange(event.target.value)}
                    placeholder="Write implementation notes, links, or questions for this topic."
                    value={note}
                  />
                </section>
              </div>

              <aside className="space-y-5">
                <section className="border-l border-red-500/40 pl-4">
                  <h3 className="text-sm font-black text-white">Prerequisites</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {node.prerequisites.map((prerequisite) => (
                      <span className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-black px-3 py-2 text-xs font-bold text-zinc-300" key={prerequisite}>
                        <Icon className="h-3.5 w-3.5 text-red-400" name="lock" />
                        {prerequisite}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="border-l border-zinc-800 pl-4">
                  <h3 className="text-sm font-black text-white">Hands-on Lab</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{node.miniProject}</p>
                </section>

                <section className="border-l border-zinc-800 pl-4">
                  <h3 className="text-sm font-black text-white">Real-World Applications</h3>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                    {node.realWorldApplications.map((application) => (
                      <li className="flex gap-2" key={application}>
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" name="server" />
                        {application}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-md border border-red-500/20 bg-red-500/10 p-4">
                  <h3 className="flex items-center gap-2 text-sm font-black text-white">
                    <Icon className="h-4 w-4 text-red-300" name="quiz" />
                    Quiz Prompt
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-red-100">{node.quiz}</p>
                </section>

                <section>
                  <h3 className="text-sm font-black text-white">Resources</h3>
                  <div className="mt-3 space-y-2">
                    {node.resources.map((resource) => (
                      <a className="flex items-center justify-between rounded-md border border-zinc-800 bg-black px-3 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/60 hover:text-white" href={resource.href} key={`${node.id}-${resource.label}`} rel={resource.href.startsWith("http") ? "noreferrer" : undefined} target={resource.href.startsWith("http") ? "_blank" : undefined}>
                        <span>{resource.label}</span>
                        <Icon className="h-4 w-4 text-red-400" name="arrow" />
                      </a>
                    ))}
                  </div>
                </section>

                <div className="flex flex-wrap gap-2">
                  <button aria-pressed={completed} className={`inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-bold transition ${completed ? "border-red-500 bg-red-500 text-white" : "border-zinc-800 bg-black text-zinc-300 hover:border-red-500/70"}`} onClick={onToggleComplete} type="button">
                    <Icon className="h-4 w-4" name="check" />
                    {completed ? "Completed" : "Mark complete"}
                  </button>
                  <button aria-pressed={bookmarked} className={`inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-bold transition ${bookmarked ? "border-red-500/70 bg-red-500/15 text-red-200" : "border-zinc-800 bg-black text-zinc-300 hover:border-red-500/70"}`} onClick={onToggleBookmark} type="button">
                    <Icon className="h-4 w-4" name="bookmark" />
                    {bookmarked ? "Bookmarked" : "Bookmark"}
                  </button>
                </div>
              </aside>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function DevOpsEngineerRoadmap() {
  const [expandedNodeId, setExpandedNodeId] = useState(roadmapNodes[0].id);
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => loadSet(storageKeys.completed));
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => loadSet(storageKeys.bookmarked));
  const [notes, setNotes] = useState<Record<string, string>>(() => loadNotes());

  useEffect(() => {
    window.localStorage.setItem(storageKeys.completed, JSON.stringify(Array.from(completedIds)));
  }, [completedIds]);

  useEffect(() => {
    window.localStorage.setItem(storageKeys.bookmarked, JSON.stringify(Array.from(bookmarkedIds)));
  }, [bookmarkedIds]);

  useEffect(() => {
    window.localStorage.setItem(storageKeys.notes, JSON.stringify(notes));
  }, [notes]);

  const completedCount = completedIds.size;
  const progressPercentage = Math.round((completedCount / roadmapNodes.length) * 100);
  const nextNode = roadmapNodes.find((node) => !completedIds.has(node.id)) ?? roadmapNodes[roadmapNodes.length - 1];
  const currentLevel = stageSummaries.find((stage) => roadmapNodes.filter((node) => node.stage === stage.stage).some((node) => !completedIds.has(node.id)))?.stage ?? "Expert";
  const noteCount = Object.values(notes).filter((note) => note.trim()).length;
  const cloudTopicIds = roadmapNodes.filter((node) => ["Cloud Fundamentals", "Infrastructure as Code", "Networking for DevOps", "Advanced Cloud Architecture", "Disaster Recovery"].includes(node.title)).map((node) => node.id);
  const kubernetesTopicIds = roadmapNodes.filter((node) => ["Kubernetes Fundamentals", "Advanced Kubernetes", "Advanced Infrastructure", "Platform Engineering"].includes(node.title)).map((node) => node.id);
  const cloudReadiness = Math.round((cloudTopicIds.filter((id) => completedIds.has(id)).length / cloudTopicIds.length) * 100);
  const kubernetesReadiness = Math.round((kubernetesTopicIds.filter((id) => completedIds.has(id)).length / kubernetesTopicIds.length) * 100);
  const devopsMaturityLevel = progressPercentage >= 80 ? "Production" : progressPercentage >= 55 ? "Platform" : progressPercentage >= 30 ? "Delivery" : "Foundation";

  const stageProgress = useMemo(
    () =>
      stageSummaries.map((summary) => {
        const nodes = roadmapNodes.filter((node) => node.stage === summary.stage);
        const completed = nodes.filter((node) => completedIds.has(node.id)).length;
        return { ...summary, completed, total: nodes.length, percentage: Math.round((completed / nodes.length) * 100) };
      }),
    [completedIds],
  );

  const resourcesByCategory = useMemo(
    () =>
      resourceCategories.map((category) => ({
        category,
        resources: roadmapNodes.flatMap((node) => node.resources.filter((resource) => resource.category === category)).slice(0, 6),
      })),
    [],
  );

  const toggleSet = (setter: (value: Set<string>) => void, current: Set<string>, id: string) => {
    const next = new Set(current);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setter(next);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,#050505_0%,#090909_48%,#050505_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(239,68,68,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <header className="sticky top-0 z-40 border-b border-zinc-900 bg-[#050505]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-5 px-5 lg:px-6">
          <DemonTechLogo />
          <nav className="ml-auto hidden items-center gap-7 text-sm font-bold text-zinc-400 lg:flex">
            <Link className="text-red-400" href="/docs/all-roadmaps">Roadmaps</Link>
            <Link className="transition hover:text-white" href="/docs/learning-paths">Learning Paths</Link>
            <Link className="transition hover:text-white" href="/docs/project-ideas">Projects</Link>
            <Link className="transition hover:text-white" href="/docs/best-practices">Best Practices</Link>
          </nav>
          <a className="hidden rounded-md border border-red-500/40 bg-red-500 px-4 py-2 text-sm font-black text-white transition hover:bg-red-400 md:inline-flex" href="https://discord.gg/yWtjK2Tb8T" rel="noreferrer" target="_blank">
            Join Community
          </a>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] gap-6 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_310px] lg:px-6">
        <section>
          <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
            <Link className="hover:text-red-400" href="/">Home</Link>
            <Icon className="h-3.5 w-3.5" name="arrow" />
            <Link className="hover:text-red-400" href="/docs/all-roadmaps">Roadmaps</Link>
            <Icon className="h-3.5 w-3.5" name="arrow" />
            <span className="font-bold text-zinc-300">DevOps Engineer</span>
          </div>

          <section className="mt-6 overflow-hidden rounded-md border border-zinc-800 bg-zinc-950">
            <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:p-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-black text-red-300">
                  <Icon className="h-4 w-4" name="server" />
                  Production Infrastructure Engineering Path
                </div>
                <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                  DevOps Engineer Roadmap
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300">
                  A complete hands-on infrastructure journey across Linux, networking, CI/CD, containers, Kubernetes, cloud, observability, security, SRE, and platform engineering.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["29", "Roadmap nodes", "layers"],
                    ["78-108 weeks", "Total duration", "clock"],
                    ["130+", "Infra skills", "badge"],
                    ["16", "Hands-on labs", "target"],
                  ].map(([value, label, icon]) => (
                    <div className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={label}>
                      <Icon className="h-5 w-5 text-red-400" name={icon as keyof typeof icons} />
                      <p className="mt-3 text-2xl font-black text-white">{value}</p>
                      <p className="mt-1 text-sm text-zinc-500">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-md border border-zinc-800 bg-[#050505] p-5">
                <p className="text-sm font-black text-white">Infrastructure Architecture</p>
                <div className="mt-5 space-y-4">
                  {stageProgress.map((stage) => (
                    <button className="w-full text-left" key={stage.stage} onClick={() => setExpandedNodeId(roadmapNodes.find((node) => node.stage === stage.stage)?.id ?? roadmapNodes[0].id)} type="button">
                      <span className="flex items-center justify-between gap-4 text-sm">
                        <span className="font-bold text-zinc-200">{stage.stage}</span>
                        <span className="text-zinc-500">{stage.completed}/{stage.total}</span>
                      </span>
                      <span className="mt-2 block h-2 overflow-hidden rounded-full bg-zinc-900">
                        <span className="block h-full rounded-full bg-red-500" style={{ width: `${stage.percentage}%` }} />
                      </span>
                      <span className="mt-2 block text-xs leading-5 text-zinc-500">{stage.duration}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-md border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-2xl font-black text-white">Project-Based Learning Track</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">Every phase ends with hands-on infrastructure labs that combine servers, pipelines, containers, cloud, observability, security, and incident response.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {projectTracks.map((track) => (
                <section className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={track.stage}>
                  <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-bold ${stageClass(track.stage)}`}>{track.stage}</span>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                    {track.projects.map((project) => (
                      <li className="flex gap-3" key={project}>
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" name="code" />
                        {project}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">Vertical Infrastructure Journey</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                  Expand each node for prerequisites, learning outcomes, resources, lab exercises, troubleshooting scenarios, real-world use cases, quizzes, bookmarks, and notes.
                </p>
              </div>
              <button className="rounded-md border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/60 hover:text-white" onClick={() => setCompletedIds(new Set())} type="button">
                Reset Progress
              </button>
            </div>

            <div className="relative mt-6 space-y-5">
              <div className="absolute bottom-8 left-6 top-8 hidden w-px bg-zinc-800 sm:block" />
              {roadmapNodes.map((node, index) => (
                <RoadmapNodeCard
                  bookmarked={bookmarkedIds.has(node.id)}
                  completed={completedIds.has(node.id)}
                  expanded={expandedNodeId === node.id}
                  index={index}
                  key={node.id}
                  node={node}
                  note={notes[node.id] ?? ""}
                  onExpand={() => setExpandedNodeId((current) => (current === node.id ? "" : node.id))}
                  onNoteChange={(value) => setNotes((current) => ({ ...current, [node.id]: value }))}
                  onToggleBookmark={() => toggleSet(setBookmarkedIds, bookmarkedIds, node.id)}
                  onToggleComplete={() => toggleSet(setCompletedIds, completedIds, node.id)}
                />
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-md border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-2xl font-black text-white">DevOps Resource Matrix</h2>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {resourcesByCategory.map(({ category, resources }) => (
                <section className="border-t border-zinc-800 pt-4" key={category}>
                  <h3 className="text-sm font-black text-white">{category}</h3>
                  <div className="mt-3 space-y-2">
                    {resources.map((resource) => (
                      <a className="flex items-center justify-between rounded-md border border-zinc-800 bg-[#050505] px-3 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/60 hover:text-white" href={resource.href} key={`${category}-${resource.label}`} rel={resource.href.startsWith("http") ? "noreferrer" : undefined} target={resource.href.startsWith("http") ? "_blank" : undefined}>
                        {resource.label}
                        <Icon className="h-4 w-4 text-red-400" name="arrow" />
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-md border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-2xl font-black text-white">DevOps Career Paths</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              The roadmap supports DevOps, SRE, platform engineering, and cloud architecture growth without separating core infrastructure fundamentals too early.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {careerPaths.map((path) => (
                <section className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={path.title}>
                  <h3 className="text-sm font-black text-white">{path.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{path.focus}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {path.milestones.map((milestone) => (
                      <span className="rounded-md border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-bold text-red-200" key={milestone}>
                        {milestone}
                      </span>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-md border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-2xl font-black text-white">Cloud Certifications Tracker</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              Map roadmap progress to practical certification goals without turning the page into a memorization checklist.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {certificationPaths.map((certification) => (
                <section className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={certification.title}>
                  <h3 className="text-sm font-black text-white">{certification.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{certification.focus}</p>
                  <div className="mt-4 space-y-2">
                    {certification.milestones.map((milestone) => (
                      <span className="flex gap-2 text-xs font-bold text-zinc-300" key={milestone}>
                        <Icon className="h-3.5 w-3.5 shrink-0 text-red-400" name="check" />
                        {milestone}
                      </span>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>

          <section className="mt-6 grid gap-5 xl:grid-cols-[1fr_1fr]">
            <section className="rounded-md border border-zinc-800 bg-zinc-950 p-5">
              <h2 className="text-2xl font-black text-white">Gamification & Hands-on Learning Tools</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["XP System", "Award XP for completed topics, labs, quizzes, incident simulations, certification milestones, and streaks."],
                  ["Achievement Badges", "Unlock visible badges for Linux, pipelines, containers, cloud, Kubernetes, SRE, security, and platform mastery."],
                  ["Milestones", "Mark phase completions with certification-ready checkpoints and infrastructure lab prompts."],
                  ["Learning Challenges", "Add weekly labs, outage simulations, troubleshooting drills, and deployment missions."],
                  ["Interactive Quizzes", "Attach quiz prompts, sandbox tasks, and incident response checks to each topic."],
                  ["Progress Sync", "Store notes, bookmarks, XP, completions, sandbox results, and certification progress per user account."],
                ].map(([title, detail]) => (
                  <article className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={title}>
                    <h3 className="text-sm font-black text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-md border border-zinc-800 bg-zinc-950 p-5">
              <h2 className="text-2xl font-black text-white">DevOps Progress Database Schema</h2>
              <div className="mt-6 space-y-3">
                {progressSchema.map(([table, columns]) => (
                  <article className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={table}>
                    <h3 className="font-mono text-sm font-black text-red-300">{table}</h3>
                    <p className="mt-2 font-mono text-xs leading-6 text-zinc-400">{columns}</p>
                  </article>
                ))}
              </div>
            </section>
          </section>

          <section className="mt-6 rounded-md border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-2xl font-black text-white">Scalable Page Architecture</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {[
                ["Component hierarchy", "DevOpsEngineerRoadmap -> SidebarPanel -> ProgressRing -> RoadmapNodeCard -> career paths, gamification, resources, notes, quiz, project sections."],
                ["Folder architecture", "Future extraction: src/features/roadmaps/devops/data.ts, components/RoadmapNodeCard.tsx, components/ProgressDashboard.tsx, components/CertificationPathPanel.tsx, components/GamificationPanel.tsx."],
                ["TypeScript interfaces", "Stage, Difficulty, ResourceCategory, Resource, RoadmapNode, StageSummary, ProjectTrack, CareerPath, CertificationPath, InfraBadge, ProgressSchema."],
                ["Tailwind structure", "Black base surface, zinc borders, red accent states, compact 13px root scale, infrastructure dashboard grids, sticky readiness panel, accessible focus and pressed states."],
                ["Framer Motion plan", "Use motion only for node expansion, graph pulse states, readiness score transitions, and badge unlocks with reduced-motion fallbacks once the dependency is installed."],
                ["shadcn/ui plan", "Extract buttons, cards, progress, tabs, textareas, badges, accordions, and command navigation into shadcn-style primitives when the component library is added."],
                ["Feature specifications", "Completion tracking, bookmarks, lab notes, sandbox runs, incident simulations, quizzes, XP, cloud certifications tracker, progress sync, recommended next step."],
                ["UX improvements", "Vertical infrastructure progression, connected ops graph, low-glow premium surfaces, certification lanes, readiness widgets, mobile-first single-column behavior."],
              ].map(([title, detail]) => (
                <section className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={title}>
                  <h3 className="text-sm font-black text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{detail}</p>
                </section>
              ))}
            </div>
          </section>
        </section>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <SidebarPanel title="Roadmap Progress">
            <div className="mt-5 flex items-center gap-5">
              <ProgressRing percentage={progressPercentage} />
              <div>
                <p className="text-3xl font-black text-white">{completedCount}/{roadmapNodes.length}</p>
                <p className="mt-1 text-sm text-zinc-500">topics completed</p>
                <p className="mt-4 text-sm font-bold text-red-300">{progressPercentage}% complete</p>
              </div>
            </div>
          </SidebarPanel>

          <SidebarPanel title="Learning Streak">
            <div className="mt-4 flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-md border border-red-500/30 bg-red-500/10 text-red-300">
                <Icon className="h-6 w-6" name="flame" />
              </span>
              <div>
                <p className="text-2xl font-black text-white">5 days</p>
                <p className="text-sm text-zinc-500">current streak</p>
              </div>
            </div>
          </SidebarPanel>

          <SidebarPanel title="Recommended Next Step">
            <div className="mt-4">
              <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-bold ${difficultyClass(nextNode.difficulty)}`}>{nextNode.difficulty}</span>
              <h3 className="mt-3 text-lg font-black text-white">{nextNode.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{nextNode.description}</p>
              <button className="mt-4 inline-flex items-center gap-2 rounded-md border border-red-500/40 bg-red-500 px-4 py-2 text-sm font-black text-white transition hover:bg-red-400" onClick={() => setExpandedNodeId(nextNode.id)} type="button">
                Open topic
                <Icon className="h-4 w-4" name="arrow" />
              </button>
            </div>
          </SidebarPanel>

          <SidebarPanel title="Infrastructure Skill Progress">
            <div className="mt-4 space-y-4">
              {stageProgress.map((stage) => (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-zinc-300">{stage.stage}</span>
                    <span className="text-zinc-500">{stage.percentage}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-900">
                    <div className="h-full rounded-full bg-red-500" style={{ width: `${stage.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </SidebarPanel>

          <SidebarPanel title="DevOps Readiness">
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                [`${cloudReadiness}%`, "cloud readiness", "server"],
                [`${kubernetesReadiness}%`, "k8s readiness", "layers"],
                [devopsMaturityLevel, "maturity level", "shield"],
                ["78-108w", "estimated time", "clock"],
              ].map(([value, label, icon]) => (
                <div className="rounded-md border border-zinc-800 bg-[#050505] p-3" key={label}>
                  <Icon className="h-4 w-4 text-red-400" name={icon as keyof typeof icons} />
                  <p className="mt-2 text-lg font-black text-white">{value}</p>
                  <p className="mt-1 text-xs text-zinc-500">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-zinc-500">
              <span>{currentLevel} phase active</span>
              <span>{bookmarkedIds.size} bookmarks</span>
              <span>{noteCount} notes saved</span>
              <span>{completedCount} topics completed</span>
            </div>
          </SidebarPanel>

          <SidebarPanel title="Achievement Badges">
            <div className="mt-4 grid gap-3">
              {achievementBadges.map((badge, index) => (
                <div className={`flex items-center gap-3 rounded-md border p-3 ${completedCount > index * 6 ? "border-red-500/40 bg-red-500/10 text-red-100" : "border-zinc-800 bg-[#050505] text-zinc-500"}`} key={badge}>
                  <Icon className="h-5 w-5" name="badge" />
                  <span className="text-sm font-bold">{badge}</span>
                </div>
              ))}
            </div>
          </SidebarPanel>

          <SidebarPanel title="Missing DevOps Topics Added">
            <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
              {missingTopics.map((topic) => (
                <li className="flex gap-3" key={topic}>
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" name="check" />
                  {topic}
                </li>
              ))}
            </ul>
          </SidebarPanel>
        </aside>
      </div>
    </main>
  );
}
