import { Prisma } from '@prisma/client';

export type Action = {
  [K in Prisma.PrismaAction]: (...args: any[]) => any;
};

export interface IController<T, TFilter, TCreate, TUpdate> {
  findOneById(id: string): Promise<T>;
  findOne(filter: Partial<TFilter>): Promise<T>;
  findMany(filter: Partial<TFilter>): Promise<T[]>;

  update(id: string, item: Partial<TUpdate>): Promise<T>;
  create(item: Partial<TCreate>): Promise<T>;
  delete(id: string): Promise<T>;
  remove(id: string): Promise<T>;
}

export interface IRepository<T, TFilter, TCreate, TUpdate> {
  findOneById(id: string): Promise<T>;
  findOne(filter: Partial<TFilter>): Promise<T>;
  findMany(filter: Partial<TFilter>): Promise<T[]>;

  update(id: string, item: Partial<TUpdate>): Promise<T>;
  create(item: Partial<TCreate>): Promise<T>;
  delete(id: string): Promise<T>;
  remove(id: string): Promise<T>;
  count(filter: Partial<TFilter>): Promise<number>;
  isExist(id: string): boolean;
}

export interface IService<T, TFilter, TCreate, TUpdate> {
  findOneById(id: string): Promise<T>;
  findOne(filter: Partial<TFilter>): Promise<T>;
  findMany(filter: Partial<TFilter>): Promise<T[]>;

  update(id: string, item: Partial<TUpdate>): Promise<T>;
  create(item: Partial<TCreate>): Promise<T>;
  delete(id: string): Promise<T>;
  remove(id: string): Promise<T>;
}
