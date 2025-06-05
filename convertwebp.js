const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// --- Configuration ---
const outputDir = 'converted_images';
const webpQuality = 10; // WebP quality

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true }); // Create output directory if not exist
}

async function convertJpgtoWebp(inputFile, outputFolder, quality) {
    const fileName = path.basename(inputFile);
    const fileNameWithoutExt = path.parse(fileName).name;
    const outputFileName = `${fileNameWithoutExt}.webp`;
    const outputPath = path.join(outputFolder, outputFileName);

    if (fs.existsSync(outputPath)) {
        console.log(`Skipping "${fileName}": Webp already exists at "${outputPath}"`);
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
        console.log(`Size reduction: ${ (((originalSize - convertedSize) / originalSize) * 100).toFixed(2) }%`);

    } catch (error) {
        console.error(`Error converting image "${fileName}":`,error);
        if (error.messages.includes('Input file is missing or of an unsupported image format')) {
            console.error('Please ensure the input file path is correct and it is a valid image');
        }
    }
}

async function processJpgFilesInCurrentDirectory() {
    const currentDirectory = process.cwd(); // Get current directory

    try {
        const files = fs.readdirSync(currentDirectory);
        const jpgFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ext === '.jpg' || ext === '.jpeg';
        });

        if (jpgFiles.length === 0) {
        console.log('No JPG/JPEG found in the current directory to convert.');
        return;
        }

        console.log(`Found ${jpgFiles.length} JPG/JPEG files to convert`);
        for (const file of jpgFiles) {
            console.log(`-${file}`);
        }
        console.log(`\nConverting....\n`);

        for (const jpgFile of jpgFiles) {
            const fullPath = path.join(currentDirectory, jpgFile);
            await convertJpgtoWebp(fullPath, outputDir, webpQuality);
            console.log('---');
        }


     } catch (error) {
        console.error('Error reading directory:',error);
     }
}

// Run the function
processJpgFilesInCurrentDirectory();
