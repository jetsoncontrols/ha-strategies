interface LovelaceConfig {
  title?: string;
  views?: any[];
  [key: string]: any;
}

interface StrategyConfig {
  type: string;
  [key: string]: any;
}

export class StrategyDemo extends HTMLElement {
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

// Register the strategy for Home Assistant to use
if (typeof window !== 'undefined') {
  // Register as custom element for Home Assistant to find
  customElements.define('ll-strategy-dashboard-ha-strategies', StrategyDemo);
  
  // Also register in customStrategies for backward compatibility
  (window as any).customStrategies = (window as any).customStrategies || {};
  (window as any).customStrategies['custom:ha-strategies'] = StrategyDemo;

  console.info(
    '%c  HA-STRATEGIES  %c  1.0.0  ',
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: dimgray'
  );
}