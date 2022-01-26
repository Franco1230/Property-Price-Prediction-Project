let data = [];
const results = document.querySelector("#results");

function add_screen(input_data) {
  data.push(input_data);
}

function display() {
  for (var i = 0; i < data.length; i++) {
    const elem = document.createElement("p");
    elem.innerText = data[i];
    results.appendChild(elem);
  }
}

function clear_results() {
  results.innerHTML = "";
}

function clear_everything() {
  data = [];
  clear_screen();
  display();
}

function clear_screen() {
  results.innerHTML = "";
}

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

function predictPrice() {
  const form_data = extract_form_data();

  postData("http://127.0.0.1:5000/predict", form_data)
    .then((data) => data["prediction"])
    .then((prediction) => {
      const resultsDataElement = buildResults(prediction);
      results.innerHTML = "";
      results.appendChild(resultsDataElement);
    });
}

function isCharNumber(c) {
  return c >= "0" && c <= "9";
}


function extract_form_data() {
  let numberOfRoom = document.querySelector("#RoomNumber").value;
  let distance = document.querySelector("#DistanceFromCBD").value;
  let numberOfBathroom = document.querySelector("#NumberOfBathroom").value;
  let numberOfCarPark = document.querySelector("#NumberOfCarPark").value;
  let landSize = document.querySelector("#AmountOfLandSize").value;
  let buildingArea = document.querySelector("#AmountOfBuildingArea").value;
  let yearBuilt = document.querySelector("#YearBuiltRanges").value;
  let propertyCount = document.querySelector("#NumberOfPropertyCount").value;
  let crimeRate = document.querySelector("#NumberOfCrimeRate").value;
  let nearbySchools = document.querySelector("#NumberOfNearbySchools").value;

  let form_data = {"RoomNumber": numberOfRoom,
  "DistanceFromCBD":distance,
  "NumberOfBathroom":numberOfBathroom,
  "NumberOfCarPark":numberOfCarPark,
  "AmountOfLandSize":landSize,
  "AmountOfBuildingArea":buildingArea,
  "YearBuiltRanges":yearBuilt,
  "NumberOfPropertyCount":propertyCount,
  "NumberOfCrimeRate":crimeRate,
  "NumberOfNearbySchools":nearbySchools
};

  return form_data;
}

const USDFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "AUD",
});

function buildResults(price) {
  // Create result elements
  const priceElement = document.createElement("div");
  const containerElement = document.createElement("div");
  const yourPriceElement = document.createElement("div");

  // Add relevant classes
  priceElement.classList.add("type-h3");
  yourPriceElement.classList.add("type-sh6");

  // Set inner text for the elements
  yourPriceElement.innerText = "The estimated price is:";
  priceElement.innerText = USDFormatter.format(parseInt(price));

  // Add elements to container
  containerElement.appendChild(yourPriceElement);
  containerElement.appendChild(priceElement);

  return containerElement;
}
