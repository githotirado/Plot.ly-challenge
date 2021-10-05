// Use d3 library to read in samples.js
const bioSamples = d3.json('samples.json');

bioSamples.then(function(a) {
	// console.log(a.samples[1]['otu_ids']);
    console.log(a);
    var namesArray = Object.values(a.names);
    var metaDataArray = Object.values(a.metadata);
    var samplesArray = Object.values(a.samples);
    console.log(`namesArray is ${namesArray}`);
   
    console.log(`name is ${a.names[1]}`);
    console.log(`Metadata ethnicity is ${a.metadata[1]['ethnicity']}`);
    console.log(`otu_ids are ${a.samples[1]['otu_ids']}`)
    console.log(`sample_values are ${a.samples[1]['sample_values']}`);
    // console.log(`otu_labels are ${a.samples[1]['otu_labels']}`)
    // const names = a.names;
    // const metadata = a.metadata;
    // const samples = a.samples;

    // for (i = 0; i < names.length; i++) {

    // }
    initPlot();

    // For bar chart:
    // * Use `sample_values` as the values.
    // * Use `otu_ids` as the labels.
    // * Use `otu_labels` as the hovertext.
    function initPlot() {
        let title = `Test Title`;
        let labels = samplesArray[0]['otu_ids'];
        let values = samplesArray[0]['sample_values']

        let trace1 = {
        x: values,
        y: labels,
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


