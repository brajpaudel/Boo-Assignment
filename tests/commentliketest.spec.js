const request = require('supertest');
const app = require('../app'); // Assuming your app is in a sibling directory

describe('Profile, User, Comment, Like Sort Filter Integrated Automated Testing', () => {
  let profileId;
  let userId;
  let commentId;
  beforeAll(async () => {
    try {
      const userRes = await request(app).post('/api/v1/user').send({
        name: 'Buddhi Raj Paudel',
      });
      const userData = userRes.body;
      userId = userData.data.data._id;
      const profileRes = await request(app)
        .post('/profile')
        .send({
          name: 'Elon Musk',
          description: `Elon Reeve Musk FRS (/ˈiːlɒn/; born June 28, 1971) is a technology entrepreneur, investor, and engineer. He holds South African, Canadian, and U.S. citizenship and is the founder, CEO, and lead designer of SpaceX; co-founder, CEO, and product architect of Tesla, Inc.; co-founder and CEO of Neuralink; founder of The Boring Company; co-founder and co-chairman of OpenAI; and co-founder of PayPal. As of February 2021, Musk's net worth stands at $184 billion, making him the 2nd richest person in the world.`,
          mbti: 'INTP',
          enneagram: '5w6',
          variant: 'so/sp',
          tritype: '513',
          socionics: 'ILE',
          sloan: 'RCOEI',
          psyche: 'VLFE',
          temperaments: 'phlegmatic',
          category: ['Business', 'Technology'],
        });
      const profileData = JSON.parse(profileRes.text);
      profileId = profileData.data.data._id;
    } catch (error) {
      console.error('Error during setup:', error);
      throw error;
    }
  });
  it('should allow user to post a comment on profile', async () => {
    const commentRes = await request(app).post('/api/v1/comment').send({
      profileId,
      userId,
      title: 'Comment Title',
      description: 'Comment Description',
      mbti: 'ISTJ',
      zodiac: 'Virgo',
      enneagram: '9w8',
    });
    expect(commentRes.status).toBe(200);
    expect(commentRes.body).toBeInstanceOf(Object);
    expect(commentRes.body).toHaveProperty('data');
    const commentData = commentRes.body;
    commentId = commentData.data.data._id;
  });

  it('should allow another user to like the comment', async () => {
    const anotherUserRes = await request(app).post('/api/v1/user').send({
      name: 'Like User',
    });
    const anotherUserData = anotherUserRes.body;
    const anotherUserId = anotherUserData.data.data._id;
    const likeRes = await request(app).post('/api/v1/comment/like').send({
      commentId,
      userId: anotherUserId,
      like: true,
    });
    expect(likeRes.status).toBe(200);
    expect(likeRes.body).toBeInstanceOf(Object);
    expect(likeRes.body).toHaveProperty('data');
  });

  it('should filter data with zodiac equals Virgo', async () => {
    //saving few comments to test filter feature
    const commentData = [
      { title: 'Comment 1', description: 'Description 1', mbti: 'ISTJ', enneagram: '9w8' },
      { title: 'Comment 2', description: 'Description 2', mbti: 'INTP', zodiac: 'Virgo', enneagram: '5w6' },
      { title: 'Comment 3', description: 'Description 3', mbti: 'ENTJ', zodiac: 'Scorpio' },
      { title: 'Comment 4', description: 'Description 4', mbti: 'INFJ', zodiac: 'Pisces', enneagram: '4w5' },
      { title: 'Comment 5', description: 'Description 5', mbti: 'ENFP', zodiac: 'Aquarius', enneagram: '7w6' },
      { title: 'Comment 6', description: 'Description 6', zodiac: 'Taurus', enneagram: '6w5' },
    ];
    const commentPromises = commentData.map(async (comment) => {
      const commentRes = await request(app)
        .post('/api/v1/comment')
        .send({
          profileId,
          userId,
          ...comment,
        });
    });
    await Promise.all(commentPromises);

    const filterRes = await request(app).get(`/api/v1/comment/${profileId}?zodiac=Virgo`).send();
    expect(filterRes.status).toBe(200);
    expect(filterRes.body).toBeInstanceOf(Object);
    expect(filterRes.body).toHaveProperty('data');
    const filteredComments = filterRes.body.data.data;
    const findingVirgoData = filteredComments.filter((x) => x.zodiac == 'Virgo');
    expect(findingVirgoData.length).toBe(filteredComments.length);
    // Add assertions to check if the filteredComments match the criteria specified in the query
  });

  it('should sort data with like count descending order', async () => {
    const sortRes = await request(app).get(`/api/v1/comment/${profileId}?sort=best`).send();
    expect(sortRes.status).toBe(200);
    expect(sortRes.body).toBeInstanceOf(Object);
    expect(sortRes.body).toHaveProperty('data');
    const sortedComments = sortRes.body.data.data;
    expect(sortedComments[0].likeCount).toBe(1);
    // Add assertions to check if the filteredComments match the criteria specified in the query
  });
});
