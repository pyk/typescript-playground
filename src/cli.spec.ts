// Import module
import * as cli from "./cli";

test("hello('bay') should returns 'Hello bay'", () => {
    expect(cli.hello("bay")).toBe("Hello bay");
})
