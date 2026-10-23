/*

* GREENFIELD SCHOOL WEBSITE
* IMPORTANT:
* Replace the sample WhatsApp number and email address below
* with the school’s real contact details.
* WhatsApp format:
* Nigerian country code 234 + phone number without the first zero.
* Example format: 2348012345678
    */

const SCHOOL_WHATSAPP_NUMBER = “2348000000000”;
const SCHOOL_ADMISSIONS_EMAIL = “admissions@example.com”;

/* =====================================
HOMEPAGE PHOTO SLIDESHOW
===================================== */

const schoolSlides = [
{
image: “https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=85”,
caption: “Learning Together”,
alt: “Students learning in a classroom”
},
{
image: “https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=85”,
caption: “A Supportive Learning Environment”,
alt: “A classroom learning environment”
},
{
image: “https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1400&q=85”,
caption: “Inspiring Young Minds”,
alt: “Students participating in learning”
},
{
image: “https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=85”,
caption: “Discovering New Ideas”,
alt: “Classroom activities”
},
{
image: “https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1400&q=85”,
caption: “Teamwork and Friendship”,
alt: “Students working together”
},
{
image: “https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1400&q=85”,
caption: “Growing Through Discovery”,
alt: “Children participating in an activity”
},
{
image: “https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1400&q=85”,
caption: “Building Strong Foundations”,
alt: “Children engaged in classroom learning”
},
{
image: “https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1400&q=85”,
caption: “Reading and Imagination”,
alt: “A student reading”
},
{
image: “https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1400&q=85”,
caption: “Learning to Work Together”,
alt: “Students collaborating”
},
{
image: “https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=85”,
caption: “Preparing for Tomorrow”,
alt: “Students in a learning environment”
}
];

let currentSlide = 0;
let slideTimer;

function showSlide(index) {
const image = document.getElementById(“slideImage”);
const caption = document.getElementById(“slideCaption”);
const dotsContainer = document.getElementById(“slideDots”);

// Do nothing on pages without the homepage slideshow.
if (!image || !caption || !dotsContainer) {
    return;
}
currentSlide = (index + schoolSlides.length) % schoolSlides.length;
const slide = schoolSlides[currentSlide];
image.style.opacity = "0";
window.setTimeout(() => {
    image.src = slide.image;
    image.alt = slide.alt;
    caption.textContent = slide.caption;
    image.style.opacity = "1";
}, 150);
const dots = dotsContainer.querySelectorAll(".slide-dot");
dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentSlide);
    dot.setAttribute("aria-pressed", dotIndex === currentSlide ? "true" : "false");
});

}

function changeSlide(direction) {
showSlide(currentSlide + direction);
restartSlideTimer();
}

function goToSlide(index) {
showSlide(index);
restartSlideTimer();
}

function buildSlideDots() {
const dotsContainer = document.getElementById(“slideDots”);

if (!dotsContainer) {
    return;
}
dotsContainer.innerHTML = "";
schoolSlides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slide-dot";
    dot.setAttribute("aria-label", "Show photo " + (index + 1));
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

}

function restartSlideTimer() {
window.clearInterval(slideTimer);

slideTimer = window.setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

}

function initialiseSlideshow() {
if (!document.getElementById(“slideImage”)) {
return;
}

buildSlideDots();
showSlide(0);
restartSlideTimer();

}

/* =====================================
ADMISSION FORM
===================================== */

function getAdmissionDetails() {
const parentName = document.getElementById(“parentName”);
const phone = document.getElementById(“phone”);
const childName = document.getElementById(“childName”);
const entryClass = document.getElementById(“entryClass”);
const description = document.getElementById(“entryDescription”);
const formMessage = document.getElementById(“formMessage”);
const form = document.getElementById(“admissionForm”);

if (!form || !form.checkValidity()) {
    if (form) {
        form.reportValidity();
    }
    return null;
}
const details = {
    parentName: parentName.value.trim(),
    phone: phone.value.trim(),
    childName: childName.value.trim() || "Not provided",
    entryClass: entryClass.value,
    description: description.value.trim()
};
if (formMessage) {
    formMessage.textContent = "";
}
return details;

}

function createAdmissionMessage(details) {
return [
“GREENFIELD SCHOOL - ADMISSION ENQUIRY”,
“”,
“Parent/Guardian Name: “ + details.parentName,
“Phone Number: “ + details.phone,
“Child’s Name: “ + details.childName,
“Class of Interest: “ + details.entryClass,
“”,
“Enquiry Details:”,
details.description,
“”,
“Please contact me regarding admission.”
].join(”\n”);
}

function sendAdmissionWhatsApp() {
const details = getAdmissionDetails();

if (!details) {
    return;
}
if (
    !SCHOOL_WHATSAPP_NUMBER ||
    SCHOOL_WHATSAPP_NUMBER === "2348000000000"
) {
    alert(
        "Please add the school's real WhatsApp number in script.js before using this feature."
    );
    return;
}
const message = createAdmissionMessage(details);
const whatsappURL =
    "https://wa.me/" +
    SCHOOL_WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);
window.open(whatsappURL, "_blank", "noopener,noreferrer");

}

function sendAdmissionEmail() {
const details = getAdmissionDetails();

if (!details) {
    return;
}
if (
    !SCHOOL_ADMISSIONS_EMAIL ||
    SCHOOL_ADMISSIONS_EMAIL === "admissions@example.com"
) {
    alert(
        "Please add the school's real admissions email address in script.js before using this feature."
    );
    return;
}
const subject = "Admission Enquiry - " + details.entryClass;
const body = createAdmissionMessage(details);
const emailURL =
    "mailto:" +
    SCHOOL_ADMISSIONS_EMAIL +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);
window.location.href = emailURL;

}

/* =====================================
INITIALISE WEBSITE
===================================== */

document.addEventListener(“DOMContentLoaded”, () => {
// Display the current year in all footers.
const yearElements = document.querySelectorAll(”#year”);

yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
});
// Start the homepage slideshow if present.
initialiseSlideshow();
// Connect admission form buttons if present.
const whatsappButton = document.getElementById("whatsappButton");
const emailButton = document.getElementById("emailButton");
if (whatsappButton) {
    whatsappButton.addEventListener("click", sendAdmissionWhatsApp);
}
if (emailButton) {
    emailButton.addEventListener("click", sendAdmissionEmail);
}

});