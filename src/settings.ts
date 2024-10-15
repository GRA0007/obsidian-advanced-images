import { type App, PluginSettingTab, Setting } from 'obsidian'
import type AdvancedImagesPlugin from './main'

export interface AdvancedImagesPluginSettings {
  // Captions
  captionsEnabled: boolean
  autoCaptionWithFilename: boolean

  // Layout
  sideBySideEnabled: boolean
  sideBySideMaxColumns: number

  // Gallery
  // galleryEnabled: boolean
}

export const DEFAULT_SETTINGS: AdvancedImagesPluginSettings = {
  captionsEnabled: true,
  autoCaptionWithFilename: false,

  sideBySideEnabled: true,
  sideBySideMaxColumns: 2,

  // galleryEnabled: true,
}

export class AdvancedImagesSettingsTab extends PluginSettingTab {
  plugin: AdvancedImagesPlugin

  constructor(app: App, plugin: AdvancedImagesPlugin) {
    super(app, plugin)
    this.plugin = plugin
  }

  display(): void {
    const { containerEl } = this

    containerEl.empty()

    new Setting(containerEl).setHeading().setName('Captions')

    new Setting(containerEl)
      .setName('Enable captions')
      .setDesc("Display an image's alt text as a caption.")
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
        'If no caption is provided, the file name will be used automatically.',
      )
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.autoCaptionWithFilename)
          .onChange(async (value) => {
            this.plugin.settings.autoCaptionWithFilename = value
            await this.plugin.saveSettings()
          }),
      )

    new Setting(containerEl).setHeading().setName('Layout')

    new Setting(containerEl)
      .setName('Side-by-side layout')
      .setDesc(
        "Display images side-by-side if they're not separated by a new line.",
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
      .setDesc(
        'Choose how many images can fit side-by-side into one row before wrapping.',
      )
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
      .addExtraButton((button) => {
        button
          .setIcon('rotate-ccw')
          .setTooltip('Reset to default')
          .onClick(async () => {
            this.plugin.settings.sideBySideMaxColumns =
              DEFAULT_SETTINGS.sideBySideMaxColumns
            await this.plugin.saveSettings()
            this.display()
          })
      })

    // new Setting(containerEl).setHeading().setName('Gallery')

    // new Setting(containerEl)
    //   .setName('Enable gallery blocks')
    //   .setDesc('Create customizable inline image galleries.')
    //   .addToggle((toggle) =>
    //     toggle
    //       .setValue(this.plugin.settings.galleryEnabled)
    //       .onChange(async (value) => {
    //         this.plugin.settings.galleryEnabled = value
    //         await this.plugin.saveSettings()
    //       }),
    //   )
  }
}
