# docker-reduce

docker run -d --name apt-cacher -p 3142:3142 sameersbn/apt-cacher-ng:latest

docker stop apt-cacher
docker rm apt-cacher

creduce --n 1 --timeout 300 --print-diff test1.sh  Dockerfile