`npm install`

create `.env` file

```
AWS_REGION=your-region
AWS_BUCKET_NAME=name-of-the-bucket-containing logs
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
LOGSTASH_HOST=logstash-host
```

`npm run deploy` to deploy AWS infrastructure

`npm run destroy` to destroy AWS infrastructure
