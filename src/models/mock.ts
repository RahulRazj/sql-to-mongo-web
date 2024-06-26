export class MockAppService {
    checkSqlConnection = jest.fn();
    checkMongoConnection = jest.fn();
}

export class MockLocalStorage {
  storage: {[key: string]: string} = {};
  setItem = jest.fn((key: string, value: string) => {
    this.storage[key] = value;
  });
  getItem = jest.fn((key: string) => this.storage[key] || null);
  removeItem = jest.fn((key: string) => {
    delete this.storage[key];
  });
  clear = jest.fn(() => {
    this.storage = {};
  });
  get length(): number {
    return Object.keys(this.storage).length;
  }
  key = jest.fn((index: number) => Object.keys(this.storage)[index] || null);
};