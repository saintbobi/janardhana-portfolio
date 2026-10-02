import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Check,
  Cloud,
  Code2,
  Container,
  ExternalLink,
  FileText,
  GitBranch,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Network,
  Send,
  Server,
  ShieldCheck,
  Sun,
  Terminal,
  X,
} from "lucide-react"

const profile = {
  name: "Janardhana Abby",
  university: "BINUS University",
  degree: "Computer Science",
  period: "2024 - Present",
  email: "janardhanaabby04@gmail.com",
  linkedin: "https://linkedin.com/in/janardhanaabby",
  github: "https://github.com/saintbobi",
  cv: "public/cv.pdf",
}

const projects = [
  {
    id: "01",
    title: "A home in the cloud",
    subtitle: "Highly available web infrastructure",
    category: "Cloud",
    stack: ["AWS", "Terraform", "Linux"],
    description:
      "A learning lab for deploying a web application with a secure network and repeatable infrastructure.",
    overview:
      "Explore how to host a web application on AWS using a VPC, public and private subnets, an application load balancer, and EC2 instances.",
    architecture: [
      "Internet",
      "Load balancer",
      "EC2 instances",
      "Private database",
    ],
    implementation:
      "Define the network and compute resources in Terraform. Configure security groups, bootstrap Linux instances, and test access through the load balancer.",
    learnings:
      "Practice subnet design, least-privilege access, and reproducible provisioning. Document deployment steps and verify traffic routing before adding any performance claims.",
    kind: "cloud",
  },
  {
    id: "02",
    title: "Less clicking. More building.",
    subtitle: "Infrastructure automation with Terraform",
    category: "Automation",
    stack: ["Terraform", "AWS", "Git"],
    description:
      "An infrastructure-as-code lab that turns manual setup into version-controlled, repeatable deployments.",
    overview:
      "Build a small, modular Terraform configuration to provision cloud resources consistently without repeating console setup.",
    architecture: [
      "Git repository",
      "Terraform plan",
      "Terraform apply",
      "AWS resources",
    ],
    implementation:
      "Create reusable modules, parameterize the environment, review plans before applying, and keep sensitive values outside source control.",
    learnings:
      "Learn the Terraform plan/apply workflow, state management, and resource lifecycle. Record real outputs and teardown steps in the project README.",
    kind: "terminal",
  },
  {
    id: "03",
    title: "From commit to container",
    subtitle: "An automated build & deployment pipeline",
    category: "Automation",
    stack: ["Docker", "GitHub Actions", "Python"],
    description:
      "A hands-on CI/CD lab for packaging a small application and automating its build and validation.",
    overview:
      "Containerize a small Python application and automate validation and image building with GitHub Actions.",
    architecture: [
      "Git push",
      "Run checks",
      "Build image",
      "Container registry",
    ],
    implementation:
      "Write a Dockerfile, add a health check, and configure a workflow to test the application before building an image. Store credentials as repository secrets.",
    learnings:
      "Understand image layers, workflow triggers, and failed-build debugging. Verify the image runs locally and document any remaining deployment work.",
    kind: "pipeline",
  },
]
type Project = typeof projects[number]
const buttonClass =
  "inline-flex items-center justify-center gap-2.5 rounded-lg border border-black/70 bg-[linear-gradient(180deg,#65665e_0%,#34352f_46%,#1c1d19_52%,#30312b_100%)] px-4 py-2.5 text-[13px] font-medium text-white shadow-[inset_0_1px_0_#ffffff50,0_3px_5px_#00000026] transition hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_#ffffff50,0_5px_9px_#00000030] active:translate-y-0"
const secondaryClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-[13px] font-medium text-foreground transition hover:bg-secondary"

function SectionLabel({
  number,
  children,
}: {
  number: string
  children: ReactNode
}) {
  return (
    <div className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground">
      <span>{number}</span>
      <span className="h-px w-7 bg-border" />
      <span>{children}</span>
    </div>
  )
}

