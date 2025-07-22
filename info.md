# HA Strategies

Home Assistant Lovelace Strategies for enhanced dashboard configuration and management.

## Features

- Custom Lovelace strategies for Home Assistant dashboards
- Modular and extensible design
- Easy installation via HACS (Home Assistant Community Store)

## Installation

### Via HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Go to "Frontend" section
3. Click the "+" button
4. Search for "HA Strategies"
5. Install the repository

### Manual Installation

1. Download the latest release
2. Copy the `ha-strategies.js` file to your `config/www/` directory
3. Add the resource to your Lovelace configuration

## Configuration

Add the strategy to your Lovelace dashboard configuration:

```yaml
strategy:
  type: custom:ha-strategies
  # Add your configuration options here
```

## Support

For issues and feature requests, please visit the [GitHub repository](https://github.com/jetsoncontrols/ha-strategies).