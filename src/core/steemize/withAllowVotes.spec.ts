import { webpadPost } from '../webpadPost';
import { withAllowVotes } from './withAllowVotes';

fdescribe('#core #steemize withAllowVotes', () => {
  let webpadPost: webpadPost;

  beforeEach(() => {
    webpadPost = {
      title: '',
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

  it('should return an object with a `allow_votes` property', () => {
    const result = withAllowVotes(webpadPost)({});

    expect(result.allow_votes).toBeDefined();
  });

  it('should NOT mutate the original `webpadPost` object', () => {
    withAllowVotes(webpadPost)({});

    expect(webpadPost).toEqual({
      title: '',
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
      title: 'any'
    };

    withAllowVotes(webpadPost)(target);

    expect(target).toEqual({
      title: 'any'
    });
  });
});
