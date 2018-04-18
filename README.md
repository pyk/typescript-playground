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

### My First function
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
    console.log("Hello");
}

main();
```

Let's compile the `src/index.ts` to `dist/index.js`:

    ./node_modules/.bin/tsc src/index.ts --outDir dist

okay, use the following command to run the compiled
code:

    node dist/index.js

### TypeScript in Node
The next step is, how to get the process arguments?

We want to build the following CLI app:

    hello NAME --age=12

it should accept required argument `NAME` and optional
argument `--age`.

We will use [`process`](https://nodejs.org/docs/latest/api/process.html)
a global module that available in node.

```js
// Main function
function main() {
    console.log(process.argv);
}

main();
```

Let's compile this code:

    % ./node_modules/.bin/tsc src/index.ts --outDir dist
    src/index.ts(3,17): error TS2304: Cannot find name 'process'.

ouh, error happen: `Cannot find name 'process'`.

Why? what happen?

Oh typescript need a type definition, there is a
repository called [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
that contains a high quality TypeScript type definitions.

So I need to get the node type definition using the
following command:

    npm install --save-dev @types/node

Let's try to compile again:

    ./node_modules/.bin/tsc src/index.ts --outDir dist

nice, no error.

Let's run the compiled javascript:

    % node dist/index.js
    [ '/usr/local/Cellar/node/9.11.1/bin/node',
      '/Users/pyk/pyk/typescript-playground/dist/index.js' ]

OK.

Btw the `process` in typescript is defined
[here](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/fd7bea617cc47ffd252bf90a477fcf6a6b6c3ba5/types/node/index.d.ts#L72).

Ok, let's continue the CLI App.


### Variable in TypeScript
We need to store the required argument in variable. The documentation
about variable in typescript is available
[here](https://www.typescriptlang.org/docs/handbook/variable-declarations.html).

TLDR:
- Use `let` to represent a mutable variable.
- Use `const` to represent a immutable variable.

OK.

```js
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
```

Compile the code:

    ./node_modules/.bin/tsc src/index.ts --outDir dist

Run the compiled javacript:

    % node dist/index.js
    Argument name is required

    % node dist/index.js bayu
    Hello bayu

Nice.