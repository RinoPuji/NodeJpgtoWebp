const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// --- Configuration ---
const inputImage = 'input.jpg'; // File name
const outputDir = 'converted_images';
const webpQuality = 1; // WebP quality

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true }); // Create output directory if not exist
}

async function convertJpgtoWebp(inputFile, outputFolder, quality) {
    const fileName = path.basename(inputFile);
    const fileNameWithoutExt = path.parse(fileName).name;
    const outputFileName = `${fileNameWithoutExt}.webp`;
    const outputPath = path.join(outputFolder, outputFileName);

    // Check output file exist
    if (!fs.existsSync(inputFile)) {
        console.error(`Error: Input file "${inputFile}" not found.`);
    }

    // Check make sure the file is JPG
    if (path.extname(inputFile).toLowerCase() !== '.jpg' && path.extname(inputFile).toLowerCase() !== '.jpeg') {
        console.error(`Error: Input file "${inputFile}" is not JPG/JPEG`);
        return;
    }

    try {
        await sharp(inputFile)
        .webp({ quality : quality})
        .toFile(outputPath)

        console.log(`Successfully converted "${fileName}" to "${outputPath}" with "${quality}" webp quality.`);

        // Compare file size
        const originalSize = fs.statSync(inputFile).size;
        const convertedSize = fs.statSync(outputPath).size;
        console.log(`Original size: ${ (originalSize / 1024).toFixed(2) } KB`);
        console.log(`Converted Webp size: ${ (convertedSize / 1024).toFixed(2) } KB`);
        console.log(`Size reduction: ${ (((originalSize - convertedSize) / originalSize) * 100).toFixed(2) } KB`);

    } catch (error) {
        console.error(`Error converting image "${fileName}":`,error);
        if (error.messages.includes('Input file is missing or of an unsupported image format')) {
            console.error('Please ensure the input file path is correct and it is a valid image');
        }
    }
}

// Run the function
convertJpgtoWebp(inputImage, outputDir, webpQuality);
