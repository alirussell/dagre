var _ = require("lodash"),
    expect = require("./chai").expect,
    layout = require("..").layout,
    Digraph = require("graphlib").Digraph;

describe("layout", function() {
  var g;

  beforeEach(function() {
    g = new Digraph().setGraph({});
  });

  it("can layout a single node", function() {
    g.setNode("a", { width: 50, height: 100 });
    layout(g);
    expect(extractCoordinates(g)).to.eql({
      a: { x: 50 / 2, y: 100 / 2 }
    });
    expect(g.getNode("a").x).to.equal(50 / 2);
    expect(g.getNode("a").y).to.equal(100 / 2);
  });

  it("can layout two nodes on the same rank", function() {
    g.getGraph().nodesep = 200;
    g.setNode("a", { width: 50, height: 100 });
    g.setNode("b", { width: 75, height: 200 });
    layout(g);
    expect(extractCoordinates(g)).to.eql({
      a: { x: 50 / 2,            y: 200 / 2 },
      b: { x: 50 + 200 + 75 / 2, y: 200 / 2 }
    });
  });
});

function extractCoordinates(g) {
  var nodes = g.nodes();
  return _.zipObject(_.pluck(nodes, "v"),
                     _.map(nodes, function(node) { return _.pick(node.label, ["x", "y"]); }));
}
