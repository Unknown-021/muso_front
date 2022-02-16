#!/usr/bin/env groovy
def data = [
  "staging": [
      REACT_APP_HOST: "staging.muso.ai",
      REACT_APP_SOCKET_HOST: "https://api-staging.muso.ai",
      REACT_APP_API_HOST: "https://api-staging.muso.ai",
      REACT_APP_API_VERSION: "w/v2",
      REACT_APP_API_NEXT_VERSION: "w/v3",
  ],
  "development": [
      REACT_APP_HOST: "nonproduction.muso.ai",
      REACT_APP_SOCKET_HOST: "https://api-nonproduction.muso.ai",
      REACT_APP_API_HOST: "https://api-nonproduction.muso.ai",
      REACT_APP_API_VERSION: "w/v2",
      REACT_APP_API_NEXT_VERSION: "w/v3",
  ],
  "production": [
      REACT_APP_HOST: "credits.muso.ai",
      REACT_APP_SOCKET_HOST: "https://api-production.muso.ai",
      REACT_APP_API_HOST: "https://api-production.muso.ai",
      REACT_APP_API_VERSION: "w/v2",
      REACT_APP_API_NEXT_VERSION: "w/v3",
  ],
]

def branch_to_env_name = [
    "master": "production",
    "develop": "development",
    "env-staging": "staging",
]

def docker_image = "068358774785.dkr.ecr.us-west-2.amazonaws.com/muso-frontend"

pipeline {
    agent {label 'docker' }

    options {
        lock resource: "${JOB_NAME}"
    }

    stages {
        stage('Inject config') {
            when {
                anyOf {
                    branch 'master';
                    branch 'develop';
                    branch 'env-staging'
                }
            }

            steps {
                script {
                    environment = "${BRANCH_NAME == "master" ? "production" : branch_to_env_name[BRANCH_NAME]}"
                    withCredentials([
                        string(credentialsId: "${environment}-publishableKey", variable: 'STRIPE_PUBLISHABLE_KEY'),
                        usernamePassword(credentialsId: "${environment}-paypal", passwordVariable: 'PYPAL_CLIENT_ID', usernameVariable: 'PYPAL_PLAN_ID'),
                        usernamePassword(credentialsId: "${environment}-paypal2", passwordVariable: 'NONE', usernameVariable: 'PYPAL_NEW_PLAN_ID'),
                        usernamePassword(credentialsId: "${environment}-branch_io", passwordVariable: 'BRANCH_IO_SECRET', usernameVariable: 'BRANCH_IO_KEY')
                    ]) {
                        sh """#!/bin/bash
                        cat >src/config.js<<EOF
module.exports = {
    bases: {
        host: '${data[environment].REACT_APP_HOST}',
        io: '${data[environment].REACT_APP_SOCKET_HOST}/',
        api: '${data[environment].REACT_APP_API_HOST}/api/${data[environment].REACT_APP_API_VERSION}/',
        stripe: {
            publishableKey: '${env.STRIPE_PUBLISHABLE_KEY}',
        },
        paypal: {
            clientId: '${env.PYPAL_CLIENT_ID}',
            planId: '${env.PYPAL_PLAN_ID}',
            newPlanID: '${env.PYPAL_NEW_PLAN_ID}',
        },
        branchIo: {
            key: '${env.BRANCH_IO_KEY}',
            secret: '${env.BRANCH_IO_SECRET}',
        },
        apiNext: '${data[environment].REACT_APP_API_HOST}/api/${data[environment].REACT_APP_API_NEXT_VERSION}/',
    },
}
EOF
                        cat src/config.js
                        """
                    }
                }
            }
        }

        stage('Docker Build') {
            when {
                anyOf {
                    branch 'master';
                    branch 'develop';
                    branch 'env-staging'
                }
            }

            steps {
                script{
                    commit_hash = sh returnStdout: true, script: 'printf $GIT_COMMIT'
                    docker_tag = BRANCH_NAME.tokenize('/')[-1]
                    node_env = "${BRANCH_NAME == "master" ? "production" : "development"}"
                }

                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', 
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    credentialsId: 'AWS-Jenkins-User',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh '$(aws ecr get-login --no-include-email --region us-west-2)'
                }
                ansiColor('xterm') {
                    sh "docker build --pull --build-arg NODE_ENV=${node_env} -t ${docker_image}:${docker_tag}-${commit_hash} ./"
                }
                sh "docker tag ${docker_image}:${docker_tag}-${commit_hash} ${docker_image}:${docker_tag}-latest"
            }
        }

        stage('Docker Push') {
            when {
                anyOf {
                    branch 'master';
                    branch 'develop';
                    branch 'env-staging'
                }
            }
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', 
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    credentialsId: 'AWS-Jenkins-User',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh '$(aws ecr get-login --no-include-email --region us-west-2)'
                }
                sh "docker push ${docker_image}:${docker_tag}-${commit_hash}"
                sh "docker push ${docker_image}:${docker_tag}-latest"
            }
        }

        stage('Deploy') {
            when {
                anyOf {
                    branch 'master';
                    branch 'develop';
                    branch 'env-staging'
                }
            }
            steps {
                build job: "/MusoFrontend/DeployToECS-${docker_tag}", 
                    parameters: [
                        string(name: 'docker_image', value: "${docker_image}:${docker_tag}-${commit_hash}")
                    ],
                    wait: true
            }
        }
    }
}
