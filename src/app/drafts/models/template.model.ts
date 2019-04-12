import { webpadPost } from './../../../core';

export interface Template {
  name: string;
  description: string;
  changeInPost: Partial<webpadPost>;
}
