export const industries: string[] = [
  "Corporate",
  "Hotels",
  "Retail & Shopping Centres",
  "Manufacturing",
  "Public Sector & Government",
  "Transport, Warehousing & Logistics",
  "Education",
  "Residential & Property Management",
];

export type TechItem = {
  key: string;
  label: string;
};

export const technology: TechItem[] = [
  { key: "cctv", label: "CCTV" },
  { key: "access", label: "Access Control" },
  { key: "alarms", label: "Intruder Alarms" },
  { key: "fence", label: "Electronic Fence" },
  { key: "gate", label: "Electronic Gate" },
];

export const whyChecklist: string[] = [
  "Licensed under the Private Investigators and Security Guards Act",
  "Clear corporate objectives, and swift, flexible decision-making",
  "Market intelligence to keep pricing competitive without cutting corners",
  "Backup support services and a senior supervisor on standby",
  "Discipline, commitment to duty, and direct customer liaison",
];

export const trainingTags: string[] = [
  "Physical training",
  "Perimeter patrols",
  "Public relations",
  "Firearm handling",
  "Gate control & mileage reading",
  "Leadership",
  "Power of arrest",
  "Undercover investigation",
  "Crowd & riot control",
  "Honesty & integrity",
];

export type FieldLogEntry = {
  code: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

// Swap `image` for the client's real field photos once supplied — see README.
export const fieldLog: FieldLogEntry[] = [
  {
    code: "LOG/ELF-01",
    title: "Perimeter electric fence install",
    description: "Fence line wiring fitted along the boundary wall, post by post.",
    image: "/images/field-electric-fence.jpg",
    alt: "Technician installing electric fence wiring on a boundary wall",
  },
  {
    code: "LOG/GTE-02",
    title: "Access gate — cable routing",
    description: "Conduit and cable run laid for a motorised access gate at the boundary line.",
    image: "/images/field-gate-cabling.jpg",
    alt: "Technician routing cabling for an automated security gate",
  },
  {
    code: "LOG/TEC-03",
    title: "Field technicians on site",
    description: "Our technical team calibrating equipment during a perimeter security fit-out.",
    image: "/images/field-technician-work.jpg",
    alt: "Field technician calibrating security equipment on site",
  },
  {
    code: "LOG/CCT-04",
    title: "CCTV sensor mounting",
    description: "Sensor unit fixed to the perimeter wall ahead of camera alignment.",
    image: "/images/field-cctv-mount.jpg",
    alt: "CCTV sensor unit mounted on a perimeter wall",
  },
];

export const trustBar = [
  { title: "Trusted Professionals", sub: "Licensed & disciplined" },
  { title: "24/7 Protection", sub: "Round-the-clock cover" },
  { title: "Rapid Response", sub: "Swift & flexible support" },
  { title: "Technology Driven", sub: "CCTV, access & alarms" },
];

export const companyInfo = {
  name: "Eagle Watch Security Services (Pvt) Ltd",
  tagline: "Protecting People. Securing Tomorrow.",
  addressLine: "1 Selous Avenue, Eastlea, Harare, Zimbabwe",
  lat: -17.8216737,
  lng: 31.0588863,
  phones: ["+263 712 335 585", "+263 242 882 915", "+263 242 795 513"],
  emergencyPhone: "+263242795513",
  email: "sales@eaglewatchsecurity.co.zw",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "263712335585",
};
