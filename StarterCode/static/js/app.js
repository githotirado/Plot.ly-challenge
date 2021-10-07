//
// Functions section
//

// Draw the bar, bubble, [bonus] gauge charts based on nameID
function plotCharts(myID) {
    // Filter for the array with records containing myID
    let mySamples = samplesArray.filter(s => s.id == myID);
    console.log(`Filtered samples array:`);
    console.log(mySamples);

    // Get wash frequency from metaData
    let metaRecord = metaDataArray.filter(s => s.id == myID);
    let wfreq = metaRecord[0].wfreq;

    // For bar chart (use 'reverse()' to have taller bars on top):
        // * Use `sample_values` as the values.
        // * Use `otu_ids` as the labels, mapping "OTU " in front of each number
        // * Use `otu_labels` as the hovertext.
    // Already sorted by sample_values, so take the first 10 items to map TOP 10
    let title = `Top 10 OTU samples for Test Subject ${myID}`;
    let labels = mySamples[0]['otu_ids'].slice(0, 10).map(a => "OTU " + a).reverse();
    let values = mySamples[0]['sample_values'].slice(0, 10).reverse();
    let hovertext = mySamples[0]['otu_labels'].slice(0, 10).reverse();
    
    // Plot the horizontal bar chart
    let traceBar = {
        x: values,
        y: labels,
        text: hovertext,
        type: "bar",
        orientation: "h"
        };
    let dataBar = [traceBar];

    let layoutBar = {
        title: title
    };
    
    Plotly.newPlot("bar", dataBar, layoutBar);

    // For bubble chart
        // Use otu_ids for the x values (exclude "OTU " for scatter)
        // Use sample_values for the y values.
        // Use sample_values for the marker size.
        // Use otu_ids for the marker colors.
        // Use otu_labels for the text values.
    let bTitle = `OTU samples for Test Subject ${myID}`;
    let xValues = mySamples[0]['otu_ids'];
    let yValues = mySamples[0]['sample_values'];
    let mText   = mySamples[0]['otu_labels'];
    let mColors = xValues;
    let mSize   = yValues;
    
    // Plot the bubble chart
    let traceBubble = {
        x: xValues,
        y: yValues,
        text: mText,
        mode: "markers",
        marker: {
            size: mSize,
            color: mColors
        }
    };
    let dataBubble = [traceBubble];

    let layoutBubble = {
        title: bTitle,
        height: 600,
        width: 800
    };
    
    Plotly.newPlot("bubble", dataBubble, layoutBubble);

    // For the guage chart
    var dataGauge = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreq,
            title: { text: "Speed" },
            type: "indicator",
            mode: "gauge+number"
        }
    ];
    
    var layoutGauge = { 
        width: 600,
        height: 500,
        margin: { 
            t: 0,
            b: 0
        }
    };
    // Plot the gauge chart
    Plotly.newPlot('gauge', dataGauge, layoutGauge);
}

// Clear and populate the demographics panel
function showDemographics(myID) {
    // Filter for the meta records having myID, split into keys/values
    let metaRecord = metaDataArray.filter(s => s.id == myID);
    var metaKeys = Object.keys(metaRecord[0]);
    var metaValues = Object.values(metaRecord[0]);

    // Select the section in the HTML to clear then insert metadata
    var demotab = d3.select(".panel-body");
    demotab.html("");   // Clear previous metadata
    
    // Loop metaRecord (metaKeys, metaValues), add demographics to panel
    for (let j = 0; j < metaKeys.length; j++) {
        demotab.append("h5").text(`${metaKeys[j]}: ${metaValues[j]}`);
    }
};

// Function to address the selection in the dropdown menu. Redraw
function optionChanged(myValue) {
    // var dropdownMenu = d3.select("#selDataset");
    console.log(`User selected ${myValue}`);
    plotCharts(myValue);
    showDemographics(myValue);

}

// main function to initialize dashboard at first nameID record
function init() {
    // Use d3 library to read in samples.json
    const bioSamples = d3.json('samples.json');

    // Set up the promise, set up initial elements when complete
    bioSamples.then(function(myData) {
        console.log(myData);
        // Capture each top level array.
        // LEAVE AS GLOBAL (no declaration) for other functions to access
        namesArray = Object.values(myData.names);
        metaDataArray = Object.values(myData.metadata);
        samplesArray = Object.values(myData.samples);

        // Use the namesArray values to populate the dropdown menu
        for (let i = 0; i < namesArray.length; i++) {
            d3.select("#selDataset")
                .append("option")
                .text(namesArray[i])
                .property('value', namesArray[i]);
        } 

        // Get first subject ID number.  Set up initial dashboard/charts with it
        var firstID = namesArray[0];
        plotCharts(firstID);
        showDemographics(firstID);
    });
}

// Call the initialize function
init();
