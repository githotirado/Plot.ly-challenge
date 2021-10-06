// // Use d3 library to read in samples.js
// const bioSamples = d3.json('samples.json');

// // Allow time for promise to complete.
// bioSamples.then(function(a) {
// 	// console.log(a.samples[0]['otu_ids']);
//     console.log(a);
//     var namesArray = Object.values(a.names);
//     var metaDataArray = Object.values(a.metadata);
//     var samplesArray = Object.values(a.samples);
//     // console.log(`namesArray is ${namesArray}`);
   
//     // console.log(`name is ${a.names[0]}`);
//     // console.log(`Metadata ethnicity is ${a.metadata[0]['ethnicity']}`);
//     // console.log(`otu_ids are ${a.samples[0]['otu_ids']}`)
//     // console.log(`sample_values are ${a.samples[0]['sample_values']}`);
//     // console.log(`otu_labels are ${a.samples[0]['otu_labels']}`)
//     // for (i = 0; i < names.length; i++) {

//     // }

//     initPlot();

//     // Use the imported namesArray to populate the dropdown menu
//     for (let i = 0; i < namesArray.length; i++) {
//         d3.select("#selDataset")
//             .append("option")
//             .text(namesArray[i])
//             .property('value', namesArray[i]);
//     }    

//     // Add an element and/or style it:  
//     // First, var li_new = d3.select(ID/class).append("li")
//     // Li_new.text("This is the new item").style("color","red"); 



//     // For bar chart:
//     // * Use `sample_values` as the values.
//     // * Use `otu_ids` as the labels.
//     // * Use `otu_labels` as the hovertext.
//     function initPlot() {
//         let title = `Test Title`;
//         let labels = samplesArray[0]['otu_ids'];
//         let values = samplesArray[0]['sample_values'];
//         let hovertext = samplesArray[0]['otu_labels'];

//         let trace1 = {
//         x: values,
//         y: labels,
//         text: hovertext,
//         type: "bar",
//         orientation: "h"
//         };
//         let data = [trace1];

//         let layout = {
//         title: title
//         };
        
//         Plotly.newPlot("bar", data, layout);
//     }

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
    // Use d3 library to read in samples.js
    const bioSamples = d3.json('samples.json');

    // Allow time for promise to complete.
    bioSamples.then(function(a) {
        // console.log(a.samples[0]['otu_ids']);
        console.log(a);
        var namesArray = Object.values(a.names);
        var metaDataArray = Object.values(a.metadata);
        var samplesArray = Object.values(a.samples);

        // Use the imported namesArray to populate the dropdown menu
        for (let i = 0; i < namesArray.length; i++) {
            d3.select("#selDataset")
                .append("option")
                .text(namesArray[i])
                .property('value', namesArray[i]);
        } 

        // initPlot();
    });
}

init();
