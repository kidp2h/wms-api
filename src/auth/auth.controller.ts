import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller({
  path: '/auth',
})
@ApiTags('auth'.toUpperCase())
export class EmployeeController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiBody({ required: true, type: AuthDto })
  async authorize(@Body() credentials: AuthDto) {
    // this.authService.authorize(credentials);
    console.log(credentials);
  }
}
