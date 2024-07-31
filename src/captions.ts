export const captionImage = (
  container: HTMLElement,
  autoCaptionWithFilename: boolean,
) => {
  const img = container.querySelector('img')
  if (!img) return

  const width = container.getAttribute('width')
  const captionText = getCaption(container, autoCaptionWithFilename)

  // Check if node has already been processed
  let figure = container.querySelector('figure')
  if (figure || img.parentElement?.tagName === 'FIGURE') {
    const caption = container.querySelector('figcaption')
    if (caption && captionText) {
      // Update caption
      caption.replaceChildren(captionText) // TODO: render markdown
    } else if (!captionText) {
      // Remove caption
      container.append(img)
      figure?.remove()
    }
  } else if (captionText) {
    // Unprocessed
    figure = container.createEl('figure', {
      cls: 'advanced-images-figure',
    })
    figure.append(img)
    figure.createEl('figcaption').replaceChildren(captionText) // TODO: render markdown
  }

  // Update width
  if (figure && width) {
    figure.setAttribute('width', width)
  } else {
    figure?.removeAttribute('width')
  }
}

const getCaption = (
  container: HTMLElement,
  autoCaptionWithFilename: boolean,
): string | undefined => {
  const src = container.getAttribute('src') || undefined
  const alt = container.getAttribute('alt') || undefined
  if (alt === src && !autoCaptionWithFilename) return
  if (alt === '%') return src
  return alt
}
