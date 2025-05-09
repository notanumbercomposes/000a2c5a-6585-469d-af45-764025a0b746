/*
IMPORTANT NOTICE: DO NOT REMOVE
This is a script that generates an image and saves it to the assets folder. 
You should not use this script unless the user EXPLICITLY asks you to generate an asset.
DO NOT PROACTIVELY GENERATE ASSETS FOR THE USER.

You will need to update the prompt and the options (2nd parameter of the generateImage function) depending on your use case.
options: {
  size?: "1024x1024" | "1536x1024" | "1024x1536" | "auto";
  quality?: "low" | "medium" | "high" | "auto";
  format?: "png" | "jpeg" | "webp";
  background?: undefined | "transparent";
}

If you need to generate many assets, REFACTOR THIS SCRIPT TO CONCURRENTLY GENERATE UP TO 3 ASSETS AT A TIME. If you do not, the bash tool may time out.
use npx tsx generate-asset-script.ts to run this script.
*/

import { generateImage } from './src/api/image-generation';
import * as fs from 'fs';
import * as path from 'path';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

async function downloadImage(url: string, outputPath: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
  }
  
  const fileStream = fs.createWriteStream(outputPath);
  // @ts-ignore - Node.js types are not fully compatible with the fetch API
  await finished(Readable.fromWeb(response.body).pipe(fileStream));
  console.log(`Image downloaded successfully to ${outputPath}`);
}

async function main() {
  try {
    //update this to
    const prompt = "describe the asset you want to generate";
    
    console.log("Generating image with prompt:", prompt);
    const imageUrl = await generateImage(prompt, {
      size: "1024x1024", 
      quality: "high",
      format: "png"
    });
    
    console.log("Image generated successfully. URL:", imageUrl);
    
    const outputPath = path.join(__dirname, 'assets', 'japanese-art-logo.png');
    await downloadImage(imageUrl, outputPath);
    
    console.log("Process completed successfully");
    console.log("Image URL:", imageUrl);
    console.log("Image saved to:", outputPath);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();