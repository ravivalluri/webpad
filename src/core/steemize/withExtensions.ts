import { always, assoc, ifElse, isEmpty, map, multiply } from 'ramda';
import { webpadPost } from '../webpadPost';

/**
 * Creates and returns extensions for `comment_options` operation.
 * @param beneficiaries Array of beneficiaries.
 */
export const createExtensions = (
  beneficiaries: Array<{ account: string; weight: number }>
): Array<[0, { beneficiaries: Array<{ account: string; weight: number }> }]> =>
  ifElse(isEmpty, always([]), () => [
    [
      0,
      {
        beneficiaries: map(
          beneficiary => ({
            account: beneficiary.account,
            weight: multiply(100, beneficiary.weight)
          }),
          beneficiaries
        )
      }
    ]
  ])(beneficiaries);

/**
 * Adds a `extensions` property to provided `target` object, based on provided `webpadPost` object.
 */
export const withExtensions = (webpadPost: webpadPost) => (target: {
  [key: string]: any;
}): {
  extensions: Array<
    [0, { beneficiaries: Array<{ account: string; weight: number }> }]
  >;
  [K: string]: any;
} => assoc('extensions', createExtensions(webpadPost.beneficiaries), target);
