# HA Strategies

[![HACS Badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)
[![GitHub Release](https://img.shields.io/github/release/jetsoncontrols/ha-strategies.svg)](https://github.com/jetsoncontrols/ha-strategies/releases)
[![License](https://img.shields.io/github/license/jetsoncontrols/ha-strategies.svg)](LICENSE)

Home Assistant Lovelace Strategies for enhanced dashboard configuration and management.

## Features

- Custom Lovelace strategies for Home Assistant dashboards
- Modular and extensible design
- TypeScript implementation with Lit framework
- Easy installation via HACS (Home Assistant Community Store) as a custom repository

## Installation

### Via HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Go to "Frontend" section
3. Click the three dots in the top right corner
4. Select "Custom repositories"
5. Add `https://github.com/jetsoncontrols/ha-strategies` as the repository URL
6. Select "Lovelace" as the category
7. Click "Add"
8. Find "HA Strategies" in the list and install it
9. Restart Home Assistant

### Manual Installation

1. Download the latest `ha-strategies.js` from the [releases page](https://github.com/jetsoncontrols/ha-strategies/releases)
2. Copy the file to your `config/www/` directory
3. Add the resource to your Lovelace configuration:

```yaml
resources:
  - url: /local/ha-strategies.js
    type: module
```

## Configuration

Add the strategy to your Lovelace dashboard configuration:

```yaml
strategy:
  type: custom:ha-strategies
  # Add your configuration options here
```

## Development

To set up the development environment:

1. Clone this repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. For development with auto-rebuild: `npm run dev`

## Support

For issues and feature requests, please visit the [GitHub repository](https://github.com/jetsoncontrols/ha-strategies/issues).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
