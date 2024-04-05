import { Elysia } from "elysia";
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import * as fs from "fs";
import { mkdir } from 'node:fs/promises';
const { spawn } = require('child_process');

export const filesystemRoutes = new Elysia()

filesystemRoutes.post("/filelist", async (context)=>{
  const { path } =  context.body as { path: string };
  const files = await getFiles(path);
  const filesWithoutHidden = files.filter(file => !file.startsWith('.'));
  const makeFileObject = (file: string) => {
    return {
      name: file.split('/').pop(),
      path: file,
      // i want the type if its folder or file
      type: file.split('/').pop()?.includes('.') ? 'file' : 'folder',
    };
  }
  return filesWithoutHidden.map(makeFileObject).filter(file=>!file.name?.startsWith('.'));
})

// make me a route to create a folder , i'm using bun
filesystemRoutes.post("/createfolder", async (context)=>{
  const { path, name } = context.body as { path: string, name: string };
  const folderPath = join(path, name);
  try {
    await mkdir(folderPath);
    return { success: true };
  } catch (err) {
    console.error("Error creating folder:", err);
    return { success: false };
  }
})

filesystemRoutes.post("/rename", async (context)=>{
  const { path, name } = context.body as { path: string, name: string };
  const oldPath = path;
  const newPath = join(path.split("/").slice( 0,-1 ).join("/"),name)
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error("Error renaming folder:", err);
    } else {
      console.log("Folder renamed successfully!");
    }
  });
  return { success: true };
})

filesystemRoutes.post("/delete", async (context)=>{
  const { path } = context.body as { path: string };
  // if its a file or a directory
  fs.rm(path, { recursive: true }, (err) => {
    if (err) {
      console.error("Error deleting folder:", err);
    } else {
      console.log("Folder deleted successfully!");
    }
  })
  return { success: true };
})

// execute commands 
filesystemRoutes.post("/execute", async (context)=>{
  const { command } = context.body as { command: string };

  return new Promise((resolve, reject) => {
    const child = spawn('/bin/sh', ['-c', command]);

    let stdoutData = '';
    let stderrData = '';

    child.stdout.on('data', (data:any) => {
      stdoutData += data;
      console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', (data:any) => {
      stderrData += data;
      console.error(`stderr: ${data}`);
    });

    child.on('close', (code:any) => {
      console.log(`child process exited with code ${code}`);
      if (code === 0) {
        resolve(stdoutData); // Resolve with stdout data
      } else {
        reject(stderrData); // Reject with stderr data
      }
    });

    child.on('error', (err:any) => {
      console.error(`Error occurred: ${err}`);
      reject(err); // Reject with error
    });
  });
});





async function getFiles(directoryPath:string) {
  try {
    const fileNames = await readdir(directoryPath);
    const filePaths = fileNames.map(fileName => join(directoryPath, fileName));
    return filePaths;
  } catch (err) {
    console.error("Error reading directory:", err);
    return []; // Handle or return an empty array on error
  }
}
