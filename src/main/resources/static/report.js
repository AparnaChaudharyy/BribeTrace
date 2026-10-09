document.getElementById("reportForm").addEventListener("submit", async function (event) {

    event.preventDefault();

    const report = {
        sector: document.getElementById("sector").value,
        bribeType: document.getElementById("bribeType").value,
        location: document.getElementById("location").value,
        amount: document.getElementById("amount").value,
        incidentDate: document.getElementById("incidentDate").value,
        description: document.getElementById("description").value,
        anonymous: document.getElementById("anonymous").checked
    };

    try {
        const response = await fetch("/api/reports", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(report)
        });

        if (response.ok) {
            alert("Report submitted successfully!");
            document.getElementById("reportForm").reset();
        } else {
            alert("Failed to submit report.");
        }

    } catch (error) {
        console.error(error);
        alert("Something went wrong. Please try again.");
    }
});