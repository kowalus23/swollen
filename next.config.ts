import type { NextConfig } from "next";

export const backendUrl = process.env.NODE_ENV === "development" ? "http://localhost:3333" : "https://api.swollen.pl";

const nextConfig: NextConfig = {
	webpack(config, { isServer }) {
		// Handle SVG imports
		config.module.rules.push({
			test: /\.svg$/i,
			use: ["@svgr/webpack"],
		});

		// Handle Supabase realtime client for server-side
		if (isServer) {
			config.externals = config.externals || [];
			config.externals.push({
				"utf-8-validate": "commonjs utf-8-validate",
				bufferutil: "commonjs bufferutil",
			});
		}

		// Ignore critical dependency warnings for Supabase
		config.ignoreWarnings = [
			{
				module: /node_modules\/@supabase\/realtime-js/,
			},
			{
				message: /Critical dependency: the request of a dependency is an expression/,
			},
		];

		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	rewrites: async () => {
		return [
			{
				source: "/api/:path*",
				destination: `${backendUrl}/:path*`,
			},
		];
	},
};

export default nextConfig;
