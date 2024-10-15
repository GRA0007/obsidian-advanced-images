# Obsidian Advanced Images

[![GitHub Release](https://img.shields.io/github/v/release/GRA0007/obsidian-advanced-images?label=version)](https://github.com/GRA0007/obsidian-advanced-images/releases)
[![Checks](https://img.shields.io/github/check-runs/GRA0007/obsidian-advanced-images/main)](https://github.com/GRA0007/obsidian-advanced-images/actions/workflows/checks.yml)
[![Obsidian](https://img.shields.io/badge/obsidian-plugin-8A5CF5?logo=obsidian)](https://obsidian.md)

Advanced image toolkit for Obsidian!

> [!WARNING]
> This project is in alpha and under development. Use the [BRAT plugin](https://github.com/TfTHacker/obsidian42-brat) to install.

## Features

### Captions

Display image alt text as a caption beneath the image.

To use, add an alt text like `![[image.jpg|My cool caption]]` or `![My cool caption](test.jpg)`.

If you want to display the file name, you can use a `%` symbol instead: `![[image.jpg|%]]`.

### Layout

Display images side-by-side by placing them next to each other in the source. The following will show two images on one row, and then three on the next row:

```md
![[one.jpg]]
![[two.jpg]]

![[three.jpg]]
![[four.jpg]]
![[five.jpg]]
```

## Roadmap

> [!TIP]
> Check out the [changelog](./CHANGELOG.md) to see what's already been implemented.

**💬 Captions**

- Render markdown inside image captions
- Enable captions on file and PDF embeds

**🍱 Layout**

- Display classic markdown (`![](test.jpg)`) images side-by-side
- Display file and PDF embeds side-by-side
- Resize images by dragging from a corner
- Display images inline with text (float left/right)

**🎞️ Gallery**

- Simple grid image gallery
- Masonry image gallery
- Image carousel

**🎚️ Optimization**

- Dashboard to compress/optimize images in your vault
- Automatically compress images when added

## Development

This project uses Biome and Yarn for linting/formatting and package management. Run `yarn dev` to build on changes.

## Prior Art

Thank you to the incredible developers and their work which inspired this plugin:

- [Image converter](https://github.com/xryul/obsidian-image-converter) by [xRyul](https://github.com/xRyul)
- [Gallery](https://github.com/Darakah/obsidian-gallery) by [darakah](https://github.com/Darakah)
- [Image Captions](https://github.com/alangrainger/obsidian-image-captions) by [Alan Grainger](https://github.com/alangrainger)
- [Image Gallery](https://github.com/lucaorio/obsidian-image-gallery) by [Luca Orio](https://github.com/lucaorio)
- [Image Layouts](https://github.com/vertis/obsidian-image-layouts) by [Luke Chadwick](https://github.com/vertis)
