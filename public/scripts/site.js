(async () => {
    const pathname = window.location.pathname;

    // -----------------------------
    // LOAD MENU (only where .menu exists)
    // -----------------------------
    const menuContainer = document.querySelector(".menu");
    if (menuContainer) {
        try {
            const res = await fetch("/api/v1/menu");
            const items = await res.json();

            menuContainer.innerHTML = items.map(item => `
                <div class="menu-card">
                    <img src="${item.Image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.Description}</p>
                    <p>$${item.Price.replace("$","")}</p>
                </div>
            `).join("");
        } catch (err) {
            console.error("MENU LOAD ERROR:", err);
        }
    }

    // -----------------------------------------------------
    // ROUTE: Homepage (/) OR Events listing (/event or /events)
    // -----------------------------------------------------
    if (pathname === "/" || pathname === "/event" || pathname === "/events") {
        const eventsContainer = document.querySelector(".events");
        if (!eventsContainer) return;

        try {
            const res = await fetch("/api/v1/events");
            const events = await res.json();

            eventsContainer.innerHTML = events.map(ev => `
                <div class="event-card" onclick="window.location.href='/event/${ev._id}'">
                    <div class="event-date">${ev.Date}</div>
                    <h3 class="event-title">${ev.name}</h3>
                </div>
            `).join("");
        } catch (err) {
            console.error("EVENT LIST ERROR:", err);
        }
        return; 
    }

    // -----------------------------------------------------
    // ROUTE: Single Event Page (/event/:id)
    // -----------------------------------------------------
    if (pathname.startsWith("/event/")) {
        const parts = pathname.split("/");
        const id = parts[2];

        const eventsContainer = document.querySelector(".events");
        if (!eventsContainer) return;

        try {
            const res = await fetch(`/api/v1/events/${id}`);
            const ev = await res.json();

            eventsContainer.innerHTML = `
                <div class="event-card large">
                    <div class="event-date">${ev.Date}</div>
                    <h3 class="event-title">${ev.name}</h3>
                    <h3 class="event-time">${ev.Time}</h3>
                    <p class="event-location">${ev.Location}</p>
                    <p class="event-desc">${ev.Description || ""}</p>

                    <button class="back-btn" onclick="window.location.href='/event'">
                        ⬅ Back to events
                    </button>
                </div>
            `;
        } catch (err) {
            console.error("SINGLE EVENT ERROR:", err);
        }
    }

})();
