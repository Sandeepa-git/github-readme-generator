# DevSecOps CI/CD Pipeline Project

## Overview

This project demonstrates a complete **DevSecOps CI/CD pipeline** for a modern web application.
It covers **source control, automated builds, static code analysis, security scanning, containerization, Kubernetes deployment, and monitoring**.

The goal of this project is to show **real-world DevOps and security best practices** using industry-standard tools.

---

## Architecture Diagram

```
Developer
   |
GitHub (Webhook)
   |
Jenkins (CI/CD)
   |
SonarQube (Code Quality)
   |
Trivy (Security Scan)
   |
Docker (Image Build)
   |
Docker Hub / Registry
   |
Kubernetes (Deployment)
   |
Prometheus + Grafana (Monitoring)
```

---

## Tech Stack

### Frontend / Application

* React.js
* Node.js (v18)

### CI/CD & DevOps

* GitHub
* Jenkins
* Docker
* Kubernetes (K8s)

### Security & Quality

* SonarQube (Static Code Analysis)
* Trivy (Vulnerability Scanning)

### Monitoring

* Prometheus
* Grafana

### Cloud

* AWS EC2 (Ubuntu)

---

## Project Structure

```
github-readme-generator/
│
├── src/                    # React source code
│
├── public/                 # Static assets
│
├── Dockerfile              # Docker image configuration
│
├── Jenkinsfile             # CI/CD pipeline definition
│
├── k8s/
│   ├── deployment.yaml     # Kubernetes deployment
│   ├── service.yaml        # Kubernetes service
│
├── package.json            # Node dependencies
├── README.md               # Project documentation
└── .gitignore
```

---

## CI/CD Pipeline Stages

### 1. Source Code Management

* Code is pushed to GitHub
* GitHub webhook automatically triggers Jenkins

### 2. Build Stage

* Jenkins installs dependencies
* React application is built

### 3. Code Quality Analysis

* SonarQube scans source code
* Quality Gate ensures clean code standards

### 4. Security Scanning

* Trivy scans filesystem and Docker image
* Detects vulnerabilities and misconfigurations

### 5. Docker Image Build

* Application is packaged into a Docker image
* Image is tagged and pushed to Docker Hub

### 6. Kubernetes Deployment

* Docker image deployed to Kubernetes cluster
* Service exposes the application

---

## Jenkins Pipeline Flow

```groovy
Checkout Code
Install Dependencies
SonarQube Analysis
Trivy Scan
Docker Build
Docker Push
Kubernetes Deploy
```

---

## Prerequisites

* AWS EC2 (Ubuntu 20.04 or later)
* Jenkins installed and configured
* Docker installed
* Kubernetes cluster (kubeadm or managed)
* SonarQube running
* Docker Hub account

---

## Environment Variables

```env
SONAR_HOST_URL=http://<sonarqube-ip>:9000
SONAR_TOKEN=********
IMAGE_NAME=<dockerhub-username>/<image-name>:latest
K8S_NAMESPACE=default
```

---

## How to Run the Project

### 1. Clone Repository

```bash
git clone https://github.com/your-username/github-readme-generator.git
cd github-readme-generator
```

### 2. Configure Jenkins

* Create Jenkins pipeline job
* Add credentials for:

  * GitHub
  * SonarQube
  * Docker Hub

### 3. Push Code

```bash
git add .
git commit -m "Initial DevSecOps pipeline setup"
git push origin main
```

Jenkins pipeline will trigger automatically.

---

## Kubernetes Deployment

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

Check status:

```bash
kubectl get pods
kubectl get svc
```

---

## Monitoring Setup

### Prometheus

* Installed using Helm or manifest files
* Scrapes Kubernetes metrics

### Grafana

* Dashboards created for:

  * Node metrics
  * Pod health
  * Application performance

---

## Security Best Practices Implemented

* Static code analysis with SonarQube
* Vulnerability scanning using Trivy
* Secrets managed via Jenkins credentials
* Containerized deployments
* Least-privilege Kubernetes resources

---

## Future Enhancements

* Helm charts for Kubernetes
* ArgoCD for GitOps
* OWASP Dependency Check
* Slack / Email notifications
* Autoscaling (HPA)

---

## Author

**Sandeepa Vimukthi**
DevOps | DevSecOps | Cloud Enthusiast

---

## License

This project is licensed under the MIT License.


Updated Readme