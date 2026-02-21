export const categories = [
  "All",
  "Writing",
  "Meetings",
  "Design",
  "Code",
  "Research",
  "Automation"
];

export const aiTools = [
  {
    id: "1",
    name: "ChatGPT",
    category: "Writing",
    description:
      "General-purpose AI assistant for drafting, brainstorming, and problem-solving.",
    tip: 'Start prompts with "Act as a [role]" to get more targeted results. Great for first drafts of emails, proposals, and reports.',
    free: true
  },
  {
    id: "2",
    name: "Claude",
    category: "Writing",
    description:
      "AI assistant that excels at long documents, analysis, and careful reasoning.",
    tip: "Paste entire documents and ask Claude to summarize, find issues, or rewrite sections. Handles up to 200K words in one go.",
    free: true
  },
  {
    id: "3",
    name: "Grammarly",
    category: "Writing",
    description:
      "AI writing assistant that checks grammar, tone, and clarity in real time.",
    tip: "Install the browser extension so every email and message you write gets checked automatically. Use tone detection before sending important emails.",
    free: true
  },
  {
    id: "4",
    name: "Notion AI",
    category: "Writing",
    description:
      "Built into Notion — summarize notes, generate action items, and draft content inside your workspace.",
    tip: "After a meeting, paste raw notes and ask Notion AI to extract action items with owners and deadlines.",
    free: false
  },
  {
    id: "5",
    name: "Otter.ai",
    category: "Meetings",
    description:
      "Records and transcribes meetings in real time with speaker identification.",
    tip: "Let Otter join your Zoom/Teams calls automatically. After the meeting, share the AI summary instead of writing manual notes.",
    free: true
  },
  {
    id: "6",
    name: "Fireflies.ai",
    category: "Meetings",
    description:
      "AI meeting assistant that records, transcribes, and creates searchable notes.",
    tip: "Use the search feature to find specific decisions across months of meetings. Never lose a key decision again.",
    free: true
  },
  {
    id: "7",
    name: "tl;dv",
    category: "Meetings",
    description:
      "Records Google Meet and Zoom calls, creates timestamped summaries you can share.",
    tip: "Clip key moments from calls and share them with teammates who missed the meeting instead of forwarding a full recording.",
    free: true
  },
  {
    id: "8",
    name: "Midjourney",
    category: "Design",
    description:
      "Creates stunning images from text descriptions. Great for presentations and marketing.",
    tip: "Use it to create unique visuals for presentations instead of generic stock photos. Add '--ar 16:9' for slide-friendly images.",
    free: false
  },
  {
    id: "9",
    name: "Canva AI",
    category: "Design",
    description:
      "Design tool with AI features for generating images, removing backgrounds, and creating layouts.",
    tip: "Use Magic Design — describe what you need and Canva generates complete slide decks, social posts, or flyers in seconds.",
    free: true
  },
  {
    id: "10",
    name: "Gamma",
    category: "Design",
    description:
      "AI-powered presentation builder. Describe your topic and get a complete deck.",
    tip: "Paste a document or outline and Gamma turns it into a polished presentation. Saves hours of formatting work.",
    free: true
  },
  {
    id: "11",
    name: "GitHub Copilot",
    category: "Code",
    description:
      "AI coding assistant that suggests code as you type in your editor.",
    tip: "Write a comment describing what you want, and Copilot generates the code. Works in VS Code, JetBrains, and more.",
    free: false
  },
  {
    id: "12",
    name: "Cursor",
    category: "Code",
    description:
      "AI-first code editor. Chat with your codebase, generate features, and fix bugs conversationally.",
    tip: "Select broken code, press Cmd+K, and describe the fix in plain English. Cursor rewrites it for you.",
    free: true
  },
  {
    id: "13",
    name: "Replit AI",
    category: "Code",
    description:
      "Browser-based coding environment with AI that can build and deploy apps from descriptions.",
    tip: "Describe a simple internal tool you need and Replit builds it. Great for non-developers who need quick utilities.",
    free: true
  },
  {
    id: "14",
    name: "Perplexity",
    category: "Research",
    description:
      "AI-powered search engine that gives direct answers with sources instead of links.",
    tip: "Use it instead of Google for research questions. It reads multiple sources and gives you a synthesized answer with citations.",
    free: true
  },
  {
    id: "15",
    name: "Elicit",
    category: "Research",
    description:
      "AI research assistant that finds and summarizes academic papers.",
    tip: "Ask a research question and Elicit finds relevant papers, extracts key findings, and identifies consensus across studies.",
    free: true
  },
  {
    id: "16",
    name: "SciSpace",
    category: "Research",
    description:
      "Upload any research paper and get plain-English explanations of complex sections.",
    tip: "Highlight any paragraph in a PDF and ask SciSpace to explain it simply. Perfect for understanding technical reports outside your field.",
    free: true
  },
  {
    id: "17",
    name: "Zapier AI",
    category: "Automation",
    description:
      "Connects your apps and automates workflows using natural language instructions.",
    tip: 'Describe a workflow like "When I get a Slack message tagged urgent, create a task in Asana and email me." Zapier builds the automation.',
    free: true
  },
  {
    id: "18",
    name: "Make (Integromat)",
    category: "Automation",
    description:
      "Visual automation platform for connecting apps and building complex workflows.",
    tip: "Automate repetitive data entry by connecting your forms, spreadsheets, and CRM. One workflow can replace hours of manual work weekly.",
    free: true
  },
  {
    id: "19",
    name: "Reclaim AI",
    category: "Automation",
    description:
      "AI calendar assistant that automatically finds time for your priorities and habits.",
    tip: "Set your priorities (focus work, exercise, learning) and Reclaim protects time on your calendar. It reschedules around meetings automatically.",
    free: true
  },
  {
    id: "20",
    name: "Descript",
    category: "Design",
    description:
      "Edit video and audio by editing text. AI removes filler words and generates captions.",
    tip: "Record a rough video, then edit it like a Google Doc — delete sentences from the transcript and the video edits itself.",
    free: true
  },
  {
    id: "21",
    name: "ElevenLabs",
    category: "Design",
    description:
      "AI voice generator that creates natural-sounding speech from text.",
    tip: "Turn blog posts or reports into audio briefings you can listen to during your commute. Clone your voice for consistent branding.",
    free: true
  },
  {
    id: "22",
    name: "Tome",
    category: "Design",
    description:
      "AI-powered storytelling tool that generates narratives with visuals for presentations.",
    tip: "Paste a project brief and Tome creates a compelling narrative deck. Great for pitching ideas to stakeholders.",
    free: true
  },
  {
    id: "23",
    name: "Jasper",
    category: "Writing",
    description:
      "AI content platform for marketing teams — generates ads, social posts, and blog content.",
    tip: "Set your brand voice once, then generate on-brand content across all channels. Saves marketing teams 10+ hours per week.",
    free: false
  },
  {
    id: "24",
    name: "Superhuman AI",
    category: "Writing",
    description:
      "AI-powered email client that drafts replies, summarizes threads, and manages your inbox.",
    tip: "Hit 'Write with AI' on any email to get a draft reply in your tone. Processes a full inbox in half the time.",
    free: false
  }
];
