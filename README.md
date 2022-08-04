### Set-up Arroyo

#### Clone the repo

`git clone https://github.com/Team-Arroyo/arroyo-deployment.git`

#### Change directories

`cd arroyo-deployment`

#### Install dependencies

`npm install`

#### Create `.env` file

`touch .env`

#### Using your favorite editor text editor, add the items listed below: 

```
AWS_REGION=your-region
AWS_BUCKET_NAME=name-of-your-s3-bucket-containing-logs
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
LOGSTASH_HOST=your-logstash-host
```
#### To deploy AWS infrastructure

`npm run deploy`

#### To run Arroyo

`docker compose-up`

### Tear-down Arroyo

#### To destroy AWS infrastructure:

`npm run destroy` 
