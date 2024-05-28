import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class AuthDto {
  @ApiProperty({ type: String, required: true, default: 'E000001' })
  code: string;

  @ApiProperty({ type: String, required: true, default: 'abcdxyz' })
  // @Min(6)
  password: string;
}
