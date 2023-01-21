import { CarInterface } from '../models/response-data';

class ApiService {
  private baseUrl: string;

  private garage: string;

  private engine: string;

  private winners: string;

  constructor() {
    this.baseUrl = 'http://localhost:3000';
    this.garage = `${this.baseUrl}/garage`;
    this.engine = `${this.baseUrl}/engine`;
    this.winners = `${this.baseUrl}/winners`;
  }

  public async getCars(page = 1, limit = 7): Promise<{ cars: CarInterface[]; count: string } | null> {
    const data = await fetch(`${this.garage}?_limit=${limit}&_page=${page}`);
    const res: CarInterface[] = await data.json();

    if (data.status === 200) {
      return {
        cars: res,
        count: data.headers.get('X-Total-Count') || '0',
      };
    }

    return null;
  }

  public async getCar(id: number): Promise<CarInterface | null> {
    const data = await fetch(`${this.garage}/${id}`);
    const res: CarInterface = await data.json();

    if (data.status === 200) {
      return res;
    }

    return null;
  }

  public async createCar(car: CarInterface): Promise<void> {
    await fetch(`${this.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }

  public async deleteCar(id: number): Promise<void> {
    await fetch(`${this.garage}/${id}`, {
      method: 'DELETE',
    });
  }

  public async updateCar(car: CarInterface): Promise<void> {
    await fetch(`${this.garage}/${car.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }
}

const apiService = new ApiService();
export { apiService };
