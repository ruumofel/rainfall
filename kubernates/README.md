# Download Minikube

curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-arm64
sudo install minikube-darwin-arm64 /usr/local/bin/minikube

# Start Minikube
minikube start --driver=docker --alsologtostderr

# Run all kubernetes manifest

kubectl apply -f configmap.yaml
kubectl apply -f service.yaml
kubectl apply -f deployment.yaml

# Run service tunnel
to able access application from browser

minikube service <service-name> --url

example :

minikube service my-service --url

"http://127.0.0.1:52961
❗  Because you are using a Docker driver on darwin, the terminal needs to be open to run it."


