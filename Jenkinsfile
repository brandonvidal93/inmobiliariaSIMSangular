@Library('ceiba-jenkins-library') _
pipeline {
  agent {
    label 'Slave_Induccion'
  }

  stages {

    stage ('clean'){
      steps{
        echo '------------>clean<------------'
        sh 'npm cache clean --force'
      }
    }

    stage ('checkout') {
      steps {
        checkout scm
      }
    }

    stage('NPM Install') {
      steps {
        echo '------------>Installing<------------'
        sh 'npm install'
      }
    }

    stage('Unit Test') {
      steps {
        echo '------------>Testing<------------'
        sh 'npm run test -- --watch=false --browsers ChromeHeadless'
      }
    }

    stage('Static Code Analysis') {
      steps{
           echo '------------>Analisar código estático<------------'
          sonarqubeMasQualityGatesP(sonarKey:'co.com.ceiba.adn:inmobiliariasims-brandon.vidal', 
          sonarName:'"CeibaADN-inmobiliariaSIMS(brandon.vidal)"', 
          sonarPathProperties:'./sonar-project.properties')
      }
    } 

    stage('Build') {
      steps {
        echo "------------>Building<------------"
        sh 'npm run build'
      }
    }
  }

  post {
    failure {
    echo 'This will run only if failed'
    mail (to: 'brandon.vidal@ceiba.com.co',subject: "Failed Pipeline:${currentBuild.fullDisplayName}",body: "Something is wrong with ${env.BUILD_URL}")
    }

    success {
      echo 'This will run only if successful'
      //junit 'build/test-results/test/*.xml' //RUTA RELATIVA DE LOS ARCHIVOS .XML
    }

  }
}