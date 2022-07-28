`git clone https://github.com/Team-Arroyo/arroyo-deployment.git`

`cd arroyo-deployment`

`npm install`

create `.env` file

add:

```
AWS_REGION=your-region
AWS_BUCKET_NAME=name-of-your-s3-bucket-containing-logs
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
LOGSTASH_HOST=your-logstash-host
```

`npm run deploy` to deploy AWS infrastructure

`npm run destroy` to destroy AWS infrastructure
