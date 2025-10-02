# Deployment Instructions for Cloudflare Pages

This document provides instructions on how to deploy the Oldtree Inventory Management application to Cloudflare Pages.

## Option 1: Git Integration (Recommended)

1.  **Push code to a GitHub repository.**
2.  **Log into the Cloudflare Dashboard.**
3.  **Go to Pages > Create a project.**
4.  **Connect your GitHub repository.**
5.  **Configure build settings:**
    *   **Build command:** `npm run build`
    *   **Build output directory:** `dist`
    *   **Node version:** 18+
6.  **Deploy.**

## Option 2: Direct Upload

1.  **Build locally:**
    ```sh
    npm run build
    ```
2.  **Log into the Cloudflare Dashboard.**
3.  **Go to Pages > Create a project > Direct Upload.**
4.  **Drag and drop the `dist` folder.**
5.  **Deploy.**

## Environment Variables

No environment variables are required for this prototype, as all data is mocked.

## Custom Domain (Optional)

1.  **Configure in Cloudflare Pages settings.**
2.  **Add a CNAME record to your DNS.**