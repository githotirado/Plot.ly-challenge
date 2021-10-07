//     initPlot();
  
//     // How to Add an element and/or style it:  
//     // First, var li_new = d3.select(ID/class).append("li")
//     // Li_new.text("This is the new item").style("color","red"); 

function PlotCharts(myID) {
    // Filter for the array with records containing myID
    let mySamples = samplesArray.filter(s => s.id == myID);
    console.log(mySamples);

    // Already sorted by sample_values, so take top 10 for items to map
        // For bar chart (use 'reverse()' to have taller bars on top):
        // * Use `sample_values` as the values.
        // * Use `otu_ids` as the labels, mapping "OTU " in front of each number
        // * Use `otu_labels` as the hovertext.
    let title = `Test Title`;
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
}

//     // Demographic information
//     var demotab = d3.select(".panel-body");
//     demotab.append("h5").text("Id: 940");
//     demotab.append("h5").text("ethnicity: Caucasian");
//     demotab.append("h5").text("gender: F");
//     demotab.append("h5").text("age: 24");
//     demotab.append("h5").text("location: Beaufort/NC");
//     demotab.append("h5").text("bbtype: I");
//     demotab.append("h5").text("wfreq: 2");

//     console.log("Current Number chosen is");
//     console.log(d3.select("#selDataset").attr("onchange"));
//     // Add rows like this from metatab array.  Loop through.
//         // console.log(`Metadata ethnicity is ${a.metadata[0]['ethnicity']}`);

//     // Iterate through each student/grade pair
//     // samplesArray.forEach(([student, grade]) => {
//     var meta940 = metaDataArray[0]
//     metaDataArray.forEach(([ethnicity, age]) => {
//         console.log("Got here");
//         // Var row = tbody.append("tr");
//         // Row.append("td").text(student);
//         // Row.append("td").text(grade);
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
        // Capture each top level array. !! Leave as GLOBAL (no declaration)
        //   for access by other functions!!
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
        PlotCharts(firstID);
        // PlotCharts("943");
    });
}

init();
