const simpleGit = require("simple-git");
const fs = require("fs");
const path = require("path");

const REPO_PATH = path.resolve(__dirname); // Set your repo path
const FILE_PATH = path.join(REPO_PATH, "contribution.txt");
const git = simpleGit(REPO_PATH);

// Function to update file content
function updateFile() {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(FILE_PATH, `Commit at: ${timestamp}\n`);
}

// Function to commit and push
async function commitAndPush() {
  updateFile();
  await git.add(FILE_PATH);
  await git.commit(`Auto commit at ${new Date().toISOString()}`);
  await git.push("origin", "main");
  console.log("Committed & pushed successfully.");
}

// Run the script 10 times with intervals
async function runCommits() {
  for (let i = 0; i < 10; i++) {
    await commitAndPush();
    await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 sec interval
  }
}

runCommits().catch(console.error);
