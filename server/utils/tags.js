const tags = [
    'terror',
    'action',
    'mystery',
    'romance',
    'comedy',
    'crime',
    'adult',
    'fly',
    'war',
    'marvel',
    'family',
    'friend',
    'stars',
    'world',
    'sky',
    'brother',
    'history',
    'horror',
    'thriller',
];
// Tags for random search

const randomize = (tags) => {
    return tags
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
};

module.exports = { tags, randomize };
