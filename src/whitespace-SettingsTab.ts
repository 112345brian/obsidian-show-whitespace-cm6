import {
    type App,
    getLanguage,
    PluginSettingTab,
    type Setting,
    type SettingDefinitionItem,
} from "obsidian";
import type { SWSettings } from "./@types/settings";
import { getTranslate } from "./i18n";
import type ShowWhitespacePlugin from "./main";

export class ShowWhitespaceSettingsTab extends PluginSettingTab {
    plugin: ShowWhitespacePlugin;

    constructor(app: App, plugin: ShowWhitespacePlugin) {
        super(app, plugin);
        this.plugin = plugin;
        this.icon = "eye";
    }

    getControlValue(key: string): unknown {
        return (this.plugin.settings as unknown as Record<string, unknown>)[
            key
        ];
    }

    async setControlValue(key: string, value: unknown): Promise<void> {
        await this.plugin.updateSettings({
            ...this.plugin.settings,
            [key]: value,
        } as SWSettings);
    }

    private toggle(
        key: keyof SWSettings,
        name: string,
        desc: string,
    ): SettingDefinitionItem {
        return {
            name,
            desc,
            control: { type: "toggle" as const, key: key as string },
        };
    }

    getSettingDefinitions(): SettingDefinitionItem[] {
        const id = this.plugin.manifest.id;
        const lang = getLanguage();
        const i18n = getTranslate(lang);

        this.containerEl.addClass(id);

        return [
            this.toggle(
                "disablePluginStyles",
                i18n.suppressPluginStyles.name,
                i18n.suppressPluginStyles.desc,
            ),

            // ── Markers ──────────────────────────────────────────────────────
            {
                name: i18n.markersSection.name,
                desc: i18n.markersSection.desc,
                render: (setting: Setting): void => {
                    setting.setHeading();
                },
            },
            this.toggle(
                "showLineEndings",
                i18n.showLineEndings.name,
                i18n.showLineEndings.desc,
            ),
            this.toggle(
                "showHardLineBreaks",
                i18n.showHardLineBreaks.name,
                i18n.showHardLineBreaks.desc,
            ),
            this.toggle(
                "showTrailingWhitespace",
                i18n.showTrailingWhitespace.name,
                i18n.showTrailingWhitespace.desc,
            ),
            this.toggle(
                "showConsecutiveWhitespace",
                i18n.showConsecutiveWhitespace.name,
                i18n.showConsecutiveWhitespace.desc,
            ),

            // ── Structural ───────────────────────────────────────────────────
            {
                name: i18n.structuralSection.name,
                render: (setting: Setting): void => {
                    setting.setHeading();
                },
            },
            this.toggle(
                "showBlockquoteMarkers",
                i18n.showBlockquoteMarkers.name,
                i18n.showBlockquoteMarkers.desc,
            ),
            this.toggle(
                "outlineListMarkers",
                i18n.highlightListMarkers.name,
                i18n.highlightListMarkers.desc,
            ),

            // ── Space dot contexts ───────────────────────────────────────────
            {
                name: i18n.spaceContextsSection.name,
                desc: i18n.spaceContextsSection.desc,
                render: (setting: Setting): void => {
                    setting.setHeading();
                },
            },
            this.toggle(
                "showFrontmatterWhitespace",
                i18n.showFrontmatterWhitespace.name,
                i18n.showFrontmatterWhitespace.desc,
            ),
            this.toggle(
                "showTableWhitespace",
                i18n.showTableWhitespace.name,
                i18n.showTableWhitespace.desc,
            ),
            this.toggle(
                "showCodeblockWhitespace",
                i18n.showCodeBlockWhitespace.name,
                i18n.showCodeBlockWhitespace.desc,
            ),
            this.toggle(
                "showAllCodeblockWhitespace",
                i18n.showAllCodeBlockWhitespace.name,
                i18n.showAllCodeBlockWhitespace.desc,
            ),
            this.toggle(
                "showAllWhitespace",
                i18n.showAllWhitespace.name,
                i18n.showAllWhitespace.desc,
            ),
        ];
    }
}
