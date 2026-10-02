pipeline {
    agent any

    tools {
        maven 'Maven3'
    }

    stages {

        stage('Build') {
            steps {
                echo 'Building Spring Boot backend'

                bat 'cd backend && mvn clean package -DskipTests'
            }
        }

        stage('Start Backend') {
            steps {
                echo 'Starting Spring Boot backend'

                bat '''
                    start "Spring Boot" /B cmd /c "cd backend && java -jar target\\backend-0.0.1-SNAPSHOT.jar"
                '''

                echo 'Waiting for backend to start...'

                bat '''
                    powershell -NoProfile -Command "Start-Sleep -Seconds 10"
                '''

                echo 'Backend startup wait completed'
            }
        }

        stage('Start Frontend') {
            steps {
                echo 'Starting React frontend'

                bat '''
                    start "React App" /B cmd /c "cd frontend && npm run dev -- --host 127.0.0.1"
                '''

                echo 'Waiting for frontend to start...'

                bat '''
                    powershell -NoProfile -Command "Start-Sleep -Seconds 10"
                '''

                echo 'Frontend startup wait completed'
            }
        }

        stage('Test') {
            steps {
                echo 'Running Selenium tests'

                bat 'cd backend && mvn -Dtest=SeleniumTest test'
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

                    echo 'Logging out from Docker Hub'

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