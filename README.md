# NodeJpgtoWebp
This is just my personal script to convert Jpg to Webp.

### To do
- [x] Auto find jpeg file without rename it to `input.jpg` in directory 
- [x] Convert multiple jpg/jpeg file in one process
- Add another file type
  - [ ] PNG

## Instruction
1. Whatever machine or OS we using,make sure node is installed.
- https://nodejs.org/en/download
2. Create a new directory,cd to the directory and init y.
```batch
mkdir C:\Users\Rin0\Desktop\Test
```
```batch
cd C:\Users\Rin0\Desktop\Test
```
```batch
npm init -y
```
3. This is script required `sharp` module.
```batch
npm install sharp
```
4. Put the `convertwebp.js` script to folder "Test" or you can create new directory/file,for example `Test\WebpConverter\`
5. Put the jpeg inside `convertwebp.js` folder and ~rename it to `input.jpg/jpeg`~ run the script.
6. Run the script
```batch
node convertwebp.js
```
7.`converted_images` folder will be generated.All converted image will be save on this fle.

### Optional
Adjust the the quality of the output,inside `convertwebpp.js` script,find this line : 
```js
const webpQuality = 1; // WebP quality
```

