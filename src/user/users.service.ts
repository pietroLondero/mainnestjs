import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserParams } from './utils/types/types';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async findOne(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username } });
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    createUser(userDetails: CreateUserParams) {
        const newUser = this.userRepository.create({ ...userDetails, createdAt: new Date() });
        return this.userRepository.save(newUser);
    }
}