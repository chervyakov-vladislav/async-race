import { EngineData } from '../../shared/models/response-data';
import { state } from '../../shared/services/state';

class AnimationService {
  private animationId: number;

  constructor() {
    this.animationId = 0;
  }

  public async animation(iconContainer: HTMLElement, data: EngineData, carID: number) {
    const duration = Math.floor(data.distance / data.velocity);
    const icon = iconContainer.firstChild as HTMLElement;
    const distance = state.allData.distance;
    const start = performance.now();
    const result = this.animationId;

    const animate = (timestamp: number) => {
      const currWidth = (timestamp - start) / duration;
      const progress = currWidth * distance;
      icon.style.left = progress + 'px';

      if (currWidth < 1) {
        this.animationId = window.requestAnimationFrame(animate);
      }

      state.setAnimationID(carID, this.animationId);
    };

    this.animationId = window.requestAnimationFrame(animate);
    return result;
  }

  public async stop(id: number) {
    cancelAnimationFrame(id);
  }

  public async reset(id: number, icon: HTMLElement) {
    const animationID = state.getAnimationID(id);
    cancelAnimationFrame(animationID);
    icon.style.left = '0';
  }

  public async setDistance(iconContainer: HTMLElement) {
    const icon = iconContainer.firstChild as HTMLElement;
    const distance = iconContainer.getBoundingClientRect().width - icon.getBoundingClientRect().width - 20;
    state.allData.distance = distance;
  }
}

const animationService = new AnimationService();
export { animationService };
