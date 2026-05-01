export type JournalEntry = {
  slug: string;
  title: string;
  date: string;
  read: string;
  category: string;
  cover: string;
  coverAlt: string;
  excerpt: string;
  kicker: string;
  intro: string;
  metaNote: string;
  sections: { heading: string; body: string }[];
};

export const JOURNAL_ORDER = [
  "problem-before-product",
  "designing-for-decision-speed",
  "what-gets-shipped-gets-learned",
  "ai-is-not-the-product",
  "building-with-operating-context",
] as const;

export const JOURNAL: Record<(typeof JOURNAL_ORDER)[number], JournalEntry> = {
  "problem-before-product": {
    slug: "problem-before-product",
    title: "Start with the problem, not the product you want to build.",
    date: "01 May 2026",
    read: "4 min read",
    category: "Journal",
    cover: "/assets/blog-1.jpg",
    coverAlt: "Editorial black and white portrait",
    excerpt:
      "Most AI app ideas die because the team falls in love with the interface before they've named the operational pain clearly enough.",
    kicker: "Daily journal · systems thinking",
    intro:
      "The quickest way to waste a month is to start sketching screens before you've named the constraint, the bottleneck, and the behaviour you're trying to change. AI makes this worse because it creates the illusion that the hard part is the model. It isn't. The hard part is deciding what job the application is actually being hired to do.",
    metaNote: "Written from the workshop — one useful idea a day.",
    sections: [
      {
        heading: "Write down the pain in operational language",
        body:
          "I want teams to describe the problem in terms of time lost, revenue missed, errors repeated, or decisions delayed. Not in product language. Not 'we need a dashboard'. Usually the real problem is something like: sales notes live in six places, nobody trusts the numbers, and decisions get made off stale information.",
      },
      {
        heading: "A framework beats a feature list",
        body:
          "Once the pain is named, the framework gets simple: input, decision, action, outcome. What information enters the system, what decision needs to happen, what action should follow, and what business result proves it worked. That sequence is far more useful than a vague backlog full of shiny ideas.",
      },
      {
        heading: "Build the shortest path to a changed behaviour",
        body:
          "The first version should exist to change one behaviour decisively. If the app cannot make one thing faster, clearer, safer, or more accountable in the first session, it is too broad. Every useful product I have shipped started by being aggressively specific.",
      },
    ],
  },
  "designing-for-decision-speed": {
    slug: "designing-for-decision-speed",
    title: "Good software is usually just faster decision-making in disguise.",
    date: "30 Apr 2026",
    read: "3 min read",
    category: "Journal",
    cover: "/assets/blog-2.jpg",
    coverAlt: "Warm-toned editorial still life",
    excerpt:
      "If a screen looks nice but doesn't help someone decide what to do next, it is decoration, not product design.",
    kicker: "Daily journal · product design",
    intro:
      "A lot of product work gets described as improving user experience, which is true but vague. The sharper lens is decision speed. What matters is whether the interface reduces hesitation, shortens the path to action, and leaves less room for drift.",
    metaNote: "Short note from a live build week.",
    sections: [
      {
        heading: "The best screens are opinionated",
        body:
          "They foreground the thing that matters now. They do not ask the user to interpret ten competing signals. They tell the truth about the state of the system and they make the next move obvious.",
      },
      {
        heading: "Clarity compounds",
        body:
          "Teams often think of clarity as a copy issue or a visual issue. It is neither. It is an operational issue. If someone can act quickly with confidence, the whole company moves better. One clearer screen can remove hours of back-and-forth.",
      },
      {
        heading: "Make the product earn its keep",
        body:
          "Every screen should justify its existence by removing friction, surfacing signal, or creating accountability. If it doesn't, it probably belongs in the bin.",
      },
    ],
  },
  "what-gets-shipped-gets-learned": {
    slug: "what-gets-shipped-gets-learned",
    title: "What gets shipped gets learned. Everything else is theatre.",
    date: "29 Apr 2026",
    read: "5 min read",
    category: "Field notes",
    cover: "/assets/blog-3.jpg",
    coverAlt: "Close-up abstract editorial image",
    excerpt:
      "You do not learn from perfect roadmaps. You learn from product touching reality.",
    kicker: "Daily journal · shipping",
    intro:
      "There is a class of project that always sounds busy and strategic but never actually meets the market. I have become increasingly impatient with it. The only learning that really matters is the learning you earn after something ships and collides with real behaviour.",
    metaNote: "From the side of the desk where delivery happens.",
    sections: [
      {
        heading: "Planning is useful right up until it replaces proof",
        body:
          "I like plans. I like structure. But a plan is not evidence. The product has to appear in front of users quickly enough that your assumptions can start losing fights with reality.",
      },
      {
        heading: "The first release should answer a hard question",
        body:
          "Will anyone use it? Will they trust it? Will it save time? Will it create a new bottleneck somewhere else? A good first release is not broad. It is designed to answer one meaningful question as quickly as possible.",
      },
      {
        heading: "Shipping creates sharper conversations",
        body:
          "Once something is real, feedback improves. People stop speaking in abstractions. They point to the thing. They tell you where it breaks. They tell you what they actually expected. That is where product work becomes useful.",
      },
    ],
  },
  "ai-is-not-the-product": {
    slug: "ai-is-not-the-product",
    title: "AI is not the product. Better workflow design usually is.",
    date: "28 Apr 2026",
    read: "4 min read",
    category: "Journal",
    cover: "/assets/govscape.jpg",
    coverAlt: "AI governance dashboard visual",
    excerpt:
      "The smartest model in the world cannot rescue a broken workflow with bad inputs and no ownership.",
    kicker: "Daily journal · AI applications",
    intro:
      "A lot of businesses come asking for an AI application when what they actually need is a cleaner system for inputs, handoffs, and decisions. The model matters, obviously. But workflow design matters first.",
    metaNote: "A note for teams trying to be practical about AI.",
    sections: [
      {
        heading: "Bad process in, expensive hallucination out",
        body:
          "If your data is fragmented, your ownership is fuzzy, and nobody agrees on the desired output, AI simply scales confusion. You do not have an AI problem. You have a systems problem with an AI-shaped symptom.",
      },
      {
        heading: "The real opportunity is orchestration",
        body:
          "The useful products are the ones that gather context, structure it, call the model at the right moment, and route the answer into a workflow someone can trust. That is product work. That is where the value lives.",
      },
      {
        heading: "Use AI where it changes the economics",
        body:
          "Drafting, summarising, classifying, spotting risk, teeing up decisions. These are the moments where AI can change cost, speed, and consistency. Everything else is tastefully lit wallpaper.",
      },
    ],
  },
  "building-with-operating-context": {
    slug: "building-with-operating-context",
    title: "The product gets better when the builder understands the business model.",
    date: "27 Apr 2026",
    read: "4 min read",
    category: "Journal",
    cover: "/assets/ben-portrait.jpg",
    coverAlt: "Portrait of Benjamin Brown",
    excerpt:
      "Software decisions look different when you know how the money moves, where the risk sits, and what actually hurts the operator.",
    kicker: "Daily journal · operating context",
    intro:
      "I do not think design, engineering, and operations should be treated as separate conversations if the goal is to build something durable. The more commercial context the builder has, the more likely the product is to make decisions that help the business instead of just pleasing the roadmap.",
    metaNote: "Operator view, not agency view.",
    sections: [
      {
        heading: "Margin changes product priorities",
        body:
          "If you know where margin is won or lost, you make different calls. You pay more attention to admin compression, failure states, handover quality, and reporting clarity. You stop fetishising novelty and start protecting the business.",
      },
      {
        heading: "Context creates better trade-offs",
        body:
          "When you understand the business model, you can decide what deserves precision now and what can wait. That is one of the biggest advantages of having the same person close to product, code, and operations.",
      },
      {
        heading: "Build for the thing after launch",
        body:
          "A lot of software is designed as if launch is the finish line. It isn't. The real test is whether the product helps a team operate better one month later, six months later, and once the edge cases start arriving.",
      },
    ],
  },
};
