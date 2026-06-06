import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Partial<Admin>> {
    const existingAdmin = await this.adminRepository.findOne({
      where: { email: createAdminDto.email },
    });

    if (existingAdmin) {
      throw new ConflictException('Email already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createAdminDto.password, saltRounds);

    const newAdmin = this.adminRepository.create({
      ...createAdminDto,
      password: hashedPassword,
    });

    const savedAdmin = await this.adminRepository.save(newAdmin);
    
    // exclude password from response
    const { password, ...result } = savedAdmin;
    return result;
  }

  async findAll(): Promise<Partial<Admin>[]> {
    const admins = await this.adminRepository.find();
    return admins.map(admin => {
      const { password, ...result } = admin;
      return result;
    });
  }

  async findByEmail(email: string): Promise<Admin | null> {
    return this.adminRepository.findOne({ where: { email } });
  }

  async seedDefaultAdmin(): Promise<void> {
    const adminCount = await this.adminRepository.count();
    if (adminCount === 0) {
      const defaultAdminDto: CreateAdminDto = {
        name: 'Super Admin',
        email: 'admin@college.com',
        password: 'Admin@123',
      };
      await this.create(defaultAdminDto);
      this.logger.log('Seeded default admin: admin@college.com / Admin@123');
    }
  }
}
