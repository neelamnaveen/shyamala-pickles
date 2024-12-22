import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  private visitCount = 0;
  private filePath = join(__dirname, '../../frontend/build/index.html');
  serveFrontend(): string {
    this.visitCount+=1;
    console.log("Visit Count: ",this.visitCount)
    return readFileSync(this.filePath, 'utf8');
  }
}
