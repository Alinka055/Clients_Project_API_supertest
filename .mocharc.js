module.exports = {
    require: ['@babel/register'],
    timeout: '10000',
    spec: 'tests/**/*.js',
    ignore: 'tests/example.spec.js',
    file: 'global-hooks/config.js',
}