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
    }

    post {
        success {
            echo 'Trackorganize Pipeline completed successfully!'
        }

        failure {
            echo 'Trackorganize Pipeline failed.'
        }
    }
}