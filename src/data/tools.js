export const categoryColors = {
  Research: { bg: "#eff6ff", accent: "#3b82f6", dark: "#1e40af" },
  Writing: { bg: "#f5f3ff", accent: "#8b5cf6", dark: "#6d28d9" },
  Productivity: { bg: "#ecfdf5", accent: "#10b981", dark: "#047857" },
  Design: { bg: "#fdf2f8", accent: "#ec4899", dark: "#be185d" },
  Code: { bg: "#ecfeff", accent: "#06b6d4", dark: "#0e7490" },
  Meetings: { bg: "#fffbeb", accent: "#f59e0b", dark: "#b45309" },
  Automation: { bg: "#eef2ff", accent: "#6366f1", dark: "#4338ca" }
};

export const aiTools = [
  {
    id: "1",
    name: "Perplexity",
    tagline: "Google search, but it actually answers your question.",
    category: "Research",
    source: "Ben's Bites",
    description:
      "An AI-powered answer engine that reads the internet for you and delivers direct, cited answers instead of a list of blue links. It synthesizes information from multiple sources in seconds.",
    useCases: [
      "Research competitors before a strategy meeting in 2 minutes flat",
      "Get instant summaries of complex topics with source links you can verify",
      "Replace 30-minute Google rabbit holes with one precise query"
    ],
    audience: "Anyone who Googles more than 5 times a day",
    url: "https://perplexity.ai",
    free: true,
    gradient: ["#3b82f6", "#1d4ed8"]
  },
  {
    id: "2",
    name: "Cursor",
    tagline: "The code editor that writes code with you.",
    category: "Code",
    source: "The Rundown AI",
    description:
      "An AI-native code editor built on VS Code. Select any code, describe what you want in plain English, and Cursor rewrites it. It understands your entire codebase, not just the file you're looking at.",
    useCases: [
      "Fix bugs by highlighting broken code and saying 'fix this'",
      "Generate entire features from a plain English description",
      "Refactor legacy code without manually understanding every line"
    ],
    audience: "Developers and technical professionals",
    url: "https://cursor.com",
    free: true,
    gradient: ["#06b6d4", "#0891b2"]
  },
  {
    id: "3",
    name: "Gamma",
    tagline: "Presentations that build themselves.",
    category: "Design",
    source: "Superhuman Blog",
    description:
      "Paste an outline, document, or just describe your topic — Gamma generates a complete, beautifully designed presentation in under a minute. No more wrestling with slide layouts and formatting.",
    useCases: [
      "Turn a project brief into a stakeholder deck in 60 seconds",
      "Convert long documents into visual, shareable presentations",
      "Create pitch decks that look like a design team made them"
    ],
    audience: "Anyone who makes presentations (so basically everyone)",
    url: "https://gamma.app",
    free: true,
    gradient: ["#ec4899", "#db2777"]
  },
  {
    id: "4",
    name: "Notion AI",
    tagline: "Your second brain, now with an actual brain.",
    category: "Productivity",
    source: "TLDR AI",
    description:
      "Built directly into Notion, this AI works inside your existing notes, docs, and wikis. It summarizes pages, generates content, extracts action items, and answers questions about your own workspace.",
    useCases: [
      "Paste raw meeting notes and get formatted action items with deadlines",
      "Ask questions about your own docs: 'What did we decide about pricing?'",
      "Auto-generate weekly status reports from your task databases"
    ],
    audience: "Teams and individuals who live in Notion",
    url: "https://notion.so",
    free: false,
    gradient: ["#10b981", "#059669"]
  },
  {
    id: "5",
    name: "Otter.ai",
    tagline: "Never take meeting notes again.",
    category: "Meetings",
    source: "AI Tool Report",
    description:
      "Otter joins your Zoom, Teams, or Google Meet calls automatically. It transcribes everything in real time, identifies speakers, and generates a summary with action items when the meeting ends.",
    useCases: [
      "Share AI-generated meeting summaries instead of writing them manually",
      "Search across months of meeting transcripts to find specific decisions",
      "Let team members who missed a call catch up in 2 minutes"
    ],
    audience: "Anyone in 3+ meetings per week",
    url: "https://otter.ai",
    free: true,
    gradient: ["#f59e0b", "#d97706"]
  },
  {
    id: "6",
    name: "Claude",
    tagline: "The AI that reads your entire document, not just the first page.",
    category: "Writing",
    source: "Ben's Bites",
    description:
      "Anthropic's AI assistant handles massive documents — up to 200K words in a single conversation. Excels at careful analysis, nuanced writing, and tasks where getting details right matters.",
    useCases: [
      "Upload a 100-page contract and ask 'What should I worry about?'",
      "Paste a full report and get an executive summary in 30 seconds",
      "Draft long-form content that actually sounds like a human wrote it"
    ],
    audience: "Professionals who work with long documents",
    url: "https://claude.ai",
    free: true,
    gradient: ["#8b5cf6", "#7c3aed"]
  },
  {
    id: "7",
    name: "Zapier AI",
    tagline: "Describe a workflow. Watch it build itself.",
    category: "Automation",
    source: "The Rundown AI",
    description:
      "Connects 6,000+ apps and lets you automate workflows by describing them in plain English. No code, no complex setup — just tell it what you want to happen and when.",
    useCases: [
      "Auto-create tasks in Asana when urgent Slack messages arrive",
      "Send personalized follow-up emails when someone fills out a form",
      "Sync data between your CRM, spreadsheets, and email automatically"
    ],
    audience: "Anyone doing repetitive digital tasks",
    url: "https://zapier.com",
    free: true,
    gradient: ["#6366f1", "#4f46e5"]
  },
  {
    id: "8",
    name: "Descript",
    tagline: "Edit video by editing text. Yes, really.",
    category: "Design",
    source: "Matt Wolfe",
    description:
      "Record a video, and Descript turns it into a text transcript. Delete words from the transcript and they disappear from the video. It also removes filler words, generates captions, and clones your voice.",
    useCases: [
      "Edit a 30-minute recording down to 5 minutes by deleting text",
      "Remove every 'um' and 'uh' from your recordings with one click",
      "Create social clips from long videos without learning video editing"
    ],
    audience: "Content creators, marketers, and anyone making video",
    url: "https://descript.com",
    free: true,
    gradient: ["#ec4899", "#f43f5e"]
  },
  {
    id: "9",
    name: "Reclaim AI",
    tagline: "An AI assistant that protects your time.",
    category: "Automation",
    source: "Superhuman Blog",
    description:
      "Reclaim automatically schedules your priorities, habits, and focus time around your meetings. When your calendar changes, it reschedules everything intelligently — no manual calendar Tetris.",
    useCases: [
      "Block 2 hours of daily focus time that moves around meetings automatically",
      "Schedule habits like exercise or learning that actually stick",
      "See your real availability instead of an overpacked calendar"
    ],
    audience: "Busy professionals with meeting-heavy calendars",
    url: "https://reclaim.ai",
    free: true,
    gradient: ["#6366f1", "#8b5cf6"]
  },
  {
    id: "10",
    name: "Grammarly",
    tagline: "Everything you write, polished in real time.",
    category: "Writing",
    source: "TLDR AI",
    description:
      "Goes far beyond spell-check. Grammarly's AI analyzes tone, clarity, and delivery of every email, document, and message you write. The browser extension works everywhere automatically.",
    useCases: [
      "Detect if an important email sounds too aggressive before you send it",
      "Rewrite wordy sentences into clear, concise language instantly",
      "Ensure consistent professional tone across all your writing"
    ],
    audience: "Every professional who writes emails",
    url: "https://grammarly.com",
    free: true,
    gradient: ["#8b5cf6", "#6d28d9"]
  },
  {
    id: "11",
    name: "Canva AI",
    tagline: "Design anything, even if you can't design.",
    category: "Design",
    source: "AI Tool Report",
    description:
      "Canva's Magic Design feature generates complete designs from a text description. Presentations, social posts, logos, flyers — describe what you need and pick from AI-generated options.",
    useCases: [
      "Generate a complete slide deck by describing the topic",
      "Remove photo backgrounds with one click for professional images",
      "Create on-brand social media posts in under a minute"
    ],
    audience: "Non-designers who need professional visuals",
    url: "https://canva.com",
    free: true,
    gradient: ["#ec4899", "#be185d"]
  },
  {
    id: "12",
    name: "Fireflies.ai",
    tagline: "Your meetings, searchable forever.",
    category: "Meetings",
    source: "Ben's Bites",
    description:
      "Records and transcribes every meeting, then makes the entire history searchable. Ask questions like 'What did the client say about timeline?' and get the exact moment from any past call.",
    useCases: [
      "Search 6 months of meetings to find when a specific decision was made",
      "Auto-generate follow-up emails from meeting action items",
      "Share conversation highlights with stakeholders who weren't on the call"
    ],
    audience: "Sales teams, managers, and anyone in frequent meetings",
    url: "https://fireflies.ai",
    free: true,
    gradient: ["#f59e0b", "#ea580c"]
  },
  {
    id: "13",
    name: "Midjourney",
    tagline: "Turn words into stunning images.",
    category: "Design",
    source: "The Rundown AI",
    description:
      "The gold standard for AI image generation. Describe what you want in natural language and get photorealistic or artistic images in seconds. Used by designers, marketers, and creative professionals worldwide.",
    useCases: [
      "Create unique presentation visuals instead of generic stock photos",
      "Generate product mockups and concept art for brainstorming sessions",
      "Design social media graphics that stop the scroll"
    ],
    audience: "Marketers, designers, and creative professionals",
    url: "https://midjourney.com",
    free: false,
    gradient: ["#ec4899", "#7c3aed"]
  },
  {
    id: "14",
    name: "Superhuman",
    tagline: "The fastest email experience ever made.",
    category: "Writing",
    source: "Superhuman Blog",
    description:
      "An AI-powered email client that drafts replies in your tone, summarizes long threads, and helps you hit inbox zero daily. Keyboard-first design means everything happens in milliseconds.",
    useCases: [
      "Draft perfect replies to any email with one keyboard shortcut",
      "Get instant summaries of 50-message email threads",
      "Process your entire inbox in half the time with AI triage"
    ],
    audience: "Professionals who get 100+ emails daily",
    url: "https://superhuman.com",
    free: false,
    gradient: ["#8b5cf6", "#4f46e5"]
  },
  {
    id: "15",
    name: "ElevenLabs",
    tagline: "Text in, human voice out.",
    category: "Design",
    source: "Matt Wolfe",
    description:
      "Generates the most natural-sounding AI speech available. Turn any text into audio that sounds genuinely human. Clone your own voice or choose from hundreds of voices in 29 languages.",
    useCases: [
      "Turn blog posts into audio briefings for your commute",
      "Create professional voiceovers for presentations and videos",
      "Generate multilingual content from a single script"
    ],
    audience: "Content creators and global teams",
    url: "https://elevenlabs.io",
    free: true,
    gradient: ["#06b6d4", "#3b82f6"]
  },
  {
    id: "16",
    name: "GitHub Copilot",
    tagline: "Your AI pair programmer.",
    category: "Code",
    source: "TLDR AI",
    description:
      "Suggests entire functions, writes boilerplate code, and completes your thoughts as you type. Trained on billions of lines of code, it works inside VS Code, JetBrains, and other editors.",
    useCases: [
      "Write a comment describing a function and Copilot writes the code",
      "Auto-complete repetitive patterns and boilerplate instantly",
      "Generate unit tests for existing functions with a simple prompt"
    ],
    audience: "Software developers at any level",
    url: "https://github.com/features/copilot",
    free: false,
    gradient: ["#06b6d4", "#0e7490"]
  },
  {
    id: "17",
    name: "Elicit",
    tagline: "Research papers, decoded.",
    category: "Research",
    source: "AI Tool Report",
    description:
      "An AI research assistant that finds relevant academic papers, extracts key findings, and identifies consensus across studies. Ask a research question in plain English and get structured answers.",
    useCases: [
      "Find what the research actually says about any topic in minutes",
      "Extract key data points from dozens of papers simultaneously",
      "Build evidence-based arguments for proposals and strategies"
    ],
    audience: "Researchers, analysts, and evidence-driven professionals",
    url: "https://elicit.com",
    free: true,
    gradient: ["#3b82f6", "#6366f1"]
  },
  {
    id: "18",
    name: "Tome",
    tagline: "From idea to narrative in one prompt.",
    category: "Design",
    source: "The Rundown AI",
    description:
      "An AI storytelling tool that generates entire narrative presentations. Paste a brief and Tome creates a compelling story arc with visuals, making it ideal for pitching ideas to stakeholders.",
    useCases: [
      "Turn a product brief into a compelling pitch deck instantly",
      "Create investor-ready narratives from raw business data",
      "Build interactive presentations that tell a story, not just show slides"
    ],
    audience: "Founders, PMs, and anyone who pitches ideas",
    url: "https://tome.app",
    free: true,
    gradient: ["#ec4899", "#f43f5e"]
  },
  {
    id: "19",
    name: "Replit AI",
    tagline: "Describe an app. Get a working app.",
    category: "Code",
    source: "Ben's Bites",
    description:
      "A browser-based development environment where you describe what you want to build and AI writes, runs, and deploys the code. You don't need to know how to code — just describe the tool you need.",
    useCases: [
      "Build internal tools and dashboards without a developer",
      "Prototype ideas in minutes instead of weeks",
      "Create custom calculators, trackers, and utilities for your team"
    ],
    audience: "Non-technical professionals who need custom tools",
    url: "https://replit.com",
    free: true,
    gradient: ["#06b6d4", "#0d9488"]
  },
  {
    id: "20",
    name: "SciSpace",
    tagline: "Make any research paper make sense.",
    category: "Research",
    source: "TLDR AI",
    description:
      "Upload any academic paper or technical document and get plain-English explanations. Highlight any section and ask SciSpace to explain it simply — perfect for understanding work outside your field.",
    useCases: [
      "Understand technical reports from other departments in minutes",
      "Break down industry whitepapers into actionable insights",
      "Explain complex methodology sections to non-technical stakeholders"
    ],
    audience: "Professionals reading outside their expertise",
    url: "https://scispace.com",
    free: true,
    gradient: ["#3b82f6", "#1d4ed8"]
  },
  {
    id: "21",
    name: "Jasper",
    tagline: "On-brand content at the speed of AI.",
    category: "Writing",
    source: "AI Tool Report",
    description:
      "A content platform built for marketing teams. Set your brand voice once, then generate on-brand ads, social posts, emails, and blogs that sound like your company, not a robot.",
    useCases: [
      "Generate a month of social media content in one afternoon",
      "Create ad copy variations for A/B testing in seconds",
      "Maintain consistent brand voice across all channels automatically"
    ],
    audience: "Marketing teams and content creators",
    url: "https://jasper.ai",
    free: false,
    gradient: ["#8b5cf6", "#c026d3"]
  },
  {
    id: "22",
    name: "tl;dv",
    tagline: "The important parts of every meeting, clipped and shared.",
    category: "Meetings",
    source: "Superhuman Blog",
    description:
      "Records Google Meet and Zoom calls, creates timestamped summaries, and lets you clip key moments. Share a 30-second highlight instead of forwarding a 60-minute recording.",
    useCases: [
      "Clip the exact moment a client gives feedback and share it with your team",
      "Create a highlight reel of key decisions from a week of meetings",
      "Let absent teammates watch the 3 minutes that matter, not the full hour"
    ],
    audience: "Product teams, sales teams, and remote workers",
    url: "https://tldv.io",
    free: true,
    gradient: ["#f59e0b", "#f97316"]
  },
  {
    id: "23",
    name: "Make (Integromat)",
    tagline: "Visual automations anyone can build.",
    category: "Automation",
    source: "The Rundown AI",
    description:
      "A visual automation platform where you connect apps by drawing flowcharts. More powerful than Zapier for complex, multi-step workflows — with a visual builder that makes logic easy to follow.",
    useCases: [
      "Build complex approval workflows that route through multiple teams",
      "Sync data across your entire tool stack on autopilot",
      "Create conditional automations: 'If deal > $10K, notify the VP'"
    ],
    audience: "Ops teams and process-oriented professionals",
    url: "https://make.com",
    free: true,
    gradient: ["#6366f1", "#7c3aed"]
  },
  {
    id: "24",
    name: "ChatGPT",
    tagline: "The AI assistant that started it all.",
    category: "Writing",
    source: "Ben's Bites",
    description:
      "OpenAI's flagship AI assistant handles everything from drafting emails to analyzing data to writing code. With GPT-4, plugins, and custom GPTs, it's the Swiss Army knife of AI tools.",
    useCases: [
      "Draft, edit, and refine any type of professional document",
      "Analyze spreadsheet data by uploading files directly",
      "Build custom GPTs for your team's specific, repeatable workflows"
    ],
    audience: "Literally every professional",
    url: "https://chat.openai.com",
    free: true,
    gradient: ["#10b981", "#047857"]
  },
  {
    id: "25",
    name: "Synthesia",
    tagline: "Create videos with AI presenters. No camera needed.",
    category: "Design",
    source: "Matt Wolfe",
    description:
      "Generate professional training videos, product demos, and presentations using realistic AI avatars. Type a script, choose an avatar, and get a polished video in minutes — in 130+ languages.",
    useCases: [
      "Create employee onboarding videos without booking a studio",
      "Generate product walkthroughs that update when features change",
      "Produce multilingual training content from a single script"
    ],
    audience: "L&D teams, HR, and internal communications",
    url: "https://synthesia.io",
    free: false,
    gradient: ["#ec4899", "#8b5cf6"]
  },
  {
    id: "26",
    name: "Granola",
    tagline: "AI meeting notes that actually capture what matters.",
    category: "Meetings",
    source: "TLDR AI",
    description:
      "Runs quietly on your Mac during meetings. It captures the audio, combines it with any notes you jot down, and produces rich, structured meeting notes — without putting a bot in your call.",
    useCases: [
      "Get perfect meeting notes without an awkward 'bot has joined' notification",
      "Jot quick bullet points and let AI expand them into full notes",
      "Keep notes private on your device — no recordings uploaded to the cloud"
    ],
    audience: "Professionals who want notes without the meeting bot stigma",
    url: "https://granola.ai",
    free: true,
    gradient: ["#f59e0b", "#d97706"]
  },
  {
    id: "27",
    name: "v0 by Vercel",
    tagline: "Describe a UI. Get production-ready code.",
    category: "Code",
    source: "Ben's Bites",
    description:
      "A generative UI tool by Vercel. Describe what you want a webpage or component to look like, and v0 generates production-ready React code with Tailwind CSS styling. Iterate by chatting.",
    useCases: [
      "Prototype landing pages and UI components in minutes",
      "Go from wireframe idea to working code without a designer",
      "Generate responsive layouts by describing them in plain English"
    ],
    audience: "Developers, PMs, and founders building web products",
    url: "https://v0.dev",
    free: true,
    gradient: ["#06b6d4", "#3b82f6"]
  },
  {
    id: "28",
    name: "Heygen",
    tagline: "Your face, your voice, infinite video content.",
    category: "Design",
    source: "AI Tool Report",
    description:
      "Create AI avatar videos of yourself or choose from stock avatars. Record a 2-minute training video, and Heygen creates a digital twin that can present any script you type — in any language.",
    useCases: [
      "Scale video outreach without recording each message individually",
      "Create personalized video messages for every prospect at scale",
      "Produce multilingual content from a single recording session"
    ],
    audience: "Sales teams, marketers, and executives",
    url: "https://heygen.com",
    free: true,
    gradient: ["#ec4899", "#f43f5e"]
  },
  {
    id: "29",
    name: "Motion",
    tagline: "AI that plans your day so you don't have to.",
    category: "Automation",
    source: "Superhuman Blog",
    description:
      "An AI calendar that auto-schedules your tasks, meetings, and priorities. Tell Motion what you need to accomplish this week, and it builds an optimal daily schedule — rearranging in real time when plans change.",
    useCases: [
      "Never manually schedule a task on your calendar again",
      "Automatically prioritize work so the most important thing is always next",
      "Protect deep work time that dynamically moves around new meetings"
    ],
    audience: "Professionals juggling many projects and deadlines",
    url: "https://usemotion.com",
    free: false,
    gradient: ["#6366f1", "#4f46e5"]
  },
  {
    id: "30",
    name: "Napkin AI",
    tagline: "Turn text into beautiful diagrams instantly.",
    category: "Design",
    source: "The Rundown AI",
    description:
      "Paste any text — notes, blog posts, documents — and Napkin generates clean, professional diagrams, flowcharts, and visuals. Perfect for turning written ideas into visual formats for presentations.",
    useCases: [
      "Convert process documentation into flowcharts in one click",
      "Generate visual frameworks from your strategy notes",
      "Create infographics for blog posts and social media"
    ],
    audience: "Anyone who needs to visualize ideas",
    url: "https://napkin.ai",
    free: true,
    gradient: ["#10b981", "#06b6d4"]
  },
  {
    id: "31",
    name: "Lovable",
    tagline: "From idea to deployed app — no code required.",
    category: "Code",
    source: "Matt Wolfe",
    description:
      "Describe the app you want to build in plain language, and Lovable generates a complete, full-stack web application. It writes the code, sets up the database, and deploys — all from a conversation.",
    useCases: [
      "Build internal dashboards and admin panels without developers",
      "Prototype your startup idea as a working app before hiring engineers",
      "Create customer-facing tools and portals in a single afternoon"
    ],
    audience: "Founders, PMs, and non-technical builders",
    url: "https://lovable.dev",
    free: true,
    gradient: ["#06b6d4", "#8b5cf6"]
  }
];
