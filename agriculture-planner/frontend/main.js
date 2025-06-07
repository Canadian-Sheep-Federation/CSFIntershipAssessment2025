document.addEventListener("DOMContentLoaded", () => {
  // 1. DOM ELEMENT REFERENCES
  const cityInput            = document.getElementById("city-input");
  const fetchWeatherBtn      = document.getElementById("fetch-weather-btn");
  const weatherInfoDiv       = document.getElementById("weather-info");

  const planFormSection      = document.getElementById("plan-form-section");
  const planForm             = document.getElementById("plan-form");
  const planCropInput        = document.getElementById("plan-crop");
  const planCityInput        = document.getElementById("plan-city");
  const planActivitySelect   = document.getElementById("plan-activity");
  const planAreaInput        = document.getElementById("plan-area");
  const planExpectedYieldInput = document.getElementById("plan-expected-yield");
  const planSeedTypeInput    = document.getElementById("plan-seed-type");
  const planNotesInput       = document.getElementById("plan-notes");
  const planWeatherInput     = document.getElementById("plan-weather");
  const planResponseDiv      = document.getElementById("plan-response");

  const refreshPlansBtn      = document.getElementById("refresh-plans-btn");
  const plansTableBody       = document.querySelector("#plans-table tbody");

  // For “click on a row to show details” feature:
  const planDetailsCard      = document.getElementById("plan-details-card");
  const detailId             = document.getElementById("detail-id");
  const detailCrop           = document.getElementById("detail-crop");
  const detailCity           = document.getElementById("detail-city");
  const detailActivity       = document.getElementById("detail-activity");
  const detailArea           = document.getElementById("detail-area");
  const detailExpectedYield  = document.getElementById("detail-expected-yield");
  const detailSeedType       = document.getElementById("detail-seed-type");
  const detailNotes          = document.getElementById("detail-notes");
  const detailWeatherTemp    = document.getElementById("detail-weather-temp");
  const detailWeatherHumidity= document.getElementById("detail-weather-humidity");
  const detailWeatherWind    = document.getElementById("detail-weather-wind");
  const detailWeatherVisibility = document.getElementById("detail-weather-visibility");
  const detailWeatherPrecip  = document.getElementById("detail-weather-precip");
  const detailWeatherDesc    = document.getElementById("detail-weather-desc");
  const detailCreatedAt      = document.getElementById("detail-createdAt");

  // City Filter & Average Weather Report
  const cityFilterSelect         = document.getElementById("city-filter");
  const averageWeatherReportDiv  = document.getElementById("average-weather-report");
  const cityReportUnavailableDiv = document.getElementById("city-report-unavailable");

  // Monthly Average Temperature Chart
  const monthlyChartContainer    = document.getElementById("monthly-chart-container");
  const monthlyChartCanvas       = document.getElementById("monthly-chart");
  let monthlyChart               = null;

  const BASE_URL = window.location.origin; // http://localhost:3000

  // 2. FETCH CURRENT WEATHER VIA OUR BACKEND (/weather)
  async function fetchWeather(city) {
    const encodedCity = encodeURIComponent(city.trim());
    const url = `${BASE_URL}/weather?city=${encodedCity}`;
    console.log("Requesting weather from:", url);

    try {
      const res = await fetch(url);
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `Status ${res.status}`);
      }
      const data = await res.json();
      if (!data.current) {
        throw new Error("Malformed weather data received.");
      }
      return data;
    } catch (err) {
      console.error("Error fetching weather:", err);
      return null;
    }
  }

  // 3. HANDLE “Fetch Weather” BUTTON CLICK
  fetchWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
      alert("Please enter a city or region name.");
      return;
    }

    weatherInfoDiv.innerHTML = "Loading weather…";
    planResponseDiv.textContent = "";
    planFormSection.classList.add("hidden");

    const weatherData = await fetchWeather(city);
    if (!weatherData) {
      weatherInfoDiv.innerHTML =
        "<p style='color: red;'>Failed to fetch weather. Try again.</p>";
      return;
    }

    // Extract data we need:
    const locationName = weatherData.location.name; // e.g. “Toronto”
    const country      = weatherData.location.country;   // e.g. “Canada”
    const tempC        = weatherData.current.temperature;
    const humidity     = weatherData.current.humidity;
    const windSpeed    = weatherData.current.wind_speed;
    const visibility   = weatherData.current.visibility;
    const precip       = weatherData.current.precip;
    const descArr      = weatherData.current.weather_descriptions;
    const weatherDesc  = Array.isArray(descArr) ? descArr.join(", ") : descArr;

    // Render weather info summary:
    weatherInfoDiv.innerHTML = `
      <h3>Current Weather in ${locationName}, ${country}</h3>
      <p><strong>Temperature:</strong> ${tempC}°C</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Wind Speed:</strong> ${windSpeed} km/h</p>
      <p><strong>Visibility:</strong> ${visibility} km</p>
      <p><strong>Precipitation:</strong> ${precip} mm</p>
      <p><strong>Conditions:</strong> ${weatherDesc}</p>
    `;

    // Store the city (read-only) so we can send it in POST:
    planCityInput.value = locationName;

    // Store the entire `current` object in hidden JSON:
    planWeatherInput.value = JSON.stringify(weatherData.current);

    // Unhide the Plan form and clear any previous inputs:
    planCropInput.value             = "";
    planActivitySelect.value        = "";
    planAreaInput.value             = "";
    planExpectedYieldInput.value    = "";
    planSeedTypeInput.value         = "";
    planNotesInput.value            = "";
    planResponseDiv.textContent     = "";
    planFormSection.classList.remove("hidden");
  });

  // 4. HANDLE PLAN FORM SUBMISSION (POST /api)
  planForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let weatherObj = null;
    try {
      weatherObj = JSON.parse(planWeatherInput.value);
    } catch {
      weatherObj = null;
    }

    const payload = {
      crop:           planCropInput.value.trim(),
      city:           planCityInput.value.trim(),
      activity:       planActivitySelect.value,
      area:           Number(planAreaInput.value),
      expected_yield: Number(planExpectedYieldInput.value),
      seed_type:      planSeedTypeInput.value.trim(),
      notes:          planNotesInput.value.trim() || null,
      weather:        weatherObj,
    };

    // Front-end validation:
    if (
      !payload.crop     ||
      !payload.city     ||
      !payload.activity ||
      isNaN(payload.area) ||
      isNaN(payload.expected_yield) ||
      !payload.seed_type
    ) {
      planResponseDiv.innerHTML =
        "<span style='color: red;'>Please fill in all required fields correctly.</span>";
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `Status ${res.status}`);
      }
      const data = await res.json();
      planResponseDiv.innerHTML =
        `<span style="color: green;">Plan saved! ID: ${data.id}</span>`;
      loadAllPlans(); // reload table & update city filter/report
    } catch (err) {
      console.error("Error submitting plan:", err);
      planResponseDiv.innerHTML =
        `<span style="color: red;">Error: ${err.message}</span>`;
    }
  });

  // 5. LOAD & RENDER ALL PLANS (and update city dropdown, chart, and enable row-click)
  async function loadAllPlans() {
    plansTableBody.innerHTML = "<tr><td colspan='10'>Loading…</td></tr>";
    try {
      const res = await fetch(`${BASE_URL}/api`);
      if (!res.ok) throw new Error(`Backend returned ${res.status}`);
      const plans = await res.json();

      if (plans.length === 0) {
        // No plans at all
        plansTableBody.innerHTML =
          "<tr><td colspan='10'>No agriculture plans found.</td></tr>";
        populateCityFilter([]);
        showAverageWeatherAndChart([], "");
        planDetailsCard.classList.add("hidden");
        return;
      }

      // Build the table rows
      let rowsHtml = "";
      plans.forEach((plan) => {
        let weatherText = "";
        if (plan.weather) {
          const temp = plan.weather.temperature;
          const descArr = plan.weather.weather_descriptions || [];
          const desc = Array.isArray(descArr) ? descArr.join(", ") : descArr;
          weatherText = `${temp}°C / ${desc}`;
        }
        rowsHtml += `
          <tr data-id="${plan.id}">
            <td>${plan.id}</td>
            <td>${plan.crop}</td>
            <td>${plan.city}</td>
            <td>${plan.activity}</td>
            <td>${plan.area}</td>
            <td>${plan.expected_yield}</td>
            <td>${plan.seed_type}</td>
            <td>${plan.notes || ""}</td>
            <td>${weatherText}</td>
            <td>${new Date(plan.createdAt).toLocaleString()}</td>
          </tr>
        `;
      });
      plansTableBody.innerHTML = rowsHtml;

      // Attach click listeners to each row
      document.querySelectorAll("#plans-table tbody tr").forEach((row) => {
        row.addEventListener("click", () => {
          const id = row.getAttribute("data-id");
          showPlanDetails(id, row);
        });
      });

      // Extract distinct cities for the city dropdown
      const distinctCities = [
        ...new Set(plans.map((plan) => plan.city)),
      ].sort((a, b) => a.localeCompare(b));

      populateCityFilter(distinctCities);

      // If a city is already selected, show its average report + chart
      const selectedCity = cityFilterSelect.value;
      showAverageWeatherAndChart(plans, selectedCity);
    } catch (err) {
      console.error("Error loading plans:", err);
      plansTableBody.innerHTML =
        "<tr><td colspan='10' style='color: red;'>Failed to load plans.</td></tr>";
      populateCityFilter([]);
      showAverageWeatherAndChart([], "");
      planDetailsCard.classList.add("hidden");
    }
  }

  // “Refresh Plans” button handler
  refreshPlansBtn.addEventListener("click", (e) => {
    e.preventDefault();
    loadAllPlans();
  });

  // Initial load of existing plans
  loadAllPlans();

  // 6. SHOW A SINGLE PLAN’S DETAILS (GET /api/:id) — Styled + full weather
  async function showPlanDetails(id, clickedRow) {
    // Remove “selected” class from all other rows
    document.querySelectorAll("#plans-table tbody tr").forEach((r) => {
      r.classList.remove("selected");
    });
    // Highlight this row
    clickedRow.classList.add("selected");

    try {
      const res = await fetch(`${BASE_URL}/api/${encodeURIComponent(id)}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `Status ${res.status}`);
      }

      // Populate each detail field in the card
      detailId.textContent            = data.id;
      detailCrop.textContent          = data.crop;
      detailCity.textContent          = data.city;
      detailActivity.textContent      = data.activity;
      detailArea.textContent          = data.area;
      detailExpectedYield.textContent = data.expected_yield;
      detailSeedType.textContent      = data.seed_type;
      detailNotes.textContent         = data.notes || "—";
      detailCreatedAt.textContent     = new Date(data.createdAt).toLocaleString();

      // Weather breakdown:
      if (data.weather && typeof data.weather.temperature === "number") {
        detailWeatherTemp.textContent     = data.weather.temperature + "°C";
        detailWeatherHumidity.textContent = data.weather.humidity + "%";
        detailWeatherWind.textContent     = data.weather.wind_speed + " km/h";
        detailWeatherVisibility.textContent = data.weather.visibility + " km";
        detailWeatherPrecip.textContent   = data.weather.precip + " mm";

        const descArr = data.weather.weather_descriptions || [];
        detailWeatherDesc.textContent     =
          Array.isArray(descArr) ? descArr.join(", ") : descArr;
      } else {
        detailWeatherTemp.textContent     = "N/A";
        detailWeatherHumidity.textContent = "N/A";
        detailWeatherWind.textContent     = "N/A";
        detailWeatherVisibility.textContent = "N/A";
        detailWeatherPrecip.textContent   = "N/A";
        detailWeatherDesc.textContent     = "N/A";
      }

      planDetailsCard.classList.remove("hidden");
    } catch (err) {
      console.error("Error fetching plan details:", err);
      planDetailsCard.classList.add("hidden");
    }
  }

  // 7. POPULATE CITY FILTER DROPDOWN
  function populateCityFilter(cities) {
    let html = `<option value="">-- Select a city --</option>`;
    cities.forEach((city) => {
      html += `<option value="${city}">${city}</option>`;
    });
    cityFilterSelect.innerHTML = html;
    cityReportUnavailableDiv.classList.add("hidden");
    averageWeatherReportDiv.classList.add("hidden");
    monthlyChartContainer.classList.add("hidden");
  }

  // When user changes the city filter, update the average report + chart
  cityFilterSelect.addEventListener("change", () => {
    const chosenCity = cityFilterSelect.value;
    fetch(`${BASE_URL}/api`)
      .then((res) => {
        if (!res.ok) throw new Error(`Backend returned ${res.status}`);
        return res.json();
      })
      .then((plans) => {
        showAverageWeatherAndChart(plans, chosenCity);
      })
      .catch((err) => {
        console.error("Error fetching plans for report:", err);
        showAverageWeatherAndChart([], "");
      });
  });

  // 8. SHOW AVERAGE WEATHER REPORT BY CITY & DRAW MONTHLY CHART
  function showAverageWeatherAndChart(plans, city = "") {
    // 1) If no city selected or no plans at all
    if (!city || plans.length === 0) {
      averageWeatherReportDiv.classList.add("hidden");
      cityReportUnavailableDiv.classList.remove("hidden");
      monthlyChartContainer.classList.add("hidden");
      destroyMonthlyChart();
      return;
    }

    // 2) Filter plans by city
    const filtered = plans.filter((p) => p.city === city);
    if (filtered.length === 0) {
      averageWeatherReportDiv.classList.add("hidden");
      cityReportUnavailableDiv.classList.remove("hidden");
      monthlyChartContainer.classList.add("hidden");
      destroyMonthlyChart();
      return;
    }

    // 3) Compute average temperature and gather condition descriptions
    let sumTemp = 0;
    let countTemp = 0;
    const conditionCounts = {};
    filtered.forEach((plan) => {
      if (!plan.weather || typeof plan.weather.temperature !== "number") {
        return;
      }
      sumTemp += plan.weather.temperature;
      countTemp += 1;

      // Count each description (e.g., "Partly cloudy", "Sunny", etc.)
      const descArr = plan.weather.weather_descriptions || [];
      const desc = Array.isArray(descArr) ? descArr.join(", ") : descArr;
      if (desc) {
        conditionCounts[desc] = (conditionCounts[desc] || 0) + 1;
      }
    });

    if (countTemp === 0) {
      // No valid temperature data
      averageWeatherReportDiv.classList.add("hidden");
      cityReportUnavailableDiv.classList.remove("hidden");
      monthlyChartContainer.classList.add("hidden");
      destroyMonthlyChart();
      return;
    }

    const avgTemp = sumTemp / countTemp;

    // Find the most common condition description
    let mostCommonDesc = "";
    let maxCount = 0;
    for (const [desc, cnt] of Object.entries(conditionCounts)) {
      if (cnt > maxCount) {
        maxCount = cnt;
        mostCommonDesc = desc;
      }
    }
    if (!mostCommonDesc) mostCommonDesc = "N/A";

    // 4) Display the average weather text
    averageWeatherReportDiv.innerHTML = `
      <p>
        <strong>Average Temperature:</strong> ${avgTemp.toFixed(1)}°C<br/>
        <strong>Most Common Condition:</strong> ${mostCommonDesc}
      </p>
    `;
    averageWeatherReportDiv.classList.remove("hidden");
    cityReportUnavailableDiv.classList.add("hidden");

    // 5) Compute and draw the monthly average‐temperature chart
    updateMonthlyChart(filtered, city);
  }

  // Destroys the existing monthly chart (if any)
  function destroyMonthlyChart() {
    if (monthlyChart) {
      monthlyChart.destroy();
      monthlyChart = null;
    }
  }

  // 9. UPDATE MONTHLY AVERAGE TEMPERATURE CHART
  function updateMonthlyChart(filteredPlans, city) {
    const monthNames = [
      "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
    ];
    // E.g., { "Jan": {sum:0, count:0}, …, "Dec": {sum:0,count:0} }
    const accum = {};
    monthNames.forEach((m) => { accum[m] = { sum: 0, count: 0 }; });

    // Aggregate temperatures into accum:
    filteredPlans.forEach((plan) => {
      const dt = new Date(plan.createdAt);
      const monthKey = monthNames[dt.getMonth()];
      if (plan.weather && typeof plan.weather.temperature === "number") {
        accum[monthKey].sum += plan.weather.temperature;
        accum[monthKey].count += 1;
      }
    });

    // Compute per-month average (or null if count=0)
    const labels = monthNames;
    const dataAvgTemps = monthNames.map((m) => {
      const { sum, count } = accum[m];
      return count > 0 ? sum / count : null;
    });

    // Unhide the chart container
    monthlyChartContainer.classList.remove("hidden");

    // If chart already exists, update its data
    if (monthlyChart) {
      monthlyChart.data.labels = labels;
      monthlyChart.data.datasets[0].data = dataAvgTemps;
      monthlyChart.options.plugins.title.text = `Monthly Avg Temp in ${city}`;
      monthlyChart.update();
      return;
    }

    // Otherwise, create a new Chart.js line chart
    monthlyChart = new Chart(monthlyChartCanvas, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: `Avg Temp (°C) in ${city}`,
            data: dataAvgTemps,
            fill: false,
            borderColor: "#005f73",
            tension: 0.2,
            pointBackgroundColor: "#005f73",
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: false,        // Chart respects fixed CSS height
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Monthly Avg Temp in ${city}`,
            font: { size: 16 },
          },
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => {
                const val = context.parsed.y;
                return val !== null ? ` ${val.toFixed(1)} °C` : " No data";
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Month",
            },
          },
          y: {
            title: {
              display: true,
              text: "Average Temperature (°C)",
            },
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 50,
          },
        },
      },
    });
  }
});
