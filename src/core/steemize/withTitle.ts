import { assoc } from 'ramda';
import { webpadPost } from '../webpadPost';
/**
 * Adds a `title` property to provided `target` object, based on provided `webpadPost` object.
 */
export const withTitle = (webpadPost: webpadPost) => (target: {
  [key: string]: any;
}): { title: string; [K: string]: any } =>
  assoc('title', webpadPost.title, target);
