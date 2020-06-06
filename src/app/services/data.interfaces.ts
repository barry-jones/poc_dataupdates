
export interface DataSource {
  getContent<T>(fromFile: string): Promise<T>;
}

export interface Content {
  title: string,
  content: string,
}