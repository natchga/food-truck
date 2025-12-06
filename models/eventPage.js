async function loadEventDetails() {
    const container = document.getElementById("event-details");
    if (!container) return;

    // URL is /event/123 → split to get "123"
    const id = window.location.pathname.split("/")[2];

    if (!id) {
        container.innerHTML = "<p>No event ID provided.</p>";
        return;
    }

    try {
        console.log("EVENT PAGE ID:", id);

        const res = await fetch(`/api/v1/events/${id}`);
        const ev = await res.json();

        if (ev.error) {
            container.innerHTML = `<p>${ev.error}</p>`;
            return;
        }

        container.innerHTML = `
            <div class="event-card large">
                <div class="event-date">${ev.Date}</div>
                <h3 class="event-title">${ev.name}</h3>
                <h3 class="event-time">${ev.Time}</h3>
                <p class="event-location">${ev.Location}</p>
                <p class="event-desc">${ev.Description || ""}</p>

                <button class="back-btn" onclick="window.location.href='/event'">⬅ Back to events</button>
            </div>
        `;
    } catch (err) {
        console.error("EVENT LOAD ERROR", err);
        container.innerHTML = "<p>Error loading event.</p>";
    }
}

document.addEventListener("DOMContentLoaded", loadEventDetails);
