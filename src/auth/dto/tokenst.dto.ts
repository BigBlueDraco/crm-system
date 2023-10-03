import { Tokens } from '../types/token';

export class TokensDto implements Tokens {
  access: string;
  refresh: string;
}
