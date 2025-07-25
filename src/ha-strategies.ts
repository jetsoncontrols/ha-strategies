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
    
    const lightsCards = await LightsView.generate(hass);

    const generationEndTime = new Date();

    console.info('HA-STRATEGIES: Strategy generation took:', generationEndTime.getTime() - generationStartTime.getTime(), 'ms');
    return {
      title: "Lighting Dashboard",
      views: [
        {
          title: "Lights",
          path: "lights",
          cards: lightsCards
        }
      ]
    };
  }
}

// Register the strategy for Home Assistant to use
customElements.define('ll-strategy-dashboard-ha-strategies', HaStrategies);
