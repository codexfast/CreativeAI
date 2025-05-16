/**
 * API Configuration File
 */

const PROTOCOL = process.env.PROTOCOL || "http://";
const HOST = process.env.HOST || "192.168.1.65";
const PORT = process.env.PORT || "8000";

let BASE_URL;
if (process.env.PROD === "colab") {
    BASE_URL = "";
} else {
    const PORT_STR = PORT ? `:${PORT}` : "";
    BASE_URL = `${PROTOCOL}${HOST}${PORT_STR}`;
}

export const OUTPUT_URL = `${BASE_URL}/output/`;
export const DOWNLOAD_OUTPUT_URL = `${BASE_URL}/download/`;
export const GALLERY_URL = `${BASE_URL}/gallery/`;
export const API_URL = `${BASE_URL}/api`;

// Optional: export as default object
export default {
    OUTPUT_URL,
    DOWNLOAD_OUTPUT_URL,
    GALLERY_URL,
    API_URL
};