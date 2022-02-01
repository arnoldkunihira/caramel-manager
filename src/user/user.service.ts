import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

    create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.repository.create(createUserDto);
        return this.repository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.repository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.repository.findOne(id);

        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.repository.preload({ id: id, ...updateUserDto });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return this.repository.save(user);
    }

    async remove(id: number): Promise<User> {
        const user = await this.findOne(id);
        return this.repository.remove(user);
    }
}
