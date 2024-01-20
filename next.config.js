/** @type {import('next').NextConfig} */

module.exports = {
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		config.externals = [...config.externals, {canvas: "canvas"}]
		return config;
	  },
	typescript: {
		// disable build failure on type checking errors
		ignoreBuildErrors: true
	},
	eslint: {
		// disable build failure from linting errors
		ignoreDuringBuilds: true,
	},
	output: 'standalone' // standalone
};
