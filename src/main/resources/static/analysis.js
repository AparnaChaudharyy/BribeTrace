async function loadTotalReports() {
    const totalElement = document.getElementById("totalReports");

    try {
        const response = await fetch("/api/reports/stats");

        if (!response.ok) {
            throw new Error("Unable to load report statistics");
        }

        const data = await response.json();
        totalElement.textContent = data.totalReports;

    } catch (error) {
        totalElement.textContent = "Unavailable";
        console.error(error);
    }
}

async function loadAnalysis(url, elementId) {
    const container = document.getElementById(elementId);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to load analysis data");
        }

        const data = await response.json();

        container.replaceChildren();

        if (data.length === 0) {
            container.textContent = "No reports available yet.";
            container.className = "message";
            return;
        }

        const list = document.createElement("ul");

        data.forEach(function (item) {
            const listItem = document.createElement("li");
            const label = document.createElement("span");
            const count = document.createElement("span");

            label.textContent = item.label || "Not specified";
            count.textContent = item.count;

            listItem.appendChild(label);
            listItem.appendChild(count);
            list.appendChild(listItem);
        });

        container.appendChild(list);
        container.className = "";

    } catch (error) {
        container.textContent = "Unable to load data. Please refresh the page.";
        container.className = "message error";
        console.error(error);
    }
}

loadTotalReports();

loadAnalysis("/api/reports/by-sector", "sectorResults");
loadAnalysis("/api/reports/by-location", "locationResults");
loadAnalysis("/api/reports/by-type", "typeResults");
