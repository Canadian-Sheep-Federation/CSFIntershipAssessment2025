export function renderGrid(data, containerId = "sheep-grid") {
  console.log("Rendering sheep grid with data:", data);
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const headers = [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "breed", label: "Breed" },
    { key: "weightKg", label: "Weight (kg)" },
    { key: "gender", label: "Gender" },
    { key: "location", label: "Location" },
  ];

  let sortConfig = { key: null, direction: 1 };

  function sortAndRender() {
    const sortedData = [...data].sort((a, b) => {
      const k = sortConfig.key === "location" ? "latitude" : sortConfig.key;
      if (a[k] < b[k]) return -1 * sortConfig.direction;
      if (a[k] > b[k]) return 1 * sortConfig.direction;
      return 0;
    });
    buildTable(sortedData);
  }

  function buildTable(dataset) {
    container.innerHTML = "";
    const table = document.createElement("table");
    table.className =
      "w-full mx-auto border-collapse shadow-md rounded-xl overflow-hidden";

    const thead = document.createElement("thead");
    thead.className = "bg-gray-300";

    const headRow = document.createElement("tr");

    headers.forEach(({ key, label }) => {
      const th = document.createElement("th");
      // Determine if this column is currently sorted
      const isSorted = sortConfig.key === (key === "location" ? "latitude" : key);
      // Choose arrow: ▲ for ascending, ▼ for descending, or both if not sorted
      let arrow = "";
      if (isSorted) {
        arrow = sortConfig.direction === 1 ? "▲" : "▼";
      } else {
        arrow = "▲▼";
      }

      // Use a flex container to separate label and arrow
      th.innerHTML = `
        <span class="flex flex-row items-center justify-between w-full">
          <span>${label}</span>
          <span class="ml-2 text-xs">${arrow}</span>
        </span>
      `;
      th.className =
        "px-6 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:text-black";
      th.onclick = () => {
        sortConfig.key = key === "location" ? "latitude" : key;
        sortConfig.direction *= -1;
        sortAndRender();
      };
      headRow.appendChild(th);
    });

    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    dataset.forEach((sheep, index) => {
      const row = document.createElement("tr");
      row.className = index % 2 === 0 ? "bg-white" : "bg-gray-50";
      row.classList.add("hover:bg-gray-100");

      const cells = [
        sheep.name,
        sheep.age,
        sheep.breed,
        sheep.weightKg,
        sheep.gender,
        sheep.location,
      ];

      cells.forEach((text) => {
        const td = document.createElement("td");
        td.textContent = text;
        td.className = "px-6 py-4 text-sm text-gray-800";
        row.appendChild(td);
      });

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
  }

  sortAndRender(); // Initial render
}
