# Obsidian Advanced Images

[![GitHub Release](https://img.shields.io/github/v/release/GRA0007/obsidian-advanced-images?label=version)](https://github.com/GRA0007/obsidian-advanced-images/releases)
[![Checks](https://img.shields.io/github/check-runs/GRA0007/obsidian-advanced-images/main)](https://github.com/GRA0007/obsidian-advanced-images/actions/workflows/checks.yml)
[![Obsidian](https://img.shields.io/badge/obsidian-plugin-8A5CF5?logo=obsidian)](https://obsidian.md)

Advanced image toolkit for Obsidian!

> [!WARNING]
> This project is in alpha and under development.

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

## Development

This project uses Biome and Yarn for linting/formatting and package management. Run `yarn dev` to build on changes.
