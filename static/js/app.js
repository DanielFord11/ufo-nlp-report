// from data.js
var tableData = data;

// Variables
var dateField = d3.select("#datetime");
var cityField = d3.select("#city");
var tbody = d3.select("tbody");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

var generateTable = (dataInput) => {

  dataInput.forEach(ufo_sightings => {
    var row = tbody.append("tr");
    columns.forEach(column => row.append("td").text(ufo_sightings[column])
    )
  });
}
//Generate table
generateTable(data);

var filterTable = (ev) => {

    ev.preventDefault();
    var inputDate = dateField.property("value").trim();
    var inputCity = cityField.property("value").toLowerCase().trim();

    // Filter table based on search criteria
    var filterDate = data.filter(data => data.datetime == inputDate);
    console.log(`Filtered by ${inputDate}`)
    var filterCity = data.filter(data => data.city == inputCity);
    console.log(`Filtered by ${inputCity}`)
    var filterData = data.filter(data => data.datetime == inputDate && data.city == inputCity);
    console.log(filterData)

    tbody.html("");

    let response = {
      filterData, filterCity, filterDate
    }

    if (response.filterData.length !== 0) {
      generateTable(filterData);
    }
      else if (response.filterData.length === 0 && ((response.filterCity.length !== 0 || response.filterDate.length !== 0))){
        generateTable(filterCity) || generateTable(filterDate);

      }
      else {
        tbody.append("tr").append("td").text("No sightings meet this criteria");
      }

  }

document.addEventListener('DOMContentLoaded', ()=>{
              document.getElementById('search-btn').addEventListener('click', filterTable);
          });
document.addEventListener('DOMContentLoaded', ()=>{
                      document.getElementById('search-btn2').addEventListener('click', filterTable);
          });
