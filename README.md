### Prequesites
You should have [node package manager](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), the [docker engine](https://docs.docker.com/engine/install/), and [docker compose](https://docs.docker.com/compose/install/) installed.

Additionally, your AWS account must have the following permissions

### One Time Set-up for Arroyo

#### Clone the repo

```markdown
git clone https://github.com/Team-Arroyo/arroyo-deployment.git
```

#### Change directories

```markdown
cd arroyo-deployment
```

#### Install dependencies

```markdown
npm install
```

#### Create `.env` file

```markdown
touch .env
```

#### Using your favorite editor text editor, add the items listed below: 

```markdown
AWS_REGION=your-region
AWS_BUCKET_NAME=name-of-your-s3-bucket-containing-logs
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
LOGSTASH_HOST=your-logstash-host
```
#### To deploy AWS infrastructure

```markdown
npm run deploy
```

#### To run Arroyo

```markdown
docker compose-up
```

### Tear-down Arroyo

#### To destroy AWS infrastructure:

```markdown
npm run destroy
```
