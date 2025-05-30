declare module 'tajweed' {
  export class Tajweed {
    constructor();
    parse(text: string, withHtml?: boolean): string;
  }
}