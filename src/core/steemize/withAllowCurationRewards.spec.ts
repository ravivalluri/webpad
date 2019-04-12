import { webpadPost } from '../webpadPost';
import { withAllowCurationRewards } from './withAllowCurationRewards';

fdescribe('#core #steemize withAllowCurationRewards', () => {
  let webpadPost: webpadPost;

  beforeEach(() => {
    webpadPost = {
      title: '',
      body: '',
      thumbnailUrl: '',
      community: '',
      tags: [],
      jsonMetadata: '',
      beneficiaries: [],
      allowVotes: true,
      allowCurationRewards: true,
      percentSteemDollars: 50,
      maxAcceptedPayout: 1000
    };
  });

  it('should return an object with a `allow_curation_rewards` property', () => {
    const result = withAllowCurationRewards(webpadPost)({});

    expect(result.allow_curation_rewards).toBe(true);
  });

  it('should NOT mutate the original `webpadPost` object', () => {
    withAllowCurationRewards(webpadPost)({});

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

    withAllowCurationRewards(webpadPost)(target);

    expect(target).toEqual({
      title: 'any'
    });
  });
});
