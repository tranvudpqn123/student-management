import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { HashingProvider } from "./hasding.provider";

@Injectable()
export class BcryptProvider implements HashingProvider {
    async hashPassword(password: string) {
        let salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }
    
    async comparePassword(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }
 
}