import { webpadPost } from '../webpadPost';
import { withTitle } from './withTitle';

fdescribe('#core #steemize withTitle', () => {
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

  it('should return an object with a `title` property', () => {
    const result = withTitle(webpadPost)({});

    expect(result.title).toBe('This is America');
  });

  it('should NOT mutate the original `webpadPost` object', () => {
    withTitle(webpadPost)({});

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

    withTitle(webpadPost)(target);

    expect(target).toEqual({
      body: 'any'
    });
  });
});
