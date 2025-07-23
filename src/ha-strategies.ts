interface LovelaceConfig {
  title?: string;
  views?: any[];
  [key: string]: any;
}

interface StrategyConfig {
  type: string;
  [key: string]: any;
}

export class HaStrategies extends HTMLElement {
  /**
   * Generate the Lovelace configuration based on the strategy
   */
  static async generate(config: StrategyConfig, hass: any): Promise<LovelaceConfig> {
    // Log strategy options to console
    console.info('HA-STRATEGIES: Strategy options:', config);
    
    // Capture generation time
    const generationTime = new Date().toLocaleString();
    
    // Get all light entities from Home Assistant
    const lightEntities = Object.keys(hass.states)
      .filter(entityId => entityId.startsWith('light.'))
      .map(entityId => hass.states[entityId]);
    
    // Create tile cards for each light
    const lightCards = lightEntities.map(entity => ({
      type: 'tile',
      entity: entity.entity_id,
      name: entity.attributes.friendly_name || entity.entity_id,
      show_entity_picture: false,
      tap_action: {
        action: 'toggle'
      }
    }));
    
    // If no lights found, show a message
    const cards = lightCards.length > 0 ? lightCards : [
      {
        type: 'markdown',
        content: 'No light entities found in your Home Assistant system.'
      }
    ];
    
    // Create admin content with generation time and options
    const configDisplay = JSON.stringify(config, null, 2);
    const adminContent = `# Admin Information

## Generation Time
**Generated:** ${generationTime}

## Strategy Options
\`\`\`json
${configDisplay}
\`\`\`

## Statistics
- **Light Entities Found:** ${lightEntities.length}
- **Strategy Type:** ${config.type}`;

    return {
      title: "Lighting Dashboard",
      views: [
        {
          title: "Lights",
          path: "lights",
          cards: cards
        },
        {
          title: "Admin",
          path: "admin",
          cards: [
            {
              type: 'markdown',
              content: adminContent
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
  customElements.define('ll-strategy-dashboard-ha-strategies', HaStrategies);
  
  // Also register in customStrategies for backward compatibility
  (window as any).customStrategies = (window as any).customStrategies || {};
  (window as any).customStrategies['custom:ha-strategies'] = HaStrategies;

  console.info(
    '%c  HA-STRATEGIES  %c  1.0.0  ',
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: dimgray'
  );
}