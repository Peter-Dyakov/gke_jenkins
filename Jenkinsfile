pipeline {
  agent {
    kubernetes {
      cloud "kubernetes"
      yamlFile "build-agent.yaml"
    }
  }
  
  stages {
    stage('Build and push to gcr') {
      steps {
        container("gcloud-builder") {
          sh 'git config --global --add safe.directory /home/jenkins/agent/workspace/assignment-app'
          script {
            // Generate a unique tag based on the commit hash
            def commitHash = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
            env.dockerTag = "dev-commit-${commitHash}-${BUILD_NUMBER}"
            env.gkeClusterName = 'example-autopilot-cluster'
            env.Zone = 'us-central1-c'
            env.Region = 'us-central1'
            env.gkeProject = 'home-assignment-437411'
            
            sh "docker build -t assignment-app:${env.dockerTag} ."
            
            withCredentials([file(credentialsId: 'gcr-id', variable: 'SERVICE_ACCOUNT_KEY')]) {
              sh 'gcloud auth activate-service-account --key-file=$SERVICE_ACCOUNT_KEY'
              sh "gcloud container clusters get-credentials ${env.gkeClusterName} --zone ${env.Zone} --project ${env.gkeProject}"
              sh "gcloud auth configure-docker"
            }
            
            env.garImage = "${env.Region}-docker.pkg.dev/${env.gkeProject}/<repository-id>/assignment-app:${env.dockerTag}"
            sh "docker tag assignment-app:${env.dockerTag} ${env.garImage}"
            sh "docker push ${env.garImage}"
          }
        }
      }
    }

    stage('Deploy to GKE') {
      steps {
        container("gcloud-builder") {
          script {
            sh "kubectl get nodes"
          }
        }
      }
    } 
  }

  post {
    always {
      // Clean up the agent pod after the job completes
      cleanWs()
      deleteDir()
    }
  }
}