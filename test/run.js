var chai = require("chai");
var expect = chai.expect;
var assert = chai.assert;

const StrategyFactory = require('../delta/factory');
const factory = new StrategyFactory();
const Runner = require('../delta/runner');
var docker = require("../docker");

describe('testMain', function()
{
    before(function(done)
    {
        docker.doPull('python:2.7.13-onbuild').then(function()
        {
            done();
        });
    });
    describe('#run()', function()
    {
        this.timeout(800000);

        it('should remove git and FAKE PIE env variable', function(done) {

var example = `# Import modules from networkx and matplotlib
from networkx.drawing.nx_agraph import graphviz_layout
import matplotlib.pyplot as plot
import networkx as nx
            
# Generate the complete graph
k5 = nx.complete_graph(5)
            
# Draw using layout generated by graphviz
plot.figure()
nx.draw(k5, graphviz_layout(k5, prog="neato"))
plot.savefig('/output/graph.png')
plot.close()`;

var dockerfile = `FROM python:2.7.13
VOLUME /output
ENV MPLBACKEND Agg
RUN apt-get update
RUN apt-get install -y graphviz
RUN pip install pygraphviz
RUN pip install matplotlib
RUN pip install networkx`;

var dockerFat = `FROM python:2.7.13
VOLUME /output
ENV MPLBACKEND Agg
ENV FAKE PIE
RUN apt-get update
RUN apt-get install -y graphviz
RUN apt-get install -y git
RUN pip install pygraphviz
RUN pip install matplotlib
RUN pip install networkx`;

            (async () => {

                let strategy = await factory.get('line');
                
                let runner = new Runner("docker build -t test0:latest .", example, 'test0:latest');
                
                // Generate dockerfile
                let data = await strategy.createVariations({}, dockerFat, runner);

                expect(data).to.equal(dockerfile);
                done();
            })();

        });
    });
});