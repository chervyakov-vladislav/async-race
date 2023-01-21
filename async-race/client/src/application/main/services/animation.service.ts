import { EngineData } from '../../shared/models/response-data';

class AnimationService {
  private animationId: number;

  constructor() {
    this.animationId = 0;
  }

  public animation(iconContainer: HTMLElement, data: EngineData) {
    const duration = Math.floor(data.distance / data.velocity);
    const icon = iconContainer.firstChild as HTMLElement;
    const distance = iconContainer.getBoundingClientRect().width - icon.getBoundingClientRect().width - 20;
    const start = performance.now();

    const animate = (time: number) => {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      const progress = timeFraction * distance;
      if (icon) {
        icon.style.left = progress + 'px';
      }

      if (timeFraction < 1) {
        this.animationId = window.requestAnimationFrame(animate);
      }
    };

    this.animationId = window.requestAnimationFrame(animate);
  }

  public stop() {
    cancelAnimationFrame(this.animationId);
  }

  public reset(icon: HTMLElement) {
    cancelAnimationFrame(this.animationId);
    icon.style.left = '0';
  }
}

const animationService = new AnimationService();
export { animationService };
