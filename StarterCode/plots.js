// Function to address the selection in the dropdown menu
function optionChanged(myValue) {
    var dropdownMenu = d3.select("#selDataset");
    console.log(`You selected ${myValue}`);
    plotCharts(myValue);
    showDemographics(myValue);

}