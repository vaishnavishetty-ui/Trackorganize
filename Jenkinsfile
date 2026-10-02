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
                    if exist backend.log del /f /q backend.log

                    start "Spring Boot" /B cmd /c "cd /d backend && java -jar target\\backend-0.0.1-SNAPSHOT.jar > backend.log 2>&1"
                '''

                echo 'Waiting for backend to start...'

                bat '''
                    powershell -NoProfile -Command "$deadline=(Get-Date).AddSeconds(30); do { if ((Test-NetConnection -ComputerName 127.0.0.1 -Port 8081 -WarningAction SilentlyContinue).TcpTestSucceeded) { exit 0 }; Start-Sleep -Seconds 2 } while ((Get-Date) -lt $deadline); Write-Host '===== BACKEND LOG ====='; if (Test-Path 'backend\\backend.log') { Get-Content 'backend\\backend.log' } else { Write-Host 'backend.log was not created' }; exit 1"
                '''

                echo 'Backend is running on port 8081'
            }
        }

        stage('Start Frontend') {
            steps {
                echo 'Starting React frontend'

                bat '''
                    start "React App" /B cmd /c "cd frontend && npm run dev -- --host 127.0.0.1 > frontend.log 2>&1"
                '''

                echo 'Waiting for frontend to start...'

                bat '''
                    powershell -NoProfile -Command "$deadline=(Get-Date).AddSeconds(30); do { if ((Test-NetConnection -ComputerName 127.0.0.1 -Port 5173 -WarningAction SilentlyContinue).TcpTestSucceeded) { exit 0 }; Start-Sleep -Seconds 2 } while ((Get-Date) -lt $deadline); Write-Host 'Frontend failed to start'; exit 1"
                '''

                echo 'Frontend is running on port 5173'
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