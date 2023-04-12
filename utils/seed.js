const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connection to database successful.');
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = [];
    const thoughts = getRandomThought(9);

    for(let i = 0; i < 15; i++) {
        const fullName = getRandomName();
        const first = fullName.split(' ')[0];
        const last = fullName.split(' ')[1];

        users.push({
            first,
            last,
            email: `${first}_${last}@domain.com`,
            username: `${first}.${last}`,
        }
        );
    }

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete!');
    process.exit(0);
})