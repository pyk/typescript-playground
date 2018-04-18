// Main function
function main() {
    // If required argument is not supplied then
    // exit the CLI
    if (process.argv.length <= 2) {
        console.error("Argument name is required");
        process.exit(1);
    }

    // We assume the argument is supplied using the
    // following format:
    // $ hello name
    // How to define a variable in typescript?
    const name = process.argv[2];
    console.log(`Hello ${name}`);

}

main();
