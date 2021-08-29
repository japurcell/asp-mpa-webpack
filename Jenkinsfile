pipeline {
  agent none
  stages {
    stage("Parallel") {
      parallel {
        stage('Build Client') {
          agent {
            docker { image 'node:16.8' }
          }
          steps {
            dir('ClientApp') {
              sh 'yarn install --immutable'
              sh 'yarn lint'
              sh 'yarn build'
            }
          }
        }
        stage('Build Server') {
          agent {
            docker { image 'mcr.microsoft.com/dotnet/sdk:5.0' }
          }
          environment {
            DOTNET_CLI_HOME = '/tmp/DOTNET_CLI_HOME'
          }
          steps {
            sh 'dotnet build'
          }
        }
      }
    }
  }
}
