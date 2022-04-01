# Auth

- `npm install typescript ts-node-dev express @types/express`
- `npm i cookie-session @types/cookie-session`
- `npm i jsonwebtoken @types/jsonwebtoken`
- `npm i supertest`

#### Create a secret key or Env variable in Kubernetes cluster

- `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf`

#### jest

- `npm install --save-dev @types/jest @types/supertest jest supertest ts-jest mongodb-memory-server`



#### docker 
- build an images:
    - docker build -t riponwen/auth .
- push docker image:
    - docker push riponwen/auth


#### kubernetes:
- apply the depl configuration to the cluster
    - kubectl apply -f auth-depl.yaml