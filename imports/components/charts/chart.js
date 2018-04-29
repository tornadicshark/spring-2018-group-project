import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './chart.html';

export default angular.module('chartApp', [angularMeteor])
.directive('donutChart', [function() {
    function link(scope, element) {
        var width = 900;
        var height = 500;

        // Use the extracted size to set the size of an SVG element.
        d3.select(element[0]).append('svg').attr("width", width).attr("height", height);

        var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
        var parseTime = d3.timeParse("%Y-%m-%d");
        
        var x = d3.scaleTime()
            .rangeRound([0, width]);
        
        var y = d3.scaleLinear()
            .rangeRound([height, 0]);
        
        var line = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.close); })
            .curve(d3.curveBasis);

       d3.csv("data/Bitcoin.csv", function(d) {
        d.date = parseTime(d.Date);
        d.close = +d.Close;
        return d;
        }, function(error, data) {
        if (error) throw error;
        
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain(d3.extent(data, function(d) { return d.close; }));
        
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .select(".domain")
            .remove();
        
        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("close ($)");
        
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);
        });

    }
    return { 
        link: link,
        restrict: 'E'
    }
  }]);
/*.directive('lineChart', function() {
function link(scope, element) {
    var parseDate = d3.timeParse("%Y/%m/%d");

    var margin = {left: 50, right: 20, top: 20, bottom: 50 };

    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    var max = 0;

    var xNudge = 50;
    var yNudge = 20;

    var minDate = new Date();
    var maxDate = new Date();


    d3.csv("data/Bitcoin.csv")
        .row(function(d) { return { date: parseDate(d.date), close: Number(d.close.trim().slice(1))}; })
        .get(function(error, rows) {
            max = d3.max(rows, function(d) { return d.close; });
            minDate = d3.min(rows, function(d) {return d.date; });
            maxDate = d3.max(rows, function(d) { return d.date; });


            var y = d3.scaleLinear()
                        .domain([0,max])
                        .range([height,0]);

            var x = d3.scaleTime()
                        .domain([minDate,maxDate])
                        .range([0,width]);

            var yAxis = d3.axisLeft(y);

            var xAxis = d3.axisBottom(x);

            var line = d3.line()
                .x(function(d){ return x(d.date); })
                .y(function(d){ return y(d.close); })
                .curve(d3.curveCardinal);


            var svg = d3.select(element[0]).append("svg").attr("id","svg").attr("height","100%").attr("width","100%");
            var chartGroup = svg.append("g").attr("class","chartGroup").attr("transform","translate("+xNudge+","+yNudge+")");

            chartGroup.append("path")
                .attr("class","line")
                .attr("d",function(d){ return line(rows); })


            chartGroup.append("g")
                .attr("class","axis x")
                .attr("transform","translate(0,"+height+")")
                .call(xAxis);

            chartGroup.append("g")
                .attr("class","axis y")
                .call(yAxis);

        });
    }

    return { 
        link: link,
        restrict: 'E'
    }
    
});*/
/*.directive('lineChart', function() {
    function link(scope, element) {
        var margin = {top: 20, right: 50, bottom: 30, left: 50},
            width = 500 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;
        var parseDate = d3.time.format("%d-%b-%y").parse,
            bisectDate = d3.bisector(function(d) { return d.date; }).left,
            formatValue = d3.format(",.2f"),
            formatCurrency = function(d) { return "$" + formatValue(d); };
        var x = d3.time.scale()
            .range([0, width]);
        var y = d3.scale.linear()
            .range([height, 0]);
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");
        var line = d3.svg.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.close); });
        var svg = d3.select(element[0]).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
        d3.csv("data/Bitcoin.csv", function(error, data) {

            data.forEach(function(d) {
                d.date = parseDate(d["Date"]);
                d.close = +d["Close"];
              });

            data.sort(function(a, b) {
                return a.date - b.date;
              });
              x.domain([data.date, data[data.length - 1].date]);
              y.domain(d3.extent(data, function(d) { return d.close; }));
              svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);
              svg.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)
                .append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text("close ($)");
              svg.append("path")
                  .datum(data)
                  .attr("class", "line")
                  .attr("d", line);
              var focus = svg.append("g")
                  .attr("class", "focus")
                  .style("display", "none");
              focus.append("circle")
                  .attr("r", 4.5);
              focus.append("text")
                  .attr("x", 9)
                  .attr("dy", ".35em");
              svg.append("rect")
                  .attr("class", "overlay")
                  .attr("width", width)
                  .attr("height", height)
                  .on("mouseover", function() { focus.style("display", null); })
                  .on("mouseout", function() { focus.style("display", "none"); })
                  .on("mousemove", mousemove);
              function mousemove() {
                var x0 = x.invert(d3.mouse(this)[0]),
                    i = bisectDate(data, x0, 1),
                    d0 = data[i - 1],
                    d1 = data[i],
                    d = x0 - d0.date > d1.date - x0 ? d1 : d0;
                focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
                focus.select("text").text(formatCurrency(d.close));
              }
            });            
    }
    return { 
        link: link,
        restrict: 'E'
    }
});
  .directive('lineChart', [function() {
    function link(scope, element) {
        var width = 500;
        var height = 300;

        // Use the extracted size to set the size of an SVG element.
        d3.select(element[0]).append('svg').attr("width", width).attr("height", height);

        var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
        var parseTime = d3.timeParse("%d-%b-%y");
        
        var x = d3.scaleTime()
            .rangeRound([0, width]);
        
        var y = d3.scaleLinear()
            .rangeRound([height, 0]);
        
        var line = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.close); });
        
        d3.tsv("data.tsv", function(d) {
       // d3.csv("data/Bitcoin.csv", function(d) {
        d.date = parseTime(d.date);
        d.close = +d.close;
        return d;
        }, function(error, data) {
        if (error) throw error;
        
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain(d3.extent(data, function(d) { return d.close; }));
        
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .select(".domain")
            .remove();
        
        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("close ($)");
        
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);
        });

    }
    return { 
        link: link,
        restrict: 'E'
    }
  }]);*/