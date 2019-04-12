import { assoc } from 'ramda';
import { webpadPost } from '../webpadPost';

/**
 * Adds a `max_accepted_payout` property to provided `target` object, based on provided `webpadPost` object.
 */
export const withMaxAcceptedPayout = (webpadPost: webpadPost) => (target: {
  [key: string]: any;
}): { max_accepted_payout: string; [K: string]: any } =>
  assoc(
    'max_accepted_payout',
    `${webpadPost.maxAcceptedPayout}.000 SBD`,
    target
  );
