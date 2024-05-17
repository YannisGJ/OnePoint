/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["startefacts.com"],
    },
    remotePatterns: [
        {
            protocol: "https",
            hostname: "startefacts.com",
            port: "",
            pathname: "/k2/**",
        },
    ],
};

export default nextConfig;
