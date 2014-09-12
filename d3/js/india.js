var margin =50, 
	totalWidth = 800, 
	totalHeight= 500,
	width = totalWidth - 2 * margin, 
	height= totalHeight - 2 * margin;

var xScale = d3.scale.linear().range([0, width]);
var yScale = d3.scale.linear().range([height, 0]);
					
var valueline = d3.svg.line()
				.x(function(d){return xScale(d.Year);})
				.y(function(d){return yScale(d.AverageIncome);});
				
var drawCanvas = d3.select('body')
		.append('svg')
			.attr('width', totalWidth)
			.attr('height', totalHeight)
		.append('g')
			.attr('transform', 'translate(' + margin + ',' + margin +')');
			
d3.csv('data/india.csv', function(error, data){
	data.forEach(function(d){
		d.Year = +d.Year;
		d.AverageIncome = +d.AverageIncome;
	});

	xScale.domain([
			d3.min(data, function(d){return d.Year;}), 
			d3.max(data, function(d){return d.Year;})
	]);	
				
	var yMax = d3.max(data, function(d) {return d.AverageIncome});
	var yMin = d3.min(data, function(d) {return d.AverageIncome});
	
	yScale.domain([yMin - (yMax - yMin)/d3.svg.axis().ticks() ,yMax]);

	var xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(12).tickFormat(d3.format("d"));
	var yAxis = d3.svg.axis().scale(yScale).orient('left');

	drawCanvas.append('path')
			.attr('class' , 'line')
			.attr('d', valueline(data));
	
	drawCanvas.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0,'+ height +')')
				.call(xAxis);
				
	drawCanvas.append('g')
				.attr('class' ,'y axis')
				.call(yAxis);
	drawCanvas.append('text')
				.attr('text-anchor', 'end')
				.attr('x', width)
				.attr('y', height - 6)
				.attr('fill', 'steelblue')
				.text('Year');
	drawCanvas.append('text')
				.attr('text-anchor', 'top')
				.attr('x', 15)
				.attr('y', 50)
				.text('AverageIncome')
				.attr('fill', 'steelblue')
				.attr('transform', 'rotate(-90, 15, 50)');
});