### Google Cloud shell editior

##### Step 1: Initialization of gcloud

```bash
$ gcloud init
```

##### Step 2: Create service account

```bash
$ gcloud iam service-accounts create SERVICE_ACCOUNT_NAME
```

##### Step 3: Add roles

```bash
$ gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role=roles/compute.instanceAdmin.v1

$ gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role=roles/iam.serviceAccountCreator

$ gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role=roles/viewer
```

##### Step 4: Grant required role to the principal

```bash
$ gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:[USER_EMAIL]" --role=roles/iam.serviceAccountUser
```

##### Step 5: Create GCE (Google Compute Engine) instance

```bash
$ gcloud compute instances create INSTANCE_NAME --zone=ZONE --service-account=SERVICE_ACCOUNT_EMAIL
```

For this step it maybe better using the dashboard as you are better able to customize the vm instance.

Just make sure to assign the newly create service account.

### Set up Workload Identity Federation

For this to work you first need to enable some APIs. This can be done via the dashboard. Enable the IAM, Resource Manager, Service Account Credentials, and Security Token Service APIs.

After that is done you can proceed.

https://cloud.google.com/iam/docs/workload-identity-federation-with-deployment-pipelines#gcloud

https://github.com/google-github-actions/auth?tab=readme-ov-file#setup

##### Step 1: Create a Workload Identity Pool

```bash
$ gcloud iam workload-identity-pools create "github-actions-pool" \
  --project="PROJECT_ID" \
  --location="global" \
  --display-name="GitHub Actions Pool"
```

##### Step 2: Create a Workload Identity Provider

```bash
$ gcloud iam workload-identity-pools providers create-oidc "github-actions-provider" \
  --project="PROJECT_ID" \
  --location="global" \
  --workload-identity-pool="github-actions-pool" \
  --display-name="GitHub Actions Provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository" \
  --issuer-uri="https://token.actions.githubusercontent.com"
```

##### Step 3: Allow the Workload Identity Pool to Impersonate the Service Account

```bash
$ gcloud iam service-accounts add-iam-policy-binding "github-actions-sa@PROJECT_ID.iam.gserviceaccount.com" \
  --project="PROJECT_ID" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-actions-pool/attribute.repository/OWNER/REPO"
```

### GCE Instance (SSH)

#### Install Docker

##### Step 1: Update package list

```bash
$ sudo apt update
```

##### Step 2: Install necessary packages

```bash
$ sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

##### Step 3: Add the Docker repository

```bash
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
```

##### Step 4: Update the package list again

```bash
$ sudo apt update
```

##### Step 5: Install Docker

```bash
$ sudo apt install docker-ce
```

##### Step 6: Start and enable the Docker service

```bash
$ sudo systemctl enable docker # start automatically on boot
$ sudo systemctl start docker
```

##### Step 7:

```bash
$ sudo groupadd docker # just in case the group doesnt already exist
$ sudo usermod -aG docker $USER
```

After this step make sure to logout and log back in for the changes to take effect.

##### Step 8: Confirm Docker installation

```bash
$ docker --version
$ docker compose version
```

##### Step 9: Test Docker

```bash
$ docker run hello-world
```
