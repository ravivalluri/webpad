import { webpadPost } from '../webpadPost';
import { createPermlink, withPermlink } from './withPermlink';
import { assoc } from 'ramda';

fdescribe('#core #steemize createPermlink', () => {
  it('should create a correct permlink when a title is NOT empty', () => {
    const englishTitle = 'Will Steem be ruling the world?';
    const polishTitle = 'Czy Steem zawładnie światem?';

    const englishPermlink: string = createPermlink(englishTitle);
    const polishPermlink: string = createPermlink(polishTitle);

    expect(englishPermlink).toContain('will-steem-be-ruling-the-world');
    expect(polishPermlink).toContain('czy-steem-zawladnie-swiatem');
  });

  it('should create a correct permlink when a title is empty', () => {
    const permlink: string = createPermlink('');

    expect(permlink).toBeDefined();
    expect(permlink).not.toContain('-');
  });
});

fdescribe('#core #steemize withPermlink', () => {
  let webpadPost: webpadPost;

  beforeEach(() => {
    webpadPost = {
      title: 'This is America',
      body: '',
      thumbnailUrl: '',
      tags: [],
      community: '',
      jsonMetadata: '',
      beneficiaries: [],
      allowVotes: true,
      allowCurationRewards: true,
      percentSteemDollars: 50,
      maxAcceptedPayout: 1000
    };
  });

  it('should return an object with a `permlink` property', () => {
    const result = withPermlink(webpadPost)({});

    expect(result.permlink).toBeDefined();
  });

  it('should return an object with a `permlink` property based on `webpadPost.title` if `webpadPost.permlink` is NOT defined', () => {
    const result = withPermlink(webpadPost)({});

    expect(result.permlink).toContain('america');
  });

  it('should return an object with `permlink` property equal to `webpadPost.permlink` if it is defined', () => {
    const webpadPostWithPermlink = assoc(
      'permlink',
      'any-permlink',
      webpadPost
    );

    const result = withPermlink(webpadPostWithPermlink)({});

    expect(result.permlink).toEqual('any-permlink');
  });

  it('should NOT mutate the original `webpadPost` object', () => {
    withPermlink(webpadPost)({});

    expect(webpadPost).toEqual({
      title: 'This is America',
      body: '',
      thumbnailUrl: '',
      tags: [],
      community: '',
      jsonMetadata: '',
      beneficiaries: [],
      allowVotes: true,
      allowCurationRewards: true,
      percentSteemDollars: 50,
      maxAcceptedPayout: 1000
    });
  });

  it('should NOT mutate the original `target` object', () => {
    const target = {
      body: 'any'
    };

    withPermlink(webpadPost)(target);

    expect(target).toEqual({
      body: 'any'
    });
  });
});
