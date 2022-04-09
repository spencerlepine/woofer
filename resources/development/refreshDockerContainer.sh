# GIVE THE FILE PERMISSIONS
# chmod refreshDockerContainer.sh
# ./refreshDockerContainer.sh

docker ps -a | grep "woofer" | awk '{print $1}' | xargs docker rm
docker rmi $(docker images | grep 'woofer')
docker run -d -p 3000:3000 -t spencerlepine/woofer:latest woofer