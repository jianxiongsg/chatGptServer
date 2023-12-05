import { ClickHouse } from 'clickhouse';
const clickhouse = new ClickHouse(
    {
        url: 'http://192.168.3.73',
        port: 8123,
        debug: false,
        basicAuth: null,
        isUseGzip: false,
        format: "json", // "json" || "csv" || "tsv"
        config: {
            // session_id: 'session_id if neeed',
            session_timeout: 60,
            output_format_json_quote_64bit_integers: 0,
            enable_http_compression: 0,
            // database: 'my_database_name',
        },

        // This object merge with request params (see request lib docs)
        reqParams: {
        }
    }
);

export default clickhouse