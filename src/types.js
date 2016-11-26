/* @flow */

export type Node =
  {
    type: 'translate' | 'rotate' | 'scale',
    by: [number, number, number],
    thing?: Node,
  } | {
    type: 'union' | 'hull' | 'intersection',
    of: Array<Node>,
  } | {
    type: 'difference',
    left: Node,
    right: Node,
  } | {
    type: 'cube',
    size: [number, number, number],
  } | {
    type: 'cylinder',
    height: number,
    radius: number,
  } | {
    type: 'sphere',
    radius: number,
  };
