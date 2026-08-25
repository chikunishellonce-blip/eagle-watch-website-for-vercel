export type EagleValue = {
  letter: string;
  title: string;
  description: string;
};

// The five EAGLE values — content sourced from the client's approved company profile.
export const eagleValues: EagleValue[] = [
  {
    letter: "E",
    title: "Ever Developing",
    description:
      "We take an interest in what's happening around us, seeking opportunities to add value and refine our offering.",
  },
  {
    letter: "A",
    title: "Acumen & Appreciation",
    description:
      "Recognising the contribution of those we work with — sharing knowledge and nurturing a supportive environment.",
  },
  {
    letter: "G",
    title: "Generating Loyalty",
    description: "Challenging people to be accountable, with regular feedback and opportunities to learn.",
  },
  {
    letter: "L",
    title: "Law & Ethical Engagement",
    description: "Treating others with respect and unwavering integrity in every interaction.",
  },
  {
    letter: "E",
    title: "Excellence",
    description: "Constantly clarifying expectations, reviewing progress, and improving how we do things.",
  },
];

export const visionMission = {
  vision:
    "Eagle Watch is a security services provider that aspires to become the largest security concern in Southern Africa.",
  mission:
    "To become the first choice provider of a diverse and wholesome range of security products — from the traditional static guard to virtual security solutions — through embracing technological and societal advances.",
};
