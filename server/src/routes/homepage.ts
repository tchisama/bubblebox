
import { Elysia } from "elysia";
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { mkdir } from 'node:fs/promises';
import * as fs from "fs";
import diskusage from 'diskusage';
import path from "path";

export const homePage = new Elysia()


function calculateCPUUsage(cpuData:any) {
  let totalIdle = 0;
  let totalTick = 0;

  cpuData.forEach(( cpu:any ) => {
    for (let type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  });

  const totalCPUTime = totalTick / cpuData.length;
  const totalIdleTime = totalIdle / cpuData.length;
  const totalUsage = totalCPUTime - totalIdleTime;

  const percentageCPU = 100 - Math.floor(100 * totalIdleTime / totalCPUTime);

  // Calculate GHz used
  const totalGHz = totalCPUTime / 1e6; // Convert from MHz to GHz
  const usedGHz = totalUsage / 1e6; // Convert from MHz to GHz

  const cpuUsage = Math.round(percentageCPU);

  const cpuInfo = `Used ${usedGHz.toFixed(2)} GHz out of ${totalGHz.toFixed(2)} GHz`;

  return {
    cpuUsage,
    cpuInfo
  };

}


const os = require('os');
function calculateMemoryUsage() {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const memoryUsagePercentage = Math.round((usedMemory / totalMemory) * 100);
  const memoryInfo = `Used ${bytesToGB(usedMemory)} GB out of ${bytesToGB(totalMemory)} GB`;

  return {
    memoryUsage: memoryUsagePercentage,
    memoryInfo: memoryInfo
  };
}


function calculateStorageUsage(dirPath = '/') {
    return new Promise((resolve, reject) => {
        let totalSize = 0;

        function traverseDirectory(currentPath:any) {
            try {
                const files = fs.readdirSync(currentPath);
                files.forEach(file => {
                    const filePath = path.join(currentPath, file);
                    const stats = fs.statSync(filePath);
                    if (stats.isDirectory()) {
                        traverseDirectory(filePath);
                    } else {
                        totalSize += stats.size;
                    }
                });
            } catch (err) {
                reject(err);
            }
        }

        traverseDirectory(dirPath);

        const totalGB = bytesToGB(totalSize);
        resolve(totalGB);
    });
}




function bytesToGB(bytes:number) {
  return (bytes / Math.pow(1024, 3)).toFixed(2);
}







homePage.get("/cpu", async (context)=>{
  const os = require('os');
  const cpu = os.cpus();
  return calculateCPUUsage(cpu);
})
homePage.get("/memory", async (context)=>{
  return calculateMemoryUsage();
})
homePage.get("/storage", async (context)=>{
  return calculateStorageUsage("/").then(res=>{
    return res;
  })
})

