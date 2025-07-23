interface LovelaceConfig {
  title?: string;
  views?: any[];
  [key: string]: any;
}

interface StrategyConfig {
  type: string;
  [key: string]: any;
}

export class StrategyDemo {
  /**
   * Generate the Lovelace configuration based on the strategy
   */
  static async generate(_config: StrategyConfig, _hass: any): Promise<LovelaceConfig> {
    return {
      title: "Generated Dashboard",
      views: [
        {
          "cards": [
            {
              "type": "markdown",
              "content": `Generated at ${(new Date).toLocaleString()}`
            }
          ]
        }
      ]
    };
  }
}

// Simple strategy doesn't need to be a custom element
// Just make it available globally for Home Assistant to use
if (typeof window !== 'undefined') {
  (window as any).customStrategies = (window as any).customStrategies || {};
  (window as any).customStrategies['ha-strategies-demo'] = StrategyDemo;

  // Register the strategy for discovery
  (window as any).customCards = (window as any).customCards || [];
  (window as any).customCards.push({
    type: 'ha-strategies',
    name: 'HA Strategies Demo',
    description: 'Simple demo strategy for Home Assistant Lovelace'
  });

  console.info(
    '%c  HA-STRATEGIES  %c  1.0.0  ',
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: dimgray'
  );
}