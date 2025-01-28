const fs = require('fs');
const path = require('path');

function prettyBytes(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

class ElectronPackageAnalyzer {
  constructor(distPath) {
    this.distPath = distPath;
    this.results = {
      total: 0,
      details: [],
      byCategory: {},
    };
  }

  async analyze() {
    const files = this.getAllFiles(this.distPath);

    for (const file of files) {
      const stats = fs.statSync(file);
      const relPath = path.relative(this.distPath, file);
      const category = this.categorizeFile(relPath);

      const fileInfo = {
        path: relPath,
        size: stats.size,
        category,
        prettySize: prettyBytes(stats.size),
      };

      this.results.details.push(fileInfo);
      this.results.total += stats.size;

      if (!this.results.byCategory[category]) {
        this.results.byCategory[category] = 0;
      }
      this.results.byCategory[category] += stats.size;
    }

    for (const category in this.results.byCategory) {
      this.results.byCategory[category] = {
        size: this.results.byCategory[category],
        prettySize: prettyBytes(this.results.byCategory[category]),
        percentage: ((this.results.byCategory[category] / this.results.total) * 100).toFixed(2) + '%',
      };
    }

    return this;
  }

  getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      const fullPath = path.join(dirPath, file);

      if (fs.statSync(fullPath).isDirectory()) {
        this.getAllFiles(fullPath, arrayOfFiles);
      }
      else {
        arrayOfFiles.push(fullPath);
      }
    }

    return arrayOfFiles;
  }

  categorizeFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();

    if (filePath.includes('node_modules')) { return 'node_modules'; }
    if (filePath.includes('locales')) { return 'locales'; }
    if (ext === '.asar') { return 'asar'; }
    if (ext === '.dll') { return 'dlls'; }
    if (ext === '.exe') { return 'executables'; }
    if (['.png', '.jpg', '.jpeg', '.gif', '.svg'].includes(ext)) { return 'images'; }
    if (['.js', '.jsx', '.ts', '.tsx'].includes(ext)) { return 'scripts'; }
    if (['.css', '.scss', '.less'].includes(ext)) { return 'styles'; }
    if (['.html', '.htm'].includes(ext)) { return 'html'; }

    return 'others';
  }

  generateReport() {
    console.log('\n=== Electron包大小分析 ===');
    console.log(`\n总大小: ${prettyBytes(this.results.total)}`);

    console.log('\n按类别划分的大小:');
    Object.entries(this.results.byCategory)
      .sort((a, b) => b[1].size - a[1].size)
      .forEach(([category, info]) => {
        console.log(`${category}: ${info.prettySize} (${info.percentage})`);
      });

    console.log('\n最大的文件:');
    this.results.details
      .sort((a, b) => b.size - a.size)
      .slice(0, 10)
      .forEach((file) => {
        console.log(`${file.path}: ${file.prettySize}`);
      });
  }
}

module.exports = ElectronPackageAnalyzer;
