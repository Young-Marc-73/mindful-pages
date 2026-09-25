// Pre-launch catalog. Activate purchase links only after each listing is published.
// Planned prices: Workshop $21.99 / Repository $29.99 from the September 16,
// 2026 KDP production package. Business Journal $28 / Research Journal $22
// retain the existing site amounts pending Marc’s final publication price review.
export const journals = [
  {
    "id": "strategic-thinking",
    "title": "Strategic Thinking: The Workshop",
    "audience": "Volume One · A practical process",
    "price": "$21.99",
    "description": "Recognize the kind of thinking a situation requires, choose a useful method, and work from a question toward a responsible decision.",
    "cover": "/images/covers/workshop.webp",
    "details": [
      "You don’t need the same thinking method for every situation. Sometimes you need a better question. Sometimes you need to compare options, examine an assumption, or understand why a plan didn’t work.",
      "The Workshop introduces four connected movements: Knowledge, Understanding, Wisdom, and Evaluation. Learn to gather useful evidence, discover relationships, develop options, and build practical plans.",
      "Guidance for working with AI helps you put the methods into practice while keeping the decisions in your hands. Begin with the question in front of you. Use what helps. Return when you need something else."
    ],
    "status": "Coming soon",
    "amazonUrl": null,
    "series": "Business Series",
    "preview": "/previews/workshop.html"
  },
  {
    "id": "strategic-thinking-repository",
    "title": "Strategic Thinking: The Repository",
    "audience": "Volume Two · 166 thinking methods",
    "price": "$29.99",
    "description": "A working reference of 166 tools, methods, techniques, and frameworks. Find a method for the question in front of you—and see where its result can lead.",
    "cover": "/images/covers/repository.webp",
    "details": [
      "Some situations need research. Others need comparison, a different perspective, or a way to test what you believe. The Repository gives you a collection of methods to return to as the work changes.",
      "Each entry explains what a method is for, when to use it, how to work through it, and what its output connects to next. Indexes help you find methods by thinking movement, desired output, or business situation.",
      "Use it independently as a reference, or alongside The Workshop. Practical AI hand-offs help you ask for useful assistance while keeping responsibility and judgment with you."
    ],
    "status": "Coming soon",
    "amazonUrl": null,
    "series": "Business Series",
    "preview": "/previews/repository.html"
  },
  {
    "id": "business-journal",
    "title": "Business Journal",
    "audience": "Understanding your business",
    "price": "$28.00",
    "featured": true,
    "description": "Bring the different parts of your business into focus. Guided questions help you connect what you have learned across seven areas, from purpose and customers to operations and money.",
    "cover": "/images/covers/business-journal.webp",
    "details": [
      "In a small business, you may be responsible for marketing, operations, sales, and the money. The conversations between those departments still happen. Often, they happen inside your head. The Business Journal gives those conversations somewhere to go.",
      "Guided explanations and questions help you examine seven connected areas: Purpose and Direction, Customer and Need, Offer and Value, Market and Position, Reach and Sales, Operations and Capacity, and Money and Resilience.",
      "Bring together what you have learned. Examine what you believe. Notice where the pieces agree, where they conflict, and what you still need to understand.",
      "As the business changes, return to your entries and develop your thinking. Over time, you build a record of how your understanding grew—and what led you to change your mind."
    ],
    "status": "Coming soon",
    "amazonUrl": null,
    "series": "Business Series",
    "preview": "/previews/business-journal.html"
  },
  {
    "id": "research",
    "title": "Research Journal",
    "audience": "Knowledge worth returning to",
    "price": "$22.00",
    "description": "Keep the question. Make time for the discovery. Preserve what you want to study, then use open research pages to follow the subject in your own way.",
    "cover": "/images/covers/research-journal.webp",
    "details": [
      "You often notice something worth learning before you have time to study it. A recommended book. A customer’s observation. A question you can’t yet answer. The Research Journal gives that future learning a place to wait.",
      "Use its Library to preserve subjects and sources you want to return to. When you are ready, move into open research pages and take notes without having to fit every thought into a box.",
      "Guidance on making time to study and using AI as a research assistant helps you begin. The pages give you room to follow the subject wherever useful questions lead. Keep what you discover available for the next conversation, decision, or opportunity."
    ],
    "status": "Coming soon",
    "amazonUrl": null,
    "series": "Business Series",
    "preview": "/previews/research-journal.html"
  }
];

export const featuredJournal = journals.find((journal) => journal.featured);
