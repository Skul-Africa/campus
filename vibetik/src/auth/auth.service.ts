import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import type { UserDocument } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<AuthResponseDto> {
    const user = await this.usersService.create(
      signUpDto.name,
      signUpDto.email,
      signUpDto.password,
    );

    const userId = user._id.toString();
    const accessToken = this.jwtService.sign({
      sub: userId,
      email: user.email,
    });

    return {
      accessToken,
      user: {
        id: userId,
        email: user.email,
        name: user.name,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      user,
      loginDto.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userId = user._id.toString();
    const accessToken = this.jwtService.sign({
      sub: userId,
      email: user.email,
    });

    return {
      accessToken,
      user: {
        id: userId,
        email: user.email,
        name: user.name,
      },
    };
  }

  async validateUser(id: string) {
    return this.usersService.findById(id);
  }
}