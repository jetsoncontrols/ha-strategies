interface LovelaceConfig {
  title?: string;
  views?: any[];
  [key: string]: any;
}

interface LightsConfig {
  integrations?: string[];
}

interface StrategyConfig {
  type: string;
  lights?: LightsConfig;
  // Deprecated: for backward compatibility only
  [key: string]: any;
}

export class HaStrategies extends HTMLElement {
  /**
   * Generate the Lovelace configuration based on the strategy
   */
  static async generate(config: StrategyConfig, hass: any): Promise<LovelaceConfig> {
    console.info('HA-STRATEGIES: Strategy options:', config);
    const generationTime = new Date().toLocaleString();
    
    const allLightEntities = Object.keys(hass.states)
      .filter(entityId => entityId.startsWith('light.'))
      .map(entityId => hass.states[entityId]);
    
    const lightIntegrations = config.lights?.integrations;
    
    // Filter by integrations if specified
    let lightEntities = allLightEntities;
    if (lightIntegrations && lightIntegrations.length > 0) {
      lightEntities = allLightEntities.filter(entity => {
        // Check if entity belongs to any of the specified integrations
        console.info('HA-STRATEGIES: Entity Platform: ', entity.attributes?.platform);
        const entityPlatform = entity.attributes?.source_type || 
                              entity.attributes?.platform || 
                              entity.platform ||
                              entity.entity_id.split('.')[1]?.split('_')[0]; // fallback: extract from entity_id
        
        return lightIntegrations.some(integration => 
          entityPlatform?.toLowerCase().includes(integration.toLowerCase()) ||
          entity.entity_id.toLowerCase().includes(integration.toLowerCase())
        );
      });
    }
    
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
        content: 'No light entities found.'
      }
    ];
    
    // Create admin content with generation time and options
    const configDisplay = JSON.stringify(config, null, 2);
    const integrationInfo = lightIntegrations && lightIntegrations.length > 0 
      ? `- **Filtered by Integrations:** ${lightIntegrations.join(', ')}\n- **Total Light Entities:** ${allLightEntities.length}\n- **Filtered Light Entities:** ${lightEntities.length}`
      : `- **Integration Filter:** None (showing all lights)\n- **Total Light Entities:** ${lightEntities.length}`;
    
    const adminContent = `# Admin Information

## Generation Time
**Generated:** ${generationTime}

## Strategy Options
\`\`\`json
${configDisplay}
\`\`\`

## Statistics
${integrationInfo}
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