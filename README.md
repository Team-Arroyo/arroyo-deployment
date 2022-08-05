### Prequesites
You should have [node package manager](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), the [docker engine](https://docs.docker.com/engine/install/), and [docker compose](https://docs.docker.com/compose/install/) installed.

If you do not have an ELK stack already, you can use this [docker image](https://elk-docker.readthedocs.io/) to get started.

Additionally, your AWS account must have the following permissions. Best practice is to create an IAM [role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html) with these permissions, and then to assign this role to your user. 
```markdown
"iam:PassRole",
"iam:DetachRolePolicy",
"iam:CreatePolicy",
"iam:CreateRole",
"iam:AttachRolePolicy",
"iam:DeletePolicy",
"iam:DeleteRole",
"kms:Decrypt",
"kms:CreateGrant",
"kms:RetireGrant",
"kms:Encrypt",
"lambda:CreateEventSourceMapping",
"lambda:CreateFunction",
"lambda:DeleteEventSourceMapping",
"lambda:DeleteFunction",
"s3:DeleteObject",
"s3:DeleteBucket",
"s3:CreateBucket",
"s3:ListBucket",
"s3:PutObject",
"s3:GetObject",
"sqs:SendMessage",
"sqs:GetQueueAttributes",
"sqs:DeleteQueue",
"sqs:CreateQueue"
```

Also, you must configure the [http plug-in](https://www.elastic.co/blog/introducing-logstash-input-http-plugin) for logstash.

```markdown, javascript
input {
    http {
      port => destired_port // default port 8080
    }
}

filter {
  mutate {
    // removes axios artifacts
    remove_field => ["[event][original]", "[http]", "[user_agent]", "[url]"]
  }
}

output {
  stdout {
    codec => rubydebug
  }

  elasticsearch {
    hosts => "your_elasticsearch_primary_node"
    index => "your_desired_index_name"  //example: s3logs-%{+YYYY.MM.dd}
  }
}
```

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

### To run Arroyo

See our read me [here](https://github.com/Team-Arroyo/Arroyo-main) for instructions on how to bulk re-ingest and query re-ingest using the browser based graphical user interface.

#### To start Arroyo for the first time
```markdown
docker compose-up
```
#### To restart Arroyo
```markdown
docker compose start
```

#### To stop Arroyo
```markdown
docker compose stop
``` 


#### To stop Arroyo and remove containers and docker network
```markdown
docker compose down
```
 
### Tear-down Arroyo

#### To destroy AWS infrastructure:

```markdown
npm run destroy
```
