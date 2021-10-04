// Use d3 library to read in samples.js
const bioSamples = d3.json('samples.json');

bioSamples.then(function(a) {
	console.log(a);
})

