import { assoc, multiply } from 'ramda';
import { webpadPost } from '../webpadPost';

/**
 * Adds a `percent_steem_dollars` property to provided `target` object, based on provided `webpadPost` object.
 */
export const withPercentSteemDollars = (webpadPost: webpadPost) => (target: {
  [key: string]: any;
}): { percent_steem_dollars: number; [K: string]: any } =>
  assoc(
    'percent_steem_dollars',
    multiply(200, webpadPost.percentSteemDollars),
    target
  );
