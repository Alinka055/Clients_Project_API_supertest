module.exports = {
    require: ['@babel/register'],
    timeout: '5000',
    spec: 'tests/**/*.js',
    ignore: 'tests/example.spec.js',
    file: 'global-hooks/config.js',
    reporter: 'mochawesome',
    reporterOptions: ['reportDir=MyReports', 'reportFilename=updatedReport','json=false']
}