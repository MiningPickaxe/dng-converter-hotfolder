# dng-converter-hotfolder
## Abstract
This highly configurable node.js script adds hotfolder support to the Adobe DNG Converter.
I use software to automatically transfer shot images from my camera to my computer, but my Camera Raw is too old for the new RAW formats. I just point the download path of the files to the hotfolder and automatically get converted DNGs I can open.
Should work on macOS and Windows, although it has only been validated for Windows at this time. I will try it on macOS next week and report back.

## Installation
Installation is pretty straight forward:
1. Install the free [Adobe DNG Converter](https://helpx.adobe.com/de/photoshop/using/adobe-dng-converter.html)
2. Install [Node.js](https://nodejs.org/en/download/). This has only been tested with v10.11.0 but *should* work on previous versions as well
3. Clone or download this repository
4. Open cmd or Terminal and navigate to the downloaded code, run `npm install`
5. Edit the config.json (**Mandatory**)

## Configuration
It is important to change the configuration as the default values will probably work for nobody out of the box.
The config needs to be in valid json format.

- **verbose** (Default: *false*): Set this to true to see more information during the process, reports when it starts to convert an image, when it stops, how long it took and wether the file got moved or deleted.
- **watchPath**: This is the path to the folder that should be monitored. By default it will also monitor subdirectories. On Windows use the Format `Driveletter:/folder1/folder2` (Yes forward-slash works), on macOS use the usual `/folder1/folder2` format.
- **resultPath**: This is the path to the folder that should contain the converted images. Make sure this path already exists. Same rules for formatting apply as for `watchPath`.
- **originalsPath**: This is the path to the folder where already converted images go. Make sure this path already exists. Same rules for formatting apply as above.
- **dngConverterBin**: If you did not change the installation path of the Adobe DNG Converter, this should already work out of the box. For macOS Users: `/Applications/Adobe DNG Converter.app/Contents/MacOS/Adobe DNG Converter`
- **dngConverterArgs**: This is an array of the arguments passed to the Adobe DNG Converter. For reference vist [this link](https://wwwimages2.adobe.com/content/dam/acom/en/products/photoshop/pdfs/dng_commandline.pdf). Do not set `-d` as this is automatically done via resultPath.
- **deleteConverted** (Default: *false*): ***CAUTION*** This is a dangerous option and should only be turned on if you have a copy of the images you put in the watchPath folder. After conversion of the image, it gets deleted instead of moved into the originalsPath folder. *If the conversion fails, the image is deleted as well.* As I don't use this option, I didn't implement it in a way that does not delete failed attempts. Feel free to create a pull request if you want to fix this.
- **chokidarStabilityThreshold** and **chokidarPollInterval**: This is a option to control the checks for new images. As RAW images are rather large it takes some time to copy them and we don't want to start the conversion process on a file that is not completed yet. To avoid this, we check the size of the files every `chokidarPollIntervall` miliseconds and if it doesn't change over the course of `chokidarStabilityThreshold` miliseconds, it is considered completed. *The default values should work just fine for you, if you experience multiple failed attempts, you might need to change these values*

## Usage
Just execute `node index.js` to start the script (Or adjust the path to index.js when running the command from outside the folder). 

## Other notes
Files that failed to get converted (maybe not a raw or failed transmission/copy) will get moved to the originals path, a message in the console will appear with the name of the file to notify you of the failed attempt. If you enable `deleteConverted` make sure you read the description of that option.
This script can run indefinitly and monitor the folder or you start it with the folder already populated, it doesn't matter.

If you want to help improve this script, feel free to create pull requests.
If there are any other bugs, please create an issue.
