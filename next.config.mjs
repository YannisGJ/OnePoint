import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["startefacts.com", "avatars.steamstatic.com"],
    },
    remotePatterns: [
        {
            protocol: "https",
            hostname: "startefacts.com",
            port: "",
            pathname: "/k2/**",
        },
        {
            protocol: "https",
            hostname: "avatars.steamstatic.com",
            port: "",
            pathname: "/**",
        },
    ],
};

export default nextConfig;
