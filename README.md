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


### Unit Test
Currently we assume that our CLI app only is used only
when `NAME` is not supplied and `NAME` is supplied.

- What about the optional argument `--age`? how to get the value?
- What if there is a invalid optinal argument? such as `--dummy` etc.

So we have the following scenarios:

```
# Required first usage
$ hello bayu --age 10
$ hello bayu --age=10

# Optional first usage
$ hello --age 10 bayu
$ hello --age=10 bayu

# Invalid options
$ hello bayu --dummy value
$ hello --dummy=value bayu
```

I think we can transform this scenario into unit test.
Given an array of string, returns the parsed argument.

    ["bayu", "--age", 10] -> {"name": "bayu", "age": 10}
    ["--age", 10, "bayu"] -> {"name": "bayu", "age": 10}

How to write unit test in typescript?

hmmm.

Let's try using [Jest](https://facebook.github.io/jest/docs/en/getting-started.html)
first.

Setup Jest for our typescript project first. Install the required
packages:

    npm install --save-dev jest ts-jest @types/jest


Add the following config to `package.json`:

```
"jest": {
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ]
}
```

Create new file `tsconfig.json` with the following content:

```
{
    "compilerOptions": {
        "module": "commonjs",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "outDir": "./dist",
        "sourceMap": true
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ]
}
```

`tsconfig.json` is a compiler options, so we can run `tsc`
without any argument and it will compile as configured:

    ./node_modules/.bin/tsc

`tsconfig.json` is also required by
[ts-jest](https://github.com/kulshekhar/ts-jest#usage).

Ok. Let's try the `jest` first:

    % ./node_modules/.bin/jest
    No tests found
    In /Users/pyk/pyk/typescript-playground
    9 files checked.
    testMatch:  - 9 matches
    testPathIgnorePatterns: /node_modules/ - 9 matches
    testRegex: (/__tests__/.*|(\.|/)(test|spec))\.(jsx?|tsx?)$ - 0 matches
    Pattern:  - 0 matches

You will see that `jest` have not found a test yet. So, let's
create a new one.

Suppose we want to test the following function:

```typescript
function hello(name: string): string {
    return `Hello ${name}`;
}

export { hello };
```

add the code above to `src/cli.ts`.

The next step is to write a test function for it.
Create new file `src/cli.spec.ts` with the following
content:

```typescript
// Import module
import * as cli from "./cli";

test("hello('bay') should returns 'Hello bay'", () => {
    expect(cli.hello("bay")).toBe("Hello bay");
})
```

And run the `jest`:

    % ./node_modules/.bin/jest
    PASS  src/cli.spec.ts
    ✓ hello('bay') should returns 'Hello bay' (3ms)

    Test Suites: 1 passed, 1 total
    Tests:       1 passed, 1 total
    Snapshots:   0 total
    Time:        2.316s
    Ran all test suites.

NICE!!!

Btw we can add this scripts to `package.json`:

```
  "scripts": {
    "test": "./node_modules/.bin/jest",
    "build": "./node_modules/.bin/tsc"
  }
```

Usage:

    npm run test
    npm run build