function ProjectVisual({
  kind,
  expanded = false,
}: {
  kind: string
  expanded?: boolean
}) {
  if (kind === "terminal")
    return (
      <div
        className={`flex h-full min-h-52 items-center justify-center bg-[#e8eee5] p-7 ${
          expanded ? "min-h-64" : ""
        }`}
      >
        <div className="w-full max-w-80 overflow-hidden rounded-lg border border-[#3d4439] bg-[#252d23] shadow-[0_12px_28px_#24302022]">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
            <span className="size-1.5 rounded-full bg-[#de8c79]" />
            <span className="size-1.5 rounded-full bg-[#dbc277]" />
            <span className="size-1.5 rounded-full bg-[#93ae7e]" />
            <span className="ml-auto font-mono text-[8px] text-[#bbc4b5]">
              infrastructure / main
            </span>
          </div>
          <div className="space-y-2.5 p-4 font-mono text-[9px] leading-relaxed text-[#c7d2bc]">
            <p>
              <span className="text-[#bddb82]">$</span> terraform init
            </p>
            <p className="text-[#899980]">Terraform has been initialized!</p>
            <p>
              <span className="text-[#bddb82]">$</span> terraform plan
            </p>
            <p>
              <span className="text-[#bddb82]">+</span> aws_vpc.main
            </p>
            <p>
              <span className="text-[#bddb82]">+</span> aws_instance.web
            </p>
            <p className="border-t border-white/10 pt-2 text-[#c9e9a7]">
              Plan: 2 to add, 0 to change, 0 to destroy.
            </p>
          </div>
        </div>
      </div>
    )
  if (kind === "pipeline")
    return (
      <div className="flex h-full min-h-52 flex-col items-center justify-center gap-5 bg-[#eeeae0] p-6">
        <div className="rounded-full border border-[#d8d3c5] bg-[#faf9f3] px-3 py-1.5 font-mono text-[9px] text-[#716955]">
          on: push → main
        </div>
        <div className="flex w-full max-w-80 items-center justify-center">
          {[
            { icon: GitBranch, label: "Commit" },
            { icon: Code2, label: "Test" },
            { icon: Container, label: "Build" },
            { icon: Cloud, label: "Ship" },
          ].map((step, index) => (
            <div key={step.label} className="contents">
              {index > 0 && (
                <div className="h-px min-w-2 flex-1 bg-[#bcb7a9]" />
              )}
              <div className="flex w-14 shrink-0 flex-col items-center gap-2">
                <div className="relative flex size-12 items-center justify-center rounded-xl border border-[#cec8b9] bg-[#faf9f3] text-[#66644e] shadow-sm">
                  <step.icon size={18} strokeWidth={1.4} />
                  <span className="absolute -right-1 -top-1 rounded-full bg-[#68825e] p-0.5 text-white">
                    <Check size={8} />
                  </span>
                </div>
                <span className="font-mono text-[9px] text-[#716955]">
                  {step.label}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#607653]">
          <span className="size-1 rounded-full bg-[#68825e]" /> All checks
          passed
        </div>
      </div>
    )
  return (
    <div className="flex h-full min-h-52 flex-col items-center justify-center bg-[#eae9f1] p-5 text-[#727082]">
      <div className="flex items-center gap-2 rounded-md border border-[#cccbd8] bg-[#f7f7fb] px-3 py-2 font-mono text-[9px]">
        <Cloud size={14} /> Internet
      </div>
      <div className="h-4 w-px bg-[#bcbacb]" />
      <div className="w-full max-w-72 rounded-lg border border-dashed border-[#aeabbe] p-3">
        <div className="mb-3 flex items-center gap-1.5 font-mono text-[8px]">
          <ShieldCheck size={10} /> AWS VPC{" "}
          <span className="ml-auto">10.0.0.0/16</span>
        </div>
        <div className="mx-auto flex w-fit items-center gap-2 rounded-md border border-[#cccbd8] bg-[#f7f7fb] px-3 py-1.5 text-[8px]">
          <Network size={12} /> Load balancer
        </div>
        <div className="mx-auto h-3 w-px bg-[#bcbacb]" />
        <div className="mx-auto w-3/5 border-t border-[#bcbacb]" />
        <div className="flex justify-around">
          {["us-east-1a", "us-east-1b"].map((zone) => (
            <div key={zone} className="flex flex-col items-center">
              <div className="h-2 w-px bg-[#bcbacb]" />
              <div className="flex items-center gap-2 rounded-md border border-[#cccbd8] bg-[#f7f7fb] px-3 py-2">
                <Server size={13} />
                <span className="font-mono text-[8px]">EC2</span>
              </div>
              <span className="mt-1.5 font-mono text-[7px]">{zone}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: ReactNode
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    dialog.current?.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])
  return (
    <dialog
      ref={dialog}
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-xl border border-border bg-card p-0 text-card-foreground shadow-2xl"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-card px-6 py-4">
        <h2 id="dialog-title" className="text-sm font-medium">
          {title}
        </h2>
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="rounded-md p-2 transition hover:bg-secondary"
        >
          <X size={18} />
        </button>
      </div>
      {children}
    </dialog>
  )
}

export default function App() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") === "dark"
    } catch {
      return false
    }
  })
  const [filter, setFilter] = useState("All projects")
  const [selected, setSelected] = useState<Project | null>(null)
  const [info, setInfo] =
    useState<"cv" | "email" | "linkedin" | "github" | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    try {
      localStorage.setItem("portfolio-theme", dark ? "dark" : "light")
    } catch {}
  }, [dark])
  useEffect(() => {
    const content = document.querySelectorAll(
      'main > section > :not([aria-hidden="true"])',
    )
    const revealSection = (section: Element) => {
      section
        .querySelectorAll(':scope > :not([aria-hidden="true"])')
        .forEach((item) => {
          item.classList.remove("is-visible")
          void (item as HTMLElement).offsetHeight
          requestAnimationFrame(() => item.classList.add("is-visible"))
        })
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 },
    )
    content.forEach((item) => {
      item.classList.add("scroll-reveal")
    })
    const observeDelay = window.setTimeout(() => {
      content.forEach((item) => observer.observe(item))
    }, 100)
    const replayOnNavigation = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return
      const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]')
      const target = link && document.getElementById(link.hash.slice(1))
      if (!target || !target.matches("main > section")) return
      revealSection(target)
    }
    document.addEventListener("click", replayOnNavigation)
    return () => {
      window.clearTimeout(observeDelay)
      observer.disconnect()
      document.removeEventListener("click", replayOnNavigation)
    }
  }, [])
  const downloadCV = () => {
    if (profile.cv) {
      window.open(profile.cv, "_blank", "noopener,noreferrer")
    } else {
      setInfo("cv")
    }
  }
  const openContact = (kind: "email" | "linkedin" | "github") => {
    const value = profile[kind]
    if (!value) {
      setInfo(kind)
      return
    }
    if (kind === "email") {
      window.location.href = `mailto:${value}`
    } else {
      window.open(value, "_blank", "noopener,noreferrer")
    }
  }
  const downloadTemplate = () => {
    const content = `${profile.name}\nASPIRING CLOUD ENGINEER\n\nCV TEMPLATE — replace placeholders and include only your real experience.\n\nCONTACT\n[Professional email] | [LinkedIn URL] | [GitHub URL]\n\nPROFILE\nComputer Science student interested in cloud computing, infrastructure, and automation. Seeking an internship to gain hands-on experience.\n\nEDUCATION\n[University] — [Degree], [Study period]\nRelevant coursework: [Your actual courses]\n\nPROJECTS\n[Project title]\nOverview: [What you built]\nTools: [Technologies used]\nImplementation: [Your contribution]\nResults: [Verified outcomes and learnings]\n\nSKILLS\n[List only technologies you have practiced]\n\nCERTIFICATIONS & LEARNING\n[Course or certification] — [Completed / In progress / Planned]\n`
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/plain;charset=utf-8" }),
    )
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = "CV-template.txt"
    anchor.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return (
    <div className="min-h-screen bg-background text-foreground [background-image:linear-gradient(to_right,var(--grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid)_1px,transparent_1px)] [background-size:12px_12px]">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="relative mx-auto flex h-[68px] max-w-[1120px] items-center justify-between border-x border-border px-5 sm:px-8">
          <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary p-1">
            <button
              onClick={() => setDark(false)}
              aria-label="Light theme"
              aria-pressed={!dark}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] transition ${
                !dark
                  ? "bg-[linear-gradient(180deg,#62635b,#22231f)] text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sun size={13} />
              <span className="hidden sm:inline">Light</span>
            </button>
            <button
              onClick={() => setDark(true)}
              aria-label="Dark theme"
              aria-pressed={dark}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] transition ${
                dark
                  ? "bg-[linear-gradient(180deg,#62635b,#22231f)] text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Moon size={13} />
              <span className="hidden sm:inline">Dark</span>
            </button>
          </div>
          <a
            href="#home"
            className="absolute left-1/2 -translate-x-1/2 text-[17px] font-medium tracking-[-0.03em]"
          >
            {profile.name}
            <span className="text-muted-foreground">.</span>
          </a>
          <div className="hidden sm:block">
            <a href="#contact" className={`${buttonClass} !px-3 !py-1.5`}>
              Let's talk <ArrowUpRight size={13} />
            </a>
          </div>
          <button
            className="rounded-md p-2 sm:hidden"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="flex flex-wrap justify-center gap-5 border-t border-border bg-card px-4 py-4 text-xs sm:hidden">
            {["About", "Projects", "Skills", "Education", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ),
            )}
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-[1120px] border-x border-border">
        <section
          id="home"
          className="relative overflow-hidden border-b border-border bg-background/85"
        >
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-0 h-[360px] ${
              dark
                ? "bg-[radial-gradient(ellipse_at_50%_-25%,#b5a63880_0%,#b5a63820_45%,transparent_72%)]"
                : "bg-[radial-gradient(ellipse_at_50%_-25%,#f5d934_0%,#f6e66975_43%,transparent_72%)]"
            }`}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,var(--grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid)_1px,transparent_1px)] [background-size:8px_8px]"
          />
          <nav className="relative flex flex-wrap items-center gap-5 px-6 pt-6 text-[11px] text-muted-foreground sm:gap-7 sm:px-10">
            <span className="mr-auto hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.08em] sm:flex">
              <span className="green-status-dot size-1.5 rounded-full bg-green-500" /> Open to
              internships
            </span>
            {["About", "Projects", "Skills", "Education"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="relative px-6 pb-11 pt-28 sm:px-10 sm:pb-12 sm:pt-36 lg:pt-40">
            <p className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em]">
              <Cloud size={15} strokeWidth={1.4} /> Aspiring Cloud Computing Student
            </p>
            <h1 className="max-w-4xl font-serif text-[clamp(3.1rem,6.4vw,5.2rem)] leading-[1.04] tracking-[-0.025em]">
              Hi, I'm {profile.name}.<br />
              Learning the cloud,
              <br />
              one build at a time
              <span className="text-muted-foreground">.</span>
            </h1>
            <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_210px] lg:items-end">
              <div>
                <p className="max-w-[540px] text-[13px] leading-[1.85] text-muted-foreground">
                  I'm a Computer Science student interested in cloud computing,
                  infrastructure, and automation. I enjoy learning new
                  technologies and building practical solutions through hands-on
                  projects.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#projects" className={buttonClass}>
                    View my projects <ArrowDown size={14} />
                  </a>
                  <button onClick={downloadCV} className={secondaryClass}>
                    Download CV <ArrowDownToLine size={14} />
                  </button>
                </div>
              </div>
              {/*<div className="hidden border-l border-border pl-5 lg:block">
                <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  A little more every day
                </p>
                <p className="mt-2 font-serif text-[23px] italic leading-tight">
                  Curiosity → Practice
                  <br />→ Possibility
                </p>
              </div>*/}
            </div>
          </div>
        </section>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-6 py-4 sm:px-10">
          <p className="font-serif text-[18px] italic text-muted-foreground">
            A curious mind. A hands-on approach. A journey just getting started.
          </p>
          <a
            href="#about"
            aria-label="Continue to about me"
            className="rounded-full border border-border p-1.5 text-muted-foreground transition hover:bg-secondary"
          >
            <ArrowDown size={13} />
          </a>
        </div>

        <section
          id="about"
          className="border-b border-border bg-background px-6 py-14 sm:px-10 sm:py-18"
        >
          <SectionLabel number="01">A little about me</SectionLabel>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1fr] lg:gap-20">
            <div>
              <h2 className="font-serif text-[clamp(2.6rem,4vw,3.6rem)] leading-[1.08]">
                Curious learner.
                <br />
                <span className="italic text-muted-foreground">
                  Problem solver.
                </span>
              </h2>
              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[10px]">
                <GraduationCap size={14} /> {profile.degree} student
              </div>
            </div>
            <div className="space-y-4 text-[13px] leading-[1.9] text-muted-foreground">
              <p>
                I'm a {profile.degree} student at{" "}
                <span className="text-foreground">[{profile.university}]</span>{" "}
                with an interest in cloud computing and infrastructure
                engineering.
              </p>
              <p>
                Through coursework and hands-on labs, I'm exploring cloud
                platforms, networking, Linux, and infrastructure automation. I'm
                interested in understanding how systems are designed, deployed,
                and maintained reliably.
              </p>
              <p>
                I'm looking for an internship opportunity where I can strengthen
                my technical skills, learn from experienced engineers, and
                contribute to real-world projects.
              </p>
              <p className="pt-1 font-serif text-xl italic text-foreground">
                Not an expert yet. Always a student.
              </p>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="border-b border-border bg-card px-6 py-14 sm:px-10 sm:py-18"
        >
          <SectionLabel number="02">Learning by building</SectionLabel>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2 className="font-serif text-[clamp(2.6rem,4vw,3.6rem)] leading-none">
                Featured projects
                <span className="text-muted-foreground">.</span>
              </h2>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Small experiments. Real curiosity. Practical foundations.
              </p>
            </div>
            <div
              className="flex gap-1 rounded-lg border border-border bg-background p-1"
              aria-label="Filter projects"
            >
              {["All projects", "Cloud", "Automation"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  aria-pressed={filter === item}
                  className={`rounded-md px-3 py-2 text-[10px] transition ${
                    filter === item
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects
              .filter(
                (project) =>
                  filter === "All projects" || project.category === filter,
              )
              .map((project) => (
                <article
                  key={project.id}
                  className="group overflow-hidden rounded-xl border border-border bg-background transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_#00000008]"
                >
                  <button
                    onClick={() => setSelected(project)}
                    className="relative block h-[220px] w-full overflow-hidden text-left"
                    aria-label={`View ${project.title}`}
                  >
                    <div className="h-full transition duration-500 group-hover:scale-[1.035]">
                      <ProjectVisual kind={project.kind} />
                    </div>
                    <span className="absolute left-3 top-3 rounded border border-black/10 bg-white/80 px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-[#5c5d56]">
                      Example lab
                    </span>
                    <span className="absolute bottom-3 right-3 rounded-full border border-black/10 bg-white/80 p-1.5 text-[#5c5d56]">
                      <ArrowUpRight size={13} />
                    </span>
                  </button>
                  <div className="p-5">
                    <p className="mb-3 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                      {project.id} / {project.category}
                    </p>
                    <h3 className="font-serif text-[25px] leading-tight">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-[10px] text-muted-foreground">
                      {project.subtitle}
                    </p>
                    <p className="mt-4 min-h-14 text-[11px] leading-[1.8] text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-border bg-card px-2 py-1 font-mono text-[8px] text-secondary-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelected(project)}
                      className="mt-5 flex w-full items-center justify-between border-t border-border pt-4 text-[11px] font-medium transition hover:text-muted-foreground"
                    >
                      Explore project <ArrowUpRight size={14} />
                    </button>
                  </div>
                </article>
              ))}
          </div>
          {/*<p className="mt-5 flex items-start gap-2 text-[10px] leading-relaxed text-muted-foreground">
            <FileText className="mt-0.5 shrink-0" size={12} /> These are
            illustrative lab ideas, not completed work. Replace them with your
            own projects and verified results.
          </p>*/}
        </section>

        <section
          id="skills"
          className="border-b border-border bg-background px-6 py-14 sm:px-10 sm:py-18"
        >
          <SectionLabel number="03">My learning toolkit</SectionLabel>
          <div className="grid gap-9 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
            <div>
              <h2 className="font-serif text-[clamp(2.6rem,4vw,3.6rem)] leading-[1.05]">
                Skills & tools<span className="text-muted-foreground">.</span>
              </h2>
              <p className="mt-5 max-w-64 text-[12px] leading-[1.9] text-muted-foreground">
                The technologies I'm getting to know, one lab and one project at
                a time.
              </p>
              <p className="mt-5 font-mono text-[9px] text-muted-foreground">
                No percentages. Just practice.
              </p>
            </div>
            <div>
              {[
                {
                  icon: Cloud,
                  label: "Cloud platforms",
                  tools: "AWS · Google Cloud",
                },
                // {
                //   icon: Network,
                //   label: "Networking",
                //   tools: "VPC · Subnets · DNS · Routing",
                // },
                {
                  icon: Terminal,
                  label: "Operating systems",
                  tools: "Linux · Bash",
                },
                {
                  icon: Layers3,
                  label: "Infrastructure as code",
                  tools: "Terraform",
                },
                {
                  icon: Container,
                  label: "Containers",
                  tools: "Docker",
                },
                {
                  icon: GitBranch,
                  label: "DevOps & automation",
                  tools: "Git · GitHub Actions",
                },
                { icon: Code2, label: "Programming", tools: "Python · PHP · Java · Javascript · C" },
              ].map((skill) => (
                <div
                  key={skill.label}
                  className="grid grid-cols-[1fr] gap-2 border-b border-border py-4 first:pt-0 sm:grid-cols-[185px_1fr]"
                >
                  <div className="flex items-center gap-3 text-[11px] font-medium">
                    <skill.icon
                      size={15}
                      strokeWidth={1.4}
                      className="text-muted-foreground"
                    />
                    {skill.label}
                  </div>
                  <p className="pl-7 text-[11px] text-muted-foreground sm:pl-0">
                    {skill.tools}
                  </p>
                </div>
              ))}
              {/*<p className="mt-4 text-[10px] leading-relaxed text-muted-foreground">
                Sample toolkit — keep only the tools you've actually explored.
              </p>*/}
            </div>
          </div>
        </section>

        <section
          id="education"
          className="border-b border-border bg-card px-6 py-14 sm:px-10 sm:py-18"
        >
          <SectionLabel number="04">Building a foundation</SectionLabel>
          <h2 className="font-serif text-[clamp(2.6rem,4vw,3.6rem)] leading-[1.08]">
            Education & learning<span className="text-muted-foreground">.</span>
          </h2>
          <div className="mt-9 grid gap-8 lg:grid-cols-2 lg:gap-14">
            <div className="relative border-l border-border pl-6">
              <span className="absolute -left-[5px] top-1 size-[9px] rounded-full border border-border bg-accent" />
              <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                Academic journey
              </p>
              <h3 className="mt-4 text-[15px] font-medium">
                [{profile.university}]
              </h3>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {profile.degree} · [{profile.period}]
              </p>
              <p className="mb-2 mt-6 text-[10px] font-medium">
                Relevant coursework
              </p>
              <p className="text-[11px] leading-[1.9] text-muted-foreground">
                Algorithm & Programming · Data Structures
                <br />
                Computer Networks · Database Technology
                <br />
                Introduction to Cloud Computing & Cloud Security
                <br />
                Software Engineering · Cloud Services
              </p>
              {/*<p className="mt-3 text-[10px] italic text-muted-foreground">
                Replace with your actual degree, dates, and courses.
              </p>*/}
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  Certifications & learning
                </p>
                <GraduationCap size={16} className="text-muted-foreground" />
              </div>
              <div className="mt-5 flex items-start justify-between gap-3 border-b border-border pb-4">
                <div>
                  <h3 className="text-[12px] font-medium">
                    Google Cloud Computing Foundations Certificate
                  </h3>
                  <p className="mt-1.5 text-[10px] text-muted-foreground">
                    View my credential on Credly
                  </p>
                </div>
                <a
                  href="https://www.credly.com/badges/f0e8fc03-5323-4fcf-82d6-4a09763e4653/public_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Google Cloud Computing Foundations Certificate on Credly"
                  title="View on Credly"
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <ArrowUpRight size={14} />
                </a>
              </div>
              <div className="mt-4">
                <h3 className="text-[12px] font-medium">
                  Hands-on labs & self-directed study
                </h3>
                <p className="mt-2 text-[11px] leading-[1.8] text-muted-foreground">
                  Space for completed courses, learning paths, and
                  certifications. Add the provider, date, and a clear status for
                  each.
                </p>
              </div>
              <p className="mt-5 flex items-center gap-1.5 text-[9px] text-muted-foreground">
                <ShieldCheck size={12} /> Learning in public. Keeping it honest.
              </p>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="relative overflow-hidden border-b border-border bg-background px-6 py-14 sm:px-10 sm:py-18"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-44 -right-28 size-[500px] rounded-full bg-[radial-gradient(ellipse,#e8d76b35,transparent_68%)]"
          />
          <div className="relative">
            <SectionLabel number="05">The next chapter</SectionLabel>
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-20">
              <div>
                <div className="mb-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
                  <span className="green-status-dot size-1.5 rounded-full bg-green-500" /> Open
                  to internship opportunities
                </div>
                <h2 className="font-serif text-[clamp(3.6rem,6vw,5rem)] leading-none">
                  Let's connect<span className="text-muted-foreground">.</span>
                </h2>
                <p className="mt-6 max-w-md text-[12px] leading-[1.9] text-muted-foreground">
                  I'm looking for internship opportunities in Cloud Computing,
                  Cloud Engineering, or DevOps. Always open to learning,
                  collaborating, and contributing to meaningful projects.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    onClick={() => openContact("email")}
                    className={buttonClass}
                  >
                    Say hello <Send size={13} />
                  </button>
                  <button onClick={downloadCV} className={secondaryClass}>
                    Download CV <ArrowDownToLine size={13} />
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                {[
                  {
                    kind: "email" as const,
                    icon: Mail,
                    name: "Email",
                    value: profile.email || "your.name@email.com",
                  },
                  {
                    kind: "linkedin" as const,
                    icon: Linkedin,
                    name: "LinkedIn",
                    value: "Let's connect professionally",
                  },
                  {
                    kind: "github" as const,
                    icon: Github,
                    name: "GitHub",
                    value: "Follow the learning journey",
                  },
                ].map((link) => (
                  <button
                    key={link.kind}
                    onClick={() => openContact(link.kind)}
                    className="group flex w-full items-center gap-4 border-b border-border py-5 text-left"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                      <link.icon size={16} strokeWidth={1.5} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-[11px] font-medium">
                        {link.name}
                      </span>
                      <span className="mt-1 block text-[10px] text-muted-foreground">
                        {link.value}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        <footer className="flex flex-wrap items-center justify-between gap-4 bg-card px-6 py-6 sm:px-10">
          <p className="text-[10px] text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Built with curiosity.
          </p>
          <p className="hidden font-serif text-base italic text-muted-foreground sm:block">
            Always learning. Always building.
          </p>
          <a
            href="#home"
            className="flex items-center gap-2 text-[10px] text-muted-foreground transition hover:text-foreground"
          >
            Back to top <ArrowUpRight size={12} />
          </a>
        </footer>
      </main>

      {selected && (
        <Modal
          title={`Project ${selected.id} — Example lab`}
          onClose={() => setSelected(null)}
        >
          <ProjectVisual kind={selected.kind} expanded />
          <div className="space-y-7 p-6 sm:p-8">
            <div>
              <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                01 / Project title
              </p>
              <h3 className="font-serif text-4xl">{selected.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                {selected.subtitle}
              </p>
            </div>
            {/*<div className="rounded-lg border border-border bg-secondary p-3 text-[11px] leading-relaxed text-secondary-foreground">
              This is an illustrative project outline, not a claim of completed
              work. Replace the details with your own implementation and
              evidence.
            </div>*/}
            <div>
              <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                02 / Overview
              </p>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                {selected.overview}
              </p>
            </div>
            <div>
              <p className="mb-3 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                03 / Architecture
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {selected.architecture.map((node, index) => (
                  <div key={node} className="contents">
                    {index > 0 && (
                      <ArrowRight size={12} className="text-muted-foreground" />
                    )}
                    <span className="rounded-md border border-border bg-secondary px-3 py-2 font-mono text-[9px]">
                      {node}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                04 / Tech stack
              </p>
              <div className="flex gap-2">
                {selected.stack.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-border px-3 py-1.5 text-[11px]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                05 / Implementation
              </p>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                {selected.implementation}
              </p>
            </div>
            <div>
              <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                06 / Results & learnings
              </p>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                {selected.learnings}
              </p>
            </div>
            <button
              className={secondaryClass}
              onClick={() => setSelected(null)}
            >
              Back to projects <ArrowRight size={13} />
            </button>
          </div>
        </Modal>
      )}
      {info && (
        <Modal
          title={
            info === "cv"
              ? "Your next opportunity starts here"
              : "Make this portfolio yours"
          }
          onClose={() => setInfo(null)}
        >
          <div className="p-7 sm:p-9">
            <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-border bg-secondary">
              {info === "cv" ? (
                <FileText size={22} strokeWidth={1.4} />
              ) : (
                <ExternalLink size={22} strokeWidth={1.4} />
              )}
            </div>
            <h3 className="font-serif text-4xl">
              {info === "cv"
                ? "A CV worth sharing."
                : "Let's add your details."}
            </h3>
            <p className="mt-4 text-[13px] leading-[1.9] text-muted-foreground">
              {info === "cv"
                ? "CV pribadi belum ditambahkan. Kamu bisa mengunduh template teks di bawah, melengkapinya dengan pengalaman nyata, lalu menambahkan file PDF ke portofolio ini."
                : `Detail ${
                    info === "email"
                      ? "email"
                      : info === "linkedin"
                        ? "LinkedIn"
                        : "GitHub"
                  } masih berupa placeholder. Tambahkan ${
                    info === "email" ? "alamat email profesional" : "URL profil"
                  } kamu di konfigurasi profile untuk mengaktifkan tautan ini.`}
            </p>
            {info === "cv" && (
              <button
                onClick={downloadTemplate}
                className={`${buttonClass} mt-6`}
              >
                Download template CV (.txt) <ArrowDownToLine size={14} />
              </button>
            )}
            <button
              onClick={() => setInfo(null)}
              className={`${secondaryClass} mt-6 ${
                info === "cv" ? "ml-3" : ""
              }`}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
