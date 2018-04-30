import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './chart.html';

export default angular.module('chartApp', [angularMeteor])
.directive('lineChart', [function() {
    function link(scope, element) {
        var width = 900;
        var height = 400;

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
        /*
        var line = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.close); })
            .curve(d3.curveBasis);*/

        // bitcoin line
        var valueline = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.bitcoin); })
            .curve(d3.curveCardinal);

        // eos line
        var valueline2 = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.eos); })
            .curve(d3.curveCardinal);

        // ethereum line
        var valueline3 = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.ethereum); })
            .curve(d3.curveCardinal);

        // litecoin line
        var valueline4 = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.litecoin); })
        .curve(d3.curveCardinal);

        // ripple line
        var valueline5 = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.ripple); })
            .curve(d3.curveCardinal);

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
                .text("USD ($)");

                // Add the valueline path.
                g.append("path")
                .data([data])
                .attr("class", "line")
                .attr("d", valueline);

                // Add the valueline2 path.
                g.append("path")
                .data([data])
                .attr("class", "line")
                .style("stroke", "red")
                .attr("d", valueline2);

                // Add the valueline3 path.
                g.append("path")
                .data([data])
                .attr("class", "line")
                .style("stroke", "green")
                .attr("d", valueline3);

                // Add the valueline4 path.
                g.append("path")
                .data([data])
                .attr("class", "line")
                .style("stroke", "orange")
                .attr("d", valueline4);

                // Add the valueline5 path.
                g.append("path")
                .data([data])
                .attr("class", "line")
                .style("stroke", "purple")
                .attr("d", valueline5);

                var focus = g.append("g")
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
                    focus.attr("transform", "translate(" + x(d.date) + "," + y(d.bitcoin) + ")");
                    focus.select("text").text(formatCurrency(d.bitcoin));
                }
        });

    }
    return { 
        link: link,
        restrict: 'E'
    }
}]);