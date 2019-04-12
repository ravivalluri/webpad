import { webpadPost } from '../../../core';

export interface Template {
  id: number;
  name: string;
  description: string;
  initWith: webpadPost;
}
