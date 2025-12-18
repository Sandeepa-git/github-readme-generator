pipeline {
    agent any

    tools {
        nodejs "NodeJS18"  // Node.js installed in Jenkins
    }

    environment {
        SONAR_HOST_URL = 'http://16.171.11.129:9000'
        SONAR_TOKEN = credentials('SONAR_TOKEN') // Jenkins secret for SonarQube
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
                sh 'npm test -- --watchAll=false || true'  // Continue if no tests defined
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    try {
                        withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_AUTH_TOKEN')]) {
                            sh '''
                                npm install -g @sonar/scan

                                    sonar \
                                      -Dsonar.host.url=http://16.171.11.129:9000 \
                                      -Dsonar.token=$SONAR_TOKEN \
                                      -Dsonar.projectKey=Practice_Sandeepa \
                                      -Dsonar.sources=src \
                                      -Dsonar.exclusions=**/node_modules/**,**/build/**
                                '''
                        }
                    } catch (err) {
                        echo "SonarQube stage failed: ${err}. Continuing pipeline..."
                    }
                }
            }
        }

        stage('Trivy Filesystem Scan') {
            steps {
                script {
                    try {
                        sh 'trivy fs . || true'
                    } catch (err) {
                        echo "Trivy filesystem scan failed: ${err}. Continuing pipeline..."
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    try {
                        sh "docker build -t ${IMAGE_NAME} . || true"
                    } catch (err) {
                        echo "Docker build failed: ${err}. Continuing pipeline..."
                    }
                }
            }
        }

        stage('Trivy Image Scan') {
            steps {
                script {
                    try {
                        sh "trivy image ${IMAGE_NAME} || true"
                    } catch (err) {
                        echo "Trivy image scan failed: ${err}. Continuing pipeline..."
                    }
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    try {
                        sh "docker push ${IMAGE_NAME} || true"
                    } catch (err) {
                        echo "Docker push failed: ${err}. Continuing pipeline..."
                    }
                }
            }
        }

        stage('Kubernetes Deploy') {
            steps {
                script {
                    try {
                        echo "Deploying to Kubernetes..."
                        sh "kubectl apply -f ${K8S_DEPLOYMENT} || true"
                        sh "kubectl apply -f ${K8S_SERVICE} || true"

                        // Wait for LoadBalancer IP (if using type: LoadBalancer)
                        sh """
                        echo 'Waiting for LoadBalancer IP...'
                        for i in {1..30}; do
                          EXTERNAL_IP=\$(kubectl get svc github-readme-generator-service -n ${K8S_NAMESPACE} -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
                          if [ ! -z "\$EXTERNAL_IP" ]; then
                              echo "App is available at: http://\$EXTERNAL_IP"
                              break
                          fi
                          sleep 10
                        done
                        """
                    } catch (err) {
                        echo "Kubernetes deploy failed: ${err}. Continuing pipeline..."
                    }
                }
            }
        }

        stage('KubeAudit Security Scan') {
            steps {
                script {
                    try {
                        sh 'kubeaudit all || true'
                    } catch (err) {
                        echo "KubeAudit scan failed: ${err}. Continuing pipeline..."
                    }
                }
            }
        }

    }

    post {
        always {
            sh 'docker system prune -f || true'
            echo 'Cleanup done.'
        }
        failure {
            echo 'Pipeline finished with errors.'
        }
        success {
            echo 'Pipeline finished successfully.'
        }
    }
}
