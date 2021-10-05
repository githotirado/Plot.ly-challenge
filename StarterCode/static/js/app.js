// Use d3 library to read in samples.js
const bioSamples = d3.json('samples.json');

bioSamples.then(function(a) {
	// console.log(a.samples[0]['otu_ids']);
    console.log(a);
    var namesArray = Object.values(a.names);
    var metaDataArray = Object.values(a.metadata);
    var samplesArray = Object.values(a.samples);
    // console.log(`namesArray is ${namesArray}`);
   
    // console.log(`name is ${a.names[0]}`);
    // console.log(`Metadata ethnicity is ${a.metadata[0]['ethnicity']}`);
    // console.log(`otu_ids are ${a.samples[0]['otu_ids']}`)
    // console.log(`sample_values are ${a.samples[0]['sample_values']}`);
    // console.log(`otu_labels are ${a.samples[0]['otu_labels']}`)
    // for (i = 0; i < names.length; i++) {

    // }

    initPlot();

    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Use the names array to populate the dropdown menu
    for (i = 0; i < namesArray.length; i++) {
        d3.select("#selDataset").append("option").text(namesArray[i]);
    }
    // var opt1 = d3.select("#selDataset").append("option").text("904");

    // // Create a new element (2 step method: create element, change it)
    // var li1 = d3.select("ul").append("li");
    // li1.text("A new item has been added!");

    // // Use chaining to create a new element and set its text (single step)
    // var li2 = d3.select("ul").append("li").text("Another new item!");

    // Add an element and/or style it:  
    // First, var li_new = d3.select(ID/class).append("li")
    // Li_new.text("This is the new item").style("color","red"); 



    // For bar chart:
    // * Use `sample_values` as the values.
    // * Use `otu_ids` as the labels.
    // * Use `otu_labels` as the hovertext.
    function initPlot() {
        let title = `Test Title`;
        let labels = samplesArray[0]['otu_ids'];
        let values = samplesArray[0]['sample_values'];
        let hovertext = samplesArray[0]['otu_labels'];

        let trace1 = {
        x: values,
        y: labels,
        text: hovertext,
        type: "bar",
        orientation: "h"
        };
        let data = [trace1];

        let layout = {
        title: title
        };
        
        Plotly.newPlot("bar", data, layout);
    }
});


