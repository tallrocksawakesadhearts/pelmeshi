import { existsSync, realpathSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const __filename = realpathSync(fileURLToPath(import.meta.url));
const sessionModule: any = await import(new URL("../../src/session.ts", `file://${__filename}`).href);
const exportSession = sessionModule.exportSession as typeof import("../../src/session.ts")["exportSession"];

export default function pelmeshi(pi: ExtensionAPI) {
    pi.registerCommand("pelmeshi", {
        description: "Export current session to .llm/",
        handler: async (args, ctx) => {
            const sessionFile = ctx.sessionManager.getSessionFile();
            if (!sessionFile) {
                ctx.ui.notify("No session file to export", "error");
                return;
            }
            if (!existsSync(sessionFile)) {
                ctx.ui.notify("Session not written yet — send a message first", "error");
                return;
            }

            ctx.ui.setStatus("pelmeshi", "exporting…");
            const comment = args.trim();
            let out: string;
            try {
                out = await exportSession(sessionFile, resolve(ctx.cwd, ".llm"), comment, "user");
            } catch (e) {
                ctx.ui.setStatus("pelmeshi", "");
                ctx.ui.notify(`pelmeshi failed: ${e instanceof Error ? e.message : String(e)}`, "error");
                return;
            }
            ctx.ui.setStatus("pelmeshi", "");
            ctx.ui.notify(`exported -> ${out}`, "info");
        },
    });
}
