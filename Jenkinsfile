pipeline {
    agent any

    tools {
        maven 'Maven3'
    }

    stages {

        stage('Build') {
    steps {
        echo '========================================'
        echo 'Building Spring Boot backend'
        echo '========================================'

        bat 'set "JAVA_HOME=C:\\Program Files\\Java\\jdk-25.0.3" && cd backend && mvn clean package -DskipTests'
    }
}

        stage('Start Backend') {
    steps {
        echo '========================================'
        echo 'Starting Spring Boot backend'
        echo '========================================'

        withCredentials([string(credentialsId: 'DB_PASSWORD', variable: 'DB_PASSWORD')]) {
            bat '''
                if exist backend\\backend.log del /f /q backend\\backend.log
                start "Spring Boot" /B cmd /c "cd /d backend && java -jar target\\backend-0.0.1-SNAPSHOT.jar > backend.log 2>&1"
            '''
        }

        echo 'Waiting for backend to start...'

        bat '''
            powershell -NoProfile -Command "$deadline=(Get-Date).AddSeconds(30); do { if ((Test-NetConnection -ComputerName 127.0.0.1 -Port 8081 -WarningAction SilentlyContinue).TcpTestSucceeded) { exit 0 }; Start-Sleep -Seconds 2 } while ((Get-Date) -lt $deadline); Write-Host '===== BACKEND LOG ====='; if (Test-Path 'backend\\backend.log') { Get-Content 'backend\\backend.log' } else { Write-Host 'backend.log was not created' }; exit 1"
        '''
    }
}

        stage('Start Frontend') {
            steps {
                echo '========================================'
                echo 'Installing frontend dependencies'
                echo '========================================'

                bat '''
                    cd frontend

                    if exist node_modules rmdir /s /q node_modules

                    npm install
                '''

                echo 'Starting React frontend'

                bat '''
                    cd frontend

                    if exist frontend.log del /f /q frontend.log

                    start "React App" /B cmd /c "npm.cmd run dev -- --host 127.0.0.1 > frontend.log 2>&1"
                '''

                echo 'Waiting for frontend to start...'

                bat '''
                    powershell -NoProfile -Command "$deadline=(Get-Date).AddSeconds(45); do { if ((Test-NetConnection -ComputerName 127.0.0.1 -Port 5173 -WarningAction SilentlyContinue).TcpTestSucceeded) { exit 0 }; Start-Sleep -Seconds 2 } while ((Get-Date) -lt $deadline); Write-Host '===== FRONTEND LOG ====='; if (Test-Path 'frontend\\frontend.log') { Get-Content 'frontend\\frontend.log' } else { Write-Host 'frontend.log was not created' }; Write-Host '===== NODE/NPM CHECK ====='; where.exe node; where.exe npm; node --version; npm --version; exit 1"
                '''

                echo 'Frontend is running on port 5173'
            }
        }

       stage('Test') {
    steps {
        echo '========================================'
        echo 'Running Selenium tests'
        echo '========================================'

        bat 'set "JAVA_HOME=C:\\Program Files\\Java\\jdk-25.0.3" && cd backend && mvn -Dtest=SeleniumTest test'
    }
}

        stage('Docker Check') {
            steps {
                echo '========================================'
                echo 'Checking Docker installation'
                echo '========================================'

                bat '''
                    echo Docker executable:
                    "C:\\Users\\IT\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" --version

                    echo.
                    echo Docker location:
                    where.exe docker

                    echo.
                    echo Docker context:
                    "C:\\Users\\IT\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" context show

                    echo.
                    echo Docker info:
                    "C:\\Users\\IT\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" -H "npipe:////./pipe/docker_engine" info
                '''
            }
        }

        stage('Docker Build') {
            steps {
                echo '========================================'
                echo 'Building Docker image'
                echo '========================================'

                bat '''
                    cd backend

                    "C:\\Users\\IT\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" -H "npipe:////./pipe/docker_engine" build -t trackorganize-backend:1.0 .
                '''
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

                    echo '========================================'
                    echo 'Logging in to Docker Hub'
                    echo '========================================'

                    powershell '''
                        $env:DOCKER_PASSWORD | docker login --username $env:DOCKER_USERNAME --password-stdin
                    '''

                    echo 'Docker login successful'

                    powershell '''
                        docker tag trackorganize-backend:1.0 "$env:DOCKER_USERNAME/trackorganize-backend:1.0"
                    '''

                    echo 'Pushing Docker image to Docker Hub'

                    powershell '''
                        docker push "$env:DOCKER_USERNAME/trackorganize-backend:1.0"
                    '''

                    echo 'Docker image pushed successfully'

                    powershell '''
                        docker logout
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '========================================'
            echo 'TRACKORGANIZE CI/CD PIPELINE SUCCESSFUL'
            echo '========================================'
        }

        failure {
            echo '========================================'
            echo 'TRACKORGANIZE PIPELINE FAILED'
            echo '========================================'
        }
    }
}