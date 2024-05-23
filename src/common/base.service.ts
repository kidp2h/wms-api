import { IRepository, IService } from './types';

export default abstract class BaseService<T, TFilter, TCreate, TUpdate>
  implements IService<T, TFilter, TCreate, TUpdate>
{
  protected _repository: IRepository<T, TFilter, TCreate, TUpdate>;

  findOneById(id: string): Promise<T> {
    console.log(id);

    return this._repository.findOneById(id);
  }
  findOne(filter: Partial<TFilter>): Promise<T> {
    return this._repository.findOne(filter);
  }
  findMany(filter: Partial<TFilter>): Promise<T[]> {
    return this._repository.findMany(filter);
  }
  update(id: string, item: Partial<TUpdate>): Promise<T> {
    return this._repository.update(id, item);
  }
  create(item: Partial<TCreate>): Promise<T> {
    return this._repository.create(item);
  }
  delete(id: string): Promise<T> {
    return this._repository.delete(id);
  }
  remove(id: string): Promise<T> {
    return this._repository.remove(id);
  }
}
