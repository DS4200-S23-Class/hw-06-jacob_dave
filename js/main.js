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
        console.log(MAX_X);
        console.log(MAX_Y);

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

first_scatter();