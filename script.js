// ===== MENU =====
const menuOverlay = document.getElementById("menuOverlay");

function toggleMenu() {
    if (menuOverlay) {
        menuOverlay.classList.toggle("active");
    }
}

// CLOSE MENU WHEN CLICKING LINK
document.querySelectorAll(".menu-overlay a").forEach(link => {
    link.addEventListener("click", () => {
        if (menuOverlay) {
            menuOverlay.classList.remove("active");
        }
    });
});

// ===== PAGE TRANSITION =====
window.addEventListener("load", () => {
    const transition = document.querySelector(".page-transition");

    if (transition) {
        setTimeout(() => {
            transition.style.height = "0%";
        }, 1000);
    }
});

// ===== BOOKING =====
function openBooking() {
    const modal = document.getElementById("bookingModal");
    if (modal) modal.style.display = "flex";
}

function closeBooking() {
    const modal = document.getElementById("bookingModal");
    if (modal) modal.style.display = "none";
}

// ===== SAVE + WHATSAPP =====
function sendBooking() {

    const name = document.getElementById("name");
    const pickup = document.getElementById("pickup");
    const dropoff = document.getElementById("dropoff");
    const date = document.getElementById("date");
    const car = document.getElementById("car");

    if (!name || !pickup || !dropoff || !date || !car) {
        alert("Missing fields");
        return;
    }

    let data = {
        name: name.value,
        pickup: pickup.value,
        dropoff: dropoff.value,
        date: date.value,
        car: car.value
    };

    let leads = JSON.parse(localStorage.getItem("leads")) || [];
    leads.push(data);
    localStorage.setItem("leads", JSON.stringify(leads));

    let message = `Luxury Booking:
Name: ${data.name}
Pickup: ${data.pickup}
Drop-off: ${data.dropoff}
Date: ${data.date}
Car: ${data.car}`;

    let phone = "27796220357";

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);

    alert("Booking Sent!");
}

// ===== 3D CARD EFFECT =====
const cards = document.querySelectorAll(".car");

if (cards.length > 0) {
    cards.forEach(card => {

        card.addEventListener("mousemove", e => {
            let x = (e.offsetX / card.offsetWidth - 0.5) * 15;
            let y = (e.offsetY / card.offsetHeight - 0.5) * -15;

            card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "rotate(0)";
        });

    });
}

// ===== FADE-IN ON SCROLL =====
const faders = document.querySelectorAll(".fade-in");

if (faders.length > 0) {
    window.addEventListener("scroll", () => {
        faders.forEach(el => {
            let position = el.getBoundingClientRect().top;
            let screenHeight = window.innerHeight;

            if (position < screenHeight - 100) {
                el.classList.add("show");
            }
        });
    });
}

// ===== FLEET DATA =====
const fleet = [
    {
        name: "Mercedes-Benz V-Class",
        desc: "Spacious elegance for groups. Ideal for family transfers and corporate delegations.",
        passengers: "7",
        luggage: "6",
        wifi: "Free",
        img: "car2.png"
    },
    {
        name: "Mercedes-Benz S-Class",
        desc: "Ultimate luxury sedan for VIP comfort and executive travel.",
        passengers: "4",
        luggage: "3",
        wifi: "Premium",
        img: "car1.jpg"
    },
    {
        name: "Mercedes-Benz C-Class",
        desc: "Perfect balance of luxury and efficiency for business travel.",
        passengers: "4",
        luggage: "2",
        wifi: "Free",
        img: "car3.jpg"
    }
];

let index = 0;

// ===== UPDATE UI =====
function updateFleet() {

    const title = document.getElementById("carTitle");
    const desc = document.getElementById("carDesc");
    const passengers = document.getElementById("passengers");
    const luggage = document.getElementById("luggage");
    const wifi = document.getElementById("wifi");
    const img = document.getElementById("carImage");
    const current = document.getElementById("current");
    const total = document.getElementById("total");

    if (!title || !desc || !passengers || !luggage || !wifi || !img || !current || !total) return;

    title.innerText = fleet[index].name;
    desc.innerText = fleet[index].desc;
    passengers.innerText = fleet[index].passengers;
    luggage.innerText = fleet[index].luggage;
    wifi.innerText = fleet[index].wifi;

    img.style.opacity = 0;

    setTimeout(() => {
        img.src = fleet[index].img;
        img.style.opacity = 1;
    }, 200);

    current.innerText = String(index + 1).padStart(2, '0');
    total.innerText = String(fleet.length).padStart(2, '0');
}

// ===== CONTROLS =====
function nextCar() {
    index = (index + 1) % fleet.length;
    updateFleet();
}

function prevCar() {
    index = (index - 1 + fleet.length) % fleet.length;
    updateFleet();
}

// INIT FLEET ONLY IF EXISTS
if (document.getElementById("carTitle")) {
    updateFleet();
    setInterval(nextCar, 5000);
}

// ===== MULTI IMAGE SLIDERS =====
document.querySelectorAll(".slider").forEach(slider => {

    let img = slider.querySelector("img");
    let car = slider.dataset.car;
    let index = 0;

    let images = {
        "V-Class": ["vclass1.jpg","vclass2.jpg","vclass3.jpg"],
        "S-Class": ["sclass1.jpg","sclass2.jpg","sclass3.jpg"],
        "E-Class": ["eclass1.jpg","eclass2.jpg","eclass3.jpg"],
        "C-Class": ["cclass1.jpg","cclass2.jpg","cclass3.jpg"]
    }[car];

    if (!images || !img) return;

    function changeImage(newIndex){
        img.style.opacity = 0;

        setTimeout(() => {
            img.src = images[newIndex];
            img.style.opacity = 1;
        }, 300);
    }

    const nextBtn = slider.querySelector(".next");
    const prevBtn = slider.querySelector(".prev");

    if (nextBtn) {
        nextBtn.onclick = () => {
            index = (index + 1) % images.length;
            changeImage(index);
        };
    }

    if (prevBtn) {
        prevBtn.onclick = () => {
            index = (index - 1 + images.length) % images.length;
            changeImage(index);
        };
    }

    setInterval(() => {
        index = (index + 1) % images.length;
        changeImage(index);
    }, 5000);
});

// ===== PILOTS ANIMATION =====
const section = document.querySelector('.pilots-section');

if (section) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.3 });

    observer.observe(section);
}
