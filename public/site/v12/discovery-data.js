/* Discovery questionnaire content. Source: uploads/Discovery_Questionnaire.md + the skills data. Options are [label, signal]; signal is solid | partly | open | null. */
window.BBDiscoveryData = {
  areas: [
    {
      n: "01",
      id: "business-management-strategy",
      name: "Business management and strategy",
      q: "Where are you, and where do you want to be?",
      stage: "Direction",
      skills: [
        "Business strategy",
        "Innovation planning",
        "Discovery sprint",
        "Tools and skills audit",
        "Opportunity review",
        "Product and service line-up",
        "Fractional CTO",
      ],
    },
    {
      n: "02",
      id: "financial",
      name: "Financial",
      q: "Where is money made, lost and stuck?",
      stage: "Direction",
      skills: ["Real-time reporting", "Line reports", "Scheduled reports", "Management reports", "Cost-saving review", "Revenue review"],
    },
    {
      n: "03",
      id: "operations",
      name: "Operations",
      q: "How does the work get done today?",
      stage: "Foundations",
      skills: ["Process mapping", "SOPs", "Training guides", "Business brain", "Efficiency review", "Team training"],
    },
    {
      n: "04",
      id: "data",
      name: "Data",
      q: "What does the business know, and can it be trusted?",
      stage: "Foundations",
      skills: ["Data structure", "Data migration", "Data cleansing", "Data analysis", "Data security and reliability"],
    },
    {
      n: "05",
      id: "compliance-governance",
      name: "Compliance and governance",
      q: "What must not be broken?",
      stage: "Foundations",
      skills: ["Compliance scanning", "Issue reporting", "ISO readiness", "SOC 2 readiness", "GDPR compliance"],
    },
    {
      n: "06",
      id: "product-development",
      name: "Product development",
      q: "Is what you sell what people want?",
      stage: "Customer",
      skills: ["Product research", "Product planning", "Product strategy", "UI and UX design", "Prototyping", "Design systems"],
    },
    {
      n: "07",
      id: "marketing-brand",
      name: "Marketing and brand",
      q: "Do the right people know it exists?",
      stage: "Customer",
      skills: [
        "Brand identity",
        "Brand guidelines",
        "Logo creation",
        "Tone of voice",
        "Stationery",
        "Ad campaigns",
        "Social media marketing",
        "Email marketing",
        "SEO",
        "UGC content",
        "Video",
        "Voice",
        "Podcasts",
      ],
    },
    {
      n: "08",
      id: "sales",
      name: "Sales",
      q: "Does interest turn into revenue you can forecast?",
      stage: "Customer",
      skills: [
        "Outbound lead generation",
        "Outbound messaging",
        "Lead nurturing",
        "Sales funnel build",
        "Conversion playbook",
        "Outbound testing",
        "Return modelling",
        "Sales data analysis",
      ],
    },
    {
      n: "09",
      id: "customer-support",
      name: "Customer support",
      q: "Do customers stay, and can you cope with more of them?",
      stage: "Customer",
      skills: ["AI phone systems", "Support agents", "Support knowledge base", "Support reporting"],
    },
    {
      n: "10",
      id: "technical-development",
      name: "Technical development",
      q: "What needs building, and in what order?",
      stage: "Build",
      skills: [
        "Full-stack build",
        "Hosting and deployment",
        "iOS and iPad apps",
        "Android apps",
        "macOS apps",
        "Windows desktop apps",
        "AI integration",
        "Security",
        "Stability",
        "Quality control and testing",
      ],
    },
    { n: "11", id: "where-to-start", name: "Where to start", q: "Which answers were weakest?", stage: "Close", skills: [] },
  ],
  journeys: {
    A: {
      name: "Something new",
      steps: [
        {
          n: "01",
          qs: [
            { q: "What is it, in one sentence?", t: "text", req: 1 },
            {
              q: "What does success look like in twelve months?",
              t: "single",
              o: [
                ["Paying for itself", "solid"],
                ["Proven with its first customers", "solid"],
                ["Ready to raise investment", "solid"],
                ["A new arm of a business I already run", "solid"],
                ["I haven't pictured it yet", "open"],
              ],
            },
          ],
        },
        {
          n: "02",
          qs: [
            {
              q: "Do you know what it needs to earn to pay for itself?",
              t: "single",
              o: [
                ["Yes, to the number", "solid"],
                ["Roughly", "partly"],
                ["Not yet", "open"],
              ],
            },
          ],
        },
        {
          n: "03",
          qs: [
            {
              q: "Who runs it day to day once it's live?",
              t: "single",
              o: [
                ["Me", "solid"],
                ["A team that already exists", "solid"],
                ["A team I still need to find", "partly"],
                ["Not decided", "open"],
              ],
            },
          ],
        },
        {
          n: "04",
          qs: [
            {
              q: "What does it need to know to do its job?",
              t: "single",
              o: [
                ["It will collect its own data as it goes", "solid"],
                ["Data I already hold, in good shape", "solid"],
                ["Data I already hold, but it needs work", "partly"],
                ["Data from somewhere else", "partly"],
                ["Not sure", "open"],
              ],
            },
          ],
        },
        {
          n: "05",
          qs: [
            {
              q: "Are there rules it has to follow from day one?",
              t: "single",
              o: [
                ["No, nothing beyond the basics", "solid"],
                ["Yes, and I know what they are", "solid"],
                ["It handles personal data", "partly"],
                ["It's in a regulated industry", "partly"],
                ["Customers will ask for a standard", "partly"],
                ["Not sure", "open"],
              ],
            },
          ],
        },
        {
          n: "06",
          qs: [
            {
              q: "How do you know people want it?",
              t: "single",
              o: [
                ["They already pay for something like it", "solid"],
                ["They've told me they'd pay", "solid"],
                ["I've seen the problem first-hand", "partly"],
                ["It's a hunch", "open"],
              ],
            },
          ],
        },
        {
          n: "07",
          qs: [
            {
              q: "How will the first customers hear about it?",
              t: "single",
              o: [
                ["I already have the audience", "solid"],
                ["Through a business I already run", "solid"],
                ["I'll go out and find them", "partly"],
                ["Ads and content", "partly"],
                ["I don't know yet", "open"],
              ],
            },
            {
              q: "Does it have a name and a look?",
              t: "single",
              o: [
                ["Both", "solid"],
                ["A name, nothing else", "partly"],
                ["Neither", "open"],
              ],
            },
          ],
        },
        {
          n: "08",
          qs: [
            {
              q: "How will it make money?",
              t: "single",
              o: [
                ["A subscription", "solid"],
                ["A one-off purchase", "solid"],
                ["A fee per use, or a commission", "solid"],
                ["Sold as a service", "solid"],
                ["Not decided", "open"],
              ],
            },
          ],
        },
        {
          n: "09",
          qs: [
            {
              q: "When a customer gets stuck, who helps them?",
              t: "single",
              o: [
                ["Me", "solid"],
                ["A team", "solid"],
                ["AI first, with a person behind it", "partly"],
                ["It needs to explain itself", "partly"],
                ["I haven't thought about it", "open"],
              ],
            },
          ],
        },
        {
          n: "10",
          qs: [
            {
              q: "What exists today?",
              t: "single",
              o: [
                ["Something built that needs finishing or rebuilding", "solid"],
                ["Designs or a prototype", "partly"],
                ["Notes and sketches", "partly"],
                ["An idea", "open"],
              ],
            },
            {
              q: "Where does it need to live?",
              t: "multi",
              o: [
                ["On the web", null],
                ["On iPhone and iPad", null],
                ["On Android", null],
                ["On a Mac or Windows desktop", null],
                ["Not sure", "open"],
              ],
            },
          ],
        },
        {
          n: "11",
          qs: [
            {
              q: "When does it need to be in front of real customers?",
              t: "single",
              o: [
                ["Within three months", null],
                ["Within six months", null],
                ["Within a year", null],
                ["No fixed date", null],
              ],
            },
            { q: "Anything else I should know?", t: "text" },
          ],
        },
      ],
    },
    B: {
      name: "A business that's already running",
      steps: [
        {
          n: "01",
          qs: [
            {
              q: "Where do you want the business to be in twelve months?",
              t: "single",
              o: [
                ["More revenue", "solid"],
                ["Better margins", "solid"],
                ["The same output in fewer hours", "solid"],
                ["Ready to sell, or to raise investment", "solid"],
                ["I'm not sure", "open"],
              ],
            },
          ],
        },
        {
          n: "02",
          qs: [
            {
              q: "How quickly can you see how the business is doing?",
              t: "single",
              o: [
                ["Live, whenever I want", "solid"],
                ["Every week", "partly"],
                ["At month end", "partly"],
                ["When the accountant tells me", "open"],
                ["I'm not sure the numbers are right", "open"],
              ],
            },
          ],
        },
        {
          n: "03",
          qs: [
            {
              q: "If a key person left tomorrow, how much would leave with them?",
              t: "single",
              o: [
                ["Very little. It's written down.", "solid"],
                ["Some of it", "partly"],
                ["Most of it", "open"],
                ["Everything", "open"],
              ],
            },
          ],
        },
        {
          n: "04",
          qs: [
            {
              q: "Do you trust your data?",
              t: "single",
              o: [
                ["Yes. One clean source.", "solid"],
                ["Mostly. It needs a tidy.", "partly"],
                ["It's spread across systems and spreadsheets", "open"],
                ["No", "open"],
              ],
            },
          ],
        },
        {
          n: "05",
          qs: [
            {
              q: "Is there a standard you need to meet?",
              t: "single",
              o: [
                ["None applies to us", "solid"],
                ["We already hold what we need", "solid"],
                ["We're working towards one", "partly"],
                ["A customer or regulator is asking for one", "open"],
                ["Not sure what applies", "open"],
              ],
            },
            {
              q: "Which ones?",
              t: "multi",
              o: [
                ["ISO 9001 (quality)", null],
                ["ISO 14001 (environmental)", null],
                ["ISO 27001 (information security)", null],
                ["ISO 42001 (AI management)", null],
                ["SOC 2", null],
                ["GDPR", null],
                ["Something else", null],
              ],
              unless: [0, "None applies to us"],
            },
          ],
        },
        {
          n: "06",
          qs: [
            {
              q: "Is what you sell still what customers want?",
              t: "single",
              o: [
                ["Yes. Demand is strong.", "solid"],
                ["Mostly, but it needs refreshing", "partly"],
                ["Customers ask for things we don't offer", "open"],
                ["We're not sure", "open"],
              ],
            },
          ],
        },
        {
          n: "07",
          qs: [
            {
              q: "Do the right people know you exist?",
              t: "single",
              o: [
                ["Yes. More enquiries than we can handle.", "solid"],
                ["Some, mostly by word of mouth", "partly"],
                ["Not enough of them", "open"],
                ["We don't know where customers come from", "open"],
              ],
            },
          ],
        },
        {
          n: "08",
          qs: [
            {
              q: "Could you forecast next quarter's revenue with confidence?",
              t: "single",
              o: [
                ["Yes, closely", "solid"],
                ["Roughly", "partly"],
                ["It's a guess", "open"],
                ["No", "open"],
              ],
            },
          ],
        },
        {
          n: "09",
          qs: [
            {
              q: "If your customers doubled next month, what would happen to support?",
              t: "single",
              o: [
                ["We'd cope", "solid"],
                ["We'd stretch", "partly"],
                ["We'd need to hire first", "open"],
                ["We'd break", "open"],
              ],
            },
          ],
        },
        {
          n: "10",
          qs: [
            {
              q: "What does the business run on?",
              t: "single",
              o: [
                ["Systems built for us, that fit", "solid"],
                ["Off-the-shelf tools that work", "solid"],
                ["Off-the-shelf tools we've outgrown", "partly"],
                ["Spreadsheets and email", "open"],
              ],
            },
            {
              q: "Where is AI in the business today?",
              t: "single",
              o: [
                ["Built into how we work", "solid"],
                ["A few tools, not joined up", "partly"],
                ["People use it on their own", "partly"],
                ["Nowhere yet", "open"],
              ],
            },
          ],
        },
        { n: "11", qs: [{ q: "If one thing changed in the next ninety days, what should it be?", t: "text" }] },
      ],
    },
  },
};
