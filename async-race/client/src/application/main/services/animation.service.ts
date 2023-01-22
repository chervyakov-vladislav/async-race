import { EngineData } from '../../shared/models/response-data';

class AnimationService {
  private animationId: number;

  constructor() {
    this.animationId = 0;
  }

  public async animation(iconContainer: HTMLElement, data: EngineData) {
    const duration = Math.floor(data.distance / data.velocity);
    const icon = iconContainer.firstChild as HTMLElement;
    const distance = iconContainer.getBoundingClientRect().width - icon.getBoundingClientRect().width - 20;
    const start = performance.now();
    const result = this.animationId;

    const animate = (timestamp: number) => {
      const currWidth = (timestamp - start) / duration;
      const progress = currWidth * distance;
      icon.style.left = progress + 'px';

      if (currWidth < 1) {
        this.animationId = window.requestAnimationFrame(animate);
      }
    };

    this.animationId = window.requestAnimationFrame(animate);
    return result;
  }

  public async stop(id: number) {
    cancelAnimationFrame(id);
    console.log({ id }, ' в стопе');
  }

  public async reset(icon: HTMLElement) {
    cancelAnimationFrame(this.animationId);
    icon.style.left = '0';
  }
}

const animationService = new AnimationService();
export { animationService };
