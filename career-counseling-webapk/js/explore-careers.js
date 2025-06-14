// js/explore-careers.js

// js/explore-careers.js

// --- Auth-based nav logic ---
import { auth } from "../firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const logoutBtn = document.getElementById("logoutBtn");
const dashboardLink = document.getElementById("dashboardLink");
const profileLink = document.getElementById("profileLink");
const loginLink = document.getElementById("loginLink");

// Hide all auth-only links by default
logoutBtn.style.display = "none";
dashboardLink.style.display = "none";
profileLink.style.display = "none";
// Show login by default
if (loginLink) loginLink.style.display = "inline-block";

onAuthStateChanged(auth, (user) => {
  if (user) {
    // Show auth-only links if logged in
    logoutBtn.style.display = "inline-block";
    dashboardLink.style.display = "inline-block";
    profileLink.style.display = "inline-block";
    // Hide login button when logged in
    if (loginLink) loginLink.style.display = "none";
  } else {
    // Hide auth-only links if not logged in
    logoutBtn.style.display = "none";
    dashboardLink.style.display = "none";
    profileLink.style.display = "none";
    // Show login button when logged out
    if (loginLink) loginLink.style.display = "inline-block";
  }
});

// Logout handler
logoutBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Logout error:", error);
  }
});

// --- Rest of your explore-careers.js code below ---

//const DATA_URL = "assets/json/careers.json"; // Or fetch from Firebase

const careerCards = document.getElementById("careerCards");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("careerModal");

