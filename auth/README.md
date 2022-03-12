# auth

- `npm install typescript ts-node-dev express @types/express`
- `npm i cookie-session @types/cookie-session`
- `npm i jsonwebtoken @types/jsonwebtoken`

#### Create a secret in Kubernetes cluster

- `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf`
