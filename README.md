# nodejs-microservices

- [Skaffold](https://skaffold.dev/) Local Kubernetes Development.
  - Skaffold handles the workflow for building, pushing and deploying your application
- [skaffold.yaml](https://skaffold.dev/docs/references/yaml/) reference

### Docker

- build docker image: `docker build -t riponwen/auth .`

### application commands under the the alligator projects

- `skaffold dev` to start all the application

### [Express Validator](https://express-validator.github.io/docs/sanitization.html)

### [Ingress NGINX](https://kubernetes.github.io/ingress-nginx/)

```javaScript
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml
```

### gcloud commands

- gcloud auth login
- gcloud init
- gcloud container clusters get-credentials alligators-dev

- gcloud auth application-default login
