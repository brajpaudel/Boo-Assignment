const { saveNewProfile } = require('../repositories/profile.repository');

const profileSeeder = async () => {
  try {
    const dataSave = {
      name: 'Elon Musk Seeder',
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
    };
    await saveNewProfile(dataSave);
  } catch (err) {
    throw err;
  }
};

module.exports = { profileSeeder };
