import { webpadPost } from '../webpadPost';
import { withParentAuthor } from './withParentAuthor';

fdescribe('#core #steemize withParentAuthor', () => {
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

  it('should return an object with a `parent_author` property', () => {
    const result = withParentAuthor(webpadPost)({});

    expect(result.parent_author).toBeDefined();
  });

  it('should NOT mutate the original `webpadPost` object', () => {
    withParentAuthor(webpadPost)({});

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

    withParentAuthor(webpadPost)(target);

    expect(target).toEqual({
      body: 'any'
    });
  });
});
