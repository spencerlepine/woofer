sudo service docker stop
sudo service docker start

docker ps -a | grep "woofer" | awk '{print $1}' | xargs docker rm

docker run \
    -it \
    --rm \
    -p 3000:3000 \
    --env-file ./.env \
    -t spencerlepine/woofer:latest

sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
