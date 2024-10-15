import { Plugin } from 'obsidian'
import { captionImage } from './captions'
import { createImageLayoutGroups } from './layout'
import {
  type AdvancedImagesPluginSettings,
  AdvancedImagesSettingsTab,
  DEFAULT_SETTINGS,
} from './settings'

export default class AdvancedImagesPlugin extends Plugin {
  settings: AdvancedImagesPluginSettings = DEFAULT_SETTINGS
  imageObserver: MutationObserver | undefined

  async onload() {
    await this.loadSettings()

    if (this.settings.captionsEnabled || this.settings.sideBySideEnabled) {
      this.imageObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (
            (mutation.type === 'childList' || mutation.type === 'attributes') &&
            mutation.target instanceof HTMLElement
          ) {
            if (this.settings.captionsEnabled) {
              for (const embed of mutation.target.findAll('.image-embed')) {
                captionImage(embed, this.settings.autoCaptionWithFilename)
              }
            }

            if (this.settings.sideBySideEnabled) {
              for (const group of mutation.target.findAll(
                'div:has(>p>.image-embed)',
              )) {
                createImageLayoutGroups(
                  group,
                  this.settings.sideBySideMaxColumns,
                )
              }
            }
          }
        }
      })

      this.imageObserver.observe(document.body, {
        subtree: true,
        childList: true,
        attributes: true,
      })
    }

    this.addSettingTab(new AdvancedImagesSettingsTab(this.app, this))
  }

  onunload() {
    this.imageObserver?.disconnect()
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }
}
