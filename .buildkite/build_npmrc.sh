echo '--- Setting up access for :npm: :package: FontAwesome registry'

cat > .npmrc << EOF
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=${FA5_TOKEN}
save-exact=true
EOF
