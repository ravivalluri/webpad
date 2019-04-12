import { assoc, defaultTo } from 'ramda';
import { webpadPost } from '../webpadPost';

/**
 * Creates parent permlink based on main tag.
 * @param mainTag A first tag (category). However, it is optional ('webpad' by default).
 */
export const createParentPermlink: (
  mainTag: string | null | undefined
) => string = defaultTo('webpad');

/**
 * Adds a `parent_permlink` property to provided `target` object, based on provided `webpadPost` object.
 */
export const withParentPermlink = (webpadPost: webpadPost) => (target: {
  [key: string]: any;
}): { parent_permlink: string; [K: string]: any } =>
  assoc('parent_permlink', createParentPermlink(webpadPost.tags[0]), target);
