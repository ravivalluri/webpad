import { assoc } from 'ramda';
import { webpadPost } from '../webpadPost';

/**
 * Adds a `parent_author` property to provided `target` object, based on provided `webpadPost` object.
 */
export const withParentAuthor = (webpadPost: webpadPost) => (target: {
  [key: string]: any;
}): { parent_author: string; [K: string]: any } =>
  assoc('parent_author', '', target);
