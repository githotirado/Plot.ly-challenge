// Use d3 library to read in samples.js
const bioSamples = d3.json('samples.json');

function plotPlotly() {
    let title = `Test Title`
    let books = ["The Visual Display of Quantitative Information", "Automate the Boring Stuff", "Data Science from Scratch"]
    let timesRead = [100, 50, 25]
    let trace1 = {
      x: books,
      y: timesRead,
      type: 'bar'
    };
    let data = [trace1];
    let layout = {
      title: title
    };
    
    Plotly.newPlot("bar", data, layout);
}

bioSamples.then(function(a) {
	// console.log(a.samples[1]['otu_ids']);
    console.log(a);
    console.log(`name is ${a.names[1]}`);
    console.log(`Metadata ethnicity is ${a.metadata[1]['ethnicity']}`);
    console.log(`otu_ids are ${a.samples[1]['otu_ids']}`)
    console.log(`sample_values are ${a.samples[1]['sample_values']}`);
    // console.log(`otu_labels are ${a.samples[1]['otu_labels']}`)
    const names = a.names;
    const metadata = a.metadata;
    const samples = a.samples;

    for (i = 0; i < names.length; i++) {

    }
});
