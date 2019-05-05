echo 'Setting up access for :npm: :package: FontAwesome registry'

cat << EOF >> /app/.npmrc
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=$FA5_TOKEN
EOF
