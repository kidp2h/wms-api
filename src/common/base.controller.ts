import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Type,
} from '@nestjs/common';
import { IController, IService } from './types';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

export function BaseController<T, TFilter, TCreate, TUpdate>(
  name: string,
  refEntity: Type<T>,
  refFilterDto: Type<Partial<TFilter>>,
  refCreateDto: Type<TCreate>,
  refUpdateDto: Type<TUpdate>,
): any {
  @ApiTags(name.toUpperCase())
  abstract class _BaseController
    implements IController<T, TFilter, TCreate, TUpdate>
  {
    protected _service: IService<T, TFilter, TCreate, TUpdate>;

    @Get(`/${name.toLowerCase()}/:id`)
    findOneById(@Param('id') id: string): any {
      return this._service.findOneById(id);
    }

    @Get(`/${name.toLowerCase()}`)
    @ApiQuery({ name: 'filter', required: false, type: refFilterDto })
    findOne(@Query() filter: Partial<TFilter>): Promise<T> {
      return this._service.findOne(filter);
    }
    @Get(`/${name.toLowerCase()}s`)
    @ApiQuery({ name: 'filter', required: true, type: refFilterDto })
    findMany(@Query() filter: Partial<TFilter>): Promise<T[]> {
      return this._service.findMany(filter);
    }

    @Post(`/${name.toLowerCase()}`)
    @ApiBody({ required: true, type: refCreateDto })
    create(@Body() item: Partial<TCreate>): Promise<T> {
      return this._service.create(item);
    }
    @Delete(`/${name.toLowerCase()}/delete/:id`)
    delete(@Param('id') id: string): Promise<T> {
      return this._service.delete(id);
    }

    @Delete(`/${name.toLowerCase()}/remove/:id`)
    remove(@Param('id') id: string): Promise<T> {
      return this._service.remove(id);
    }
    @Put(`/${name.toLowerCase()}/:id`)
    @ApiBody({ required: true, type: refUpdateDto })
    update(
      @Param('id') id: string,
      @Body() item: Partial<TUpdate>,
    ): Promise<T> {
      return this._service.update(id, item);
    }
  }
  return _BaseController;
}
