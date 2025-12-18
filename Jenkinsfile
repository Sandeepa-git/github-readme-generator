pipeline {
    agent any

    tools {
        nodejs "NodeJS18"
    }

    environment {
        SONAR_HOST_URL = 'http://16.171.11.129:9000'
        SONAR_TOKEN = credentials('SONAR_TOKEN')
        IMAGE_NAME = "sandeepavimukthi/github-readme-generator:latest"
        K8S_NAMESPACE = 'default'
        K8S_DEPLOYMENT = 'k8s/deployment.yaml'
        K8S_SERVICE = 'k8s/service.yaml'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Sandeepa-git/github-readme-generator.git',
                    credentialsId: 'GITHUB_TOKEN'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test -- --watchAll=false || true'
            }
        }

        /* ------------------ CODE QUALITY ------------------ */

        stage('SonarQube Analysis') {
            steps {
                sh '''
                npm install -g sonar-scanner

                sonar-scanner \
                  -Dsonar.projectKey=Practice_Sandeepa \
                  -Dsonar.sources=src \
                  -Dsonar.host.url=${SONAR_HOST_URL} \
                  -Dsonar.token=${SONAR_TOKEN} \
                  -Dsonar.exclusions=**/node_modules/**,**/build/**
                '''
            }
        }

        /* ------------------ SECURITY SCANS ------------------ */

        stage('Trivy Filesystem Scan') {
            steps {
                sh '''
                trivy fs \
                  --exit-code 0 \
                  --severity LOW,MEDIUM,HIGH,CRITICAL \
                  .
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Trivy Image Scan') {
            steps {
                sh '''
                trivy image \
                  --exit-code 0 \
                  --severity LOW,MEDIUM,HIGH,CRITICAL \
                  ${IMAGE_NAME}
                '''
            }
        }

        /* ------------------ CONTAINER REGISTRY ------------------ */

        stage('Docker Push') {
            steps {
                sh "docker push ${IMAGE_NAME}"
            }
        }

        /* ------------------ KUBERNETES ------------------ */

        stage('Kubernetes Deploy') {
            steps {
                sh "kubectl apply -f ${K8S_DEPLOYMENT}"
                sh "kubectl apply -f ${K8S_SERVICE}"

                sh '''
                echo "Waiting for LoadBalancer IP..."
                for i in {1..30}; do
                  EXTERNAL_IP=$(kubectl get svc github-readme-generator-service \
                    -n ${K8S_NAMESPACE} \
                    -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
                  if [ ! -z "$EXTERNAL_IP" ]; then
                      echo "App is available at: http://$EXTERNAL_IP"
                      break
                  fi
                  sleep 10
                done
                '''
            }
        }

        stage('KubeAudit Security Scan') {
            steps {
                sh 'kubeaudit all || true'
            }
        }
    }

    post {
        always {
            sh 'docker system prune -f || true'
            echo 'Cleanup done.'
        }
        success {
            echo 'Pipeline finished successfully.'
        }
        failure {
            echo 'Pipeline finished with errors.'
        }
    }
}
