"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type Stage = "Beginner" | "Intermediate" | "Advanced" | "Expert";
type Difficulty = "Starter" | "Core" | "Applied" | "Advanced" | "Expert";
type ResourceCategory = "Official Docs" | "Video" | "Practice" | "Community";

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
  completed: "demontech-backend-roadmap-completed",
  bookmarked: "demontech-backend-roadmap-bookmarked",
  notes: "demontech-backend-roadmap-notes",
};

const stageSummaries: StageSummary[] = [
  {
    stage: "Beginner",
    duration: "10-14 weeks",
    outcome: "Understand the web, choose a language, use Git, and manage dependencies.",
  },
  {
    stage: "Intermediate",
    duration: "18-24 weeks",
    outcome: "Design APIs, use databases, authenticate users, cache data, and process background work.",
  },
  {
    stage: "Advanced",
    duration: "16-22 weeks",
    outcome: "Design scalable systems, architecture boundaries, observability, security, testing, and DevOps flows.",
  },
  {
    stage: "Expert",
    duration: "18-28 weeks",
    outcome: "Run cloud-native, resilient, cost-aware distributed systems in production.",
  },
];

const roadmapNodes: RoadmapNode[] = [
  {
    id: "internet-fundamentals",
    title: "Internet Fundamentals",
    stage: "Beginner",
    difficulty: "Starter",
    duration: "2 weeks",
    description: "Build the mental model of how requests move from a user device to backend services and back.",
    prerequisites: ["Basic computer literacy"],
    topics: ["How the Web Works", "DNS", "HTTP/HTTPS", "Browsers", "Client vs Server", "TCP/IP Basics"],
    skillsGained: ["Read request/response flows", "Explain DNS resolution", "Understand network layers", "Inspect HTTP traffic"],
    resources: [
      { label: "MDN: How the Web works", href: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work", category: "Official Docs" },
      { label: "Cloudflare Learning Center", href: "https://www.cloudflare.com/learning/", category: "Official Docs" },
      { label: "HTTP Cats", href: "https://http.cat/", category: "Practice" },
    ],
    practiceExercises: ["Trace a DNS lookup with a command-line tool.", "Inspect request headers in browser devtools.", "Draw a client-server request lifecycle."],
    miniProject: "Create an illustrated web request lifecycle explainer.",
    realWorldApplications: ["Debug slow API responses", "Understand CDN behavior", "Diagnose TLS and DNS issues"],
    quiz: "What happens between entering a URL and receiving HTML from a server?",
  },
  {
    id: "programming-fundamentals",
    title: "Programming Fundamentals",
    stage: "Beginner",
    difficulty: "Starter",
    duration: "6 weeks",
    description: "Learn the programming primitives and problem-solving patterns used in backend services.",
    prerequisites: ["Internet Fundamentals"],
    topics: ["Variables", "Functions", "OOP", "Data Structures", "Algorithms", "Error Handling"],
    skillsGained: ["Write clear functions", "Model data structures", "Handle failures", "Reason about complexity"],
    resources: [
      { label: "freeCodeCamp", href: "https://www.freecodecamp.org/learn/", category: "Practice" },
      { label: "The Algorithms", href: "https://the-algorithms.com/", category: "Community" },
      { label: "Python tutorial", href: "https://docs.python.org/3/tutorial/", category: "Official Docs" },
    ],
    practiceExercises: ["Implement stack, queue, and hash map examples.", "Solve ten basic algorithm problems.", "Write error handling for invalid input."],
    miniProject: "Build a command-line expense tracker.",
    realWorldApplications: ["Input validation", "Business rules", "Service-layer logic"],
    quiz: "When would you use a hash map instead of an array?",
  },
  {
    id: "backend-language-selection",
    title: "Backend Language Selection",
    stage: "Beginner",
    difficulty: "Core",
    duration: "2 weeks",
    description: "Choose a backend language based on ecosystem, team needs, performance, hiring market, and project constraints.",
    prerequisites: ["Programming Fundamentals"],
    topics: ["JavaScript (Node.js)", "TypeScript", "Python", "Java", "Go", "C#", "Rust"],
    skillsGained: ["Compare language tradeoffs", "Choose a runtime", "Evaluate ecosystems", "Read backend project structure"],
    resources: [
      { label: "Node.js docs", href: "https://nodejs.org/en/docs", category: "Official Docs" },
      { label: "Go docs", href: "https://go.dev/doc/", category: "Official Docs" },
      { label: "Rust book", href: "https://doc.rust-lang.org/book/", category: "Official Docs" },
    ],
    practiceExercises: ["Write the same small API handler in two languages.", "Compare package ecosystems.", "Document language tradeoffs for a startup API."],
    miniProject: "Build a hello-world HTTP server in your chosen language.",
    realWorldApplications: ["Tech stack decisions", "Hiring alignment", "Performance planning"],
    quiz: "Why might a team choose Go over Node.js for a backend service?",
  },
  {
    id: "version-control",
    title: "Version Control",
    stage: "Beginner",
    difficulty: "Core",
    duration: "1 week",
    description: "Use Git and GitHub to collaborate safely on backend systems with reviewable change history.",
    prerequisites: ["Programming Fundamentals"],
    topics: ["Git", "GitHub", "Branching", "Pull Requests", "Merge Conflicts"],
    skillsGained: ["Create branches", "Open pull requests", "Resolve conflicts", "Review code"],
    resources: [
      { label: "Git docs", href: "https://git-scm.com/doc", category: "Official Docs" },
      { label: "GitHub Skills", href: "https://skills.github.com/", category: "Practice" },
      { label: "Git roadmap", href: "/roadmaps/git", category: "Community" },
    ],
    practiceExercises: ["Create a feature branch.", "Resolve a merge conflict.", "Review a teammate-style pull request."],
    miniProject: "Publish your first backend API repository with clean commits.",
    realWorldApplications: ["Team collaboration", "Release history", "Rollback planning"],
    quiz: "What is the difference between merge and rebase?",
  },
  {
    id: "package-managers",
    title: "Package Managers",
    stage: "Beginner",
    difficulty: "Core",
    duration: "1 week",
    description: "Manage dependencies, scripts, lockfiles, and build tools across backend language ecosystems.",
    prerequisites: ["Backend Language Selection", "Version Control"],
    topics: ["npm", "pnpm", "yarn", "pip", "Maven", "Gradle"],
    skillsGained: ["Install dependencies", "Use lockfiles", "Write scripts", "Audit packages"],
    resources: [
      { label: "npm docs", href: "https://docs.npmjs.com/", category: "Official Docs" },
      { label: "pip docs", href: "https://pip.pypa.io/en/stable/", category: "Official Docs" },
      { label: "Maven docs", href: "https://maven.apache.org/guides/", category: "Official Docs" },
    ],
    practiceExercises: ["Create dev/build/test scripts.", "Explain semantic version ranges.", "Compare npm, pnpm, pip, and Maven workflows."],
    miniProject: "Create a backend starter package with scripts and dependency documentation.",
    realWorldApplications: ["Dependency hygiene", "CI builds", "Supply-chain safety"],
    quiz: "Why should production services commit lockfiles?",
  },
  {
    id: "databases",
    title: "Databases",
    stage: "Intermediate",
    difficulty: "Applied",
    duration: "6 weeks",
    description: "Design relational databases, write efficient queries, and optimize data access for production workloads.",
    prerequisites: ["Programming Fundamentals"],
    topics: ["SQL", "PostgreSQL", "MySQL", "Database Design", "Normalization", "Indexing", "Query Optimization"],
    skillsGained: ["Model relational data", "Write SQL joins", "Design indexes", "Analyze query plans"],
    resources: [
      { label: "PostgreSQL docs", href: "https://www.postgresql.org/docs/", category: "Official Docs" },
      { label: "SQLBolt", href: "https://sqlbolt.com/", category: "Practice" },
      { label: "Use The Index, Luke", href: "https://use-the-index-luke.com/", category: "Community" },
    ],
    practiceExercises: ["Design normalized tables for a blog.", "Write joins and aggregations.", "Use EXPLAIN on a slow query."],
    miniProject: "Build a notes API backed by PostgreSQL.",
    realWorldApplications: ["User data storage", "Analytics queries", "Transactional systems"],
    quiz: "How does an index speed up reads and slow down writes?",
  },
  {
    id: "nosql-databases",
    title: "NoSQL Databases",
    stage: "Intermediate",
    difficulty: "Applied",
    duration: "3 weeks",
    description: "Understand document, key-value, wide-column, and managed NoSQL databases for flexible or high-scale workloads.",
    prerequisites: ["Databases"],
    topics: ["MongoDB", "Redis", "Cassandra", "DynamoDB"],
    skillsGained: ["Choose NoSQL data models", "Use document collections", "Use key-value stores", "Understand partitioning"],
    resources: [
      { label: "MongoDB docs", href: "https://www.mongodb.com/docs/", category: "Official Docs" },
      { label: "Redis docs", href: "https://redis.io/docs/latest/", category: "Official Docs" },
      { label: "DynamoDB guide", href: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html", category: "Official Docs" },
    ],
    practiceExercises: ["Design a MongoDB schema.", "Use Redis for hot keys.", "Compare relational vs document modeling."],
    miniProject: "Build a product catalog with MongoDB and Redis caching.",
    realWorldApplications: ["Session stores", "Catalog data", "High-throughput key-value access"],
    quiz: "When is denormalization a good NoSQL tradeoff?",
  },
  {
    id: "api-development",
    title: "API Development",
    stage: "Intermediate",
    difficulty: "Applied",
    duration: "5 weeks",
    description: "Design robust APIs with predictable contracts, documentation, versioning, validation, and error semantics.",
    prerequisites: ["Databases", "Backend Language Selection"],
    topics: ["REST", "GraphQL", "gRPC", "API Versioning", "API Documentation"],
    skillsGained: ["Design REST resources", "Write OpenAPI docs", "Validate payloads", "Version APIs"],
    resources: [
      { label: "OpenAPI specification", href: "https://spec.openapis.org/oas/latest.html", category: "Official Docs" },
      { label: "GraphQL Learn", href: "https://graphql.org/learn/", category: "Official Docs" },
      { label: "gRPC docs", href: "https://grpc.io/docs/", category: "Official Docs" },
    ],
    practiceExercises: ["Design endpoints for a notes app.", "Write OpenAPI documentation.", "Add validation and structured errors."],
    miniProject: "Build a versioned REST API with docs and validation.",
    realWorldApplications: ["Public APIs", "Internal services", "Mobile app backends"],
    quiz: "What makes an API backwards compatible?",
  },
  {
    id: "authentication-authorization",
    title: "Authentication & Authorization",
    stage: "Intermediate",
    difficulty: "Advanced",
    duration: "4 weeks",
    description: "Secure identities, sessions, tokens, roles, and sensitive user workflows.",
    prerequisites: ["API Development", "Security basics"],
    topics: ["Sessions", "Cookies", "JWT", "OAuth", "RBAC", "MFA"],
    skillsGained: ["Implement login flows", "Protect routes", "Model roles", "Handle token lifecycles"],
    resources: [
      { label: "Auth0 identity docs", href: "https://auth0.com/docs", category: "Official Docs" },
      { label: "OWASP Authentication Cheat Sheet", href: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html", category: "Official Docs" },
      { label: "OAuth 2.0", href: "https://oauth.net/2/", category: "Official Docs" },
    ],
    practiceExercises: ["Create signup/login/logout.", "Add role-protected endpoints.", "Implement refresh-token rotation notes."],
    miniProject: "Build a secure authentication system with RBAC.",
    realWorldApplications: ["SaaS accounts", "Admin panels", "Enterprise access control"],
    quiz: "What is the difference between authentication and authorization?",
  },
  {
    id: "backend-frameworks",
    title: "Backend Frameworks",
    stage: "Intermediate",
    difficulty: "Applied",
    duration: "5 weeks",
    description: "Use backend frameworks to structure routing, middleware, validation, controllers, services, and dependency boundaries.",
    prerequisites: ["API Development", "Backend Language Selection"],
    topics: ["Express.js", "NestJS", "Django", "Spring Boot", "FastAPI", "Gin"],
    skillsGained: ["Use middleware", "Create controllers", "Structure services", "Configure framework conventions"],
    resources: [
      { label: "Express docs", href: "https://expressjs.com/", category: "Official Docs" },
      { label: "NestJS docs", href: "https://docs.nestjs.com/", category: "Official Docs" },
      { label: "FastAPI docs", href: "https://fastapi.tiangolo.com/", category: "Official Docs" },
    ],
    practiceExercises: ["Build CRUD routes.", "Add middleware and validation.", "Separate controller and service logic."],
    miniProject: "Build a blog backend with posts, users, comments, and admin moderation.",
    realWorldApplications: ["Production web APIs", "Admin systems", "Backend services"],
    quiz: "Why should business logic avoid living directly in route handlers?",
  },
  {
    id: "caching",
    title: "Caching",
    stage: "Intermediate",
    difficulty: "Applied",
    duration: "2 weeks",
    description: "Reduce latency and backend load with Redis, CDNs, cache keys, invalidation, and cache-aside patterns.",
    prerequisites: ["Databases", "API Development"],
    topics: ["Redis", "CDN", "Cache Strategies"],
    skillsGained: ["Design cache keys", "Use TTLs", "Avoid stale data bugs", "Measure cache hit ratio"],
    resources: [
      { label: "Redis docs", href: "https://redis.io/docs/latest/", category: "Official Docs" },
      { label: "Cloudflare CDN learning", href: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/", category: "Official Docs" },
      { label: "AWS caching overview", href: "https://aws.amazon.com/caching/", category: "Official Docs" },
    ],
    practiceExercises: ["Cache expensive read queries.", "Add TTL and invalidation rules.", "Measure before and after response time."],
    miniProject: "Add Redis caching to an e-commerce product API.",
    realWorldApplications: ["Fast product pages", "Rate-limited APIs", "Read-heavy dashboards"],
    quiz: "What can go wrong with cache invalidation?",
  },
  {
    id: "message-queues",
    title: "Message Queues",
    stage: "Intermediate",
    difficulty: "Advanced",
    duration: "3 weeks",
    description: "Process background work and asynchronous communication with durable queues and event streams.",
    prerequisites: ["API Development", "Caching"],
    topics: ["RabbitMQ", "Kafka", "SQS"],
    skillsGained: ["Publish messages", "Consume jobs", "Retry safely", "Understand ordering and delivery guarantees"],
    resources: [
      { label: "RabbitMQ tutorials", href: "https://www.rabbitmq.com/tutorials", category: "Official Docs" },
      { label: "Kafka docs", href: "https://kafka.apache.org/documentation/", category: "Official Docs" },
      { label: "Amazon SQS docs", href: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html", category: "Official Docs" },
    ],
    practiceExercises: ["Create a background email job.", "Implement retries and dead-letter notes.", "Compare queue vs event stream."],
    miniProject: "Build an async notification worker for a blog backend.",
    realWorldApplications: ["Email delivery", "Order processing", "Event pipelines"],
    quiz: "Why should queue consumers be idempotent?",
  },
  {
    id: "file-storage",
    title: "File Storage",
    stage: "Intermediate",
    difficulty: "Applied",
    duration: "2 weeks",
    description: "Handle uploads, file validation, object storage, signed URLs, metadata, and safe delivery.",
    prerequisites: ["API Development", "Authentication & Authorization"],
    topics: ["Local Storage", "AWS S3", "Cloud Storage", "File Upload Systems"],
    skillsGained: ["Validate uploads", "Use object storage", "Generate signed URLs", "Store metadata"],
    resources: [
      { label: "Amazon S3 docs", href: "https://docs.aws.amazon.com/s3/", category: "Official Docs" },
      { label: "Google Cloud Storage docs", href: "https://cloud.google.com/storage/docs", category: "Official Docs" },
      { label: "Multer docs", href: "https://github.com/expressjs/multer", category: "Community" },
    ],
    practiceExercises: ["Upload images safely.", "Generate signed download URLs.", "Reject invalid file types and sizes."],
    miniProject: "Build a file storage service with metadata and access control.",
    realWorldApplications: ["Profile images", "Document storage", "Media delivery"],
    quiz: "Why should user uploads not be served directly from application servers?",
  },
  {
    id: "system-design",
    title: "System Design",
    stage: "Advanced",
    difficulty: "Advanced",
    duration: "6 weeks",
    description: "Design services that scale horizontally, tolerate failures, and meet latency and throughput requirements.",
    prerequisites: ["Databases", "API Development", "Caching"],
    topics: ["Scalability", "Load Balancing", "Horizontal Scaling", "Vertical Scaling", "Distributed Systems"],
    skillsGained: ["Estimate capacity", "Design load-balanced systems", "Identify bottlenecks", "Choose scaling strategies"],
    resources: [
      { label: "System Design Primer", href: "https://github.com/donnemartin/system-design-primer", category: "Community" },
      { label: "AWS Well-Architected", href: "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html", category: "Official Docs" },
      { label: "Google SRE books", href: "https://sre.google/books/", category: "Official Docs" },
    ],
    practiceExercises: ["Design a URL shortener.", "Estimate traffic and storage.", "Identify single points of failure."],
    miniProject: "Build a scalable URL shortener with analytics.",
    realWorldApplications: ["Interview design rounds", "Capacity planning", "Architecture reviews"],
    quiz: "When would horizontal scaling be better than vertical scaling?",
  },
  {
    id: "architecture-patterns",
    title: "Architecture Patterns",
    stage: "Advanced",
    difficulty: "Advanced",
    duration: "4 weeks",
    description: "Choose structural patterns that keep backend systems maintainable as teams, features, and traffic grow.",
    prerequisites: ["Backend Frameworks", "System Design"],
    topics: ["Monolith", "Microservices", "Event Driven Architecture", "Clean Architecture", "Hexagonal Architecture"],
    skillsGained: ["Separate domain logic", "Model boundaries", "Choose monolith vs microservices", "Use ports and adapters"],
    resources: [
      { label: "Martin Fowler architecture", href: "https://martinfowler.com/architecture/", category: "Community" },
      { label: "Microservices guide", href: "https://microservices.io/", category: "Community" },
      { label: "AWS event-driven architecture", href: "https://aws.amazon.com/event-driven-architecture/", category: "Official Docs" },
    ],
    practiceExercises: ["Refactor routes into domain services.", "Draw service boundaries.", "Compare event-driven and request-driven flows."],
    miniProject: "Build a chat backend with separated domain, transport, and persistence layers.",
    realWorldApplications: ["SaaS backend structure", "Team ownership", "Legacy modernization"],
    quiz: "Why are microservices expensive before a team has clear domain boundaries?",
  },
  {
    id: "observability",
    title: "Observability",
    stage: "Advanced",
    difficulty: "Advanced",
    duration: "3 weeks",
    description: "Make production systems understandable with logs, metrics, traces, dashboards, and alerting.",
    prerequisites: ["System Design", "Backend Frameworks"],
    topics: ["Logging", "Monitoring", "Metrics", "Tracing"],
    skillsGained: ["Write structured logs", "Create metrics", "Trace requests", "Design alerts"],
    resources: [
      { label: "OpenTelemetry docs", href: "https://opentelemetry.io/docs/", category: "Official Docs" },
      { label: "Prometheus docs", href: "https://prometheus.io/docs/introduction/overview/", category: "Official Docs" },
      { label: "Grafana docs", href: "https://grafana.com/docs/", category: "Official Docs" },
    ],
    practiceExercises: ["Add request IDs to logs.", "Create latency and error metrics.", "Trace one request through multiple services."],
    miniProject: "Add observability to a file storage service.",
    realWorldApplications: ["Incident response", "Performance debugging", "SLO tracking"],
    quiz: "What is the difference between metrics and traces?",
  },
  {
    id: "security",
    title: "Security",
    stage: "Advanced",
    difficulty: "Expert",
    duration: "5 weeks",
    description: "Protect backend systems against common application, API, and infrastructure risks.",
    prerequisites: ["Authentication & Authorization", "API Development"],
    topics: ["OWASP Top 10", "SQL Injection", "XSS", "CSRF", "Rate Limiting", "Security Headers"],
    skillsGained: ["Threat model APIs", "Prevent injection", "Use secure headers", "Rate-limit abuse"],
    resources: [
      { label: "OWASP Top 10", href: "https://owasp.org/www-project-top-ten/", category: "Official Docs" },
      { label: "OWASP API Security", href: "https://owasp.org/www-project-api-security/", category: "Official Docs" },
      { label: "PortSwigger Academy", href: "https://portswigger.net/web-security", category: "Practice" },
    ],
    practiceExercises: ["Fix SQL injection in a sample endpoint.", "Add rate limits.", "Create a security checklist for releases."],
    miniProject: "Harden an authentication API against common attacks.",
    realWorldApplications: ["Compliance", "Abuse prevention", "Data protection"],
    quiz: "How do parameterized queries prevent SQL injection?",
  },
  {
    id: "testing",
    title: "Testing",
    stage: "Advanced",
    difficulty: "Advanced",
    duration: "4 weeks",
    description: "Verify backend behavior with fast unit tests, realistic integration tests, E2E tests, and load tests.",
    prerequisites: ["Backend Frameworks", "Databases"],
    topics: ["Unit Testing", "Integration Testing", "End-to-End Testing", "Load Testing"],
    skillsGained: ["Test services", "Mock dependencies", "Spin up test databases", "Measure load behavior"],
    resources: [
      { label: "Jest docs", href: "https://jestjs.io/docs/getting-started", category: "Official Docs" },
      { label: "pytest docs", href: "https://docs.pytest.org/", category: "Official Docs" },
      { label: "k6 docs", href: "https://k6.io/docs/", category: "Official Docs" },
    ],
    practiceExercises: ["Write unit tests for services.", "Run integration tests against a test database.", "Load test one endpoint."],
    miniProject: "Create a tested e-commerce API with payment-flow mocks.",
    realWorldApplications: ["Release confidence", "Regression prevention", "Performance validation"],
    quiz: "When is an integration test more valuable than a unit test?",
  },
  {
    id: "devops-fundamentals",
    title: "DevOps Fundamentals",
    stage: "Advanced",
    difficulty: "Advanced",
    duration: "5 weeks",
    description: "Operate backend services with Linux, shell scripting, CI/CD, Docker, and repeatable release workflows.",
    prerequisites: ["Testing", "Version Control"],
    topics: ["Linux", "Bash", "CI/CD", "GitHub Actions", "Docker"],
    skillsGained: ["Use Linux servers", "Write Bash scripts", "Create CI workflows", "Containerize services"],
    resources: [
      { label: "Docker docs", href: "https://docs.docker.com/", category: "Official Docs" },
      { label: "GitHub Actions docs", href: "https://docs.github.com/en/actions", category: "Official Docs" },
      { label: "Linux Journey", href: "https://linuxjourney.com/", category: "Practice" },
    ],
    practiceExercises: ["Write a Dockerfile.", "Create a GitHub Actions build pipeline.", "Use Bash to automate local setup."],
    miniProject: "Containerize and deploy a tested backend API.",
    realWorldApplications: ["CI/CD", "Deployment automation", "Environment parity"],
    quiz: "What problem does Docker solve for backend teams?",
  },
  {
    id: "cloud-platforms",
    title: "Cloud Platforms",
    stage: "Expert",
    difficulty: "Advanced",
    duration: "6 weeks",
    description: "Deploy and operate backend workloads across cloud compute, networking, databases, storage, and managed services.",
    prerequisites: ["DevOps Fundamentals", "System Design"],
    topics: ["AWS", "Azure", "Google Cloud"],
    skillsGained: ["Choose cloud services", "Configure managed databases", "Understand IAM", "Design cloud deployments"],
    resources: [
      { label: "AWS docs", href: "https://docs.aws.amazon.com/", category: "Official Docs" },
      { label: "Azure docs", href: "https://learn.microsoft.com/en-us/azure/", category: "Official Docs" },
      { label: "Google Cloud docs", href: "https://cloud.google.com/docs", category: "Official Docs" },
    ],
    practiceExercises: ["Map app components to cloud services.", "Create a managed database.", "Document IAM boundaries."],
    miniProject: "Deploy a backend API with managed database and object storage.",
    realWorldApplications: ["Production hosting", "Managed infrastructure", "Cloud migration"],
    quiz: "Why is IAM a core backend production skill?",
  },
  {
    id: "containerization-orchestration",
    title: "Containerization & Orchestration",
    stage: "Expert",
    difficulty: "Expert",
    duration: "5 weeks",
    description: "Run containerized services reliably with Docker, Kubernetes, Helm, health checks, and rollout strategies.",
    prerequisites: ["DevOps Fundamentals", "Cloud Platforms"],
    topics: ["Docker", "Kubernetes", "Helm"],
    skillsGained: ["Build images", "Deploy pods", "Configure services", "Use Helm charts", "Manage rollouts"],
    resources: [
      { label: "Kubernetes docs", href: "https://kubernetes.io/docs/home/", category: "Official Docs" },
      { label: "Helm docs", href: "https://helm.sh/docs/", category: "Official Docs" },
      { label: "Play with Kubernetes", href: "https://labs.play-with-k8s.com/", category: "Practice" },
    ],
    practiceExercises: ["Deploy a container to Kubernetes.", "Add readiness and liveness probes.", "Package a service with Helm."],
    miniProject: "Run a multi-service backend on Kubernetes.",
    realWorldApplications: ["Microservice platforms", "Autoscaling", "Cloud-native operations"],
    quiz: "What is the difference between a deployment and a service in Kubernetes?",
  },
  {
    id: "infrastructure-as-code",
    title: "Infrastructure as Code",
    stage: "Expert",
    difficulty: "Expert",
    duration: "4 weeks",
    description: "Define infrastructure safely and repeatably using declarative or programmatic tooling.",
    prerequisites: ["Cloud Platforms", "DevOps Fundamentals"],
    topics: ["Terraform", "Pulumi"],
    skillsGained: ["Write IaC modules", "Plan changes", "Manage state", "Review infrastructure diffs"],
    resources: [
      { label: "Terraform docs", href: "https://developer.hashicorp.com/terraform/docs", category: "Official Docs" },
      { label: "Pulumi docs", href: "https://www.pulumi.com/docs/", category: "Official Docs" },
      { label: "Terraform AWS tutorials", href: "https://developer.hashicorp.com/terraform/tutorials/aws-get-started", category: "Practice" },
    ],
    practiceExercises: ["Provision a database with IaC.", "Review a plan output.", "Create reusable environment variables and modules."],
    miniProject: "Provision a cloud backend environment using Terraform.",
    realWorldApplications: ["Repeatable environments", "Compliance review", "Infrastructure versioning"],
    quiz: "Why is Terraform state sensitive?",
  },
  {
    id: "advanced-scalability",
    title: "Advanced Scalability",
    stage: "Expert",
    difficulty: "Expert",
    duration: "6 weeks",
    description: "Handle large-scale data and traffic with sharding, replication, CQRS, event sourcing, and asynchronous architecture.",
    prerequisites: ["System Design", "Architecture Patterns", "Cloud Platforms"],
    topics: ["Sharding", "Replication", "Event Sourcing", "CQRS"],
    skillsGained: ["Partition data", "Design replication", "Separate read/write models", "Use event histories"],
    resources: [
      { label: "Designing Data-Intensive Applications notes", href: "https://dataintensive.net/", category: "Community" },
      { label: "Azure CQRS pattern", href: "https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs", category: "Official Docs" },
      { label: "AWS event sourcing", href: "https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/event-sourcing.html", category: "Official Docs" },
    ],
    practiceExercises: ["Design database shards for tenant data.", "Create read/write model diagrams.", "Model event history for an order system."],
    miniProject: "Design a scalable SaaS backend with CQRS and event streams.",
    realWorldApplications: ["Large SaaS systems", "Analytics-heavy services", "Event-driven platforms"],
    quiz: "What tradeoffs does sharding introduce?",
  },
  {
    id: "production-engineering",
    title: "Production Engineering",
    stage: "Expert",
    difficulty: "Expert",
    duration: "6 weeks",
    description: "Operate high-availability systems with reliability targets, disaster recovery, incident response, and cost controls.",
    prerequisites: ["Observability", "Advanced Scalability", "Infrastructure as Code"],
    topics: ["Reliability", "High Availability", "Disaster Recovery", "Cost Optimization"],
    skillsGained: ["Define SLOs", "Plan failover", "Run postmortems", "Optimize cloud spend"],
    resources: [
      { label: "Google SRE books", href: "https://sre.google/books/", category: "Official Docs" },
      { label: "AWS reliability pillar", href: "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html", category: "Official Docs" },
      { label: "FinOps Foundation", href: "https://www.finops.org/introduction/what-is-finops/", category: "Community" },
    ],
    practiceExercises: ["Write an incident runbook.", "Create an SLO and error budget.", "Estimate monthly cloud cost for a service."],
    miniProject: "Design a highly available backend with disaster recovery and cost controls.",
    realWorldApplications: ["On-call readiness", "Enterprise SLAs", "Production reliability"],
    quiz: "What is the difference between availability and reliability?",
  },
];

const projectTracks: ProjectTrack[] = [
  { stage: "Beginner", projects: ["Calculator API", "Notes API"] },
  { stage: "Intermediate", projects: ["Authentication System", "Blog Backend", "E-commerce API"] },
  { stage: "Advanced", projects: ["URL Shortener", "Chat Application Backend", "File Storage Service"] },
  { stage: "Expert", projects: ["Distributed Microservices Platform", "Netflix-style Backend Architecture", "Scalable SaaS Backend"] },
];

const missingTopics = [
  "Domain-driven design",
  "API gateways",
  "Service discovery",
  "Secrets management",
  "Database migrations",
  "Backup strategy",
  "Feature flags",
  "Blue-green deployments",
  "Contract testing",
  "Data privacy and compliance",
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

const resourceCategories: ResourceCategory[] = ["Official Docs", "Video", "Practice", "Community"];

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
                  <h3 className="text-sm font-black text-white">Mini Project</h3>
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

export default function BackendDeveloperRoadmap() {
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
            <span className="font-bold text-zinc-300">Backend Developer</span>
          </div>

          <section className="mt-6 overflow-hidden rounded-md border border-zinc-800 bg-zinc-950">
            <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:p-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-black text-red-300">
                  <Icon className="h-4 w-4" name="server" />
                  Production Backend Engineering Path
                </div>
                <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                  Backend Developer Roadmap
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300">
                  A complete server-side learning journey from internet fundamentals to distributed systems, cloud platforms, security, observability, and production engineering.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["24", "Roadmap nodes", "layers"],
                    ["46-68 weeks", "Total duration", "clock"],
                    ["96+", "Skills tracked", "badge"],
                    ["12", "Project builds", "target"],
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
                <p className="text-sm font-black text-white">Level Architecture</p>
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
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">Every level ends with shippable backend systems that combine APIs, persistence, auth, reliability, and deployment skills.</p>
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
                <h2 className="text-2xl font-black text-white">Vertical Backend Journey</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                  Expand each node for prerequisites, resources, practice exercises, mini projects, real-world usage, quiz prompts, bookmarks, and notes.
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
            <h2 className="text-2xl font-black text-white">Backend Resource Matrix</h2>
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
            <h2 className="text-2xl font-black text-white">Scalable Page Architecture</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {[
                ["Component hierarchy", "BackendDeveloperRoadmap -> SidebarPanel -> ProgressRing -> RoadmapNodeCard -> resource, notes, quiz, project sections."],
                ["Folder architecture", "Future extraction: src/features/roadmaps/backend/data.ts, components/RoadmapNodeCard.tsx, components/ProgressDashboard.tsx, components/ProjectTrack.tsx."],
                ["TypeScript interfaces", "Stage, Difficulty, ResourceCategory, Resource, RoadmapNode, StageSummary, ProjectTrack."],
                ["Tailwind structure", "Black base surface, zinc borders, red accent states, responsive grids, sticky dashboard, accessible focus and pressed states."],
                ["Feature specifications", "Completion tracking, bookmarks, per-topic notes, quizzes, project milestones, achievement badges, recommended next step."],
                ["UX improvements", "Vertical progression, low-glow premium surfaces, dense metadata, dashboard widgets, mobile-first single-column behavior."],
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

          <SidebarPanel title="Skill Completion">
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

          <SidebarPanel title="Learning State">
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                [currentLevel, "current level", "shield"],
                [String(bookmarkedIds.size), "bookmarks", "bookmark"],
                [String(noteCount), "notes saved", "note"],
                ["46-68w", "estimated time", "clock"],
              ].map(([value, label, icon]) => (
                <div className="rounded-md border border-zinc-800 bg-[#050505] p-3" key={label}>
                  <Icon className="h-4 w-4 text-red-400" name={icon as keyof typeof icons} />
                  <p className="mt-2 text-lg font-black text-white">{value}</p>
                  <p className="mt-1 text-xs text-zinc-500">{label}</p>
                </div>
              ))}
            </div>
          </SidebarPanel>

          <SidebarPanel title="Achievement Badges">
            <div className="mt-4 grid gap-3">
              {["API Architect", "Database Designer", "Security Defender", "Cloud Operator"].map((badge, index) => (
                <div className={`flex items-center gap-3 rounded-md border p-3 ${completedCount > index * 6 ? "border-red-500/40 bg-red-500/10 text-red-100" : "border-zinc-800 bg-[#050505] text-zinc-500"}`} key={badge}>
                  <Icon className="h-5 w-5" name="badge" />
                  <span className="text-sm font-bold">{badge}</span>
                </div>
              ))}
            </div>
          </SidebarPanel>

          <SidebarPanel title="Missing Backend Topics Added">
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
