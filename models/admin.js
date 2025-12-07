document.getElementById("menuForm").addEventListener("submit", async (e) => {
    e.preventDefault()

    const body = JSON.stringify(Object.fromEntries(new FormData(e.target)))

    const res = await fetch("/api/v1/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body
    })

    const data = await res.json()
    alert(data.message || "Item added!")
    e.target.reset()
})


document.getElementById("eventForm").addEventListener("submit", async (e) => {
    e.preventDefault()

    const body = JSON.stringify(Object.fromEntries(new FormData(e.target)))

    const res = await fetch("/api/v1/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body
    })

    const data = await res.json()
    alert(data.message || "Event added!")
    e.target.reset()
})