/* @flow */

import type {Node} from './types';

function getRootNode(s: OpenSCAD): Node {
  if (!s.root) {
    throw new Error('root not defined');
  }
  return s.root;
}

class OpenSCAD {
  root: ?Node;
  node: Node | {type: 'root'};

  constructor(root: ?Node, node: ?Node) {
    this.root = root;
    this.node = node || {type: 'root'};
  }

  translate(by: [number, number, number]): OpenSCAD {
    return this._wrap({type: 'translate', by});
  }

  rotate(by: [number, number, number]): OpenSCAD {
    return this._wrap({type: 'rotate', by});
  }

  scale(by: [number, number, number]): OpenSCAD {
    return this._wrap({type: 'scale', by});
  }

  hull(...of: Array<Node>): Node {
    return getRootNode(this._wrap({type: 'hull', of}));
  }

  union(...of: Array<Node>): Node {
    return getRootNode(this._wrap({type: 'union', of}));
  }

  intersection(...of: Array<Node>): Node {
    return getRootNode(this._wrap({type: 'intersection', of}));
  }

  difference(left: Node, right: Node): Node {
    return getRootNode(this._wrap({type: 'difference', left, right}));
  }

  cube(size: [number, number, number]): Node {
    return getRootNode(this._wrap({type: 'cube', size}));
  }

  cylinder({h, r}: {h: number, r: number}): Node {
    return getRootNode(this._wrap({type: 'cylinder', height: h, radius: r}));
  }

  sphere({r}: {r: number}): Node {
    return getRootNode(this._wrap({type: 'sphere', radius: r}));
  }

  thing(child: Node): Node {
    return getRootNode(this._wrap(child));
  }

  _wrap(child: Node): OpenSCAD {
    (this.node: any).thing = child;
    return new OpenSCAD(this.root || child, child);
  }
}

module.exports = OpenSCAD;
