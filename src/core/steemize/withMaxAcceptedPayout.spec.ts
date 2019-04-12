import { webpadPost } from '../webpadPost';
import { withMaxAcceptedPayout } from './withMaxAcceptedPayout';

fdescribe('#core #steemize withMaxAcceptedPayout', () => {
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

  it('should return an object with a correct `max_accepted_payout` property', () => {
    const result = withMaxAcceptedPayout(webpadPost)({});

    expect(result.max_accepted_payout).toEqual('1000.000 SBD');
  });

  it('should NOT mutate the original `webpadPost` object', () => {
    withMaxAcceptedPayout(webpadPost)({});

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

    withMaxAcceptedPayout(webpadPost)(target);

    expect(target).toEqual({
      body: 'any'
    });
  });
});
