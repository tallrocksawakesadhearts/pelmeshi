# pelmeshi

Acronym for "**P**rompt & **E**xchange **L**anguage **M**odel **E**fficient **S**ession **H**istory **I**ndex" yyyyeeah.

Personal tool I built to truncate and log and pi agent sessions into `.llm` for a searchable catalogue

## Installation

```bash
pi install git:github.com/caryph/pelmeshi
pi       # open pi agent
/reload  # reload extensions
```

Then you can access the command:

```bash
/pelmeshi            # quick export
/pelmeshi <comment>  # export with comment
```

### Library/CLI
Alternatively, install as a CLI tool:

```bash
npm i -g github:caryph/pelmeshi
pelmeshi <path/to/session.jsonl> [-o <output_dir>] [--comment <text>] [--redact-user <name>]
```

## Format

`.llm/YYYY-MM-DD_HHMM_<slug>.json`, schema `version: 3`:

```jsonc
{
  "version": 3,
  "tool": {"name": "pi", "version": "0.80.x", "plugins": ["..."]},
  "model": {"name": "qwen/qwen3.6-27b", "runtime": "openrouter"},
  "price_usd": 0.01,
  "comment": "automatically added",
  "description": "manually added",
  "stats": {"turns": 42, "tokens_in": 1000, "tokens_out": 2000, "cache_read": 10000},
  "transcript": [
    {
      "role": "user",
      "text": "is this a real conversation"
    },
    {
      "role": "tool",
      "name": "bash"
    },
    {
      "role": "assistant",
      "text": "No, we're in a manually written example by the author."
    },
    {
      "role": "user",
      "text": "oh okay"
    }
  ]
}
```
