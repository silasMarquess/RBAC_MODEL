import { Injectable } from '@nestjs/common';
import IHashPassordGenerator from '../hashpassword.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class BcryptService implements IHashPassordGenerator {
  async verify(passowrdText: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(passowrdText, hash);
  }

  async hashGenerator(passwordText: string): Promise<string> {
    return await bcrypt.hash(passwordText, 10);
  }
}
