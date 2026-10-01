pipeline {
    agent any

    tools {
        maven 'Maven3'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building Spring Boot application'
                bat 'cd backend && mvn clean package -DskipTests'
            }
        }

        stage('Test') {
            steps {
                echo 'Running Selenium and application tests'
                bat 'cd backend && mvn test'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image'
                bat 'cd backend && docker build -t trackorganize-backend:1.0 .'
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    echo 'Logging in to Docker Hub'

                    bat 'docker login -u "%DOCKER_USERNAME%" -p "%DOCKER_PASSWORD%"'

                    echo 'Tagging Docker image'

                    bat 'docker tag trackorganize-backend:1.0 %DOCKER_USERNAME%/trackorganize-backend:1.0'

                    echo 'Pushing Docker image to Docker Hub'

                    bat 'docker push %DOCKER_USERNAME%/trackorganize-backend:1.0'

                    bat 'docker logout'
                }
            }
        }
    }

    post {
        success {
            echo 'Complete Trackorganize CI/CD Pipeline completed successfully!'
        }

        failure {
            echo 'Trackorganize Pipeline failed.'
        }
    }
}