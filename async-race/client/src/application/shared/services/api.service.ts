import { CarInterface } from '../models/response-data';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:3000';
  }

  public async getAllCars(page = 1, limit = 7): Promise<{ cars: CarInterface[]; count: string } | null> {
    const data = await fetch(`${this.baseUrl}/garage?_limit=${limit}&_page=${page}`);
    const res: CarInterface[] = await data.json();

    if (data.status === 200) {
      return {
        cars: res,
        count: data.headers.get('X-Total-Count') || '0',
      };
    }

    return null;
  }
}

const apiService = new ApiService();
export { apiService };
