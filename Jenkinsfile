pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'github-readme-generator'
        DOCKER_TAG = "${BUILD_NUMBER}"
        REGISTRY = 'your-registry.com'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}")
                    docker.build("${REGISTRY}/${DOCKER_IMAGE}:latest")
                }
            }
        }
        
        stage('Push to Registry') {
            steps {
                script {
                    docker.withRegistry("https://${REGISTRY}", 'docker-credentials') {
                        docker.image("${REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                        docker.image("${REGISTRY}/${DOCKER_IMAGE}:latest").push()
                    }
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh """
                        kubectl set image deployment/readme-generator \
                        readme-generator=${REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG} \
                        --record
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
