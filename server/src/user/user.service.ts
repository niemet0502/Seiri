import { InjectQueue } from '@nestjs/bull';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { Queue } from 'bull';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/dto/login.dto';
import { ProjectService } from '../project/project.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DEFAULT_PROJECT } from './type';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger('EmailSending');
  constructor(
    private readonly sessionService: AuthService,
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => ProjectService))
    private readonly projectService: ProjectService,
    @InjectQueue('sendEmail') private sendEmailQueue: Queue,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    let user = new User();
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    user.isConfirm = false;

    user = await this.save(user);

    delete user.password;

    // add email sending to the queue
    const job = await this.sendEmailQueue.add('welcomeEmail', {
      email: user.email,
      web_app_link: process.env.WEB_APP_ADDRESS,
    });
    this.logger.log(`add email to the queue ${job}`);

    // create default projects
    await this.projectService.create(
      { name: DEFAULT_PROJECT.Completed, isDefault: true, handledObject: 1 },
      user,
    );
    await this.projectService.create(
      { name: DEFAULT_PROJECT.Today, isDefault: true, handledObject: 1 },
      user,
    );

    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: number) {
    return await this.userRepository.findById(id);
  }

  async findOne({ email, password }: LoginDto): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return null;
    }

    if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      return user;
    }

    return null;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    let toUpdate = await this.userRepository.findById(id);
    delete toUpdate.password;

    let updated = Object.assign(toUpdate, updateUserDto);
    return await this.userRepository.save(updated);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async save(user: User) {
    return await this.userRepository.save(user);
  }

  async remove(user: User) {
    return await this.userRepository.remove(user);
  }

  async updatePassword(user: User, updatePassword: UpdatePasswordDto) {
    const { email } = user;
    const { oldPassword, newPassword } = updatePassword;

    const currentPassword = await this.userRepository.findByEmail(email);

    if (!(await bcrypt.compare(oldPassword, currentPassword.password))) {
      throw new HttpException(
        'Incorrect old password provided',
        HttpStatus.UNAUTHORIZED,
      );
    }

    user.password = await bcrypt.hash(newPassword, 10);

    const updatedUser = await this.userRepository.save(user);

    delete updatedUser.password;

    return updatedUser;
  }

  async forgotPassword(data: ForgotPasswordDto) {
    const { email } = data;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const { token } = await this.sessionService.createSession(user);
    // add email with token to the job queue

    await this.sendEmailQueue.add('resetPasswordEmail', {
      user,
      email,
      token,
      web_app_link:
        process.env.WEB_APP_ADDRESS + 'auth/reset-password/' + token,
    });
  }

  async resetPassword(data: ResetPasswordDto) {
    const { resetToken, password } = data;

    const session = await this.sessionService.findOne(resetToken);

    if (!session) {
      throw new HttpException('Invalid token', HttpStatus.NOT_FOUND);
    }

    const user = await this.userRepository.findByEmail(session.user.email);

    await this.sessionService.removeAll(user);

    user.password = await bcrypt.hash(password, 10);

    return await this.userRepository.save(user);
  }
}
