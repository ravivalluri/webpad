import { assoc } from 'ramda';
import { webpadPost } from '../webpadPost';

/**
 * Adds a `allow_curation_rewards` property to provided `target` object, based on provided `webpadPost` object.
 */
export const withAllowCurationRewards = (webpadPost: webpadPost) => (target: {
  [key: string]: any;
}): { allow_curation_rewards: boolean; [K: string]: any } =>
  // hardcoded true cause of a problem with api.steemit.com node (Hivemind)
  assoc('allow_curation_rewards', true, target);
