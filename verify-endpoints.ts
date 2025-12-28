
async function verify() {
    try {
        const response = await fetch("http://localhost:5000/api/ai/idea-generator", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                businessType: "Coffee Shop",
                problem: "Need more customers in afternoon"
            })
        });

        if (!response.ok) {
            console.error("Status:", response.status, response.statusText);
            const text = await response.text();
            console.error("Body:", text);
            return;
        }

        const data = await response.json();
        console.log("SUCCESS:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Fetch Error:", err);
    }
}

verify();
