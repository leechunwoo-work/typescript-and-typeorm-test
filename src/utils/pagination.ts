export class PaginationData {
  page: number | 1;
  limit: number | 10;

  constructor(page: number, limit: number) {
    this.page = page;
    this.limit = limit;
  }

  get offset(): number {
    return (this.page - 1) * this.limit;
  }

  get totalPage(): number {
    return Math.ceil(this.page / this.limit);
  }
}
