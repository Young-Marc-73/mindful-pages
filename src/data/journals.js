// Published books use their Lulu Buy Button prices.
// Research Journal pricing remains provisional.
export const journals = [
  {
    id: "strategic-thinking",
    title: "Strategic Thinking: Workshop",
    audience: "Volume One · A practical process",
    price: "$26.99",
    description:
      "A practical workshop for matching the right kind of thinking work to the situation in front of you — then carrying that work through to a clear decision and plan.",
    cover: "/images/covers/workshop.webp",
    details: [
      "Most strategy advice tells you to think bigger. This book teaches you how to diagnose what kind of thinking the situation in front of you actually needs.",
      "It is a workshop manual. You learn to recognize whether you need more knowledge, clearer understanding, a decision, or evaluation — then you select the right tools and move through the work without skipping steps.",
      "Example: You are deciding whether to raise prices. The book shows you how to gather the right material, organize it so the real trade-offs become visible, form a practical plan, and later evaluate what happened.",
      "Guidance for working with AI helps you put the methods into practice while keeping the decisions in your hands."
    ],
    status: "Available now",
    buyButtonId: "eadac7a4-0706-4e6e-84a4-f71bd8ae9d61",
    amazonUrl: null,
    series: "Business Series",
    preview: "/previews/workshop.html"
  },
  {
    id: "strategic-thinking-repository",
    title: "Strategic Thinking: The Repository",
    audience: "Volume Two · 166 thinking methods",
    price: "$34.99",
    description:
      "A working reference of 166 tools, methods, and frameworks. When you know what kind of thinking work a situation requires, this is where you find a specific method for that job.",
    cover: "/images/covers/repository.webp",
    details: [
      "Each entry shows what the tool receives and what it produces, so you can see how it connects to the next step.",
      "Indexes help you find methods by thinking movement, desired output, or business situation.",
      "Use it independently as a reference, or alongside The Workshop. Practical AI hand-offs help you ask for useful assistance while keeping responsibility and judgment with you."
    ],
    status: "Available now",
    buyButtonId: "d76c4d15-cb19-4289-a3ec-5281965b99bc",
    amazonUrl: null,
    series: "Business Series",
    preview: "/previews/repository.html"
  },
  {
    id: "business-journal",
    title: "Business Journal",
    audience: "Understanding your business",
    price: "$24.99",
    featured: true,
    description:
      "Built around the seven business signals. Instead of writing something once and putting it away, you return to the same signals as the business changes.",
    cover: "/images/covers/business-journal.webp",
    details: [
      "In a small business, you may be responsible for marketing, operations, sales, and the money. The conversations between those departments still happen. Often, they happen inside your head. The Business Journal gives those conversations somewhere to go.",
      "Guided questions help you connect evidence, experience, and open questions across the seven business signals so your understanding stays current.",
      "Bring together what you have learned. Examine what you believe. Notice where the pieces agree, where they conflict, and what you still need to understand.",
      "As the business changes, return to your entries and develop your thinking. Over time you build a record of how your understanding grew — and what led you to change your mind."
    ],
    status: "Available now",
    buyButtonId: "50bc931b-2a23-4d40-8708-7c8ff409a8c5",
    amazonUrl: null,
    series: "Business Series",
    preview: "/previews/business-journal.html"
  },
  {
    id: "research",
    title: "Research Journal",
    audience: "Knowledge worth returning to",
    price: "$22.00",
    description:
      "A place to collect source material, notes, and investigation. Organized around the seven business signals so the information stays connected to real work instead of floating free.",
    cover: "/images/covers/research-journal.webp",
    details: [
      "You often notice something worth learning before you have time to study it. A recommended book. A customer’s observation. A question you can’t yet answer. The Research Journal gives that future learning a place to wait.",
      "Use it when you need to preserve a question worth investigating or keep research that should inform later decisions.",
      "Guidance on making time to study and using AI as a research assistant helps you begin. Keep what you discover available for the next conversation, decision, or opportunity."
    ],
    status: "Coming soon",
    amazonUrl: null,
    series: "Business Series",
    preview: "/previews/research-journal.html"
  }
];

export const featuredJournal = journals.find((journal) => journal.featured);
