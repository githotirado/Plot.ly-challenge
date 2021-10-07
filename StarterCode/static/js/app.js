//     // How to Add an element and/or style it:  
//     // First, var li_new = d3.select(ID/class).append("li")
//     // Li_new.text("This is the new item").style("color","red"); 
//
// Functions section
//

function plotCharts(myID) {
    // Filter for the array with records containing myID
    let mySamples = samplesArray.filter(s => s.id == myID);
    console.log(mySamples);

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
        width: 800
    };
    
    Plotly.newPlot("bubble", dataBubble, layoutBubble);
}

function showDemographics(myID) {
    // Filter for the meta records having myID, split into keys/values
    let metaRecord = metaDataArray.filter(s => s.id == myID);
    var metaKeys = Object.keys(metaRecord[0]);
    var metaValues = Object.values(metaRecord[0]);

    // Select the section in the HTML to insert metadata
    var demotab = d3.select(".panel-body");
    
    // Loop metaRecord (metaKeys, metaValues), add demographics to panel
    for (let j = 0; j < metaKeys.length; j++) {
        demotab.append("h5").text(`${metaKeys[j]}: ${metaValues[j]}`);
    }
};

//     console.log("Current Number chosen is");
//     console.log(d3.select("#selDataset").attr("onchange"));
//     // Add rows like this from metatab array.  Loop through.
//         // console.log(`Metadata ethnicity is ${a.metadata[0]['ethnicity']}`);

//     // Iterate through each student/grade pair
//     // samplesArray.forEach(([student, grade]) => {
//     var meta940 = metaDataArray[0]
//     });
//     console.log(`meta940 value: ${meta940.id}`);
//         // Append one table row per student/grade
//         var row = tbody.append("tr");
    
//         // append one cell for the student and one cell for the grade
//         row.append("td").text(student);
//         row.append("td").text(grade);
//     // });
// });

function init() {
    // Use d3 library to read in samples.json
    const bioSamples = d3.json('samples.json');

    // Set up the promise, set up initial elements when complete
    bioSamples.then(function(myData) {
        console.log(myData);
        // Capture each top level array. Leave as GLOBAL (no declaration)
        //   because other functions access them!!
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

init();
