/* ================================
   Smooth scroll buttons
================================ */

document.querySelectorAll("[data-scroll]").forEach(button => {
    button.addEventListener("click", () => {
        const target = document.getElementById(button.dataset.scroll);

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


/* ================================
   Reveal animation
================================ */

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});


/* ================================
   Wedding countdown
================================ */

const weddingDate =
    new Date("2026-10-29T19:40:00+05:30").getTime();

function updateCountdown() {

    const remaining = Math.max(
        0,
        weddingDate - Date.now()
    );

    document.getElementById("days").textContent =
        String(
            Math.floor(remaining / 86400000)
        ).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(
            Math.floor(remaining / 3600000) % 24
        ).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(
            Math.floor(remaining / 60000) % 60
        ).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(
            Math.floor(remaining / 1000) % 60
        ).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);


/* ================================
   Background Music
================================ */

const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const scrollCue = document.getElementById("scrollCue");

bgMusic.volume = 0.45;


/* ================================
   Open Invitation
================================ */

const openInvitationButton =
    document.getElementById("openInvitation");

const lockedSections =
    document.querySelectorAll(".locked-section");


openInvitationButton.addEventListener("click", async () => {

    /* Reveal all remaining screens */

    lockedSections.forEach(section => {
        section.classList.remove("locked-section");
    });

    /* Show music button */

    musicToggle.classList.remove("hidden");


    /* Start music */

    try {

        await bgMusic.play();

        musicToggle.textContent = "♪ Music On";
        musicToggle.setAttribute(
            "aria-label",
            "Turn music off"
        );

    } catch (error) {

        /*
           Browser may still refuse playback.
           The music button remains available
           so the visitor can start it manually.
        */

        musicToggle.textContent = "♪ Music On";
        musicToggle.setAttribute(
            "aria-label",
            "Turn music on"
        );
    }


    /* Move to The Couple */

    document.getElementById("top")?.scrollIntoView({
        behavior: "smooth"
    });

}, { once: true });


/* ================================
   Music On / Off button
================================ */

musicToggle.addEventListener("click", async () => {

    if (bgMusic.paused) {

        try {

            await bgMusic.play();

            musicToggle.textContent = "♪ Music On";
            musicToggle.setAttribute(
                "aria-label",
                "Turn music off"
            );

        } catch (error) {

            console.log(
                "Unable to start music:",
                error
            );
        }

    } else {

        bgMusic.pause();

        musicToggle.textContent = "♪ Music Off";
        musicToggle.setAttribute(
            "aria-label",
            "Turn music on"
        );
    }
});

