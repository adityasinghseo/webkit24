async function verify() {
    try {
        const res = await fetch("http://localhost:5000/api/ai/growth-plan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                businessCategory: "Doctor / Clinic",
                city: "New York",
                budget: "growth",
                goal: "leads",
                websiteStatus: "No Website",
                targetAudience: "Patients",
                competitors: "None",
                usp: "Emergency Support"
            })
        });

        if (!res.ok) {
            console.error("Status:", res.status, res.statusText);
            const text = await res.text();
            console.error("Body:", text);
            return;
        }

        const data = await res.json();
        console.log("SUCCESS:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Fetch Error:", err);
    }
}

verify();
