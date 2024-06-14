import { Action, IRepository } from './types';

export default abstract class Repository<T, TFilter, TCreate, TUpdate>
  implements IRepository<T, TFilter, TCreate, TUpdate>
{
  protected constructor(
    private _model: Action,
    private readonly options: Record<string, any>,
  ) {}
  async findOneById(id: string): Promise<T> {
    return this._model.findUnique({ where: { id }, ...this.options });
  }
  findOne(filter: Partial<TFilter>): Promise<T> {
    return this._model.findFirst({ where: filter, ...this.options });
  }
  findMany(filter: Partial<TFilter>): Promise<T[]> {
    return this._model.findMany({ where: filter });
  }

  update(id: string, item: Partial<TUpdate>): Promise<T> {
    return this._model.update({
      where: { id },
      data: item,
    });
  }
  create(item: Partial<TCreate>): Promise<T> {
    return this._model.create({ data: item });
  }
  delete(id: string): Promise<T> {
    return this._model.update({ where: { id }, data: { deletedAt: true } });
  }
  remove(id: string): Promise<T> {
    return this._model.delete({ where: { id } });
  }
  async count(filter: Partial<TFilter>): Promise<number> {
    return this._model
      .findMany({ where: filter })
      .then((items: T[]) => items.length);
  }
  isExist(id: string): boolean {
    return !!this._model.findUnique({ where: { id } });
  }
}
