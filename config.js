module.exports = {
    tmallSandUrl: process.env.TMALL_API_SAND_HOST_URL ||
    'http://gw.api.tbsandbox.com',
    tmallHostUrl: process.env.TMALL_API_HOST_URL ||
    'https://eco.taobao.com',
    apiSandMode  : process.env.TMALL_API_MODE_SAND || true,
    apiLocalMode : process.env.TMALL_API_MODE_LOCAL_DATA || false,
    getApiBaseUrl: () =>
this.sandbox ? this.tmallSandUrl : this.tmallHostUrl,
    config: {
    // eslint-disable-next-line camelcase
    app_key    : process.env.TMALL_API_APP_KEY,
        // eslint-disable-next-line camelcase
        app_secret : process.env.TMALL_API_APP_SECRET,
        format     : 'json',
        session    : process.env.TMALL_API_SESSION_KEY,
        // eslint-disable-next-line camelcase
        sign_method: 'hmac',
        v          : '2.0'
}

}