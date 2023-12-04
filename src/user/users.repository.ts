import { Repository } from "typeorm";
import { User } from "./entities";
import { Injectable } from "@nestjs/common";

@Injectable()
class UsersRepository extends Repository<User>{
}