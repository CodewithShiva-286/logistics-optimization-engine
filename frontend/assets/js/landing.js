const roleSelect = document.getElementById("role");
const continueBtn = document.getElementById("continueBtn");
const ctaBottom = document.getElementById("ctaBottom");
const revealItems = document.querySelectorAll(".reveal");
const parallaxTargets = document.querySelectorAll(".parallax-layer");
const particleLayer = document.getElementById("particle-layer");
const liquidButtons = document.querySelectorAll(".liquid-btn");

const goToRole = () => {
  const role = roleSelect ? roleSelect.value : "";

  if (role === "user") {
    window.location.href = "./user/dashboard.html";
    return;
  }

  if (role === "driver") {
    window.location.href = "./driver/dashboard.html";
    return;
  }

  alert("Please choose a role to continue.");
};

if (continueBtn) {
  continueBtn.addEventListener("click", goToRole);
}

if (ctaBottom) {
  ctaBottom.addEventListener("click", () => {
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));

const applyParallax = () => {
  const scrollY = window.scrollY;
  parallaxTargets.forEach((target) => {
    const depth = Number(target.getAttribute("data-depth") || 0.03);
    target.style.transform = `translate3d(0, ${scrollY * depth}px, 0)`;
  });
};

const applyNavGlassShift = () => {
  const nav = document.querySelector(".top-nav");
  if (!nav) {
    return;
  }

  if (window.scrollY > 10) {
    nav.style.background = "rgba(255,255,255,0.11)";
    nav.style.borderColor = "rgba(255,255,255,0.28)";
  } else {
    nav.style.background = "";
    nav.style.borderColor = "";
  }
};

const onScroll = () => {
  applyParallax();
  applyNavGlassShift();
};

window.addEventListener("scroll", onScroll, { passive: true });
applyParallax();

const createParticle = () => {
  if (!particleLayer) {
    return;
  }

  const particle = document.createElement("span");
  particle.className = "particle";
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.bottom = "-12px";
  particle.style.animationDuration = `${6 + Math.random() * 8}s`;
  particle.style.opacity = `${0.25 + Math.random() * 0.75}`;
  particle.style.background =
    Math.random() > 0.5 ? "rgba(49, 182, 255, 0.72)" : "rgba(255, 138, 31, 0.72)";

  particleLayer.appendChild(particle);

  window.setTimeout(() => {
    particle.remove();
  }, 14000);
};

for (let i = 0; i < 18; i += 1) {
  window.setTimeout(createParticle, i * 130);
}

window.setInterval(createParticle, 350);

liquidButtons.forEach((button) => {
  button.addEventListener("pointermove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    button.style.setProperty("--x", `${x}%`);
    button.style.setProperty("--y", `${y}%`);
  });
});
