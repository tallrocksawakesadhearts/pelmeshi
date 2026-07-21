import { existsSync } from "node:fs";
import { resolve } from "node:path";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { exportSession } from "../../src/session.ts";

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
