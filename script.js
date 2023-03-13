let d3 = window.d3;

window.onload = function(){
    setup("./iris.csv");
};

const MARGIN = {
    "LEFT":100,
    "RIGHT":100,
    "TOP":100,
    "BOTTOM":200,
};

const   width  = 800,
        height = 700;


setup = function (dataPath) {
    var svg = d3.select("#SVG_CONTAINER");

    d3.csv(dataPath).then(function (data) {
        // console.log(data);
        let Chart = new chart(data, svg);
    });

};


let chart = function (data, svg) {

    let chart = svg.append('g')
        .attr('class', 'scatterplot');

    //x axis
    let xScale = d3.scaleLinear()
        .domain([4, 8])
        .range([MARGIN.LEFT, width - MARGIN.RIGHT]);

    chart.append('g')
        .attr('transform', 'translate(' + 0 + ', ' + (height - MARGIN.BOTTOM) + ')')
        .call(d3.axisBottom(xScale));
    
    //y axis
    let yScale = d3.scaleLinear()
        .domain([1, 5])
        .range([height - MARGIN.BOTTOM, MARGIN.TOP]);

    chart.append('g')
        .attr('transform', 'translate(' + MARGIN.LEFT + ', ' + 0 + ')')
        .call(d3.axisLeft(yScale));

    //create chart
    chart
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
            .attr('class', "circle")
            .attr('cx', d => xScale(d.sepalLength))
            .attr('cy', d => yScale(d.sepalWidth))
            .attr('r', function(d) { return (d.petalWidth * 5) })
            .attr('fill', function(d) {
                if (d.class === "Iris-setosa") {
                    return 'steelblue'
                }
                else if (d.class === "Iris-versicolor") {
                    return 'orange'
                }
                else if (d.class === "Iris-virginica") {
                    return 'green'
                }
            })
            .style("stroke", "black")
            .attr('opacity', function(d) { return (d.petalLength * 0.14) });

    //x axis label
    svg.append("text")
        .attr("x", width/2)
        .attr("y", height - MARGIN.BOTTOM + 40)
        .text("Sepal Length")
        .style("font-size", "15px")
        .attr("alignment-baseline","middle");

    //y axis label
    svg.append("text")
        .attr("transform", `translate(${MARGIN.LEFT/2}, ${height/2})rotate(-90)`)
        .text("Sepal Width")
        .style("font-size", "15px")
        .attr("alignment-baseline","middle");

};