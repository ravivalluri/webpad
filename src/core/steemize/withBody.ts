import { assoc } from 'ramda';
import { webpadPost } from '../webpadPost';

/**
 * Adds a `body` property to provided `target` object, based on provided `webpadPost` object.
 */
export const withBody = (webpadPost: webpadPost) => (target: {
  [key: string]: any;
}): { body: string; [K: string]: any } =>
  assoc('body', webpadPost.body, target);
