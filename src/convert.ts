#!/usr/bin/env node

import { exportSession, fail, type Options } from "../.pi/extensions/pelmeshi.ts";

function parseArgs(argv: string[]): Options {
    const args = argv.slice(2);
    let input: string | undefined;
    let outDir = ".llm";
    let comment = "";
    let redactUser = "user";

    for (let i = 0; i < args.length; i++) {
        const a = args[i];
        if (a === "-o" || a === "--out") {
            outDir = args[++i] ?? fail(`missing value for ${a}`);
        } else if (a === "--comment") {
            comment = args[++i] ?? "";
        } else if (a === "--redact-user") {
            redactUser = args[++i] ?? fail(`missing value for ${a}`);
        } else if (a === "-h" || a === "--help") {
            process.stdout.write("Usage: pelmeshi <input> [-o <dir>] [--comment <text>] [--redact-user <name>]\n");
            process.exit(0);
        } else if (a.startsWith("-")) {
            fail(`unknown option: ${a}`);
        } else if (input) {
            fail(`unexpected extra argument: ${a}`);
        } else {
            input = a;
        }
    }

    if (!input) fail("missing <input> file");
    return { input, outDir, comment, redactUser };
}

function main(): void {
    const { input, outDir, comment, redactUser } = parseArgs(process.argv);
    const outFile = exportSession(input, outDir, comment, redactUser);
    console.log(outFile);
}

main();
