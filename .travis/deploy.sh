echo -e "\nDeploy API to Production"

eval "$(ssh-agent -s)"

echo -e "\nTravis:  openssl decrypt"
openssl aes-256-cbc -K $encrypted_3b9f0b9d36d1_key -iv $encrypted_3b9f0b9d36d1_iv -in .travis/secrets.tar.enc -out .travis/secrets.tar -d

echo -e "\nTravis:  tar xvf"
tar xvf .travis/secrets.tar
echo -e "\nTravis:  openssl chmod"
chmod 600 private-key
echo -e "\nTravis:  openssl ssh-add"
ssh-add private-key
echo -e "\nTravis:  openssl rm"
rm private-key .travis/secrets.tar

pwd
echo ssh $RELEASE_HOST 'sudo rm -rf /var/app/royhome-web/deploy'
echo scp -r /home/travis/build/kwr760/royhome-web $RELEASE_HOST:/var/app/royhome-web/deploy
echo ssh $RELEASE_HOST 'sudo ls -l /var/app/royhome-web/deploy'

echo -e "\nRemote:  copy new code to stage"
ssh $RELEASE_HOST 'sudo /var/scripts/install-repo.sh royhome-web prod'

echo -e "\nDone.\n"
ssh-agent -k
