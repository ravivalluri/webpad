import { compose, merge, pipe, zip } from 'ramda';
import { webpadPost } from '../webpadPost';
import { SteemPostOperation } from './../SteemPostOperation';
import { withAllowCurationRewards } from './withAllowCurationRewards';
import { withAllowVotes } from './withAllowVotes';
import { withAuthor } from './withAuthor';
import { withBody } from './withBody';
import { withExtensions } from './withExtensions';
import { withJsonMetadata } from './withJsonMetadata';
import { withMaxAcceptedPayout } from './withMaxAcceptedPayout';
import { withParentAuthor } from './withParentAuthor';
import { withParentPermlink } from './withParentPermlink';
import { withPercentSteemDollars } from './withPercentSteemDollars';
import { withPermlink } from './withPermlink';
import { withTitle } from './withTitle';

/**
 * Used internally in @see steemizePost, creates an object with `permlink` and `author` props.
 */
export const _createCommon = (
  webpadPost: webpadPost,
  author: string
): { permlink: string; author: string } =>
  pipe(
    withPermlink(webpadPost),
    withAuthor(author)
  )({});

/**
 * Steemizes a Swebpad's post.
 * @param webpadPost A post object used within webpad app.
 * @param author Name of author of the post.
 * @returns Steem operations array: `comment` and `comment_options`
 */
export const steemizePost = (
  webpadPost: webpadPost,
  author: string
): SteemPostOperation => {
  const commonProps = _createCommon(webpadPost, author);
  return zip(
    ['comment', 'comment_options'],
    [
      merge(
        commonProps,
        compose(
          withParentAuthor(webpadPost),
          withParentPermlink(webpadPost),
          withBody(webpadPost),
          withTitle(webpadPost),
          withJsonMetadata(webpadPost)
        )({})
      ),
      merge(
        commonProps,
        compose(
          withAllowCurationRewards(webpadPost),
          withAllowVotes(webpadPost),
          withMaxAcceptedPayout(webpadPost),
          withPercentSteemDollars(webpadPost),
          withExtensions(webpadPost)
        )({})
      )
    ]
  );
};
