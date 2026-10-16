/caveman ultra

use rtk para todos os comandos bash (ls, cat, find, grep, head, tails, sed, etc.), exceto `rtk proxy`, que está terminantemente proibido.
para cada pipe de comando, uma nova chamada ao rtk. exemplo: `rtk git commit ... | rtk tail -8`.

## Agent skills

### Issue tracker

Issues live in GitHub Issues (`gh` CLI). See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-label vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