let careers = [
  {
    id: "software_engineer",
    title: "Software Engineer",
    description: "Designs, develops, and maintains software applications.",
    skills: ["Programming", "Problem Solving", "Teamwork"],
    education: "Bachelor's in Computer Science or related field",
    growth: [
      "Junior Developer",
      "Software Engineer",
      "Senior Engineer",
      "Tech Lead",
    ],
    salaryRange: "$60,000 - $120,000",
    resources: [
      { title: "Learn to Code", link: "https://www.freecodecamp.org/" },
      {
        title: "Software Engineering Roadmap",
        link: "https://roadmap.sh/software-engineer",
      },
    ],
  },
  {
    id: "data_analyst",
    title: "Data Analyst",
    description:
      "Interprets data and turns it into information for business decisions.",
    skills: ["Excel", "SQL", "Critical Thinking"],
    education: "Bachelor's in Statistics, Math, or related field",
    growth: [
      "Junior Analyst",
      "Data Analyst",
      "Senior Analyst",
      "Data Scientist",
    ],
    salaryRange: "$50,000 - $100,000",
    resources: [
      {
        title: "Data Analysis with Python",
        link: "https://www.coursera.org/learn/data-analysis-with-python",
      },
    ],
  },
  {
    id: "graphic_designer",
    title: "Graphic Designer",
    description: "Creates visual content to communicate messages.",
    skills: ["Creativity", "Adobe Creative Suite", "Typography"],
    education: "Bachelor's in Graphic Design or related field",
    growth: [
      "Junior Designer",
      "Graphic Designer",
      "Senior Designer",
      "Art Director",
    ],
    salaryRange: "$45,000 - $85,000",
    resources: [
      {
        title: "Graphic Design Basics",
        link: "https://www.coursera.org/learn/graphic-design-basics",
      },
    ],
  },
  {
    id: "marketing_specialist",
    title: "Marketing Specialist",
    description:
      "Develops and implements strategies to promote products or services.",
    skills: ["Market Research", "Communication", "Social Media"],
    education: "Bachelor's in Marketing or related field",
    growth: [
      "Marketing Coordinator",
      "Marketing Specialist",
      "Marketing Manager",
      "Director of Marketing",
    ],
    salaryRange: "$50,000 - $95,000",
    resources: [
      {
        title: "Digital Marketing Course",
        link: "https://www.udemy.com/course/digital-marketing-course/",
      },
    ],
  },
  {
    id: "nurse",
    title: "Nurse",
    description: "Provides patient care and support in medical settings.",
    skills: ["Patient Care", "Communication", "Medical Knowledge"],
    education: "Bachelor's in Nursing",
    growth: [
      "Staff Nurse",
      "Charge Nurse",
      "Nurse Manager",
      "Director of Nursing",
    ],
    salaryRange: "$60,000 - $100,000",
    resources: [
      {
        title: "Nursing Certification",
        link: "https://www.nursingworld.org/certification/",
      },
    ],
  },
  {
    id: "electrical_engineer",
    title: "Electrical Engineer",
    description: "Designs and develops electrical systems and components.",
    skills: ["Circuit Design", "Problem Solving", "Project Management"],
    education: "Bachelor's in Electrical Engineering",
    growth: [
      "Junior Engineer",
      "Electrical Engineer",
      "Senior Engineer",
      "Engineering Manager",
    ],
    salaryRange: "$65,000 - $110,000",
    resources: [
      {
        title: "Electrical Engineering Basics",
        link: "https://www.coursera.org/learn/electrical-engineering",
      },
    ],
  },
  {
    id: "teacher",
    title: "Teacher",
    description: "Educates students in various subjects at different levels.",
    skills: ["Communication", "Classroom Management", "Curriculum Development"],
    education: "Bachelor's in Education or related field",
    growth: ["Teacher", "Senior Teacher", "Department Head", "Principal"],
    salaryRange: "$40,000 - $75,000",
    resources: [
      {
        title: "Teaching Strategies",
        link: "https://www.edutopia.org/teaching-strategies",
      },
    ],
  },
  {
    id: "financial_analyst",
    title: "Financial Analyst",
    description:
      "Analyzes financial data and trends to help businesses make decisions.",
    skills: ["Financial Modeling", "Analytical Skills", "Excel"],
    education: "Bachelor's in Finance or related field",
    growth: [
      "Junior Analyst",
      "Financial Analyst",
      "Senior Analyst",
      "Finance Manager",
    ],
    salaryRange: "$55,000 - $95,000",
    resources: [
      {
        title: "Financial Analysis Course",
        link: "https://www.coursera.org/learn/financial-analysis",
      },
    ],
  },
  {
    id: "mechanical_engineer",
    title: "Mechanical Engineer",
    description: "Designs and develops mechanical systems and devices.",
    skills: ["CAD Software", "Problem Solving", "Project Management"],
    education: "Bachelor's in Mechanical Engineering",
    growth: [
      "Junior Engineer",
      "Mechanical Engineer",
      "Senior Engineer",
      "Engineering Manager",
    ],
    salaryRange: "$60,000 - $105,000",
    resources: [
      {
        title: "Mechanical Engineering Basics",
        link: "https://www.coursera.org/learn/mechanical-engineering",
      },
    ],
  },
  {
    id: "human_resources_specialist",
    title: "Human Resources Specialist",
    description: "Manages recruitment, employee relations, and HR policies.",
    skills: ["Communication", "Conflict Resolution", "Recruitment"],
    education: "Bachelor's in Human Resources or related field",
    growth: ["HR Assistant", "HR Specialist", "HR Manager", "Director of HR"],
    salaryRange: "$45,000 - $85,000",
    resources: [
      {
        title: "HR Management Course",
        link: "https://www.coursera.org/learn/hr-management",
      },
    ],
  },
  {
    id: "civil_engineer",
    title: "Civil Engineer",
    description:
      "Designs and supervises construction projects and infrastructure.",
    skills: ["Project Management", "AutoCAD", "Problem Solving"],
    education: "Bachelor's in Civil Engineering",
    growth: [
      "Junior Engineer",
      "Civil Engineer",
      "Senior Engineer",
      "Project Manager",
    ],
    salaryRange: "$55,000 - $100,000",
    resources: [
      {
        title: "Civil Engineering Basics",
        link: "https://www.coursera.org/learn/civil-engineering",
      },
    ],
  },
  {
    id: "accountant",
    title: "Accountant",
    description:
      "Manages financial records and ensures compliance with regulations.",
    skills: ["Financial Reporting", "Tax Preparation", "Attention to Detail"],
    education: "Bachelor's in Accounting or related field",
    growth: [
      "Staff Accountant",
      "Accountant",
      "Senior Accountant",
      "Accounting Manager",
    ],
    salaryRange: "$50,000 - $90,000",
    resources: [
      {
        title: "Accounting Basics",
        link: "https://www.coursera.org/learn/accounting-basics",
      },
    ],
  },
  {
    id: "architect",
    title: "Architect",
    description: "Designs buildings and oversees their construction.",
    skills: ["Design Software", "Creativity", "Project Management"],
    education: "Bachelor's in Architecture",
    growth: [
      "Junior Architect",
      "Architect",
      "Senior Architect",
      "Project Manager",
    ],
    salaryRange: "$55,000 - $110,000",
    resources: [
      {
        title: "Architecture Design Course",
        link: "https://www.coursera.org/learn/architecture-design",
      },
    ],
  },
  {
    id: "pharmacist",
    title: "Pharmacist",
    description:
      "Dispenses medications and provides drug-related information to patients.",
    skills: ["Attention to Detail", "Communication", "Pharmacology Knowledge"],
    education: "Doctor of Pharmacy (Pharm.D.)",
    growth: [
      "Staff Pharmacist",
      "Senior Pharmacist",
      "Pharmacy Manager",
      "Director of Pharmacy",
    ],
    salaryRange: "$90,000 - $140,000",
    resources: [
      {
        title: "Pharmacy Practice Course",
        link: "https://www.coursera.org/learn/pharmacy-practice",
      },
    ],
  },
  {
    id: "psychologist",
    title: "Psychologist",
    description: "Studies mental processes and behavior, and provides therapy.",
    skills: ["Communication", "Empathy", "Research"],
    education: "Doctorate in Psychology",
    growth: [
      "Psychologist",
      "Senior Psychologist",
      "Clinical Director",
      "Private Practice",
    ],
    salaryRange: "$70,000 - $120,000",
    resources: [
      {
        title: "Introduction to Psychology",
        link: "https://www.coursera.org/learn/introduction-psychology",
      },
    ],
  },
  {
    id: "sales_manager",
    title: "Sales Manager",
    description: "Leads a sales team to meet targets and grow revenue.",
    skills: ["Leadership", "Communication", "Sales Strategies"],
    education: "Bachelor's in Business or related field",
    growth: [
      "Sales Representative",
      "Sales Manager",
      "Regional Sales Manager",
      "Director of Sales",
    ],
    salaryRange: "$60,000 - $120,000",
    resources: [
      {
        title: "Sales Training Course",
        link: "https://www.udemy.com/course/sales-training-course/",
      },
    ],
  },
  {
    id: "chef",
    title: "Chef",
    description:
      "Prepares and cooks food in restaurants or other dining establishments.",
    skills: ["Culinary Skills", "Creativity", "Time Management"],
    education: "Culinary School or Apprenticeship",
    growth: ["Line Cook", "Chef de Partie", "Sous Chef", "Head Chef"],
    salaryRange: "$30,000 - $70,000",
    resources: [
      {
        title: "Culinary Arts Course",
        link: "https://www.coursera.org/learn/culinary-arts",
      },
    ],
  },
  {
    id: "environmental_scientist",
    title: "Environmental Scientist",
    description:
      "Studies the environment and develops solutions to environmental problems.",
    skills: ["Data Analysis", "Fieldwork", "Report Writing"],
    education: "Bachelor's in Environmental Science or related field",
    growth: [
      "Environmental Technician",
      "Environmental Scientist",
      "Senior Scientist",
      "Project Manager",
    ],
    salaryRange: "$50,000 - $90,000",
    resources: [
      {
        title: "Environmental Science Course",
        link: "https://www.coursera.org/learn/environmental-science",
      },
    ],
  },
  {
    id: "social_worker",
    title: "Social Worker",
    description:
      "Helps individuals and families cope with problems in their everyday lives.",
    skills: ["Communication", "Empathy", "Case Management"],
    education: "Bachelor's in Social Work (BSW)",
    growth: [
      "Case Worker",
      "Social Worker",
      "Senior Social Worker",
      "Program Director",
    ],
    salaryRange: "$40,000 - $75,000",
    resources: [
      {
        title: "Social Work Practice Course",
        link: "https://www.coursera.org/learn/social-work-practice",
      },
    ],
  },
  {
    id: "journalist",
    title: "Journalist",
    description:
      "Researches and writes news stories for various media outlets.",
    skills: ["Writing", "Investigation", "Communication"],
    education: "Bachelor's in Journalism or related field",
    growth: ["Reporter", "Journalist", "Senior Journalist", "Editor"],
    salaryRange: "$35,000 - $70,000",
    resources: [
      {
        title: "Journalism Skills Course",
        link: "https://www.coursera.org/learn/journalism-skills",
      },
    ],
  },
  {
    id: "physical_therapist",
    title: "Physical Therapist",
    description:
      "Helps patients improve movement and manage pain through therapy.",
    skills: ["Patient Care", "Communication", "Knowledge of Anatomy"],
    education: "Doctor of Physical Therapy (DPT)",
    growth: [
      "Physical Therapist",
      "Senior Physical Therapist",
      "Clinic Director",
      "Private Practice",
    ],
    salaryRange: "$70,000 - $110,000",
    resources: [
      {
        title: "Physical Therapy Course",
        link: "https://www.coursera.org/learn/physical-therapy",
      },
    ],
  },
  {
    id: "market_research_analyst",
    title: "Market Research Analyst",
    description:
      "Studies market conditions to examine potential sales of a product or service.",
    skills: ["Data Analysis", "Communication", "Critical Thinking"],
    education: "Bachelor's in Market Research or related field",
    growth: [
      "Research Assistant",
      "Market Research Analyst",
      "Senior Analyst",
      "Research Manager",
    ],
    salaryRange: "$50,000 - $90,000",
    resources: [
      {
        title: "Market Research Course",
        link: "https://www.coursera.org/learn/market-research",
      },
    ],
  },
  {
    id: "dental_hygienist",
    title: "Dental Hygienist",
    description:
      "Cleans teeth, examines patients for oral diseases, and provides preventive dental care.",
    skills: ["Attention to Detail", "Communication", "Dexterity"],
    education: "Associate's degree in Dental Hygiene",
    growth: [
      "Dental Hygienist",
      "Senior Dental Hygienist",
      "Dental Hygiene Educator",
      "Public Health Dental Hygienist",
    ],
    salaryRange: "$60,000 - $90,000",
    resources: [
      {
        title: "Dental Hygiene Course",
        link: "https://www.coursera.org/learn/dental-hygiene",
      },
    ],
  },
  {
    id: "urban_planner",
    title: "Urban Planner",
    description: "Develops plans and programs for the use of land.",
    skills: ["Analytical Skills", "Communication", "Design Software"],
    education: "Master's in Urban Planning or related field",
    growth: [
      "Planning Assistant",
      "Urban Planner",
      "Senior Planner",
      "Planning Director",
    ],
    salaryRange: "$55,000 - $95,000",
    resources: [
      {
        title: "Urban Planning Course",
        link: "https://www.coursera.org/learn/urban-planning",
      },
    ],
  },
  {
    id: "veterinarian",
    title: "Veterinarian",
    description: "Provides medical care to animals.",
    skills: ["Animal Handling", "Communication", "Medical Knowledge"],
    education: "Doctor of Veterinary Medicine (DVM)",
    growth: [
      "Associate Veterinarian",
      "Veterinarian",
      "Senior Veterinarian",
      "Practice Owner",
    ],
    salaryRange: "$70,000 - $120,000",
    resources: [
      {
        title: "Veterinary Medicine Course",
        link: "https://www.coursera.org/learn/veterinary-medicine",
      },
    ],
  },
  {
    id: "librarian",
    title: "Librarian",
    description: "Manages library resources and assists patrons with research.",
    skills: ["Organization", "Research", "Communication"],
    education: "Master's in Library Science (MLS)",
    growth: [
      "Library Assistant",
      "Librarian",
      "Senior Librarian",
      "Library Director",
    ],
    salaryRange: "$45,000 - $80,000",
    resources: [
      {
        title: "Library Science Course",
        link: "https://www.coursera.org/learn/library-science",
      },
    ],
  },
  {
    id: "interior_designer",
    title: "Interior Designer",
    description:
      "Designs interior spaces to improve functionality and aesthetic appeal.",
    skills: ["Creativity", "Space Planning", "Communication"],
    education: "Bachelor's in Interior Design or related field",
    growth: [
      "Junior Designer",
      "Interior Designer",
      "Senior Designer",
      "Design Director",
    ],
    salaryRange: "$45,000 - $85,000",
    resources: [
      {
        title: "Interior Design Course",
        link: "https://www.coursera.org/learn/interior-design",
      },
    ],
  },
  {
    id: "biomedical_engineer",
    title: "Biomedical Engineer",
    description:
      "Designs and develops medical devices and healthcare solutions.",
    skills: ["Problem Solving", "Biomedical Knowledge", "Engineering Skills"],
    education: "Bachelor's in Biomedical Engineering",
    growth: [
      "Junior Engineer",
      "Biomedical Engineer",
      "Senior Engineer",
      "Project Manager",
    ],
    salaryRange: "$60,000 - $110,000",
    resources: [
      {
        title: "Biomedical Engineering Course",
        link: "https://www.coursera.org/learn/biomedical-engineering",
      },
    ],
  },
  {
    id: "event_planner",
    title: "Event Planner",
    description: "Coordinates all aspects of professional and social events.",
    skills: ["Organization", "Communication", "Creativity"],
    education: "Bachelor's in Event Management or related field",
    growth: [
      "Event Coordinator",
      "Event Planner",
      "Senior Planner",
      "Director of Events",
    ],
    salaryRange: "$40,000 - $80,000",
    resources: [
      {
        title: "Event Planning Course",
        link: "https://www.coursera.org/learn/event-planning",
      },
    ],
  },
  {
    id: "dietitian",
    title: "Dietitian",
    description:
      "Provides expert advice on nutrition and diet to promote health.",
    skills: ["Communication", "Nutrition Knowledge", "Counseling"],
    education: "Bachelor's in Dietetics or related field",
    growth: [
      "Clinical Dietitian",
      "Senior Dietitian",
      "Nutrition Manager",
      "Director of Nutrition Services",
    ],
    salaryRange: "$50,000 - $85,000",
    resources: [
      {
        title: "Nutrition and Dietetics Course",
        link: "https://www.coursera.org/learn/nutrition-dietetics",
      },
    ],
  },
  {
    id: "aerospace_engineer",
    title: "Aerospace Engineer",
    description: "Designs and tests aircraft and spacecraft.",
    skills: ["Engineering Skills", "Problem Solving", "Aerodynamics"],
    education: "Bachelor's in Aerospace Engineering",
    growth: [
      "Junior Engineer",
      "Aerospace Engineer",
      "Senior Engineer",
      "Project Manager",
    ],
    salaryRange: "$70,000 - $130,000",
    resources: [
      {
        title: "Aerospace Engineering Course",
        link: "https://www.coursera.org/learn/aerospace-engineering",
      },
    ],
  },
  {
    id: "public_relations_specialist",
    title: "Public Relations Specialist",
    description:
      "Manages the public image and communications of organizations.",
    skills: ["Communication", "Media Relations", "Writing"],
    education: "Bachelor's in Public Relations or related field",
    growth: [
      "PR Assistant",
      "PR Specialist",
      "PR Manager",
      "Director of Communications",
    ],
    salaryRange: "$45,000 - $90,000",
    resources: [
      {
        title: "Public Relations Course",
        link: "https://www.coursera.org/learn/public-relations",
      },
    ],
  },
  {
    id: "occupational_therapist",
    title: "Occupational Therapist",
    description:
      "Helps patients develop, recover, and improve skills needed for daily living.",
    skills: ["Communication", "Patience", "Knowledge of Rehabilitation"],
    education: "Master's in Occupational Therapy",
    growth: [
      "Occupational Therapist",
      "Senior Therapist",
      "Clinic Director",
      "Private Practice",
    ],
    salaryRange: "$65,000 - $100,000",
    resources: [
      {
        title: "Occupational Therapy Course",
        link: "https://www.coursera.org/learn/occupational-therapy",
      },
    ],
  },
  {
    id: "geologist",
    title: "Geologist",
    description: "Studies the Earth's composition, structure, and processes.",
    skills: ["Fieldwork", "Data Analysis", "Report Writing"],
    education: "Bachelor's in Geology or related field",
    growth: [
      "Field Geologist",
      "Geologist",
      "Senior Geologist",
      "Project Manager",
    ],
    salaryRange: "$60,000 - $110,000",
    resources: [
      {
        title: "Geology Course",
        link: "https://www.coursera.org/learn/geology",
      },
    ],
  },
  {
    id: "translator",
    title: "Translator",
    description: "Converts written material from one language to another.",
    skills: ["Language Proficiency", "Cultural Knowledge", "Writing"],
    education: "Bachelor's in Languages or related field",
    growth: [
      "Junior Translator",
      "Translator",
      "Senior Translator",
      "Translation Project Manager",
    ],
    salaryRange: "$40,000 - $80,000",
    resources: [
      {
        title: "Translation Course",
        link: "https://www.coursera.org/learn/translation",
      },
    ],
  },
  {
    id: "fashion_designer",
    title: "Fashion Designer",
    description: "Creates original clothing, accessories, and footwear.",
    skills: ["Creativity", "Sewing", "Fashion Illustration"],
    education: "Bachelor's in Fashion Design or related field",
    growth: [
      "Assistant Designer",
      "Fashion Designer",
      "Senior Designer",
      "Creative Director",
    ],
    salaryRange: "$45,000 - $90,000",
    resources: [
      {
        title: "Fashion Design Course",
        link: "https://www.coursera.org/learn/fashion-design",
      },
    ],
  },
  {
    id: "astronomer",
    title: "Astronomer",
    description: "Studies celestial bodies and phenomena in the universe.",
    skills: ["Analytical Skills", "Mathematics", "Research"],
    education: "Ph.D. in Astronomy or related field",
    growth: [
      "Research Assistant",
      "Astronomer",
      "Senior Astronomer",
      "Research Director",
    ],
    salaryRange: "$70,000 - $130,000",
    resources: [
      {
        title: "Astronomy Course",
        link: "https://www.coursera.org/learn/astronomy",
      },
    ],
  },
  {
    id: "real_estate_agent",
    title: "Real Estate Agent",
    description: "Assists clients in buying, selling, and renting properties.",
    skills: ["Sales", "Communication", "Negotiation"],
    education: "Real Estate License",
    growth: ["Real Estate Agent", "Senior Agent", "Broker", "Agency Owner"],
    salaryRange: "$40,000 - $100,000+",
    resources: [
      {
        title: "Real Estate Course",
        link: "https://www.coursera.org/learn/real-estate",
      },
    ],
  },
];

