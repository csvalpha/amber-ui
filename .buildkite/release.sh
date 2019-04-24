STAGE=$BUILDKITE_BRANCH
if [ "$STAGE" = "master" ]; then STAGE='production'; fi
if [ "$STAGE" = "production" ] || [ "$STAGE" = "staging" ]; then echo 'Deploying for stage' $STAGE; else echo 'Stage' $STAGE 'unknown.. skipping deploy'; exit 0; fi

cd /opt/docker/amber-ui/$STAGE
docker-compose pull web
docker-compose up --build -d web
