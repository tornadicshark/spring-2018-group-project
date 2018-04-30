import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './chart.html';

export default angular.module('chartApp', [angularMeteor])
.directive('lineChart', [function() {
    function link(scope, element) {
        var width = 900;
        var height = 500;

        // Use the extracted size to set the size of an SVG element.
        d3.select(element[0]).append('svg').attr("width", width).attr("height", height);

        var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 120, left: 40},
        margin2 = {top: 410, right: 20, bottom: 60, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        height2 = +svg.attr("height") - margin2.top - margin2.bottom;
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var parseTime = d3.timeParse("%Y-%m-%d");
        
        var x = d3.scaleTime().rangeRound([0, width]),
            y = d3.scaleLinear().rangeRound([height, 0]),
            x2 = d3.scaleTime().range([0, width]),
            y2 = d3.scaleLinear().range([height2, 0]);

        var xAxis = d3.axisBottom(x),
            xAxis2 = d3.axisBottom(x2),
            yAxis = d3.axisLeft(y);

        var brush = d3.brushX()
            .extent([[0, 0], [width, height2]])
            .on("brush end", brushed);

        var zoom = d3.zoom()
            .scaleExtent([1, Infinity])
            .translateExtent([[0, 0], [width, height]])
            .extent([[0, 0], [width, height]])
            .on("zoom", zoomed);
            
        var clip = g.append("defs").append("svg:clipPath")
            .attr("id", "clip")
            .append("svg:rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0)
            .attr("y", 0); 

        var Line_chart = g.append("g")
            .attr("class", "focus")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("clip-path", "url(#clip)");

        var focus = g.append("g")
            .attr("class", "focus")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var context = g.append("g")
            .attr("class", "context")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
    
        // bitcoin line
        var valueline = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.bitcoin); })
            .curve(d3.curveBasis);

        var focusLine1 = d3.line()
            .x(function (d) { return x2(d.date); })
            .y(function (d) { return y2(d.bitcoin); })
            .curve(d3.curveBasis);

        // eos line
        var valueline2 = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.eos); })
            .curve(d3.curveBasis);

        var focusLine2 = d3.line()
            .x(function (d) { return x2(d.date); })
            .y(function (d) { return y2(d.eos); })
            .curve(d3.curveBasis);

        // ethereum line
        var valueline3 = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.ethereum); })
            .curve(d3.curveBasis);

        var focusLine3 = d3.line()
            .x(function (d) { return x2(d.date); })
            .y(function (d) { return y2(d.ethereum); })
            .curve(d3.curveBasis);

        // litecoin line
        var valueline4 = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.litecoin); })
            .curve(d3.curveBasis);

        var focusLine4 = d3.line()
            .x(function (d) { return x2(d.date); })
            .y(function (d) { return y2(d.litecoin); })
            .curve(d3.curveBasis);

        // ripple line
        var valueline5 = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.ripple); })
            .curve(d3.curveBasis);

        var focusLine5 = d3.line()
            .x(function (d) { return x2(d.date); })
            .y(function (d) { return y2(d.ripple); })
            .curve(d3.curveBasis);

        d3.csv("data/all_stocks.csv", function(d) {
            d.date = parseTime(d.Date);
            //d.close = +d.Close;
            d.bitcoin = +d.Bitcoin;
            d.eos = +d.EOS;
            d.ethereum = +d.Ethereum;
            d.litecoin = +d.Litecoin;
            d.ripple = +d.Ripple;
            return d;
            }, function(error, data) {
            if (error) throw error;
            
            x.domain(d3.extent(data, function(d) { return d.date; }));  
            y.domain([0, d3.max(data, function(d) {
                return Math.max(d.bitcoin, d.eos, d.ethereum, d.litecoin, d.ripple); 
            })]);
            x2.domain(x.domain());
            y2.domain(y.domain());
            
            focus.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .select(".domain")
                .remove();
    
            focus.append("g")
                .attr("class", "axis axis--y")
                .call(yAxis)
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("USD ($)");
        
/**/
                // Add the valueline path.
                Line_chart.append("path")
                .data([data])
                .attr("class", "line1")
                .style("stroke", "blue")
                .attr("d", valueline);

                // Add the valueline2 path.
                Line_chart.append("path")
                .data([data])
                .attr("class", "line2")
                .style("stroke", "red")
                .attr("d", valueline2);

                // Add the valueline3 path.
                Line_chart.append("path")
                .data([data])
                .attr("class", "line3")
                .style("stroke", "green")
                .attr("d", valueline3);

                // Add the valueline4 path.
                Line_chart.append("path")
                .data([data])
                .attr("class", "line4")
                .style("stroke", "orange")
                .attr("d", valueline4);

                // Add the valueline5 path.
                Line_chart.append("path")
                .data([data])
                .attr("class", "line5")
                .style("stroke", "purple")
                .attr("d", valueline5);

                //focus lines start
                context.append("path")
                .datum([data])
                .attr("class", "line1")
                .style("stroke", "blue")
                .attr("d", focusLine1);

                context.append("path")
                .datum([data])
                .attr("class", "line2")
                .style("stroke", "red")
                .attr("d", focusLine2);

                context.append("path")
                .datum([data])
                .attr("class", "line3")
                .style("stroke", "green")
                .attr("d", focusLine3);

                context.append("path")
                .datum([data])
                .attr("class", "line4")
                .style("stroke", "orange")
                .attr("d", focusLine4);

                context.append("path")
                .datum([data])
                .attr("class", "line5")
                .style("stroke", "purple")
                .attr("d", focusLine5);

                // focus lines end 
                
                context.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height2 + ")")
                .call(xAxis2);

                context.append("g")
                .attr("class", "brush")
                .call(brush)
                .call(brush.move, x.range());

                g.append("rect")
                .attr("class", "zoom")
                .attr("width", width)
                .attr("height", height)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(zoom);
        });

        function brushed() {
            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
            var s = d3.event.selection || x2.range();
            x.domain(s.map(x2.invert, x2));
            Line_chart.select(".line").attr("d", valueline);
            Line_chart.select(".line2").attr("d", valueline2);
            Line_chart.select(".line3").attr("d", valueline3);
            Line_chart.select(".line4").attr("d", valueline4);
            Line_chart.select(".line5").attr("d", valueline5);
            focus.select(".axis--x").call(xAxis);
            svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
                .scale(width / (s[1] - s[0]))
                .translate(-s[0], 0));
          }
          
          function zoomed() {
            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
            var t = d3.event.transform;
            x.domain(t.rescaleX(x2).domain());
            Line_chart.select(".line1").attr("d", valueline);
            Line_chart.select(".line2").attr("d", valueline2);
            Line_chart.select(".line3").attr("d", valueline3);
            Line_chart.select(".line4").attr("d", valueline4);
            Line_chart.select(".line5").attr("d", valueline5);
            focus.select(".axis--x").call(xAxis);
            context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
          }
          
          function type(d) {
            d.Date = parseDate(d.Date);
            d.bitcoin = +d.bitcoin;
            d.eos = +d.eos;
            d.ethereum = +d.ethereum;
            d.litecoin = +d.litecoin;
            d.ripple = +d.ripple;
            return d;
          }

    }
    return { 
        link: link,
        restrict: 'E'
    }
}]);