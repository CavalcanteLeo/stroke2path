# stroke2path

Converts SVG strokes to paths using Inkscape, ideal for icon font generators like IcoMoon and Fontello.

## Installation

You can use `npx` to run `stroke2path` without installing it globally:

```sh
npx @leo.cavalcante/stroke2path <input-directory> [output-directory]
```

Or install it globally:

```sh
npm install -g @leo.cavalcante/stroke2path
```

## Usage

```sh
stroke2path <input-directory> [output-directory]
```

- `<input-directory>`: The directory containing SVG files to process.
- `[output-directory]` (Optional): The directory to save processed SVG files (default: svg_path).

## Example

```sh
stroke2path . output_dir
```

Processes all SVG files in the current directory (`.`) and saves the processed files in `output_dir`.

## Options

`-h, --help`: Show help message.

## Requirements

Inkscape must be installed. You can install it using:

- Homebrew (macOS): `brew install --cask inkscape`
- Package Manager (Linux): `sudo apt-get install inkscape`
- [Download from Inkscape Website](https://inkscape.org/release/) (Windows)

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.

## Contributing

Feel free to fork and submit pull requests.

## Issues

Please report any issues or feature requests here.

## Author

Leonardo Cavalcante - [GitHub](https://github.com/CavalcanteLeo)

## Acknowledgments

Inspiration from icon font generators.
