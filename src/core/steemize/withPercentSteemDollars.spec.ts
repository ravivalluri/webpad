import { webpadPost } from '../webpadPost';
import { withPercentSteemDollars } from './withPercentSteemDollars';

fdescribe('#core #steemize withPercentSteemDollars', () => {
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

  it('should return an object with a calculated `percent_steem_dollars` property', () => {
    const result = withPercentSteemDollars(webpadPost)({});

    expect(result.percent_steem_dollars).toEqual(10000);
  });

  it('should NOT mutate the original `webpadPost` object', () => {
    withPercentSteemDollars(webpadPost)({});

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
      body: 'any'
    };

    withPercentSteemDollars(webpadPost)(target);

    expect(target).toEqual({
      body: 'any'
    });
  });
});
