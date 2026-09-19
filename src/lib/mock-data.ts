export type TopicCoverage = { label: string; covered: boolean };
export type Chapter = { number: number; title: string; pages: string; minutes: number; preview: string };
export type Book = {
  id: string;
  title: string;
  author: string;
  edition: string;
  match: number;
  cover: "violet" | "orange" | "teal" | "yellow" | "pink" | "lime";
  chapters: Chapter[];
  topics: TopicCoverage[];
};
export type ResultSet = { id: string; prompt: string; shortLabel: string; books: Book[] };

const preview =
  "Attitudes shape how we interpret new information, yet they are rarely fixed. When beliefs and behaviour conflict, the resulting discomfort can motivate a person to revise an opinion, justify a choice, or avoid evidence that challenges an existing view.";

const book = (id: string, title: string, author: string, edition: string, match: number, cover: Book["cover"], chapters: Chapter[], topics: TopicCoverage[]): Book => ({ id, title, author, edition, match, cover, chapters, topics });
const ch = (number: number, title: string, pages: string, minutes: number, text = preview): Chapter => ({ number, title, pages, minutes, preview: text });

export const resultSets: ResultSet[] = [
  {
    id: "psychology",
    prompt: "Cognitive dissonance and attitude change for my Psychology exam",
    shortLabel: "Psychology exam",
    books: [
      book("psy-1", "The Social Mind", "Dr Amara Voss", "4th edition", 96, "violet", [ch(7, "Attitudes and persuasion", "142–169", 34), ch(8, "Cognitive dissonance", "170–191", 26)], [{ label: "Cognitive dissonance", covered: true }, { label: "Attitude change", covered: true }, { label: "Persuasion", covered: true }, { label: "Self-perception", covered: true }]),
      book("psy-2", "Thinking Together", "Leo Hartwell", "2nd edition", 91, "orange", [ch(5, "Beliefs in conflict", "96–121", 31), ch(6, "Changing minds", "122–145", 28)], [{ label: "Cognitive dissonance", covered: true }, { label: "Attitude change", covered: true }, { label: "Persuasion", covered: true }, { label: "Self-perception", covered: false }]),
      book("psy-3", "Everyday Social Psychology", "Nadia Byrne", "3rd edition", 87, "teal", [ch(10, "Influence and identity", "204–229", 32)], [{ label: "Cognitive dissonance", covered: true }, { label: "Attitude change", covered: true }, { label: "Persuasion", covered: false }, { label: "Self-perception", covered: true }]),
    ],
  },
  {
    id: "law",
    prompt: "Contract law: offer, acceptance and consideration",
    shortLabel: "Contract law",
    books: [
      book("law-1", "Foundations of Contract", "Maya Ellison", "6th edition", 97, "yellow", [ch(3, "Offer and intention", "48–76", 35), ch(4, "Acceptance", "77–101", 29), ch(5, "Consideration", "102–128", 33)], [{ label: "Offer", covered: true }, { label: "Acceptance", covered: true }, { label: "Consideration", covered: true }]),
      book("law-2", "Contract Law in Context", "Prof Elliot Shah", "4th edition", 92, "pink", [ch(2, "Agreement", "31–59", 34), ch(3, "The bargain", "60–88", 34)], [{ label: "Offer", covered: true }, { label: "Acceptance", covered: true }, { label: "Consideration", covered: true }]),
      book("law-3", "Cases and Principles", "Rosa Bennett", "2nd edition", 86, "violet", [ch(1, "Forming a contract", "12–43", 38)], [{ label: "Offer", covered: true }, { label: "Acceptance", covered: true }, { label: "Consideration", covered: false }]),
    ],
  },
  {
    id: "economics",
    prompt: "Supply and demand, elasticity, and market failure",
    shortLabel: "Economics exam",
    books: [
      book("eco-1", "Markets Made Clear", "Jonas Reed", "5th edition", 95, "teal", [ch(4, "Supply and demand", "72–103", 38), ch(5, "Elasticity", "104–129", 31), ch(9, "When markets fail", "204–237", 40)], [{ label: "Supply and demand", covered: true }, { label: "Elasticity", covered: true }, { label: "Market failure", covered: true }]),
      book("eco-2", "Principles of Modern Economics", "Anika Rao", "3rd edition", 90, "orange", [ch(6, "How prices respond", "118–151", 40), ch(11, "Externalities", "248–273", 31)], [{ label: "Supply and demand", covered: true }, { label: "Elasticity", covered: true }, { label: "Market failure", covered: true }]),
      book("eco-3", "The Working Economy", "Felix Morgan", "2nd edition", 85, "lime", [ch(3, "Market signals", "49–76", 34), ch(8, "Public goods", "166–191", 31)], [{ label: "Supply and demand", covered: true }, { label: "Elasticity", covered: false }, { label: "Market failure", covered: true }]),
    ],
  },
];

export const examples = resultSets.map(({ prompt }) => prompt);

export function resultsFor(query: string) {
  const q = query.toLowerCase();
  return resultSets.find((set) => set.prompt.toLowerCase() === q || q.includes(set.id) || (set.id === "law" && q.includes("contract")) || (set.id === "economics" && (q.includes("supply") || q.includes("market")))) ?? resultSets[0];
}