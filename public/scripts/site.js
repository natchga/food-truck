(async () => {
    const pathname = window.location.pathname

    const menuContainer = document.querySelector(".menu")
    if (menuContainer) {
        try {
            const res = await fetch("/api/v1/menu")
            const items = await res.json()

            menuContainer.innerHTML = items.map(item => `
                <div class="menu-card">
                    <img src="${item.Image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.Description}</p>
                    <p>${item.Price}</p>
                </div>
            `).join("")
        } catch (err) {
            console.error("MENU LOAD ERROR:", err)
        }
    }

    
if (pathname === "/" || pathname === "/events") {
    const eventsContainer = document.querySelector(".events")
    if (!eventsContainer) return

    const res = await fetch("/api/v1/events")
    const events = await res.json()

    eventsContainer.innerHTML = events.map(ev => `
        <div class="event-card" onclick="window.location.href='/event/${ev._id}'">
            <div class="event-date">${ev.Date}</div>
            <h3 class="event-title">${ev.name}</h3>
        </div>
    `).join("")
    return
}


if (pathname.startsWith("/event/")) {
    const id = pathname.split("/")[2];
    const eventsContainer = document.querySelector(".events")

    const res = await fetch(`/api/v1/events/${id}`)
    const ev = await res.json()

    eventsContainer.innerHTML = `
        <div class="event-card large">
            <div class="event-date">${ev.Date}</div>
            <h3 class="event-title">${ev.name}</h3>
            <h3 class="event-time">${ev.Time}</h3>
            <p class="event-location">${ev.Location}</p>
            <p class="event-desc">${ev.Description || ""}</p>

            <button class="back-btn" onclick="window.location.href='/events'">
                ⬅ Back to events
            </button>
        </div>
    `
}

if (pathname === "/admin") {

    // admin panel event item add
    const eventForm = document.getElementById("eventForm")
    if (eventForm) {
        eventForm.addEventListener("submit", async (e) => {
            e.preventDefault()

            const formData = new FormData(eventForm)
            const payload = Object.fromEntries(formData.entries())
            console.log("Payload being sent:", payload)// test if it's actually going through


            try {
                const res = await fetch("/api/v1/events", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                })

                const data = await res.json()
                if (!res.ok) throw new Error(data.message || "Event could not be added")

                alert("Event added successfully")
                eventForm.reset()
            } catch (err) {
                console.error("EVENT ERROR:", err)
                alert("Error adding event: " + err.message)
            }
        })
    }

    //admin panel menu item add
    const menuForm = document.getElementById("menuForm")
    if (menuForm) {
        menuForm.addEventListener("submit", async (e) => {
            e.preventDefault()

            const formData = new FormData(menuForm)
            const payload = Object.fromEntries(formData.entries())
            console.log("Payload being sent:", payload)// test if it's actually going through


            try {
                const res = await fetch("/api/v1/menu", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                })

                const data = await res.json()
                if (!res.ok) throw new Error(data.message || "Menu item could not be added")

                alert("Menu item added")
                menuForm.reset()
            } catch (err) {
                console.error("MENU ERROR:", err)
                alert("Error adding menu item: " + err.message)
            }
        })
    }
}



})()
