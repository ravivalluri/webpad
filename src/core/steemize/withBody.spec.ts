import { webpadPost } from '../webpadPost';
import { withBody } from './withBody';

fdescribe('#core #steemize withBody', () => {
  let webpadPost: webpadPost;

  beforeEach(() => {
    webpadPost = {
      title: '',
      body: 'any body',
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

  it('should return an object with a `body` property', () => {
    const result = withBody(webpadPost)({});

    expect(result.body).toBe('any body');
  });

  it('should NOT mutate the original `webpadPost` object', () => {
    withBody(webpadPost)({});

    expect(webpadPost).toEqual({
      title: '',
      body: 'any body',
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

    withBody(webpadPost)(target);

    expect(target).toEqual({
      title: 'any'
    });
  });
});
