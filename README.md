# TypeScript Playground
This is my typescript playground.

### Environments
I use the following environment:

    % node --version
    v9.11.1
    % npm --version
    5.6.0

### Setup
First of all I need to setup the project:

    npm init

Install the typescript compiler:

    npm install --save-dev typescript

My typescript:

    % ./node_modules/.bin/tsc --version
    Version 2.8.1

Create new `src` directory to place all the typescript
files.

### My First code
Ok, my goal is to create a simple command line app.

My expectation is like the following:

    src/index.ts -> compile -> dist/index.js

Is it true? let's find out.

Btw how to write a main function in TypeScript?

The documentation about the function is available
[here](https://www.typescriptlang.org/docs/handbook/functions.html).

hmmm TS is a superset of JS, so the way function declared
is the same:

```js
// Main function
function main() {
    console.log("Hello")
}

main();
```

Let's compile the `src/index.ts` to `dist/index.js`:

    ./node_modules/.bin/tsc src/index.ts --outDir dist

okay, use the following command to run the compiled
code:

    node dist/index.js