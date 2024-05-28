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
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Message } from './decorators/message.decorator';
import { capitalize } from 'lodash';

export function BaseController<
  T,
  TFilter = unknown,
  TCreate = unknown,
  TUpdate = unknown,
>(
  refEntity: Type<T>,
  refFilterDto: Type<TFilter>,
  refCreateDto: Type<TCreate>,
  refUpdateDto: Type<TUpdate>,
  isAuth: boolean = false,
  _name?: string,
): any {
  const name = _name || refEntity.name.toUpperCase();
  if (!isAuth) {
    @ApiTags(name.toUpperCase())
    abstract class Controller implements IController<T> {
      constructor(private _service: IService<T, TFilter, TCreate, TUpdate>) {}
      @Get(`/${name.toLowerCase()}/:id`)
      @Message.Success({ message: `${capitalize(name)} found`, status: 201 })
      @Message.Error({ message: `${capitalize(name)} not found`, status: 404 })
      findOneById(@Param('id') id: string): any {
        return this._service.findOneById(id);
      }

      @Get(`/${name.toLowerCase()}`)
      @ApiQuery({ name: 'filter', required: false, type: refFilterDto })
      @Message.Success({ message: `${capitalize(name)} found`, status: 201 })
      @Message.Error({ message: `${capitalize(name)} not found`, status: 201 })
      findOne(@Query() filter: Partial<TFilter>): Promise<T> {
        return this._service.findOne(filter);
      }
      @Get(`/${name.toLowerCase()}s`)
      @ApiQuery({ name: 'filter', required: true, type: refFilterDto })
      @Message.Success({ message: `${capitalize(name)} found`, status: 201 })
      @Message.Error({
        message: `An error occurred while fetching, please try again!`,
        status: 404,
      })
      findMany(@Query() filter: Partial<TFilter>): Promise<T[]> {
        return this._service.findMany(filter);
      }

      @Post(`/${name.toLowerCase()}`)
      @ApiBody({ required: true, type: refCreateDto })
      @Message.Success({
        message: `${capitalize(name)} was created!`,
        status: 201,
      })
      @Message.Error({
        message: `An error occurred while creating, please try again!`,
        status: 404,
      })
      create(@Body() item: Partial<TCreate>): Promise<T> {
        return this._service.create(item);
      }
      @Delete(`/${name.toLowerCase()}/delete/:id`)
      @Message.Success({
        message: `${capitalize(name)} was deleted!`,
        status: 201,
      })
      @Message.Error({
        message: `An error occurred while deleting, please try again!`,
        status: 404,
      })
      delete(@Param('id') id: string): Promise<T> {
        return this._service.delete(id);
      }

      @Delete(`/${name.toLowerCase()}/remove/:id`)
      @Message.Success({
        message: `${capitalize(name)} was removed!`,
        status: 201,
      })
      @Message.Error({
        message: `An error occurred while removing, please try again!`,
        status: 404,
      })
      remove(@Param('id') id: string): Promise<T> {
        return this._service.remove(id);
      }
      @Put(`/${name.toLowerCase()}/:id`)
      @ApiBody({ required: true, type: refUpdateDto })
      @Message.Success({
        message: `${capitalize(name)} was updated!`,
        status: 201,
      })
      @Message.Error({
        message: `An error occurred while updating, please try again!`,
        status: 404,
      })
      update(
        @Param('id') id: string,
        @Body() item: Partial<TUpdate>,
      ): Promise<T> {
        return this._service.update(id, item);
      }
    }
    return Controller;
  } else {
    @ApiTags(name.toUpperCase())
    abstract class ControllerWithAuth implements IController<T> {
      constructor(private _service: IService<T, TFilter, TCreate, TUpdate>) {}
      @Get(`/${name.toLowerCase()}/:id`)
      @Message.Success({ message: `${capitalize(name)} found`, status: 201 })
      @Message.Error({ message: `${capitalize(name)} not found`, status: 404 })
      @ApiBearerAuth('JWT-auth')
      findOneById(@Param('id') id: string): any {
        return this._service.findOneById(id);
      }

      @Get(`/${name.toLowerCase()}`)
      @ApiQuery({ name: 'filter', required: false, type: refFilterDto })
      @Message.Success({ message: `${capitalize(name)} found`, status: 201 })
      @Message.Error({ message: `${capitalize(name)} not found`, status: 201 })
      @ApiBearerAuth('JWT-auth')
      findOne(@Query() filter: Partial<TFilter>): Promise<T> {
        return this._service.findOne(filter);
      }
      @Get(`/${name.toLowerCase()}s`)
      @ApiQuery({ name: 'filter', required: true, type: refFilterDto })
      @Message.Success({ message: `${capitalize(name)} found`, status: 201 })
      @Message.Error({
        message: `An error occurred while fetching, please try again!`,
        status: 404,
      })
      @ApiBearerAuth('JWT-auth')
      findMany(@Query() filter: Partial<TFilter>): Promise<T[]> {
        return this._service.findMany(filter);
      }

      @Post(`/${name.toLowerCase()}`)
      @ApiBody({ required: true, type: refCreateDto })
      @Message.Success({
        message: `${capitalize(name)} was created!`,
        status: 201,
      })
      @ApiBearerAuth('JWT-auth')
      @Message.Error({
        message: `An error occurred while creating, please try again!`,
        status: 404,
      })
      create(@Body() item: Partial<TCreate>): Promise<T> {
        return this._service.create(item);
      }

      @Delete(`/${name.toLowerCase()}/delete/:id`)
      @Message.Success({
        message: `${capitalize(name)} was deleted!`,
        status: 201,
      })
      @ApiBearerAuth('JWT-auth')
      @Message.Error({
        message: `An error occurred while deleting, please try again!`,
        status: 404,
      })
      delete(@Param('id') id: string): Promise<T> {
        return this._service.delete(id);
      }

      @Delete(`/${name.toLowerCase()}/remove/:id`)
      @Message.Success({
        message: `${capitalize(name)} was removed!`,
        status: 201,
      })
      @ApiBearerAuth('JWT-auth')
      @Message.Error({
        message: `An error occurred while removing, please try again!`,
        status: 404,
      })
      remove(@Param('id') id: string): Promise<T> {
        return this._service.remove(id);
      }
      @Put(`/${name.toLowerCase()}/:id`)
      @ApiBody({ required: true, type: refUpdateDto })
      @Message.Success({
        message: `${capitalize(name)} was updated!`,
        status: 201,
      })
      @Message.Error({
        message: `An error occurred while updating, please try again!`,
        status: 404,
      })
      @ApiBearerAuth('JWT-auth')
      update(
        @Param('id') id: string,
        @Body() item: Partial<TUpdate>,
      ): Promise<T> {
        return this._service.update(id, item);
      }
    }
    return ControllerWithAuth;
  }
}
