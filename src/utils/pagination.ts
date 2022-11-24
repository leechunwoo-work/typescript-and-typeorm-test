export class PaginationData {
  page = 1;
  limit = 10;

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
