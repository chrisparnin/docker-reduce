# docker-reduce

Run an apt-get proxy to cache downloads.

    docker run -d --name apt-cacher -p 3142:3142 sameersbn/apt-cacher-ng:latest

Create a user base ubuntu build that will use apt-get proxy.

    cd /docker-reduce/cached && docker build -t ubuntu:precise-cached --build-arg=APT_PROXY_PORT=3142 .


Run creduce on a Dockerfile that can build creduce.

    cd /docker-reduce/creduce && creduce --n 1 --timeout 300 --print-diff test1.sh  Dockerfile

If need to restart machine, can reset apt-cacher proxy, and run again with command above.

    docker stop apt-cacher
    docker rm apt-cacher
