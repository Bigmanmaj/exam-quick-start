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

export function resultsFor(query: string): ResultSet {
  const q = query.toLowerCase();
  const matched = resultSets.find((set) => set.prompt.toLowerCase() === q || q.includes(set.id) || (set.id === "law" && q.includes("contract")) || (set.id === "economics" && (q.includes("supply") || q.includes("market"))));
  const fallback = resultSets[0];
  if (!fallback) throw new Error("Mock result data is incomplete");
  return matched ?? fallback;
}
// Explicit topic coverage by chapter in the fictional sample library.
const mappings: Record<string, Record<number, string[]>> = {
 'psy-1': {7:['Attitude change','Persuasion'],8:['Cognitive dissonance','Self-perception']},
 'psy-2': {5:['Cognitive dissonance'],6:['Attitude change','Persuasion']},
 'psy-3': {10:['Cognitive dissonance','Attitude change','Self-perception']},
 'law-1': {3:['Offer'],4:['Acceptance'],5:['Consideration']},
 'law-2': {2:['Offer','Acceptance'],3:['Consideration']},
 'law-3': {1:['Offer','Acceptance']},
 'eco-1': {4:['Supply and demand'],5:['Elasticity'],9:['Market failure']},
 'eco-2': {6:['Supply and demand','Elasticity'],11:['Market failure']},
 'eco-3': {3:['Supply and demand'],8:['Market failure']},
};
export function chapterTopics(book: Book, chapter: Chapter) { return mappings[book.id]?.[chapter.number] ?? []; }
export function matchedChapters(book: Book, topics: string[]) { return book.chapters.filter(c=>chapterTopics(book,c).some(t=>topics.includes(t))); }
export function matchingBooks(query: string, topics: string[]) {
 return resultsFor(query).books.map(book=>{
 const covered=book.topics.map(t=>t.label).filter(t=>topics.includes(t)&&book.chapters.some(c=>chapterTopics(book,c).includes(t)));
 return {...book, chapters:matchedChapters(book,topics), topics:topics.map(label=>({label,covered:covered.includes(label)})),match:Math.round(covered.length/Math.max(1,topics.length)*100)};
 }).sort((a,b)=>b.match-a.match);
}
const explanations: Record<string,string[]> = {
 'Cognitive dissonance': ['Cognitive dissonance is the discomfort arising when a person holds incompatible beliefs or acts against a valued belief. The discomfort can motivate change, but it does not guarantee that the change will improve accuracy.', 'Consider a student who values preparation but postpones revision. They might start revising, decide the assessment is unimportant, or argue that pressure improves performance. Each response reduces inconsistency in a different way. In an exam answer, distinguish changing behaviour from justifying behaviour.'],
 'Attitude change':['An attitude is an evaluation of a person, object or idea. Attitude change can follow careful examination of evidence or reliance on simpler cues such as familiarity and credibility.', 'A persuasive message is more likely to produce durable change when its audience has both the motivation and the opportunity to evaluate its arguments. Compare a carefully reasoned explanation with a memorable slogan: either may influence an immediate response, but the reasons for that influence differ.'],
 'Persuasion':['Persuasion involves an attempt to influence an evaluation through communication. The source, message and audience each affect how that communication is interpreted.', 'A credible speaker can draw attention to a message, but credibility alone does not establish that the argument is sound. When revising, identify the proposed mechanism, specify its conditions and explain a situation in which it may fail.'],
 'Self-perception':['Self-perception describes how people may infer their attitudes by observing their own behaviour, particularly when their prior attitudes are weak or uncertain.', 'Someone who repeatedly volunteers to lead group discussions may infer that they enjoy public speaking. This account does not require the discomfort central to dissonance explanations. The contrast between uncertainty and conflict is a useful organising distinction for an exam response.'],
 'Offer':['An offer communicates willingness to enter an agreement on stated terms if the other party accepts. It must be distinguished from an invitation to negotiate or to make an offer.', 'Suppose a seller gives a buyer a specific item, price and deadline for acceptance. Analyse the wording and context before concluding that an offer exists. A price advertisement may instead invite customers to make offers; specificity alone does not settle intention.'],
 'Acceptance':['Acceptance is an unqualified agreement to the terms of an offer. A reply proposing different terms is generally analysed as a counter-offer rather than acceptance.', 'Imagine an offer to sell a bicycle for £100 followed by a reply agreeing only at £80. Identify which terms changed and whether the original offer remains available. Separate the content of acceptance from the question of when and how it is communicated. These are illustrative principles, not legal advice.'],
 'Consideration':['Consideration is the value exchanged for a promise in a bargain. Its role is to distinguish an exchange from a promise to make a gift.', 'If one party promises payment in return for another undertaking a task, identify the promise and the requested act separately. Do not confuse economic equivalence with the existence of an exchange. Apply the rule to each promise rather than simply stating that the agreement seems fair.'],
 'Supply and demand':['Demand describes the quantity buyers are willing and able to purchase at different prices; supply describes the quantity sellers are willing and able to provide. Equilibrium occurs where those quantities coincide.', 'A change in the price of the good produces movement along a curve, whereas a change in another determinant can shift the curve. If production costs rise, supply may shift inward. Draw the original equilibrium, label the shift and compare the new price and quantity without shifting both curves unnecessarily.'],
 'Elasticity':['Price elasticity of demand measures the percentage change in quantity demanded relative to a percentage change in price. It captures responsiveness, rather than the absolute size of a market.', 'If a 10% price increase produces a 20% fall in quantity demanded, the magnitude of elasticity is two. Demand is elastic over this change. Explain the availability of substitutes and the time consumers have to adjust before predicting the effect of a price change on revenue.'],
 'Market failure':['Market failure occurs when a market allocation is not socially efficient. Externalities, public goods and information problems can create differences between private incentives and social outcomes.', 'Pollution imposes a cost on people outside a transaction. A producer considering only private costs may therefore produce more than the socially efficient quantity. Compare a corrective tax with regulation by discussing information requirements and incentives, rather than assuming that intervention is costless.'],
};
export function chapterParagraphs(book:Book, chapter:Chapter) {
 return chapterTopics(book,chapter).flatMap(topic=>explanations[topic]??[]);
}
