export const createImageLayoutGroups = (
  group: HTMLElement,
  sideBySideMaxColumns: number,
) => {
  const paragraph = group.children[0]
  if (!(paragraph instanceof HTMLElement)) return

  const children = Array.from(paragraph.childNodes).filter(
    (c) =>
      !(c instanceof HTMLBRElement) &&
      !(c.nodeType === 3 && c.textContent?.trim() === ''),
  )

  if (
    children.length > 1 &&
    children.every(
      (c) => c instanceof HTMLElement && c.classList.contains('image-embed'),
    )
  ) {
    for (const node of Array.from(paragraph.childNodes)) {
      if (
        !(node instanceof HTMLElement) ||
        !node.classList.contains('image-embed')
      )
        node.remove()
    }

    paragraph.classList.add('advanced-images-image-group')
    paragraph.style.setProperty(
      '--cols',
      `${Math.min(children.length, sideBySideMaxColumns)}`,
    )
  }
}
