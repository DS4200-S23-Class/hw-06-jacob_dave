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
d3.csv('data/iris.csv').then((data) => {

    // Scatterplot 1

    // Establish max and min bounds for data
    const MAX_X1 = d3.max(data, (d) => {
        return parseFloat(d.Sepal_Length)
    });
    

    const MAX_Y1 = d3.max(data, (d) => {
        return parseFloat(d.Petal_Length)
    });

    // making scaling functions for both x and y values
    const X_SCALE1 = d3.scaleLinear()
        .domain([0, MAX_X1 + 1])
        .range([0, VIS_WIDTH]);

    const Y_SCALE1 = d3.scaleLinear()
        .domain([0, MAX_Y1 + 1])
        .range([VIS_HEIGHT, 0]);
    
    // Declare colormap for the whole assignment
    const COLOR = d3.scaleOrdinal().domain(data)
        .range(["green", "blue", "red"])

    // adding points
    let scatter1_points = FRAME1.selectAll('points')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d) => {
            return (MARGINS.left + X_SCALE1(d.Sepal_Length))
        })
        .attr('cy', (d) => {
            return (MARGINS.top + Y_SCALE1(d.Petal_Length))
        })
        .attr('r', 6)
        .attr('id', (d) => {
            return d.id
        })
        .attr('species', (d) => {
            return d.Species
        })
        .attr('fill', function(d){return COLOR(d.Species)})
        .attr('class', 'point');
    
    // add y axis
    FRAME1.append('g')
        .attr('transform', 'translate(' + MARGINS.top + ',' + MARGINS.left + ')')
        .call(d3.axisLeft(Y_SCALE1).ticks(10))
        .attr('font-size', '10px');

    // add x axis
    FRAME1.append('g')
        .attr('transform', 'translate(' + MARGINS.left + ',' + (VIS_HEIGHT + MARGINS.top) + ')')
        .call(d3.axisBottom(X_SCALE1).ticks(10))
        .attr('font-size', '10px');

    // Scatterplot 2

    // Establish max and min bounds for data
    const MAX_X2 = d3.max(data, (d) => {
        return parseFloat(d.Sepal_Width)
    });
    

    const MAX_Y2 = d3.max(data, (d) => {
        return parseFloat(d.Petal_Width)
    });

    // making scaling functions for both x and y values
    const X_SCALE2 = d3.scaleLinear()
        .domain([0, MAX_X2 + 0.2])
        .range([0, VIS_WIDTH]);

    const Y_SCALE2 = d3.scaleLinear()
        .domain([0, MAX_Y2 + 0.5])
        .range([VIS_HEIGHT, 0]);

    // adding points
    let scatter2_points = FRAME2.selectAll('points')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d) => {
            return (MARGINS.left + X_SCALE2(d.Sepal_Width))
        })
        .attr('cy', (d) => {
            return (MARGINS.top + Y_SCALE2(d.Petal_Width))
        })
        .attr('id', (d) => {
            return d.id
        })
        .attr('species', (d) => {
            return d.Species
        })
        .attr('r', 6)
        .attr('fill', function(d){return COLOR(d.Species)})
        .attr('class', 'point');
    
    // add y axis
    FRAME2.append('g')
        .attr('transform', 'translate(' + MARGINS.top + ',' + MARGINS.left + ')')
        .call(d3.axisLeft(Y_SCALE2).ticks(10))
        .attr('font-size', '10px');

    // add x axis
    FRAME2.append('g')
        .attr('transform', 'translate(' + MARGINS.left + ',' + (VIS_HEIGHT + MARGINS.top) + ')')
        .call(d3.axisBottom(X_SCALE2).ticks(10))
        .attr('font-size', '10px');

    // Add brushing functionality to the frame
    FRAME2.call(d3.brush()
        .extent([[MARGINS.left, MARGINS.bottom], [VIS_WIDTH + MARGINS.left, VIS_HEIGHT+  MARGINS.top]])
            .on("start brush", updateChart)
      );

    
    // hardcoding dataset as instructed
    const dataset = [
        {label: "setosa", value: 50},
        {label: "versicolor", value: 50},
        {label: "virginica", value: 50}
      ];

    const PADDING = 0.25;
    
    // creating scales
    const X_SCALE3 = d3.scaleBand()
      .domain(dataset.map((d) => {return d.label}))
      .range([0, VIS_WIDTH])
      .padding(PADDING);

    const Y_SCALE3 = d3.scaleLinear()
      .domain([0, d3.max(dataset, d => d.value)])
      .range([VIS_HEIGHT, 0]);

    // adding pointsx
    let plot3_bars = FRAME3.selectAll('rects')
            .data(dataset)
            .enter()
            .append('rect')
            .attr('x', d => X_SCALE3(d.label) + MARGINS.left)
            .attr('width', X_SCALE3.bandwidth())
            .attr('y', d => MARGINS.top + Y_SCALE3(d.value))
            .attr('height', d => VIS_HEIGHT - Y_SCALE3(d.value))
            .attr('class', 'rect')
            .attr('class', 'point')
            // colors based on species
            .attr("fill", d => {
                return COLOR(d.label)
            });

    // add y axis
    FRAME3.append('g')
            .attr('transform', 'translate(' + MARGINS.top + ',' + MARGINS.left + ')')
            .call(d3.axisLeft(Y_SCALE3).ticks(10))
            .attr('font-size', '10px');

    // add x axis
    FRAME3.append('g')
            .attr('transform', 'translate(' + MARGINS.left + ',' + (VIS_HEIGHT + MARGINS.top) + ')')
            .call(d3.axisBottom(X_SCALE3).ticks(3))
            .attr('font-size', '10px') 

    // function for when brush occurs
    function updateChart(event) {
        extent = event.selection;
        

        // adding the selected class if the function returns True
        scatter2_points.classed("selected", (d) => { return isPointInBrushSelection(extent, X_SCALE2(d.Sepal_Width) + MARGINS.left, Y_SCALE2(d.Petal_Width) + MARGINS.top )} );

        // Get array of points selected
        let selected_points = FRAME2.selectAll(".selected").nodes()


        // Get an array of point ids and their species
        let selected_ids = []
        let selected_species = []
        for (let i=0; i < selected_points.length; i++){
            selected_ids.push(selected_points[i].id)
            selected_species.push(selected_points[i].getAttribute('species'))
        }

        // Select points in vis1 that have the same ID as the selected points
        scatter1_points.classed("selected", (d) => {return selected_ids.includes(d.id)})

        // Convert species to a set to get unique species selected
        let unique_species = Array.from(new Set(selected_species))
        // Select bars taht have been selected
        plot3_bars.classed('selected', (d) => {
            return unique_species.includes(d.label)})

    };

    // checking if a point is in a selection
    function isPointInBrushSelection(extent, cx, cy) {
        const x0 = extent[0][0];
        const x1 = extent[1][0];
        const y0 = extent[0][1];
        const y1 = extent[1][1];  

        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
    };
});
    

