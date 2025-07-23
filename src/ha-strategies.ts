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
  static async generate(config: StrategyConfig, _hass: any): Promise<LovelaceConfig> {
    // Log strategy options to console
    console.info('HA-STRATEGIES: Strategy options:', config);
    
    // Format strategy options for display in markdown
    const optionsText = Object.keys(config)
      .filter(key => key !== 'type') // Exclude the type field as it's always the strategy name
      .map(key => `- **${key}**: ${JSON.stringify(config[key])}`)
      .join('\n');
    
    const hasOptions = optionsText.length > 0;
    const optionsSection = hasOptions ? `\n\n**Strategy Options:**\n${optionsText}` : '\n\n*No additional options configured*';
    
    return {
      title: "Generated Dashboard",
      views: [
        {
          "cards": [
            {
              "type": "markdown",
              "content": `Generated at ${(new Date).toLocaleString()}${optionsSection}`
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