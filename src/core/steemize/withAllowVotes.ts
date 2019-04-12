import { assoc } from 'ramda';
import { webpadPost } from '../webpadPost';

/**
 * Adds a `allow_votes` property to provided `target` object, based on provided `webpadPost` object.
 */
export const withAllowVotes = (webpadPost: webpadPost) => (target: {
  [key: string]: any;
}): { allow_votes: boolean; [K: string]: any } =>
  // hardcoded true cause of a prolem with api.steemit.com node
  assoc('allow_votes', true, target);
