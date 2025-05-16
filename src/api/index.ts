/**
 * API Configuration File
 */

// const PROTOCOL = "http://"
// const HOST = "192.168.1.65"
// const PORT = "8000"

const PROTOCOL = "https://"
const HOST = "b32e-34-16-162-100.ngrok-free.app"
const PORT = null
// 

const BASE_URL = `${PROTOCOL}${HOST}:${PORT?? ""}`;

export const OUTPUT_URL = `${BASE_URL}/output/`;
export const DOWNLOAD_OUTPUT_URL = `${BASE_URL}/download/`;
export const GALLERY_URL = `${BASE_URL}/gallery/`;
export const API_URL = `${BASE_URL}/api`;