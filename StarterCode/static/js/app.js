// Use d3 library to read in samples.js
const bioSamples = d3.json('samples.json');

bioSamples.then(function(a) {
	// console.log(a.samples[1]['otu_ids']);
    console.log(a);
    console.log(`name is ${a.names[1]}`);
    console.log(`Metadata ethnicity is ${a.metadata[1]['ethnicity']}`);
    console.log(`otu_ids are ${a.samples[1]['otu_ids']}`)
    console.log(`sample_values are ${a.samples[1]['sample_values']}`);
    console.log(`otu_labels are ${a.samples[1]['otu_labels']}`)
});

// let otuIDs = bioSamples.map(a => a.samples.otu_ids);
// console.log(otuIDs);