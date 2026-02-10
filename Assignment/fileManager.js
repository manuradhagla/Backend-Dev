const fs = require("fs");
const path = require("path");

function listDirectory(dirPath = ".") {
    try {
        const files = fs.readdirSync(dirPath);
        console.log("Directory contents:");
        files.forEach(file => console.log(file));
    } catch (err) {
        console.error("Error listing directory:", err.message);
    }
}

function readFile(filename) {
    try {
        const data = fs.readFileSync(filename, "utf8");
        console.log(data);
    } catch (err) {
        console.error("Error reading file:", err.message);
    }
}

function writeFile(filename, content) {
    try {
        fs.writeFileSync(filename, content, "utf8");
        console.log("File written successfully.");
    } catch (err) {
        console.error("Error writing file:", err.message);
    }
}

function copyFile(src, dest) {
    try {
        fs.copyFileSync(src, dest);
        console.log("File copied successfully.");
    } catch (err) {
        console.error("Error copying file:", err.message);
    }
}

function deleteFile(filename) {
    try {
        fs.unlinkSync(filename);
        console.log("File deleted successfully.");
    } catch (err) {
        console.error("Error deleting file:", err.message);
    }
}

// Simple CLI
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {
    console.log("\nFile Manager Options:");
    console.log("1. List Directory");
    console.log("2. Read File");
    console.log("3. Write File");
    console.log("4. Copy File");
    console.log("5. Delete File");
    console.log("6. Exit");

    readline.question("Enter choice: ", choice => {
        switch (choice) {
            case "1":
                readline.question("Enter directory path (default .): ", p => {
                    listDirectory(p || ".");
                    menu();
                });
                break;
            case "2":
                readline.question("Enter filename: ", f => {
                    readFile(f);
                    menu();
                });
                break;
            case "3":
                readline.question("Enter filename: ", f => {
                    readline.question("Enter content: ", c => {
                        writeFile(f, c);
                        menu();
                    });
                });
                break;
            case "4":
                readline.question("Enter source filename: ", src => {
                    readline.question("Enter destination filename: ", dest => {
                        copyFile(src, dest);
                        menu();
                    });
                });
                break;
            case "5":
                readline.question("Enter filename: ", f => {
                    deleteFile(f);
                    menu();
                });
                break;
            case "6":
                console.log("Exiting File Manager.");
                readline.close();
                break;
            default:
                console.log("Invalid choice. Try again.");
                menu();
        }
    });
}

menu();
