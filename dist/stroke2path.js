"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processSVG = processSVG;
const fs = __importStar(require("fs"));
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
// Function to display help
function showHelp() {
    console.log(`
    stroke2path: Converts SVG strokes to paths using Inkscape, ideal for icon font generators like IcoMoon and Fontello.

    Usage: stroke2path [options] <input-directory> [output-directory]

    Options:
      -h, --help    Show this help message

    Arguments:
      input-directory     The directory containing SVG files to process
      output-directory    (Optional) The directory to save processed SVG files (default: svg_path)

    Example:
      stroke2path . output_dir
      # Processes all SVG files in the current directory ('.') and saves the processed files in 'output_dir'.

    GitHub: https://github.com/CavalcanteLeo/stroke2path
  `);
}
// Function to display error message with styling
function showError(message) {
    console.error(`\x1b[1;31;40mError: ${message}\x1b[0m`);
}
// Function to detect operating system and display appropriate install instructions
function showInstallInstructions() {
    switch (process.platform) {
        case 'linux':
            console.log('On Linux, you can install Inkscape using your package manager.');
            console.log('For example, on Ubuntu: sudo apt-get install inkscape');
            break;
        case 'darwin':
            console.log('On macOS, you can install Inkscape using Homebrew:');
            console.log('  brew install --cask inkscape');
            break;
        case 'win32':
            console.log('On Windows, you can download Inkscape from https://inkscape.org/release/');
            break;
        default:
            console.error('Error: Unsupported operating system.');
    }
}
// Function to install Inkscape
function installInkscape() {
    switch (process.platform) {
        case 'linux':
            console.log('Installing Inkscape on Linux...');
            (0, child_process_1.execSync)('sudo apt-get install inkscape');
            break;
        case 'darwin':
            console.log('Installing Inkscape on macOS...');
            (0, child_process_1.execSync)('brew install --cask inkscape');
            break;
        case 'win32':
            console.log('Download Inkscape for Windows from https://inkscape.org/release/');
            break;
        default:
            console.error('Error: Unsupported operating system.');
    }
}
// Main function to process SVG files
function processSVG(inputDir, outputDir) {
    if (!outputDir) {
        outputDir = inputDir;
    }
    const isSameDir = inputDir === outputDir;
    // Check if Inkscape is installed
    try {
        (0, child_process_1.execSync)('inkscape --version');
    }
    catch (error) {
        // throw new Error('Inkscape is not installed.');
        console.error('Inkscape is not installed.');
    }
    // Check if input directory is provided
    if (!inputDir || !fs.existsSync(inputDir)) {
        console.error('No input directory provided or directory does not exist.');
        // throw new Error('No input directory provided or directory does not exist.');
    }
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    // Iterate over all SVG files in the provided directory
    const svgFiles = fs
        .readdirSync(inputDir)
        .filter((file) => file.endsWith('.svg'));
    svgFiles.forEach((file) => {
        const inputFile = path.join(inputDir, file);
        const outputFile = path.join(outputDir, isSameDir ? '_modified_' + file : file);
        try {
            (0, child_process_1.execSync)(`inkscape --actions="select-all;selection-ungroup;select-all;selection-ungroup;select-all;object-stroke-to-path;" --export-filename="${outputFile}" "${inputFile}"`);
            console.log(`Done processing ${inputFile}`);
        }
        catch (error) {
            console.error(`Failed to process ${inputFile}`);
            console.error(error);
            // Handle specific errors here
            // throw new Error(`Failed to process ${inputFile}`);
        }
    });
}
// Entry point: Check if script is run directly and execute processSVG if needed
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.includes('-h') || args.includes('--help')) {
        showHelp();
    }
    else {
        const inputDir = args[0];
        const outputDir = args[1];
        processSVG(inputDir, outputDir);
    }
}
