/* global define, require */
(function (root, factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['seriously'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('@eventstag/seriously'));
	} else {
		if (!root.Seriously) {
			root.Seriously = { plugin: function (name, opt) { this[name] = opt; } };
		}
		factory(root.Seriously);
	}
}(window, function (Seriously) {
	'use strict';

	Seriously.plugin('pixelate', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform vec2 resolution;',
				'uniform vec2 pixelSize;',

				'void main(void) {',
				'	vec2 delta = pixelSize / resolution;',
				'	gl_FragColor = texture2D(source, delta * floor(vTexCoord / delta));',
				'}'
			].join('\n');
			return shaderSource;
		},
		inPlace: true,
		inputs: {
			source: {
				type: 'image',
				uniform: 'source',
				shaderDirty: false
			},
			pixelSize: {
				type: 'vector',
				dimensions: 2,
				defaultValue: [8, 8],
				min: 0,
				uniform: 'pixelSize'
			}
		},
		title: 'Pixelate'
	});
}));
