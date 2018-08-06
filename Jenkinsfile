@Library("21re") _

gen.init()

reportSlack {
  node {
    checkout scm

    stage("Build") {
        wrap($class: 'AnsiColorBuildWrapper', colorMapName: 'xterm') {
            sh """
               docker pull 351075005187.dkr.ecr.eu-west-1.amazonaws.com/builders:play-scala-2
               docker run --rm --user 1000:1000 --group-add 999 -e BUILD_NUMBER=${BUILD_NUMBER} -v \$HOME/workspace/.yarn-cache:/home/jenkins/.yarn-cache -v \$(pwd):/project -v \$HOME/workspace/.npm:/home/jenkins/.npm --entrypoint /bin/sh 351075005187.dkr.ecr.eu-west-1.amazonaws.com/builders:play-scala-2  -c 'rm -rf node_modules && yarn install --frozen-lockfile --non-interactive --cache-folder /home/jenkins/.yarn-cache && yarn tsfmt --verify && yarn test && yarn build && yarn build_tsc'
               """
        }
    }

    if(gen.deploy) {
        stage("Publish") {
            githubRelease([version: "v0.1." + env.BUILD_NUMBER])

            withCredentials([usernamePassword(credentialsId: 'nexus-repository', passwordVariable: 'NEXUS_PASSWORD', usernameVariable: 'NEXUS_USER')]) {
                wrap($class: 'AnsiColorBuildWrapper', colorMapName: 'xterm') {
                    sh """
                        sed -i s:1-SNAPSHOT:${BUILD_NUMBER}:g package.json
                        NPM_AUTH=\$(echo -n "${NEXUS_USER}:${NEXUS_PASSWORD}" | base64)
                        docker run --rm --user 1000:1000 --group-add 999 -e npm_config_email=admin@21re.de -e npm_config__auth=\$NPM_AUTH -v \$HOME/workspace/.yarn-cache:/home/jenkins/.yarn-cache -v \$(pwd):/project -v \$HOME/workspace/.npm:/home/jenkins/.npm 351075005187.dkr.ecr.eu-west-1.amazonaws.com/builders:play-scala-2 npm publish
                        """
                }
            }
        }
    }
  }
}
