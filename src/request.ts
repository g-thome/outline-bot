import https from 'https';

function get(url: string): Promise<string> {
    const outlineEndpoint = 'https://api.outline.com/v3/parse_article?source_url=';
    const requestURL = outlineEndpoint + url;
    return new Promise((resolve, reject) => {
        https.get(requestURL, (res) => {
            let chunks = '';

            res.on('data', d => chunks += d);

            res.on('end', () => {
                if (chunks.startsWith('<!DOCTYPE')) {
                    reject('invalid link');
                }

                resolve(JSON.parse(chunks).data.short_code)
            });
        }).on('error', reject)
    })
}

export { get };