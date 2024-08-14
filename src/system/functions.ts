import subprocess from "node:child_process";

function runLock() {
  subprocess.exec("hyprlock", (error, stdout, stderr) => {});
}

function runPoweroff() {
  subprocess.exec("poweroff", (error, stdout, stderr) => {});
}


export { runLock, runPoweroff };
