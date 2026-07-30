# Changelog fragments

This directory holds `towncrier` changelog fragments — one small file per
user-facing or behavior-changing change, added alongside the PR/commit that
makes the change. At release time `towncrier build` compiles all fragments
here into a new section at the top of `CHANGELOG.md` and deletes them.

## Adding a fragment

Create a file named:

```
changelog.d/<slug>.<type>.md
```

- `<slug>` is a short description of the change, or an issue/PR number if
  you prefer to link one. Use a leading `+` for orphan fragments that
  aren't tied to an issue, e.g. `+declarative-settings.change.md`.
- `<type>` is one of:
  - `feature` — a new feature
  - `bugfix` — a bug fix
  - `change` — any other user-facing behavior change (the common case for
    this plugin: settings UI changes, defaults changes, etc.)
  - `doc` — documentation-only changes
  - `misc` — internal/maintenance changes worth a one-line mention

The file's contents are a single line (or short paragraph) describing the
change from the user's point of view, e.g.:

```
Migrated settings UI to Obsidian's new declarative settings API (requires Obsidian 1.13.0+).
```

## Building the changelog

At release time, run:

```
towncrier build --version X.Y.Z
```

This prepends a new `#### [X.Y.Z](...)` section to `CHANGELOG.md` built
from the fragments in this directory, and removes the fragment files.
