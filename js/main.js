// setting up the basics
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = {left: 50,
                right: 50,
                top:50,
                bottom:50};

const FRAME1 = d3.select('#vis1')
                    .append('svg')
                        .attr('height', FRAME_HEIGHT)
                        .attr('width', FRAME_WIDTH)
                        .attr('class', 'frame');

const FRAME2 = d3.select('#vis2')
                    .append('svg')
                        .attr('height', FRAME_HEIGHT)
                        .attr('width', FRAME_WIDTH)
                        .attr('class', 'frame');

const FRAME3 = d3.select('#vis3')
                    .append('svg')
                        .attr('height', FRAME_HEIGHT)
                        .attr('width', FRAME_WIDTH)
                        .attr('class', 'frame');

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right

// Read the csv file
function first_scatter() {
    d3.csv('data/iris.csv').then((data) => {
        // Establish max and min bounds for data
        const MAX_X = d3.max(data, (d) => {
            return parseFloat(d.Sepal_Length)
        });
        

        const MAX_Y = d3.max(data, (d) => {
            return parseFloat(d.Petal_Length)
        });

        // making scaling functions for both x and y values
        const X_SCALE = d3.scaleLinear()
            .domain([0, MAX_X])
            .range([0, VIS_WIDTH]);

        const Y_SCALE = d3.scaleLinear()
            .domain([0, MAX_Y])
            .range([VIS_HEIGHT, 0]);
        
        const myColor = d3.scaleOrdinal().domain(data)
            .range(["green", "purple", "orange"])

        // adding pointsx
        FRAME1.selectAll('points')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', (d) => {
                return (MARGINS.left + X_SCALE(d.Sepal_Length))
            })
            .attr('cy', (d) => {
                return (MARGINS.top + Y_SCALE(d.Petal_Length))
            })
            .attr('r', 5)
            .attr('fill', function(d){return myColor(d.Species)})
            .attr('opacity', 0.5)
            .attr('class', 'point');
        
        // add y axis
        FRAME1.append('g')
            .attr('transform', 'translate(' + MARGINS.top + ',' + MARGINS.left + ')')
            .call(d3.axisLeft(Y_SCALE).ticks(10))
            .attr('font-size', '10px');

        // add x axis
        FRAME1.append('g')
            .attr('transform', 'translate(' + MARGINS.left + ',' + (VIS_HEIGHT + MARGINS.top) + ')')
            .call(d3.axisBottom(X_SCALE).ticks(10))
            .attr('font-size', '10px');
        
    });
};

function second_scatter() {
    d3.csv('data/iris.csv').then((data) => {
        // Establish max and min bounds for data
        const MAX_X = d3.max(data, (d) => {
            return parseFloat(d.Petal_Width)
        });
        

        const MAX_Y = d3.max(data, (d) => {
            return parseFloat(d.Sepal_Width)
        });

        // making scaling functions for both x and y values
        const X_SCALE = d3.scaleLinear()
            .domain([0, MAX_X])
            .range([0, VIS_WIDTH]);

        const Y_SCALE = d3.scaleLinear()
            .domain([0, MAX_Y])
            .range([VIS_HEIGHT, 0]);
        
        const COLOR = d3.scaleOrdinal().domain(data)
            .range(["green", "purple", "orange"])

        // adding points
        FRAME2.selectAll('points')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', (d) => {
                return (MARGINS.left + X_SCALE(d.Petal_Width))
            })
            .attr('cy', (d) => {
                return (MARGINS.top + Y_SCALE(d.Sepal_Width))
            })
            .attr('r', 5)
            .attr('fill', function(d){return COLOR(d.Species)})
            .attr('opacity', 0.5)
            .attr('class', 'point');
        
        // add y axis
        FRAME2.append('g')
            .attr('transform', 'translate(' + MARGINS.top + ',' + MARGINS.left + ')')
            .call(d3.axisLeft(Y_SCALE).ticks(10))
            .attr('font-size', '10px');

        // add x axis
        FRAME2.append('g')
            .attr('transform', 'translate(' + MARGINS.left + ',' + (VIS_HEIGHT + MARGINS.top) + ')')
            .call(d3.axisBottom(X_SCALE).ticks(10))
            .attr('font-size', '10px');
        
    });
};

function third_scatter() {
    // hardcoding dataset as instructed
    const dataset = [
        {label: "setosa", value: 50},
        {label: "versicolor", value: 50},
        {label: "verginica", value: 50}
      ];

    const PADDING = 0.25;
    
    // creating scales
    const X_SCALE = d3.scaleBand()
      .domain(dataset.map(d => d.label))
      .range([0, VIS_WIDTH])
      .padding(PADDING);

    const Y_SCALE = d3.scaleLinear()
      .domain([0, d3.max(dataset, d => d.value)])
      .range([VIS_HEIGHT, 0]);

    // adding pointsx
    FRAME3.selectAll('rect')
            .data(dataset)
            .enter()
            .append('rect')
            .attr('x', d => X_SCALE(d.label) + MARGINS.left)
            .attr('width', X_SCALE.bandwidth())
            .attr('y', d => MARGINS.top + Y_SCALE(d.value))
            .attr('height', d => VIS_HEIGHT - Y_SCALE(d.value))
            .attr('fill', 'blue')
            .attr('class', 'rect')
            // colors based on species
            .attr("fill", d => {
                if (d.label === "setosa") {
                  return "green";
                } else if (d.label === "versicolor") {
                  return "purple";
                } else if (d.label === "verginica") {
                  return "orange";
                }
            });

    // add y axis
    FRAME3.append('g')
            .attr('transform', 'translate(' + MARGINS.top + ',' + MARGINS.left + ')')
            .call(d3.axisLeft(Y_SCALE).ticks(10))
            .attr('font-size', '10px');

    // add x axis
    FRAME3.append('g')
            .attr('transform', 'translate(' + MARGINS.left + ',' + (VIS_HEIGHT + MARGINS.top) + ')')
            .call(d3.axisBottom(X_SCALE).ticks(3))
            .attr('font-size', '10px') 

};

first_scatter();
second_scatter();
third_scatter();