import { Action, IRepository } from './types';
export default abstract class BaseRepository<T, TFilter, TCreate, TUpdate>
  implements IRepository<T, TFilter, TCreate, TUpdate>
{
  protected _model: Action;
  protected constructor(private readonly options: Record<string, any>) {}
  async findOneById(id: string): Promise<T> {
    return this._model.findUnique({ where: { id }, ...this.options });
  }
  findOne<_ = TFilter>(filter: Partial<_>): Promise<T> {
    return this._model.findFirst({ where: filter, ...this.options });
  }
  findMany<_ = TFilter>(filter: Partial<_>): Promise<T[]> {
    return this._model.findMany({ where: filter });
  }
  update<_ = TUpdate>(id: string, item: Partial<_>): Promise<T> {
    return this._model.update({
      where: { id },
      data: item,
    });
  }
  create<_ = TCreate>(item: Partial<_>): Promise<T> {
    return this._model.create({ data: item });
  }
  delete(id: string): Promise<T> {
    return this._model.update({ where: { id } }, { data: { deletedAt: true } });
  }
  remove(id: string): Promise<T> {
    return this._model.delete({ where: { id } });
  }
  count<_ = TFilter>(filter: Partial<_>): Promise<number> {
    return this._model
      .findMany({ where: filter })
      .then((items: T[]) => items.length);
  }
  isExist(id: string): boolean {
    return !!this._model.findUnique({ where: { id } });
  }
}
