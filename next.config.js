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
	images: {
		domains: ['luma-dev.s3.us-east-2.amazonaws.com'],
	  },
	output: 'standalone' // standalone or minimal-ui
};
