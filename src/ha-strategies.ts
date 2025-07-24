import LightsView from "./views/LightsView";

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
  static async generate(config: StrategyConfig, hass: any): Promise<LovelaceConfig> {
    console.info('HA-STRATEGIES: Strategy options:', config);
    const generationStartTime = new Date();
    
    const allLightEntities = Object.keys(hass.states)
      .filter(entityId => entityId.startsWith('light.'))
      .map(entityId => hass.states[entityId]);
    
    // Create tile cards for each light
    const lightCards = allLightEntities.map(entity => ({
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
        content: 'No light entities found.'
      }
    ];
    


    // Create admin content with generation time and options
    const configDisplay = JSON.stringify(config, null, 2);
    const adminContent = `# Admin Information

## Generation Time
**Generated:** ${generationStartTime.toLocaleString()}

## Strategy Options
\`\`\`json
${configDisplay}
\`\`\`

## Statistics
- **Strategy Type:** ${config.type}`;

    const generationEndTime = new Date();
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





// Register the strategy for Home Assistant to use
// customElements.define('ll-strategy-dashboard-ha-strategies', HaStrategies);
