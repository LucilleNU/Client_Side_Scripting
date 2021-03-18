var cities = ["Varna", "Sofia"];

document.addEventListener("DOMContentLoaded", function () {
    ReloadCities();
});

function AddNewCity() {
    // Read city from input element
    let newCity = document.getElementById("newCity").value;

    if (newCity != "") {
        // Check if city already exists in the array
        if (!cities.includes(newCity)) {
            // Add new city in the array
            cities.push(newCity);
            cities.sort();

            // Reload list of cities
            ReloadCities();
        }
        else {
            alert(newCity + " already exists in the list!");
        }
    }
}

function ReloadCities() {
    // Clear all option elements
    document.getElementById("listOfCities").innerHTML = '';

    // Load all elements from the array
    var listOfCities = document.getElementById("listOfCities");

    for (var index in cities) {
        var option = document.createElement("option");
        option.text = cities[index];
        listOfCities.add(option);
    }
}