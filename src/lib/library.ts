// Real-book reference library (data source: supplied CSV of 30 titles).
// Covers are loaded straight from Google Books image URLs — no local asset copies.
export type LibraryBook = {
  id: string;
  title: string;
  author: string;
  year: number;
  category: string;
  subtopics: string[];
  pageCount: number;
  description: string;
  tags: string[];
  relatedIds: string[];
  cover: string;
  thumbnail: string;
  googleBooksPage: string;
};

export const library: LibraryBook[] = [
  {
    "id": "RB001",
    "title": "Thinking, Fast and Slow",
    "author": "Daniel Kahneman",
    "year": 2011,
    "category": "Psychology",
    "subtopics": [
      "Decision-making",
      "Cognitive biases",
      "Behavioural economics"
    ],
    "pageCount": 499,
    "description": "A widely read exploration of the two systems that shape judgment and decision-making, from fast intuition to slow reasoning.",
    "tags": [
      "decision-making",
      "bias",
      "heuristics",
      "psychology",
      "behaviour"
    ],
    "relatedIds": [
      "RB002",
      "RB003",
      "RB004"
    ],
    "cover": "https://covers.openlibrary.org/b/id/13290711-L.jpg",
    "thumbnail": "https://covers.openlibrary.org/b/id/13290711-L.jpg",
    "googleBooksPage": "https://books.google.com/books/about/Thinking,_Fast_and_Slow.html?id=KAjBXwAACAAJ"
  },
  {
    "id": "RB002",
    "title": "Nudge",
    "author": "Richard H. Thaler and Cass R. Sunstein",
    "year": 2008,
    "category": "Psychology",
    "subtopics": [
      "Behavioural economics",
      "Choice architecture",
      "Public policy"
    ],
    "pageCount": 320,
    "description": "Introduces choice architecture and shows how small design changes can influence behaviour without removing freedom of choice.",
    "tags": [
      "choice architecture",
      "behavioural economics",
      "policy",
      "behaviour",
      "design"
    ],
    "relatedIds": [
      "RB001",
      "RB003",
      "RB004"
    ],
    "cover": "https://covers.openlibrary.org/b/id/6402116-L.jpg",
    "thumbnail": "https://covers.openlibrary.org/b/id/6402116-L.jpg",
    "googleBooksPage": "https://books.google.com/books/about/Nudge.html?id=FrOMEAAAQBAJ"
  },
  {
    "id": "RB003",
    "title": "Influence",
    "author": "Robert B. Cialdini",
    "year": 1984,
    "category": "Psychology",
    "subtopics": [
      "Persuasion",
      "Social psychology",
      "Behaviour"
    ],
    "pageCount": 336,
    "description": "A classic book on the psychology of persuasion, explaining the principles that shape compliance and decision-making.",
    "tags": [
      "persuasion",
      "psychology",
      "social proof",
      "behaviour",
      "influence"
    ],
    "relatedIds": [
      "RB001",
      "RB002",
      "RB004"
    ],
    "cover": "https://covers.openlibrary.org/b/id/431011-L.jpg",
    "thumbnail": "https://covers.openlibrary.org/b/id/431011-L.jpg",
    "googleBooksPage": "https://books.google.com/books/about/Influence.html?id=BBMlzgEACAAJ"
  },
  {
    "id": "RB004",
    "title": "The Righteous Mind",
    "author": "Jonathan Haidt",
    "year": 2012,
    "category": "Psychology",
    "subtopics": [
      "Moral psychology",
      "Politics",
      "Culture"
    ],
    "pageCount": 419,
    "description": "Explores why good people disagree about politics and religion through moral psychology and social intuition.",
    "tags": [
      "morality",
      "politics",
      "psychology",
      "culture",
      "intuition"
    ],
    "relatedIds": [
      "RB001",
      "RB002",
      "RB003"
    ],
    "cover": "https://books.google.com/books/content?id=BfTQr6tpn0wC&printsec=frontcover&img=1&zoom=2&source=gbs_api",
    "thumbnail": "https://books.google.com/books/content?id=BfTQr6tpn0wC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "googleBooksPage": "https://books.google.com/books/about/The_Righteous_Mind.html?id=BfTQr6tpn0wC"
  },
  {
    "id": "RB005",
    "title": "Hooked",
    "author": "Nir Eyal",
    "year": 2014,
    "category": "Business & Economics",
    "subtopics": [
      "Product design",
      "Habits",
      "Consumer behaviour"
    ],
    "pageCount": 256,
    "description": "A product-focused guide to habit-forming products and the behavioural loops that bring users back.",
    "tags": [
      "product design",
      "habits",
      "retention",
      "behaviour",
      "growth"
    ],
    "relatedIds": [
      "RB008",
      "RB009",
      "RB010"
    ],
    "cover": "https://books.google.com/books/content?id=R42aBAAAQBAJ&printsec=frontcover&img=1&zoom=2&source=gbs_api",
    "thumbnail": "https://books.google.com/books/content?id=R42aBAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "googleBooksPage": "https://books.google.com/books/about/Hooked.html?id=R42aBAAAQBAJ"
  },
  {
    "id": "RB006",
    "title": "Atomic Habits",
    "author": "James Clear",
    "year": 2018,
    "category": "Psychology",
    "subtopics": [
      "Habits",
      "Self-improvement",
      "Behaviour change"
    ],
    "pageCount": 320,
    "description": "A practical book on building better habits through small changes, systems and repetition.",
    "tags": [
      "habits",
      "behaviour change",
      "self-improvement",
      "routines",
      "systems"
    ],
    "relatedIds": [
      "RB001",
      "RB002",
      "RB003"
    ],
    "cover": "https://books.google.com/books/content?id=vo5REQAAQBAJ&printsec=frontcover&img=1&zoom=2&source=gbs_api",
    "thumbnail": "https://books.google.com/books/content?id=vo5REQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "googleBooksPage": "https://books.google.com/books/about/Atomic_Habits.html?id=vo5REQAAQBAJ"
  },
  {
    "id": "RB007",
    "title": "The Design of Everyday Things",
    "author": "Don Norman",
    "year": 1988,
    "category": "Technology & Society",
    "subtopics": [
      "Design",
      "Human-computer interaction",
      "Usability"
    ],
    "pageCount": 368,
    "description": "A foundational design book about usability, affordances, feedback and how people interact with products and systems.",
    "tags": [
      "design",
      "usability",
      "UX",
      "HCI",
      "products"
    ],
    "relatedIds": [
      "RB013",
      "RB014",
      "RB015"
    ],
    "cover": "https://covers.openlibrary.org/b/id/10007224-L.jpg",
    "thumbnail": "https://covers.openlibrary.org/b/id/10007224-L.jpg",
    "googleBooksPage": "https://books.google.com/books/about/The_Design_of_Everyday_Things.html?id=heCtnQEACAAJ"
  },
  {
    "id": "RB008",
    "title": "Made to Stick",
    "author": "Chip Heath and Dan Heath",
    "year": 2007,
    "category": "Business & Economics",
    "subtopics": [
      "Communication",
      "Ideas",
      "Behaviour"
    ],
    "pageCount": 336,
    "description": "Explains why some ideas survive and spread, and how clarity, concreteness and emotion make messages memorable.",
    "tags": [
      "communication",
      "storytelling",
      "ideas",
      "messaging",
      "behaviour"
    ],
    "relatedIds": [
      "RB005",
      "RB009",
      "RB010"
    ],
    "cover": "https://books.google.com/books/content?id=DOyJDQAAQBAJ&printsec=frontcover&img=1&zoom=2&source=gbs_api",
    "thumbnail": "https://books.google.com/books/content?id=DOyJDQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "googleBooksPage": "https://books.google.com/books/about/Made_to_Stick.html?id=DOyJDQAAQBAJ"
  },
  {
    "id": "RB009",
    "title": "Contagious",
    "author": "Jonah Berger",
    "year": 2013,
    "category": "Business & Economics",
    "subtopics": [
      "Marketing",
      "Virality",
      "Social influence"
    ],
    "pageCount": 256,
    "description": "Looks at why some products, messages and behaviours catch on and spread between people.",
    "tags": [
      "marketing",
      "virality",
      "word of mouth",
      "influence",
      "sharing"
    ],
    "relatedIds": [
      "RB005",
      "RB008",
      "RB010"
    ],
    "cover": "https://covers.openlibrary.org/b/id/9039370-L.jpg",
    "thumbnail": "https://covers.openlibrary.org/b/id/9039370-L.jpg",
    "googleBooksPage": "https://books.google.com/books/about/Contagious.html?id=1fbingEACAAJ"
  },
  {
    "id": "RB010",
    "title": "The Lean Startup",
    "author": "Eric Ries",
    "year": 2011,
    "category": "Business & Economics",
    "subtopics": [
      "Startups",
      "Product development",
      "Experimentation"
    ],
    "pageCount": 336,
    "description": "Popularised build-measure-learn and experimental product development for startups and teams working under uncertainty.",
    "tags": [
      "startups",
      "MVP",
      "experimentation",
      "product",
      "learning"
    ],
    "relatedIds": [
      "RB005",
      "RB008",
      "RB009"
    ],
    "cover": "https://covers.openlibrary.org/b/id/7104760-L.jpg",
    "thumbnail": "https://covers.openlibrary.org/b/id/7104760-L.jpg",
    "googleBooksPage": "https://books.google.com/books/about/The_Lean_Startup.html?id=prDZAQAACAAJ"
  },
  {
    "id": "RB011",
    "title": "Inspired",
    "author": "Marty Cagan",
    "year": 2008,
    "category": "Business & Economics",
    "subtopics": [
      "Product management",
      "Teams",
      "Innovation"
    ],
    "pageCount": 368,
    "description": "A well-known guide to building technology products and product teams that create value for users and businesses.",
    "tags": [
      "product management",
      "teams",
      "innovation",
      "product development",
      "strategy"
    ],
    "relatedIds": [
      "RB005",
      "RB008",
      "RB009"
    ],
    "cover": "https://covers.openlibrary.org/b/id/9700654-L.jpg",
    "thumbnail": "https://covers.openlibrary.org/b/id/9700654-L.jpg",
    "googleBooksPage": "https://books.google.com/books/about/Inspired.html?id=_2ZRzQEACAAJ"
  },
  {
    "id": "RB012",
    "title": "Platform Revolution",
    "author": "Geoffrey G. Parker, Marshall W. Van Alstyne and Sangeet Paul Choudary",
    "year": 2016,
    "category": "Business & Economics",
    "subtopics": [
      "Platforms",
      "Network effects",
      "Digital business"
    ],
    "pageCount": 352,
    "description": "Explains how platform businesses create value, build ecosystems and reshape digital markets.",
    "tags": [
      "platforms",
      "network effects",
      "digital economy",
      "ecosystems",
      "marketplaces"
    ],
    "relatedIds": [
      "RB005",
      "RB008",
      "RB009"
    ],
    "cover": "https://covers.openlibrary.org/b/id/11390852-L.jpg",
    "thumbnail": "https://covers.openlibrary.org/b/id/11390852-L.jpg",
    "googleBooksPage": "https://books.google.com/books/about/Platform_Revolution.html?id=y1ONEAAAQBAJ"
  },
  {
    "id": "RB013",
    "title": "Algorithms to Live By",
    "author": "Brian Christian and Tom Griffiths",
    "year": 2016,
    "category": "Technology & Society",
    "subtopics": [
      "Algorithms",
      "Decision-making",
      "Computer science"
    ],
    "pageCount": 368,
    "description": "Connects ideas from computer science to everyday human problems such as scheduling, searching and choosing.",
    "tags": [
      "algorithms",
      "decision-making",
      "computer science",
      "optimisation",
      "search"
    ],
    "relatedIds": [
      "RB007",
      "RB014",
      "RB015"
    ],
    "cover": "https://covers.openlibrary.org/b/id/8042539-L.jpg",
    "thumbnail": "https://covers.openlibrary.org/b/id/8042539-L.jpg",
    "googleBooksPage": "https://books.google.com/books/about/Algorithms_to_Live_By.html?id=GraMEAAAQBAJ"
  },
  {
    "id": "RB014",
    "title": "Weapons of Math Destruction",
    "author": "Cathy O'Neil",
    "year": 2016,
    "category": "Technology & Society",
    "subtopics": [
      "Algorithms",
      "Data ethics",
      "Society"
    ],
    "pageCount": 272,
    "description": "A critique of opaque algorithmic systems and their effects on fairness, inequality and public life.",
    "tags": [
      "algorithms",
      "ethics",
      "data",
      "inequality",
      "AI"
    ],
    "relatedIds": [
      "RB007",
      "RB013",
      "RB015"
    ],
    "cover": "https://covers.openlibrary.org/b/id/8136557-L.jpg",
    "thumbnail": "https://covers.openlibrary.org/b/id/8136557-L.jpg",
    "googleBooksPage": "https://books.google.com/books/about/Weapons_of_Math_Destruction.html?id=3gOOEAAAQBAJ"
  },
  {
    "id": "RB015",
    "title": "The Alignment Problem",
    "author": "Brian Christian",
    "year": 2020,
    "category": "Technology & Society",
    "subtopics": [
      "Artificial intelligence",
      "Ethics",
      "Machine learning"
    ],
    "pageCount": 496,
    "description": "Examines the challenges of aligning AI systems with human values, goals and real-world outcomes.",
    "tags": [
      "AI",
      "machine learning",
      "ethics",
      "alignment",
      "technology"
    ],
    "relatedIds": [
      "RB007",
      "RB013",
      "RB014"
    ],
    "cover": "https://covers.openlibrary.org/b/id/10678431-L.jpg",
    "thumbnail": "https://covers.openlibrary.org/b/id/10678431-L.jpg",
    "googleBooksPage": "https://books.google.com/books/about/The_Alignment_Problem.html?id=KGCNEAAAQBAJ"
  },
  {
    "id": "RB016",
    "title": "The Master Switch",
    "author": "Tim Wu",
    "year": 2010,
    "category": "Technology & Society",
    "subtopics": [
      "Media history",
      "Technology",
      "Power"
    ],
    "pageCount": 384,
    "description": "Traces how information industries evolve from openness to concentration, connecting communications history to power.",
    "tags": [
      "media",
      "technology",
      "monopolies",
      "communication",
      "power"
    ],
    "relatedIds": [
      "RB007",
      "RB013",
      "RB014"
    ],
    "cover": "https://books.google.com/books/content?id=tKr0QwAACAAJ&printsec=frontcover&img=1&zoom=2&source=gbs_api",
    "thumbnail": "https://books.google.com/books/content?id=tKr0QwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "googleBooksPage": "https://books.google.com/books/about/The_Master_Switch.html?id=tKr0QwAACAAJ"
  },
  {
    "id": "RB017",
    "title": "Sapiens",
    "author": "Yuval Noah Harari",
    "year": 2011,
    "category": "History & Politics",
    "subtopics": [
      "World history",
      "Anthropology",
      "Society"
    ],
    "pageCount": 464,
    "description": "A broad history of humankind covering cognitive, agricultural and scientific revolutions.",
    "tags": [
      "history",
      "anthropology",
      "society",
      "humanity",
      "civilisation"
    ],
    "relatedIds": [
      "RB018",
      "RB019",
      "RB020"
    ],
    "cover": "https://covers.openlibrary.org/b/id/8634250-L.jpg",
    "thumbnail": "https://covers.openlibrary.org/b/id/8634250-L.jpg",
    "googleBooksPage": "https://books.google.com/books/about/Sapiens.html?id=zfuOEAAAQBAJ"
  },
  {
    "id": "RB018",
    "title": "Why Nations Fail",
    "author": "Daron Acemoglu and James A. Robinson",
    "year": 2012,
    "category": "History & Politics",
    "subtopics": [
      "Institutions",
      "Political economy",
      "Development"
    ],
    "pageCount": 544,
    "description": "Argues that political and economic institutions are central to prosperity, inequality and national development.",
    "tags": [
      "institutions",
      "political economy",
      "development",
      "politics",
      "economics"
    ],
    "relatedIds": [
      "RB017",
      "RB019",
      "RB020"
    ],
    "cover": "https://covers.openlibrary.org/b/id/7253519-L.jpg",
    "thumbnail": "https://covers.openlibrary.org/b/id/7253519-L.jpg",
    "googleBooksPage": "https://books.google.com/books/about/Why_Nations_Fail.html?id=ivmMEAAAQBAJ"
  },
  {
    "id": "RB019",
    "title": "The Silk Roads",
    "author": "Peter Frankopan",
    "year": 2015,
    "category": "History & Politics",
    "subtopics": [
      "Global history",
      "Trade",
      "Empire"
    ],
    "pageCount": 672,
    "description": "Reframes world history around the networks and exchanges connecting East and West.",
    "tags": [
      "trade",
      "history",
      "empire",
      "global history",
      "exchange"
    ],
    "relatedIds": [
      "RB017",
      "RB018",
      "RB020"
    ],
    "cover": "https://books.google.com/books/content?id=_mRHrgEACAAJ&printsec=frontcover&img=1&zoom=2&source=gbs_api",
    "thumbnail": "https://books.google.com/books/content?id=_mRHrgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "googleBooksPage": "https://books.google.com/books/about/The_Silk_Roads.html?id=_mRHrgEACAAJ"
  },
  {
    "id": "RB020",
    "title": "Guns, Germs, and Steel",
    "author": "Jared Diamond",
    "year": 1997,
    "category": "History & Politics",
    "subtopics": [
      "Civilisation",
      "Geography",
      "History"
    ],
    "pageCount": 480,
    "description": "Explores the environmental and geographic factors that shaped global inequalities and historical development.",
    "tags": [
      "history",
      "geography",
      "civilisation",
      "development",
      "environment"
    ],
    "relatedIds": [
      "RB017",
      "RB018",
      "RB019"
    ],
    "cover": "https://books.google.com/books/content?id=OwVrSMQPPowC&printsec=frontcover&img=1&zoom=2&source=gbs_api",
    "thumbnail": "https://books.google.com/books/content?id=OwVrSMQPPowC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "googleBooksPage": "https://books.google.com/books/about/Guns,_Germs,_and_Steel.html?id=OwVrSMQPPowC"
  },
  {
    "id": "RB021",
    "title": "The Power Broker",
    "author": "Robert A. Caro",
    "year": 1974,
    "category": "History & Politics",
    "subtopics": [
      "Cities",
      "Infrastructure",
      "Power"
    ],
    "pageCount": 1336,
    "description": "A major biography of Robert Moses and a deep study of urban planning, political power and public infrastructure.",
    "tags": [
      "cities",
      "infrastructure",
      "politics",
      "urbanism",
      "power"
    ],
    "relatedIds": [
      "RB017",
      "RB018",
      "RB019"
    ],
    "cover": "https://books.google.com/books/content?id=PMLnbx06vOEC&printsec=frontcover&img=1&zoom=2&source=gbs_api",
    "thumbnail": "https://books.google.com/books/content?id=PMLnbx06vOEC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "googleBooksPage": "https://books.google.com/books/about/The_Power_Broker.html?id=PMLnbx06vOEC"
  },
  {
    "id": "RB022",
    "title": "The New Map",
    "author": "Daniel Yergin",
    "year": 2020,
    "category": "Science & Environment",
    "subtopics": [
      "Energy",
      "Geopolitics",
      "Climate"
    ],
    "pageCount": 512,
    "description": "Looks at energy, geopolitics and the forces shaping a changing world order.",
    "tags": [
      "energy",
      "geopolitics",
      "climate",
      "markets",
      "global change"
    ],
    "relatedIds": [
      "RB023",
      "RB024",
      "RB025"
    ],
    "cover": "https://covers.openlibrary.org/b/id/10491911-L.jpg",
    "thumbnail": "https://covers.openlibrary.org/b/id/10491911-L.jpg",
    "googleBooksPage": "https://books.google.com/books/about/The_New_Map.html?id=RaWMEAAAQBAJ"
  },
  {
    "id": "RB023",
    "title": "Braiding Sweetgrass",
    "author": "Robin Wall Kimmerer",
    "year": 2013,
    "category": "Science & Environment",
    "subtopics": [
      "Ecology",
      "Nature",
      "Indigenous knowledge"
    ],
    "pageCount": 408,
    "description": "Blends ecology, personal reflection and Indigenous ways of knowing to explore humanity's relationship with the natural world.",
    "tags": [
      "ecology",
      "environment",
      "nature",
      "indigenous knowledge",
      "sustainability"
    ],
    "relatedIds": [
      "RB022",
      "RB024",
      "RB025"
    ],
    "cover": "https://books.google.com/books/content?id=PT22DwAAQBAJ&printsec=frontcover&img=1&zoom=2&source=gbs_api",
    "thumbnail": "https://books.google.com/books/content?id=PT22DwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "googleBooksPage": "https://books.google.com/books/about/Braiding_Sweetgrass.html?id=PT22DwAAQBAJ"
  },
  {
    "id": "RB024",
    "title": "The Sixth Extinction",
    "author": "Elizabeth Kolbert",
    "year": 2014,
    "category": "Science & Environment",
    "subtopics": [
      "Biodiversity",
      "Climate",
      "Environment"
    ],
    "pageCount": 336,
    "description": "Documents the ongoing human-driven extinction event and its implications for life on Earth.",
    "tags": [
      "extinction",
      "biodiversity",
      "climate",
      "environment",
      "science"
    ],
    "relatedIds": [
      "RB022",
      "RB023",
      "RB025"
    ],
    "cover": "https://covers.openlibrary.org/b/id/7910870-L.jpg",
    "thumbnail": "https://covers.openlibrary.org/b/id/7910870-L.jpg",
    "googleBooksPage": "https://books.google.com/books/about/The_Sixth_Extinction.html?id=vi-loAEACAAJ"
  },
  {
    "id": "RB025",
    "title": "Thinking in Systems",
    "author": "Donella H. Meadows",
    "year": 2008,
    "category": "Science & Environment",
    "subtopics": [
      "Systems thinking",
      "Complexity",
      "Feedback"
    ],
    "pageCount": 240,
    "description": "A clear introduction to systems thinking, feedback loops and the hidden structures that shape outcomes.",
    "tags": [
      "systems thinking",
      "complexity",
      "feedback",
      "modelling",
      "change"
    ],
    "relatedIds": [
      "RB022",
      "RB023",
      "RB024"
    ],
    "cover": "https://covers.openlibrary.org/b/id/14420637-L.jpg",
    "thumbnail": "https://covers.openlibrary.org/b/id/14420637-L.jpg",
    "googleBooksPage": "https://books.google.com/books/about/Thinking_in_Systems.html?id=6aMfnwEACAAJ"
  },
  {
    "id": "RB026",
    "title": "Make It Stick",
    "author": "Peter C. Brown, Henry L. Roediger III and Mark A. McDaniel",
    "year": 2014,
    "category": "Philosophy & Humanities",
    "subtopics": [
      "Learning science",
      "Memory",
      "Education"
    ],
    "pageCount": 336,
    "description": "Uses cognitive science research to explain what effective learning looks like and why common study habits often fail.",
    "tags": [
      "learning",
      "memory",
      "education",
      "study",
      "retrieval"
    ],
    "relatedIds": [
      "RB027",
      "RB028",
      "RB029"
    ],
    "cover": "https://covers.openlibrary.org/b/id/8188891-L.jpg",
    "thumbnail": "https://covers.openlibrary.org/b/id/8188891-L.jpg",
    "googleBooksPage": "https://books.google.com/books/about/Make_It_Stick.html?id=1vcF0QEACAAJ"
  },
  {
    "id": "RB027",
    "title": "How Learning Works",
    "author": "Susan A. Ambrose et al.",
    "year": 2010,
    "category": "Philosophy & Humanities",
    "subtopics": [
      "Learning science",
      "Teaching",
      "Education"
    ],
    "pageCount": 336,
    "description": "Summarises seven research-based principles for learning and shows how they apply to teaching and course design.",
    "tags": [
      "learning",
      "teaching",
      "education",
      "pedagogy",
      "cognition"
    ],
    "relatedIds": [
      "RB026",
      "RB028",
      "RB029"
    ],
    "cover": "https://books.google.com/books/content?id=Phj2jZwYDKcC&printsec=frontcover&img=1&zoom=2&source=gbs_api",
    "thumbnail": "https://books.google.com/books/content?id=Phj2jZwYDKcC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "googleBooksPage": "https://books.google.com/books/about/How_Learning_Works.html?id=Phj2jZwYDKcC"
  },
  {
    "id": "RB028",
    "title": "Justice",
    "author": "Michael J. Sandel",
    "year": 2009,
    "category": "Philosophy & Humanities",
    "subtopics": [
      "Ethics",
      "Political philosophy",
      "Society"
    ],
    "pageCount": 320,
    "description": "Introduces moral and political philosophy through real dilemmas about fairness, rights and the common good.",
    "tags": [
      "ethics",
      "justice",
      "philosophy",
      "society",
      "politics"
    ],
    "relatedIds": [
      "RB026",
      "RB027",
      "RB029"
    ],
    "cover": "https://books.google.com/books/content?id=H6EIBufi6hwC&printsec=frontcover&img=1&zoom=2&source=gbs_api",
    "thumbnail": "https://books.google.com/books/content?id=H6EIBufi6hwC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "googleBooksPage": "https://books.google.com/books/about/Justice.html?id=H6EIBufi6hwC"
  },
  {
    "id": "RB029",
    "title": "The Scout Mindset",
    "author": "Julia Galef",
    "year": 2021,
    "category": "Philosophy & Humanities",
    "subtopics": [
      "Reasoning",
      "Belief",
      "Critical thinking"
    ],
    "pageCount": 288,
    "description": "Argues for a truth-seeking mindset that values accuracy over defensiveness and identity protection.",
    "tags": [
      "critical thinking",
      "reasoning",
      "beliefs",
      "epistemology",
      "bias"
    ],
    "relatedIds": [
      "RB026",
      "RB027",
      "RB028"
    ],
    "cover": "https://covers.openlibrary.org/b/id/10690900-L.jpg",
    "thumbnail": "https://covers.openlibrary.org/b/id/10690900-L.jpg",
    "googleBooksPage": "https://books.google.com/books/about/The_Scout_Mindset.html?id=BL2OEAAAQBAJ"
  },
  {
    "id": "RB030",
    "title": "The Courage to Be Disliked",
    "author": "Ichiro Kishimi and Fumitake Koga",
    "year": 2013,
    "category": "Philosophy & Humanities",
    "subtopics": [
      "Philosophy",
      "Psychology",
      "Meaning"
    ],
    "pageCount": 288,
    "description": "A dialogue-based introduction to Adlerian ideas about freedom, responsibility and living with purpose.",
    "tags": [
      "philosophy",
      "psychology",
      "meaning",
      "selfhood",
      "relationships"
    ],
    "relatedIds": [
      "RB026",
      "RB027",
      "RB028"
    ],
    "cover": "https://books.google.com/books/content?id=2Jd5DwAAQBAJ&printsec=frontcover&img=1&zoom=2&source=gbs_api",
    "thumbnail": "https://books.google.com/books/content?id=2Jd5DwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "googleBooksPage": "https://books.google.com/books/about/The_Courage_to_Be_Disliked.html?id=2Jd5DwAAQBAJ"
  }
];

export const libraryById = new Map(library.map((b) => [b.id, b]));
