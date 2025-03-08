export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        // Commit types must be one of these
        'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']],
        // Maximum header length set to 72 characters
        'header-max-length': [2, 'always', 72],
        // You can disable subject-case checking or adjust as needed
        'subject-case': [0],
    },
};
