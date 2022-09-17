#/bin/bash

PROJECT="trackmile"
APP_TYPE="admin-frontend"
BASE_DIR="/var/www"
ENV="REPLACE_ENV"
CODEDEPLOY_DIR="${BASE_DIR}/codedeploy/${ENV}/${APP_TYPE}"
DEPLOY_DIR="${BASE_DIR}/$ENV/${APP_TYPE}"

cd $CODEDEPLOY_DIR/ && rm -rf appspec.yml scripts/
cp -r $CODEDEPLOY_DIR/* $DEPLOY_DIR/
chown root:appuser $DEPLOY_DIR/ -R
find $DEPLOY_DIR/ -type d -exec chmod 775 {} \;
find $DEPLOY_DIR/ -type f -exec chmod 664 {} \;