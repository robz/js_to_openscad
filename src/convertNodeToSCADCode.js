/* @flow */

import type {Node} from './types';

function convertNodeToSCADCode(node: ?Node, tabs: string = ''): string {
  if (!node) {
    throw new Error('node not defined');
  }

  const internalTabs = tabs + '  ';

  switch (node.type) {
    case 'hull':
    case 'union':
    case 'intersection': {
      const internal = node.of
        .map(thing => convertNodeToSCADCode(thing, internalTabs))
        .join('\n\n');
      return `${tabs}${node.type}() {\n${internal}\n${tabs}}`;
    }

    case 'difference': {
      const internal =
        convertNodeToSCADCode(node.left, internalTabs) +
        '\n\n' +
        convertNodeToSCADCode(node.right, internalTabs);
      return `${tabs}difference() {\n${internal}\n${tabs}}`;
    }

    case 'rotate':
    case 'translate':
    case 'scale':
      const post = convertNodeToSCADCode(node.thing, tabs);
      return `${tabs}${node.type}([${node.by.join(', ')}])\n` + post;

    case 'cylinder':
      return `${tabs}cylinder(h = ${node.height}, r = ${node.radius});`;

    case 'sphere':
      return `${tabs}sphere(r = ${node.radius});`;

    case 'cube':
      return `${tabs}cube([${node.size.join(', ')}]);`;

  }

  throw new Error('unknown type', node.type);
}

module.exports = convertNodeToSCADCode;
