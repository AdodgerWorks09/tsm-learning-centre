const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#mainNav");

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll("#mainNav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const form = document.querySelector("#enquiryForm");
const status = document.querySelector("#formStatus");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`TSM Learning Centre Admission Enquiry - ${data.get("level")}`);
  const body = encodeURIComponent(
`Parent/Carer Name: ${data.get("name")}
Phone: ${data.get("phone")}
Email: ${data.get("email") || "Not provided"}
Child's Age / Level: ${data.get("level")}

Message:
${data.get("message") || "No additional message."}`
  );

  window.location.href =
    `mailto:admissions@tsmlearningcentre.edu.gh?subject=${subject}&body=${body}`;

  status.textContent = "Your email app should open with the enquiry prepared.";
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".section, .approach-grid article, .programme, .fee-table-wrap, .enquiry-form").forEach(el => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});
