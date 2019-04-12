import {
  always,
  assoc,
  compose,
  contains,
  either,
  identity,
  ifElse,
  init,
  isEmpty,
  isNil,
  last,
  map,
  match,
  mergeDeepLeft,
  o,
  pipe,
  prepend,
  reject,
  test,
  uniq,
  __
} from 'ramda';
import * as appInfo from '../../../package.json';
import { webpadPost } from '../webpadPost';
import { getMatchesByGroup } from '../utils';

/**
 * Adds `app` property with app name and info to provided `target` object.
 */
export const withApp: (target: {
  [K: string]: any;
}) => {
  app: string;
  [K: string]: any;
} = assoc('app', `${(appInfo as any).name}/${(appInfo as any).version}`);

/**
 * Adds `tags` property to provided `target` object, based on provided `tags` array.
 * Note that the `tags` property will be an array of unique strings.
 */
export const withTags = (tags: Array<string>) => (target: {
  [K: string]: any;
}): { tags: Array<string>; [K: string]: any } =>
  assoc('tags', uniq(tags), target);

/**
 * Gets users (mentions) from a given text.
 * @param text A text to get users from.
 * @returns Array of users.
 */
export const getUsers: (text: string) => Array<string> = pipe(
  getMatchesByGroup(/@([a-zA-Z0-9-]+)/g, 1),
  uniq
);

/**
 * Adds `users` property to provided `target` object, based on provided `body` string.
 * Note that the `users` property will be an array of unique strings.
 */
export const withUsers = (body: string) => (target: {
  [K: string]: any;
}): { users: Array<string>; [K: string]: any } =>
  assoc('users', getUsers(body), target);

/**
 * Gets a format of a given `body`.
 * @param body A text to determine the format of.
 * @returns 'markdown' or 'html'
 */
export const getFormat: (body: string) => 'markdown' | 'html' = ifElse(
  test(/<html>[\s\S]*<\/html>/),
  always('html'),
  always('markdown')
);

/**
 * Adds `format` property to provided `target` object, based on provided `body` string.
 */
export const withFormat = (body: string) => (target: {
  [K: string]: any;
}): { format: string; [K: string]: any } =>
  assoc('format', getFormat(body), target);

/**
 * Extracts links to images from given string.
 * Note that it will only return links to images which are correctly formatted with Markdown.
 * @param text A text to extract links to images from.
 * @returns An array of unique links.
 */
export const getImages: (text: string) => Array<string> = pipe(
  getMatchesByGroup(/(?:!\[(.*?)\]\((.*?)\))/g, 2),
  uniq
);

/**
 * Adds `image` property to provided `target` object, based on provided `body` string and optionally provided `thumbnail`.
 */
export const withImage = (body: string, thumbnail?: string) => (target: {
  [K: string]: any;
}): { image: Array<string>; [K: string]: any } =>
  assoc(
    'image',
    ifElse(
      either(isNil, isEmpty),
      compose(
        always,
        getImages
      )(body),
      compose(
        always,
        prepend(thumbnail),
        getImages
      )(body)
    )(thumbnail),
    target
  );

/**
 * Extracts links from given string.
 * @param text A text to extract links from.
 * @returns An array of unique links.
 */
export const getLinks = (text: string): Array<string> => {
  const linksToImages = getImages(text);
  return pipe(
    match(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    ),
    reject(contains(__, linksToImages)),
    uniq
  )(text);
};

/**
 * Adds `links` property to provided `target` object, based on provided `body` string.
 */
export const withLinks = (body: string) => (target: {
  [K: string]: any;
}): { links: Array<string>; [K: string]: any } =>
  assoc('links', getLinks(body), target);

/**
 * Adds `community` property to provided `target` object, based on provided `community` string.
 */
export const withCommunity = (community: string) => (target: {
  [K: string]: any;
}): { community?: string; [K: string]: any } =>
  !!community ? assoc('community', community, target) : target;

/**
 * Creates `json_metadata` based on provided `webpadPost` object.
 */
export const createJsonMetadata = (webpadPost: webpadPost): string =>
  pipe(
    withApp,
    withFormat(webpadPost.body),
    withImage(webpadPost.body, webpadPost.thumbnailUrl),
    withTags(webpadPost.tags),
    withUsers(webpadPost.body),
    withLinks(webpadPost.body),
    withCommunity(webpadPost.community),
    ifElse(isEmpty, () => identity, o(mergeDeepLeft, JSON.parse))(
      webpadPost.jsonMetadata
    ),
    JSON.stringify
  )({});

/**
 * Adds `json_metadata` property to provided `target` object, based on provided `webpadPost` object.
 */
export const withJsonMetadata = (webpadPost: webpadPost) => (target: {
  [K: string]: any;
}): { json_metadata: string; [K: string]: any } =>
  assoc('json_metadata', createJsonMetadata(webpadPost), target);
