/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ['lh3.googleusercontent.com'] },
  experimental: { serverComponentsExternalPackages: ['@google/generative-ai'] },
}
export default nextConfig
