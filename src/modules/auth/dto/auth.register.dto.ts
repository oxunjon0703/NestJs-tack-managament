import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum } from 'src/common/enums/enum';

const Role = [RoleEnum.admin, RoleEnum.manager, RoleEnum.worker];

export class RegisterDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    type: Number,
  })
  @IsInt()
  company_id: number;

  @ApiProperty({
    type: String,
  })
  @IsEnum(Role)
  @IsNotEmpty()
  role: RoleEnum;

  created_at: Date;
  last_updated_at: Date;
  created_by: number;
  last_updated_by: number;
}
