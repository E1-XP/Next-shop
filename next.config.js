/** @type {import('next').NextConfig} */

const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./src/app/_i18n/index.ts"
);

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "avatars.githubusercontent.com"],
  },
};

module.exports = withNextIntl(nextConfig);
