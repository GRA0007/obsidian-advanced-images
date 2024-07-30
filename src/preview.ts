import type { MarkdownPostProcessorContext } from 'obsidian'
import type { AdvancedImagesPluginSettings } from 'src/main'

export const imageCaptionPostProcessor =
  (settings: AdvancedImagesPluginSettings) =>
  async (el: HTMLElement, _ctx: MarkdownPostProcessorContext) => {
    const totalEmbeds = el.findAll('.internal-embed').length
    if (totalEmbeds === 0) return

    // Wait for all images to load and return them
    const images: HTMLImageElement[] = await new Promise((resolve) => {
      if (el.findAll('.internal-embed.is-loaded').length === totalEmbeds) {
        resolve(
          el.findAll(
            '.internal-embed.image-embed.is-loaded img',
          ) as HTMLImageElement[],
        )
      }

      const observer = new MutationObserver(() => {
        if (el.findAll('.internal-embed.is-loaded').length === totalEmbeds) {
          observer.disconnect()
          resolve(
            el.findAll(
              '.internal-embed.image-embed.is-loaded img',
            ) as HTMLImageElement[],
          )
        }
      })

      observer.observe(el, { childList: true, subtree: true, attributes: true })
    })

    // TODO: potentially extract out the md source of the image to get the caption property etc.
    // const sectionInfo = ctx.getSectionInfo(el)
    // if (!sectionInfo) return
    // const sourceLines = sectionInfo.text
    //   .split('\n')
    //   .slice(sectionInfo.lineStart, sectionInfo.lineEnd + 1)
    //   .join('\n')
    // console.log(sourceLines)

    if (settings.captionsEnabled) {
      for (const img of images) {
        // If not processed already
        if (img.parentElement?.tagName !== 'FIGURE') {
          const captionText = getCaption(img, settings)

          if (captionText) {
            const fig = document.createElement('figure')
            fig.append(img.cloneNode())
            if (img.hasAttribute('width')) {
              fig.style.width = `${img.getAttribute('width')}px`
            }

            if (captionText) {
              const caption = document.createElement('figcaption')
              caption.append(document.createTextNode(captionText))
              fig.append(caption)
            }

            img.replaceWith(fig)
          }
        }
      }
    }

    if (settings.sideBySideEnabled && el.children[0].tagName === 'P') {
      const children = Array.from(el.children[0].childNodes).filter(
        (c) =>
          !(c instanceof HTMLBRElement) &&
          !(c.nodeType === 3 && c.textContent?.trim() === ''),
      )

      if (
        children.every(
          (c) =>
            c instanceof HTMLElement && c.classList.contains('image-embed'),
        ) &&
        children.length > 1
      ) {
        // biome-ignore lint/complexity/noForEach: <explanation>
        el.children[0].childNodes.forEach((node) => {
          if (
            !(node instanceof HTMLElement) ||
            !node.classList.contains('image-embed')
          )
            node.remove()
        })
        el.children[0].classList.add('advanced-images-image-group')
        ;(el.children[0] as HTMLElement).style.setProperty(
          '--cols',
          `${Math.min(children.length, settings.sideBySideMaxColumns)}`,
        )
      }
    }
  }

const getCaption = (
  img: HTMLImageElement,
  settings: AdvancedImagesPluginSettings,
): string | undefined => {
  const filename = new URL(img.src).pathname.split('/').reverse()[0]
  if (img.alt === filename && !settings.autoCaptionWithFilename) return
  if (img.alt === '%') return filename
  return img.alt
}
