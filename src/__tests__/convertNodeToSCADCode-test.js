/* @flow */

declare var describe: any;
declare var it: any;
declare var expect: any;

describe('convertNodeToSCADCode', () => {
  it('does stuff', () => {
    const OpenSCAD = require('../OpenSCAD');
    const convertNodeToSCADCode = require('../convertNodeToSCADCode');

    const s = new OpenSCAD();

    function symY(dy, child) {
      return s.union(...[-1, 1].map(
        dir => s.translate([0, dir * dy, 0]).thing(child)
      ));
    };

    const head = s
      .rotate([0, 15, 0])
      .difference(
        s.hull(
          s.sphere({r: .6}),
          s.translate([.5, 0, 0]).sphere({r: .3})
        ),
        symY(
          .5,
          s.translate([.2, 0, .2]).sphere({r: .11}),
        )
      );

    expect(convertNodeToSCADCode(head)).toMatchSnapshot();
  });
});
