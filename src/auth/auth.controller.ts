import {
  Body,
  Controller,
  HttpException,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Message } from '@/common/decorators/message.decorator';

@Controller({
  path: '/auth',
})
@ApiTags('auth'.toUpperCase())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiBody({ required: true, type: AuthDto })
  @ApiResponse({ status: 201, description: 'Authorize Employee' })
  @Message.Success({ message: 'Employee authorized', status: 201 })
  @Message.Error({ message: 'Invalid credentials', status: 401 })
  async authorize(@Body() credentials: AuthDto) {
    return this.authService.authorize(credentials);
  }
}
