{#-
Flat bullet-list template matching this project's existing CHANGELOG.md
style (generated historically by auto-changelog): no per-type subheadings,
just a "- description" line per fragment under the release heading, which
is supplied separately via `title_format` in pyproject.toml.
-#}
{%- set newline = "\n" -%}
{%- if sections[""] %}
{{- newline }}
{%- for category, val in definitions.items() if category in sections[""] %}
{%- for text, values in sections[""][category].items() %}
{{- "- " ~ text ~ newline }}
{%- endfor %}
{%- endfor %}
{%- else %}
{{- newline }}
{{- "- No significant changes." ~ newline }}
{%- endif %}