// Fetch careers data
async function loadCareers() {
  try {
    //const res = await fetch(DATA_URL);
    //careers = await res.json();
    renderCareers(careers);
  } catch (err) {
    careerCards.innerHTML = "<p>Error loading career paths.</p>";
    console.error(err);
  }
}

// Render career cards
function renderCareers(list) {
  careerCards.innerHTML = "";
  if (!list.length) {
    careerCards.innerHTML = "<p>No careers found.</p>";
    return;
  }
  list.forEach((career) => {
    const card = document.createElement("div");
    card.className = "career-card";
    card.innerHTML = `
      <h3 class="title-in">${career.title}</h3>
      <p>${career.description}</p>
      <button class="btn view-btn" data-id="${career.id}">View Details</button>
    `;
    careerCards.appendChild(card);
  });
}

// Search/filter
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = careers.filter(
    (c) =>
      c.title.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query)
  );
  renderCareers(filtered);
});

// Modal for details
careerCards.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-btn")) {
    const id = e.target.dataset.id;
    const career = careers.find((c) => c.id === id);
    if (career) showModal(career);
  }
});

function showModal(career) {
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <h2 class="title-in">${career.title}</h2>
      <p>${career.description}</p>
      <p><strong>Required Skills:</strong> ${career.skills.join(", ")}</p>
      <p><strong>Education:</strong> ${career.education}</p>
      <p><strong>Growth Path:</strong> ${career.growth.join(" → ")}</p>
      <p><strong>Salary Range:</strong> ${career.salaryRange}</p>
      <div><strong>Resources:</strong>
        <ul>
          ${career.resources
            .map(
              (r) =>
                `<li><a class="link-in" href="${r.link}" target="_blank">${r.title}</a></li>`
            )
            .join("")}
        </ul>
      </div>
    </div>
  `;
  modal.classList.remove("hidden");
  modal.querySelector(".close-btn").onclick = () =>
    modal.classList.add("hidden");
  modal.onclick = (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  };
}

loadCareers();
