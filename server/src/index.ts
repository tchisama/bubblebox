import { Elysia } from "elysia";
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { cors } from '@elysiajs/cors'
import * as fs from "fs";
import { mkdir } from 'node:fs/promises';
const app = new Elysia()
    .use(cors())



// something

app.post("/filelist", async (context)=>{
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
app.post("/createfolder", async (context)=>{
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

app.post("/rename", async (context)=>{
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

app.post("/delete", async (context)=>{
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
app.post("/execute", async (context)=>{
  const { command } = context.body as { command: string };
  const exec = require('child_process').exec;
  const output = await exec(command, (err: any, stdout: any, stderr: any) => {
    if (err) {
      console.error(err);
      return stderr;
    }
    return stdout
  });
  return JSON.stringify(output)
})



app.listen(8080);









console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);





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


