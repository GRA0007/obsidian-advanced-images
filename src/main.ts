import { type App, Plugin, PluginSettingTab, Setting } from 'obsidian'
import { imageCaptionPostProcessor } from 'src/preview'

export interface AdvancedImagesPluginSettings {
  captionsEnabled: boolean
  inlineEnabled: boolean
  sideBySideEnabled: boolean
  sideBySideMaxColumns: number
  markdownInCaptionsEnabled: boolean
  autoCaptionWithFilename: boolean
}

const DEFAULT_SETTINGS: AdvancedImagesPluginSettings = {
  captionsEnabled: true,
  inlineEnabled: true,
  sideBySideEnabled: true,
  sideBySideMaxColumns: 2,
  markdownInCaptionsEnabled: true,
  autoCaptionWithFilename: false,
}

export default class AdvancedImagesPlugin extends Plugin {
  settings: AdvancedImagesPluginSettings = DEFAULT_SETTINGS

  async onload() {
    await this.loadSettings()

    this.registerMarkdownPostProcessor(imageCaptionPostProcessor(this.settings))

    this.addSettingTab(new AdvancedImagesSettingsTab(this.app, this))
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }
}

class AdvancedImagesSettingsTab extends PluginSettingTab {
  plugin: AdvancedImagesPlugin

  constructor(app: App, plugin: AdvancedImagesPlugin) {
    super(app, plugin)
    this.plugin = plugin
  }

  display(): void {
    const { containerEl } = this

    containerEl.empty()

    new Setting(containerEl)
      .setName('Enable captions')
      .setDesc("Display an image's alt text as a caption")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.captionsEnabled)
          .onChange(async (value) => {
            this.plugin.settings.captionsEnabled = value
            await this.plugin.saveSettings()
          }),
      )

    new Setting(containerEl)
      .setName('Auto caption with file name')
      .setDesc(
        'If no caption is provided, the filename will be used automatically',
      )
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.autoCaptionWithFilename)
          .onChange(async (value) => {
            this.plugin.settings.autoCaptionWithFilename = value
            await this.plugin.saveSettings()
          }),
      )

    new Setting(containerEl)
      .setName('Side-by-side layout')
      .setDesc(
        "Display images side-by-side if they're not separated by a new line",
      )
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.sideBySideEnabled)
          .onChange(async (value) => {
            this.plugin.settings.sideBySideEnabled = value
            await this.plugin.saveSettings()
          }),
      )

    new Setting(containerEl)
      .setName('Maximum columns')
      .setDesc('Choose how many images can fit into one row before wrapping')
      .addSlider((slider) =>
        slider
          .setLimits(1, 10, 1)
          .setDynamicTooltip()
          .setValue(this.plugin.settings.sideBySideMaxColumns)
          .onChange(async (value) => {
            this.plugin.settings.sideBySideMaxColumns = value
            await this.plugin.saveSettings()
          }),
      )
  }
}
